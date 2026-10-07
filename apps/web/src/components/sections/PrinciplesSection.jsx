import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import { OPERATING_PRINCIPLES } from '@/config/about';

export default function PrinciplesSection({
    className = 'bg-canvas',
    spacing,
    label = 'Operating Principles',
    title = 'The principles behind our decisions.',
}) {
    return (
        <Section id="principles" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader label={label} title={title} />
                </Reveal>
                <Reveal delay={0.08}>
                    <ol className="mt-14 border-t border-slate-900">
                        {OPERATING_PRINCIPLES.map((p, i) => (
                            <li key={p.id} className="grid gap-3 border-b border-slate-200 py-8 md:grid-cols-12 md:gap-8">
                                <span className="text-sm tabular-nums text-slate-400 md:col-span-1 md:pt-1">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 md:col-span-4">{p.title}</h3>
                                <p className="leading-relaxed text-slate-600 md:col-span-7">{p.desc}</p>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </Container>
        </Section>
    );
}
