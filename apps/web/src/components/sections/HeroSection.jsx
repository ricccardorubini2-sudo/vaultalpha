import React from 'react';
import Atmosphere from '@/components/site/Atmosphere';
import { ArrowLink } from '@/components/site/primitives';
import { BRAND, APPLY_LINK, FIRM_DESCRIPTOR } from '@/config/site';
import { THEMES, CORE_THEME_SUMMARY } from '@/config/themes';

const delay = (s) => ({ '--enter-delay': `${s}s` });

// The headline and intro render visible from the first paint (they are the
// Largest Contentful Paint candidates); only secondary elements animate in.
export default function HeroSection() {
    return (
        <section className="relative flex min-h-[94svh] flex-col overflow-hidden border-b border-white/10 bg-ink text-white">
            <Atmosphere intensity="default" />

            <div className="relative mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-6 pb-16 pt-28 sm:pb-20 sm:pt-36 lg:px-12">
                <p className="animate-enter text-[0.7rem] font-medium uppercase tracking-[0.28em] text-champagne/90">
                    {FIRM_DESCRIPTOR}
                </p>
                <h1 className="mt-7 max-w-4xl font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] text-white min-[400px]:text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
                    Investing in the Infrastructure of the Digital Economy
                </h1>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
                    {BRAND} backs founders building the rails of digital finance, centred on {CORE_THEME_SUMMARY}. Adjacent work in blockchain, tokenized assets and trading follows from that core.
                </p>
                <div className="animate-enter mt-11 flex flex-col gap-3 sm:flex-row" style={delay(0.18)}>
                    <ArrowLink to={APPLY_LINK.to} variant="light">{APPLY_LINK.longLabel}</ArrowLink>
                    <ArrowLink to="/strategy" variant="outline">Explore Strategy</ArrowLink>
                </div>
            </div>

            <div className="animate-enter relative border-t border-white/10 bg-black/20 backdrop-blur-[2px]" style={delay(0.32)}>
                <ul className="mx-auto grid max-w-[80rem] grid-cols-2 px-6 lg:grid-cols-4 lg:px-12" aria-label="Investment themes">
                    {THEMES.map((t, i) => (
                        <li
                            key={t.title}
                            className={`py-5 pr-4 text-sm text-white/65 transition-colors hover:text-white lg:py-7 lg:pr-6 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : ''}`}
                        >
                            <span className="mb-1 block tabular-nums text-champagne/70 lg:mb-0 lg:mr-3 lg:inline">{t.n}</span>
                            {t.title}
                            {t.role === 'core' && (
                                <span className="mt-1 block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-champagne lg:mt-0 lg:ml-2 lg:inline">
                                    Core
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
