import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import ThemesFocusPanel from '@/components/themes/ThemesFocusPanel';
import { FOCUS_AREAS, THEMES_PAGE_INTRO } from '@/config/themes';

export default function ThemesFocusSection({
    className = 'bg-canvas',
    spacing,
    showHeader = true,
}) {
    return (
        <Section id="themes" className={className} spacing={spacing}>
            <Container>
                {showHeader && (
                    <Reveal>
                        <SectionHeader
                            label="Investment Themes"
                            title="Building the Real Economy of Digital Assets"
                            intro={THEMES_PAGE_INTRO}
                        />
                    </Reveal>
                )}
                <Reveal delay={0.08}>
                    <div className={`flex flex-col gap-4 ${showHeader ? 'mt-14' : ''}`}>
                        {FOCUS_AREAS.map((focus) => (
                            <ThemesFocusPanel key={focus.id} focus={focus} />
                        ))}
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
