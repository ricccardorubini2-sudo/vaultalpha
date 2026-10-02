import React from 'react';
import NetworkCanvas from '@/components/NetworkCanvas';
import { ArrowLink } from '@/components/site/primitives';
import { BRAND, APPLY_LINK } from '@/config/site';
import { THEMES } from '@/config/themes';

const delay = (s) => ({ '--enter-delay': `${s}s` });

// The headline and intro render visible from the first paint (they are the
// Largest Contentful Paint candidates); only secondary elements animate in.
export default function HeroSection() {
    return (
        <section className="relative flex min-h-[92svh] flex-col overflow-hidden border-b border-white/10 bg-black text-white">
            <NetworkCanvas className="absolute inset-0 h-full w-full opacity-25" density={0.00008} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

            <div className="relative mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-6 pb-14 pt-28 sm:pb-16 sm:pt-36 lg:px-12">
                <p className="animate-enter text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Global technology investment firm
                </p>
                <h1 className="mt-6 max-w-4xl font-display text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-white min-[400px]:text-[2.6rem] sm:text-6xl lg:text-7xl">
                    Investing in the Infrastructure of the Digital Economy
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-8 sm:text-lg">
                    {BRAND} backs founders building the systems that issue, move and secure value — across digital assets and blockchain infrastructure, digital finance, artificial intelligence and security.
                </p>
                <div className="animate-enter mt-10 flex flex-col gap-3 sm:flex-row" style={delay(0.15)}>
                    <ArrowLink to={APPLY_LINK.to} variant="light">{APPLY_LINK.longLabel}</ArrowLink>
                    <ArrowLink to="/strategy" variant="outline">Explore Strategy</ArrowLink>
                </div>
            </div>

            <div className="animate-enter relative border-t border-white/10" style={delay(0.3)}>
                <ul className="mx-auto grid max-w-[80rem] grid-cols-2 px-6 lg:grid-cols-4 lg:px-12" aria-label="Investment themes">
                    {THEMES.map((t, i) => (
                        <li key={t.title} className={`py-5 pr-4 text-sm text-slate-400 lg:py-6 lg:pr-6 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : ''}`}>
                            <span className="mb-1 block tabular-nums text-slate-600 lg:mb-0 lg:mr-3 lg:inline">{t.n}</span>{t.title}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
