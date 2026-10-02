import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel } from '@/components/site/primitives';
import { MISSION } from '@/config/about';

export default function MissionSection({ spacing = 'compact' }) {
    if (!MISSION) return null;
    return (
        <Section id="mission" className="bg-black text-white" spacing={spacing} aria-labelledby="mission-heading">
            <Container>
                <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-3">
                        <SectionLabel as="h2" id="mission-heading">Our Mission</SectionLabel>
                    </div>
                    <p className="font-display text-3xl font-normal leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl lg:col-span-9 lg:text-[2.75rem]">
                        {MISSION}
                    </p>
                </Reveal>
            </Container>
        </Section>
    );
}
