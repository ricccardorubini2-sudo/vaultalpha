import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel } from '@/components/site/primitives';
import { COMPANY_OVERVIEW } from '@/config/about';

export default function CompanyOverviewSection({ className = 'bg-canvas', spacing = 'compact', paragraphs = COMPANY_OVERVIEW }) {
    const [lead, ...rest] = paragraphs;
    return (
        <Section id="overview" className={className} spacing={spacing}>
            <Container>
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-3">
                        <Reveal>
                            <SectionLabel as="h2">Who We Are</SectionLabel>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-9">
                        <Reveal delay={0.05}>
                            <p className="font-display text-2xl font-normal leading-snug tracking-[-0.015em] text-slate-900 sm:text-3xl lg:text-[2.1rem]">{lead}</p>
                            {rest.map((p, i) => (
                                <p key={i} className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{p}</p>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
