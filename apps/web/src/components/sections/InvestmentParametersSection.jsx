import React from 'react';
import Reveal from '@/components/Reveal';
import InvestmentParameters from '@/components/InvestmentParameters';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import { getPublicParameters, STRATEGY_PARAMETER_FIELDS } from '@/config/investmentParameters';

// Renders nothing until at least one of `fields` is confirmed.
export default function InvestmentParametersSection({ className = 'bg-white', spacing, fields = STRATEGY_PARAMETER_FIELDS }) {
    if (getPublicParameters(fields).length === 0) return null;
    return (
        <Section id="parameters" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader label="Investment Parameters" title="How we structure investments." />
                </Reveal>
                <Reveal delay={0.1}>
                    <InvestmentParameters variant="detailed" fields={fields} title={null} className="mt-14" />
                </Reveal>
            </Container>
        </Section>
    );
}
