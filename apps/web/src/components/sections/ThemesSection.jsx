import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { FOCUS_AREAS, THEMES_PAGE_INTRO } from '@/config/themes';

// Homepage preview of the two investment focuses. Full interaction lives on /themes.
export default function ThemesSection({
    className = 'bg-canvas',
    spacing,
    children,
}) {
    return (
        <Section id="focus" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="Investment Themes"
                        title="Building the Real Economy of Digital Assets"
                        intro={THEMES_PAGE_INTRO}
                        action={
                            <ArrowLink to="/themes" variant="solid">
                                Explore Themes
                            </ArrowLink>
                        }
                    />
                </Reveal>
                <Reveal delay={0.08}>
                    <ul className="mt-14 grid gap-4 lg:grid-cols-2">
                        {FOCUS_AREAS.map((focus) => (
                            <li
                                key={focus.id}
                                className="flex flex-col rounded-sm border border-slate-200 bg-white px-6 py-7 sm:px-8"
                            >
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="font-display text-2xl tabular-nums text-slate-400">{focus.n}</span>
                                    {focus.badge && (
                                        <span
                                            className={`rounded-sm px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
                                                focus.badge === 'New'
                                                    ? 'bg-rose-100 text-rose-700'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}
                                        >
                                            {focus.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">
                                    {focus.title}
                                </h3>
                                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{focus.summary}</p>
                                <p className="mt-6 text-sm leading-relaxed text-slate-500">
                                    {focus.subAreas.map((a) => a.title).join(' · ')}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                {children}
            </Container>
        </Section>
    );
}
