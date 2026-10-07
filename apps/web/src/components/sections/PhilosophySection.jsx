import React from 'react';
import Reveal from '@/components/Reveal';
import AnimatedStatValue from '@/components/AnimatedStatValue';
import { Section, Container, SectionLabel, H2, ArrowLink } from '@/components/site/primitives';
import { getPublicStats } from '@/config/stats';
import { PHILOSOPHY } from '@/config/about';
import { BRAND } from '@/config/site';

const STAT_COLUMNS = { 2: 'md:grid-cols-4', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

function Stat({ stat }) {
    return (
        <div className="text-center lg:text-left">
            <div className="font-display text-4xl font-medium tracking-[-0.02em] md:text-5xl text-slate-900">
                <AnimatedStatValue stat={stat} />
            </div>
            <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
        </div>
    );
}

/**
 * variant: 'full' (About page: philosophy paragraphs, plus stats once published)
 *        | 'compact' (homepage thesis with a link to About)
 */
export default function PhilosophySection({
    className = 'bg-canvas',
    variant = 'full',
    spacing,
    showAboutLink = true,
    label = 'Investment Philosophy',
    title = PHILOSOPHY.title,
    paragraphs = PHILOSOPHY.paragraphs,
}) {
    const compact = variant === 'compact';
    const stats = compact ? [] : getPublicStats();
    const showStats = stats.length > 0;
    return (
        <Section className={className} spacing={spacing}>
            <Container>
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <SectionLabel>{label}</SectionLabel>
                            <H2 className="mt-7">{title}</H2>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal delay={0.1}>
                            {compact ? (
                                <>
                                    <p className="text-lg leading-relaxed text-slate-600">{PHILOSOPHY.thesis}</p>
                                    {showAboutLink && <ArrowLink to="/about" className="mt-8">About {BRAND}</ArrowLink>}
                                </>
                            ) : (
                                paragraphs.map((p, i) => (
                                    <p key={i} className={`text-lg leading-relaxed ${i === 0 ? 'text-slate-600' : 'mt-5 text-slate-500'}`}>{p}</p>
                                ))
                            )}
                        </Reveal>
                    </div>
                </div>
                {showStats && (
                    <Reveal delay={0.15}>
                        <div className={`mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-slate-200 pt-14 ${STAT_COLUMNS[stats.length] ?? 'md:grid-cols-3 lg:grid-cols-5'}`}>
                            {stats.map((s) => <Stat key={s.id} stat={s} />)}
                        </div>
                    </Reveal>
                )}
            </Container>
        </Section>
    );
}
