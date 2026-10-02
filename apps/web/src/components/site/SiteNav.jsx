import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './primitives';
import { NAV_LINKS, NAV_CTA } from '@/config/site';
import { usePrefersReducedMotion } from '@/lib/motion';
import { prefetchPath } from '@/routes';

const DESKTOP_QUERY = '(min-width: 1024px)';
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';
const FOCUSABLE = 'a[href], button:not([disabled])';
const MENU_EXIT_MS = 300;

// Warm the next page's code as soon as the visitor shows intent.
const prefetchProps = (to) => {
    const go = () => prefetchPath(to);
    return { onPointerEnter: go, onFocus: go, onTouchStart: go };
};

function useBodyScrollLock(locked) {
    useEffect(() => {
        if (!locked) return undefined;
        const { body, documentElement: html } = document;
        const scrollbar = window.innerWidth - html.clientWidth;
        const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight, htmlOverflow: html.style.overflow };
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
        return () => {
            body.style.overflow = prev.overflow;
            body.style.paddingRight = prev.paddingRight;
            html.style.overflow = prev.htmlOverflow;
        };
    }, [locked]);
}

// Keeps the panel mounted for its exit animation after `open` turns false.
function useExitTransition(open, duration) {
    const [closing, setClosing] = useState(false);
    const wasOpen = useRef(false);
    useEffect(() => {
        if (open) {
            wasOpen.current = true;
            setClosing(false);
            return undefined;
        }
        if (!wasOpen.current) return undefined;
        wasOpen.current = false;
        if (!duration) return undefined;
        setClosing(true);
        const t = setTimeout(() => setClosing(false), duration);
        return () => clearTimeout(t);
    }, [open, duration]);
    return closing;
}

export default function SiteNav() {
    const { pathname, key: locationKey } = useLocation();
    const reduceMotion = usePrefersReducedMotion();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const closing = useExitTransition(open, reduceMotion ? 0 : MENU_EXIT_MS);
    const toggleRef = useRef(null);
    const panelRef = useRef(null);

    const close = useCallback((restoreFocus = false) => {
        setOpen(false);
        if (restoreFocus) toggleRef.current?.focus();
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setOpen(false), [locationKey]);

    useEffect(() => {
        const mq = window.matchMedia(DESKTOP_QUERY);
        const onChange = (e) => e.matches && setOpen(false);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    useBodyScrollLock(open);

    // Escape closes; Tab cycles between the toggle and the menu links.
    useEffect(() => {
        if (!open) return undefined;
        panelRef.current?.querySelector(FOCUSABLE)?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                close(true);
                return;
            }
            if (e.key !== 'Tab' || !panelRef.current) return;
            const items = [toggleRef.current, ...panelRef.current.querySelectorAll(FOCUSABLE)].filter(Boolean);
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            } else if (!items.includes(document.activeElement)) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, close]);

    // Transparent only over the homepage hero; solid elsewhere so it stays legible on light pages.
    const solid = open || scrolled || pathname !== '/';

    return (
        <>
            <a
                href="#main-content"
                className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
                Skip to content
            </a>

            <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? 'border-b border-white/10 bg-black/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}>
                <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-6 px-6 py-4 lg:px-12">
                    <Logo />

                    <nav aria-label="Main" className="hidden lg:block">
                        <ul className="flex items-center gap-6 xl:gap-9">
                            {NAV_LINKS.map((n) => (
                                <li key={n.to}>
                                    <NavLink
                                        to={n.to}
                                        {...prefetchProps(n.to)}
                                        className={({ isActive }) => `relative block rounded py-2 text-sm transition-colors ${FOCUS_RING} ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {n.label}
                                                {isActive && <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px bg-white" />}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3">
                        <NavLink
                            to={NAV_CTA.to}
                            {...prefetchProps(NAV_CTA.to)}
                            className={({ isActive }) => `group hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors lg:inline-flex ${FOCUS_RING} ${isActive ? 'bg-white/90 text-black' : 'bg-white text-black hover:bg-slate-200'}`}
                        >
                            {NAV_CTA.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                        </NavLink>

                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className={`relative grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white transition-colors hover:border-white/40 lg:hidden ${FOCUS_RING}`}
                        >
                            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                        </button>
                    </div>
                </div>
            </header>

            {(open || closing) && (
                <div
                    id="mobile-menu"
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site menu"
                    data-state={open ? 'open' : 'closing'}
                    {...(open ? {} : { inert: '' })}
                    className="menu-panel fixed inset-0 z-40 overflow-y-auto overflow-x-hidden overscroll-contain bg-black lg:hidden"
                >
                    <nav aria-label="Main" className="relative mx-auto flex min-h-full max-w-[92rem] flex-col px-6 pb-10 pt-28 sm:pt-32 [@media(max-height:640px)]:pb-6 [@media(max-height:640px)]:pt-24">
                        <ul className="flex flex-col">
                            {NAV_LINKS.map((n, i) => (
                                <li key={n.to} className="menu-item border-b border-white/10" style={{ '--enter-delay': `${0.1 + i * 0.045}s` }}>
                                    <NavLink
                                        to={n.to}
                                        onClick={() => close()}
                                        onTouchStart={() => prefetchPath(n.to)}
                                        className={({ isActive }) => `flex items-center justify-between rounded py-4 font-display text-2xl [@media(max-height:640px)]:py-3 [@media(max-height:640px)]:text-xl font-medium tracking-tight transition-colors sm:text-3xl ${FOCUS_RING} ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {n.label}
                                                {isActive
                                                    ? <span className="h-px w-6 bg-white" aria-hidden />
                                                    : <ArrowRight className="h-5 w-5 text-slate-600" strokeWidth={1.5} aria-hidden />}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="menu-item mt-auto pt-10 [@media(max-height:640px)]:pt-6" style={{ '--enter-delay': '0.35s' }}>
                            <NavLink
                                to={NAV_CTA.to}
                                onClick={() => close()}
                                onTouchStart={() => prefetchPath(NAV_CTA.to)}
                                className={`flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-medium text-black ${FOCUS_RING}`}
                            >
                                {NAV_CTA.label} <ArrowRight className="h-4 w-4" aria-hidden />
                            </NavLink>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
