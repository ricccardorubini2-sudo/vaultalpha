import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { Logo } from './primitives';
import { BRAND, DOMAIN, FOOTER_COLUMNS, FOOTER_DESCRIPTION, getVerifiedSocialLinks } from '@/config/site';
import { prefetchPath } from '@/routes';

const SOCIAL_ICONS = { linkedin: Linkedin };
const FOCUS_RING = 'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

export default function SiteFooter() {
    const socials = getVerifiedSocialLinks();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-ink-gradient text-white">
            <div className="mx-auto max-w-[80rem] px-6 pb-10 pt-16 lg:px-12 lg:pt-20">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:grid-cols-12">
                    <div className="col-span-2 sm:col-span-4 lg:col-span-4 lg:pr-8">
                        <Logo />
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">{FOOTER_DESCRIPTION}</p>
                        {socials.length > 0 && (
                            <ul className="mt-6 flex gap-2" aria-label="Social media">
                                {socials.map((s) => {
                                    const Icon = SOCIAL_ICONS[s.id] ?? ArrowUpRight;
                                    return (
                                        <li key={s.id}>
                                            <a
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${BRAND} on ${s.label} (opens in a new tab)`}
                                                className="grid h-11 w-11 place-items-center rounded-md border border-white/15 text-slate-400 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                            >
                                                <Icon className="h-4 w-4" aria-hidden />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {FOOTER_COLUMNS.map((c) => (
                        <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
                            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{c.title}</h2>
                            <ul className="mt-3 lg:mt-5 lg:space-y-3">
                                {c.links.map((l) => (
                                    <li key={l.to}>
                                        <Link to={l.to} onPointerEnter={() => prefetchPath(l.to)} onFocus={() => prefetchPath(l.to)} className={`inline-block py-2 text-sm text-slate-300 transition-colors hover:text-white lg:py-0 ${FOCUS_RING}`}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {year} {BRAND}. All rights reserved.</p>
                    <p>
                        {DOMAIN}
                        <span className="mx-2 text-slate-700" aria-hidden>·</span>
                        For information only. Not an offer or investment advice.{' '}
                        <Link to="/disclosures" className={`text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline ${FOCUS_RING}`}>
                            Disclosures
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
