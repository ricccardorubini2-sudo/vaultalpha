import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import { INVESTMENT_CRITERIA } from '@/config/strategy';

export default function InvestmentCriteriaSection({ className = 'bg-canvas', spacing }) {
    if (INVESTMENT_CRITERIA.length === 0) return null;
    return (
        <Section id="criteria" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="What We Look For"
                        title="How we evaluate a company."
                        intro="Each opportunity is assessed across the same core areas. Not every criterion carries equal weight for every company."
                    />
                </Reveal>
                <Reveal delay={0.08}>
                    <dl className="mt-14 grid gap-x-10 border-t border-slate-900 sm:grid-cols-2 lg:grid-cols-4">
                        {INVESTMENT_CRITERIA.map((c, i) => (
                            <div key={c.id} className="border-b border-slate-200 pb-8 pt-6">
                                <dt>
                                    <span className="block text-sm tabular-nums text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="mt-4 block font-display text-lg font-medium tracking-tight text-slate-900">{c.title}</span>
                                    {c.qualifier && <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-slate-400">{c.qualifier}</span>}
                                </dt>
                                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </Container>
        </Section>
    );
}
