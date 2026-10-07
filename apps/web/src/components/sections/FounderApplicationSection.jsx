import React, { Suspense, lazy, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { APPLICATION_FALLBACK_EMAIL } from '@/config/founders';
import { INVESTMENT_PROCESS } from '@/config/process';
import { APPLICATION_REVIEW_NOTE } from '@/config/contact';

// The form carries its validation libraries (zod, react-hook-form), so it is a
// separate chunk. It starts downloading once the browser is idle, long before
// a visitor reaches the bottom of the page.
const loadForm = () => import('@/components/founders/FounderApplicationForm');
const FounderApplicationForm = lazy(loadForm);

const FormPlaceholder = () => (
    <div aria-hidden="true" className="min-h-[88rem] rounded-lg border border-slate-200 bg-white sm:min-h-[64rem] lg:min-h-[58rem]" />
);

export default function FounderApplicationSection({ className = 'bg-white', spacing }) {
    useEffect(() => {
        const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1));
        const cancel = window.cancelIdleCallback ?? clearTimeout;
        const id = idle(() => loadForm().catch(() => {}), { timeout: 3000 });
        return () => cancel(id);
    }, []);

    return (
        <Section id="apply" className={className} spacing={spacing}>
            <Container>
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <Reveal className="lg:sticky lg:top-32">
                            <SectionLabel>Submit Your Company</SectionLabel>
                            <H2 className="mt-5">Tell us what you are building.</H2>
                            <p className="mt-6 leading-relaxed text-slate-500">
                                {APPLICATION_REVIEW_NOTE}
                            </p>
                            {INVESTMENT_PROCESS.length > 1 && (
                                <div className="mt-10 border-t border-slate-200 pt-6">
                                    <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">After you apply</h3>
                                    <ol className="mt-4 space-y-3 text-sm text-slate-600">
                                        {INVESTMENT_PROCESS.slice(1).map((s, i) => (
                                            <li key={s.id} className="flex gap-3">
                                                <span className="tabular-nums text-slate-400">{String(i + 2).padStart(2, '0')}</span>
                                                {s.title}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                            {APPLICATION_FALLBACK_EMAIL && (
                                <p className="mt-10 text-sm text-slate-500">
                                    Prefer email? Write to{' '}
                                    <a href={`mailto:${APPLICATION_FALLBACK_EMAIL}`} className="font-medium text-slate-900 underline-offset-4 hover:underline">{APPLICATION_FALLBACK_EMAIL}</a>.
                                </p>
                            )}
                        </Reveal>
                    </div>
                    <div className="lg:col-span-8">
                        <Reveal delay={0.1}>
                            <Suspense fallback={<FormPlaceholder />}>
                                <FounderApplicationForm />
                            </Suspense>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
