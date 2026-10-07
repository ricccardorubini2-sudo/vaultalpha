import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { MARKET_THESIS } from '@/config/strategy';

export default function MarketThesisSection({ className = 'bg-canvas', spacing = 'compact' }) {
    const { label, title, lead, paragraphs, observations } = MARKET_THESIS;
    return (
        <Section id="thesis" className={className} spacing={spacing} aria-labelledby="thesis-heading">
            <Container>
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <Reveal>
                            <SectionLabel>{label}</SectionLabel>
                            <H2 id="thesis-heading" className="mt-7">{title}</H2>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-8">
                        <Reveal delay={0.08}>
                            <p className="text-lg leading-relaxed text-slate-600">{lead}</p>
                            {paragraphs.map((p, i) => (
                                <p key={i} className="mt-5 max-w-3xl leading-relaxed text-slate-500">{p}</p>
                            ))}
                        </Reveal>
                    </div>
                </div>
                {observations?.length > 0 && (
                    <Reveal delay={0.12}>
                        <ul className="mt-16 grid gap-px overflow-hidden border-y border-slate-200 bg-slate-200 sm:grid-cols-2">
                            {observations.map((o) => (
                                <li key={o.title} className="bg-[hsl(var(--card))] p-7 sm:p-8">
                                    <h3 className="font-display text-lg font-medium tracking-tight text-slate-900">{o.title}</h3>
                                    <p className="mt-3 leading-relaxed text-slate-600">{o.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                )}
            </Container>
        </Section>
    );
}
