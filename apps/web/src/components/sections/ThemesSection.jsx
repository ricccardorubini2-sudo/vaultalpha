import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { CORE_THEME, BRANCH_THEMES, THEMES } from '@/config/themes';
import { THEMES_INTRO, BRANCH_THEMES_INTRO } from '@/config/strategy';

// Core theme first (full width), then branch themes as a three-column row.
// `variant="flat"` keeps an equal four-column grid.
export default function ThemesSection({
    className = 'bg-canvas',
    spacing,
    showStrategyLink = false,
    children,
    variant = 'core',
}) {
    const coreLed = variant === 'core' && CORE_THEME;

    return (
        <Section id="focus" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="Investment Themes"
                        title={coreLed ? 'A centre of gravity, then the stack around it.' : 'Four themes where we build conviction.'}
                        intro={coreLed ? THEMES_INTRO : 'We concentrate on the systems that issue, move and secure value.'}
                        action={showStrategyLink && <ArrowLink to="/strategy" variant="solid">Explore Strategy</ArrowLink>}
                    />
                </Reveal>
                {coreLed ? (
                    <>
                        <Reveal delay={0.08}>
                            <div className="grid gap-8 border-t border-[hsl(215_42%_12%)] pt-10 lg:grid-cols-12 lg:gap-16">
                                <div className="lg:col-span-4">
                                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-champagne">Core focus</p>
                                    <span className="mt-4 block text-sm tabular-nums text-slate-400">{CORE_THEME.n}</span>
                                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">{CORE_THEME.title}</h3>
                                </div>
                                <div className="lg:col-span-8 lg:pt-10">
                                    <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{CORE_THEME.desc}</p>
                                    <p className="mt-6 text-sm leading-relaxed text-slate-500">{CORE_THEME.areas.join(' · ')}</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <div className="mt-16 border-t border-slate-200 pt-12">
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Adjacent themes</p>
                                <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{BRANCH_THEMES_INTRO}</p>
                                <ul className="mt-10 grid gap-x-12 gap-y-10 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                                    {BRANCH_THEMES.map((t) => (
                                        <li key={t.id} className="flex flex-col">
                                            <span className="text-sm tabular-nums text-slate-400">{t.n}</span>
                                            <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-slate-900">{t.title}</h3>
                                            <p className="mt-3 flex-1 leading-relaxed text-slate-600">{t.desc}</p>
                                            <p className="mt-6 text-sm leading-relaxed text-slate-500">{t.areas.join(' · ')}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </>
                ) : (
                    <Reveal delay={0.08}>
                        <ul className="mt-14 grid border-t border-slate-900 sm:grid-cols-2 xl:grid-cols-4">
                            {THEMES.map((t, i) => (
                                <li
                                    key={t.title}
                                    className={`flex flex-col border-b border-slate-200 py-8 sm:pr-8 xl:border-b-0 ${i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''} ${i > 0 ? 'xl:border-l xl:pl-8' : ''}`}
                                >
                                    <span className="text-sm tabular-nums text-slate-400">{t.n}</span>
                                    {t.role === 'core' && (
                                        <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Core</p>
                                    )}
                                    <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">{t.title}</h3>
                                    <p className="mt-3 flex-1 leading-relaxed text-slate-600">{t.desc}</p>
                                    <p className="mt-6 text-sm leading-relaxed text-slate-500">{t.areas.join(' · ')}</p>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                )}
                {children}
            </Container>
        </Section>
    );
}
