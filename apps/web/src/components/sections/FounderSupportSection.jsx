import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import { FOUNDER_SUPPORT } from '@/config/founders';

export default function FounderSupportSection({ className = 'bg-canvas', spacing }) {
    if (FOUNDER_SUPPORT.length === 0) return null;
    return (
        <Section id="support" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader label="What Founders Can Expect" title="How we support the companies we back." />
                </Reveal>
                <Reveal delay={0.08}>
                    <ul className="mt-14 grid gap-x-12 border-t border-slate-900 sm:grid-cols-2 lg:grid-cols-3">
                        {FOUNDER_SUPPORT.map((s, i) => (
                            <li key={s.id} className="border-b border-slate-200 py-8">
                                <span className="text-sm tabular-nums text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-slate-900">{s.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-600">{s.desc}</p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </Container>
        </Section>
    );
}
