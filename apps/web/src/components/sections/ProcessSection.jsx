import React from 'react';
import Reveal from '@/components/Reveal';
import InvestmentParameters from '@/components/InvestmentParameters';
import { Section, Container, SectionHeader } from '@/components/site/primitives';
import { INVESTMENT_PROCESS } from '@/config/process';

// Static class names so Tailwind can see them.
const ROW_COLUMNS = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' };

const stepNumber = (i) => String(i + 1).padStart(2, '0');

function RowSteps({ steps }) {
    return (
        <ol className={`mt-14 grid gap-x-8 border-t border-slate-900 sm:grid-cols-2 ${ROW_COLUMNS[steps.length] ?? 'lg:grid-cols-4'}`}>
            {steps.map((s, i) => (
                <li key={s.id} className="border-b border-slate-200 py-8 lg:border-b-0">
                    <span className="text-sm tabular-nums text-slate-400">{stepNumber(i)}</span>
                    <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </li>
            ))}
        </ol>
    );
}

function TimelineSteps({ steps }) {
    return (
        <ol className="mt-14 border-t border-slate-900">
            {steps.map((s, i) => (
                <li key={s.id} className="grid gap-3 border-b border-slate-200 py-8 md:grid-cols-12 md:gap-8">
                    <span className="text-sm tabular-nums text-slate-400 md:col-span-1 md:pt-1">{stepNumber(i)}</span>
                    <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 md:col-span-4">{s.title}</h3>
                    <p className="leading-relaxed text-slate-600 md:col-span-7">{s.desc}</p>
                </li>
            ))}
        </ol>
    );
}

/**
 * layout: 'row' (compact horizontal steps) | 'timeline' (numbered rows, for the Strategy page)
 * steps:  defaults to INVESTMENT_PROCESS in config/process.js
 */
export default function ProcessSection({
    className = 'bg-[#f5f6f8]',
    spacing,
    label = 'Investment Process',
    title = 'From first conversation to long-term partnership.',
    intro,
    layout = 'row',
    steps = INVESTMENT_PROCESS,
    showParameters = true,
    action,
}) {
    if (!steps?.length) return null;
    return (
        <Section id="process" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader label={label} title={title} intro={intro} action={action} />
                </Reveal>
                <Reveal delay={0.08}>
                    {layout === 'timeline' ? <TimelineSteps steps={steps} /> : <RowSteps steps={steps} />}
                </Reveal>
                {showParameters && (
                    <Reveal delay={0.1}>
                        <InvestmentParameters variant="compact" className="mt-16" />
                    </Reveal>
                )}
            </Container>
        </Section>
    );
}
