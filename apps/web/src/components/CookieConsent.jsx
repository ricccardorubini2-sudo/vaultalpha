import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COOKIE_DEFAULTS, clearCookieConsent, hasCookieConsent, writeCookiePrefs } from '@/lib/cookies';

function isHardRefreshKey(e) {
    if (e.key === 'F5' && e.ctrlKey) return true;
    if ((e.key === 'r' || e.key === 'R') && e.ctrlKey && e.shiftKey) return true;
    return false;
}

export default function CookieConsent() {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (!isHardRefreshKey(e)) return;
            clearCookieConsent();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        if (pathname === '/cookie-settings') {
            setOpen(false);
            return;
        }
        if (!hasCookieConsent()) setOpen(true);
    }, [pathname]);

    const close = (prefs) => {
        writeCookiePrefs(prefs);
        setOpen(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-label="Cookie settings"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 right-4 z-[70] w-[min(100%-2rem,22rem)] rounded-2xl border border-white/15 bg-[#0a1020]/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-400">Cookies</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        We use cookies to run this site securely and, with your consent, to improve it.{' '}
                        <Link to="/cookie-settings" className="text-sky-400 underline-offset-2 hover:underline" onClick={() => setOpen(false)}>
                            Cookie Settings
                        </Link>
                        {' · '}
                        <Link to="/privacy-policy" className="text-sky-400 underline-offset-2 hover:underline" onClick={() => setOpen(false)}>
                            Privacy
                        </Link>
                    </p>
                    <div className="mt-5 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => close(COOKIE_DEFAULTS)}
                            className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                        >
                            Reject
                        </button>
                        <button
                            type="button"
                            onClick={() => close({ essential: true, analytics: true, functional: true })}
                            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#050813] transition-opacity hover:opacity-90"
                        >
                            Accept
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
