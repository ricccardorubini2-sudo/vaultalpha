import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { getPublicMilestones, getPublicStory } from '@/config/history';

// "Our History": the firm's story, then a dated timeline. Renders nothing
// until confirmed content exists in config/history.js.
export default function HistorySection({ className = 'bg-white', spacing = 'compact' }) {
    const story = getPublicStory();
    const milestones = getPublicMilestones();
    if (story.length === 0 && milestones.length === 0) return null;

    return (
        <Section id="history" className={className} spacing={spacing} aria-labelledby="history-heading">
            <Container>
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-3">
                        <Reveal>
                            <SectionLabel>Our History</SectionLabel>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-9">
                        <Reveal delay={0.05}>
                            <H2 id="history-heading">Our story.</H2>
                            {story.map((p, i) => (
                                <p key={i} className={`max-w-3xl text-lg leading-relaxed ${i === 0 ? 'mt-7 text-slate-600' : 'mt-5 text-slate-500'}`}>{p}</p>
                            ))}
                        </Reveal>
                    </div>
                </div>

                {milestones.length > 0 && (
                    <ol className="relative mt-16 lg:mt-20">
                        {/* Spine: runs down the left on small screens, between year and text on large ones. */}
                        <span aria-hidden="true" className="absolute bottom-0 left-[0.3125rem] top-[1.125rem] w-px bg-slate-200 lg:left-[calc(25%-1rem-0.5px)] lg:top-[1.25rem]" />
                        {milestones.map((m, i) => (
                            <Reveal as="li" key={`${m.year}-${m.title}`} delay={Math.min(i, 4) * 0.06} className="relative grid gap-2 pb-12 pl-8 last:pb-0 lg:grid-cols-12 lg:gap-16 lg:pl-0">
                                <span aria-hidden="true" className="absolute left-0 top-[1.125rem] h-[0.6875rem] w-[0.6875rem] -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white lg:left-[calc(25%-1rem-0.34375rem)] lg:top-[1.25rem]" />
                                <p className="font-display text-3xl font-medium leading-[2.25rem] tabular-nums tracking-[-0.02em] text-slate-900 lg:col-span-3 lg:text-right lg:text-4xl lg:leading-[2.5rem]">
                                    <time dateTime={String(m.year)}>{m.year}</time>
                                </p>
                                <div className="lg:col-span-9 lg:pt-1.5">
                                    <h3 className="font-display text-xl font-medium tracking-tight text-slate-900">{m.title}</h3>
                                    {String(m.description ?? '').trim() && (
                                        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{m.description}</p>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                )}
            </Container>
        </Section>
    );
}
