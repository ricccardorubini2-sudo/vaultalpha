import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { THEMES } from '@/config/themes';

// Editorial columns divided by hairlines rather than icon cards.
// `children` renders below the themes (e.g. an investment parameters summary).
export default function ThemesSection({ className = 'bg-white', spacing, showStrategyLink = false, children }) {
    return (
        <Section id="focus" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="Investment Themes"
                        title="Four themes where we build conviction."
                        intro="We concentrate on the systems that issue, move and secure value — areas where technical depth is a meaningful advantage."
                        action={showStrategyLink && <ArrowLink to="/strategy" variant="solid">Explore Strategy</ArrowLink>}
                    />
                </Reveal>
                <Reveal delay={0.08}>
                    <ul className="mt-14 grid border-t border-slate-900 sm:grid-cols-2 xl:grid-cols-4">
                        {THEMES.map((t, i) => (
                            <li
                                key={t.title}
                                className={`flex flex-col border-b border-slate-200 py-8 sm:pr-8 xl:border-b-0 ${i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''} ${i > 0 ? 'xl:border-l xl:pl-8' : ''}`}
                            >
                                <span className="text-sm tabular-nums text-slate-400">{t.n}</span>
                                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">{t.title}</h3>
                                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{t.desc}</p>
                                <p className="mt-6 text-sm leading-relaxed text-slate-500">{t.areas.join(' · ')}</p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                {children}
            </Container>
        </Section>
    );
}
