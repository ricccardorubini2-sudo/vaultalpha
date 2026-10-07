import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2, ArrowLink } from '@/components/site/primitives';
import { APPLY_LINK } from '@/config/site';
import { APPLICATION_REVIEW_NOTE } from '@/config/contact';

export default function FounderCtaSection({ spacing = 'compact' }) {
    return (
        <Section className="bg-black text-white" spacing={spacing}>
            <Container>
                <Reveal>
                    <div className="flex flex-col items-start justify-between gap-10 border-t border-white/15 pt-12 xl:flex-row xl:items-end">
                        <div className="max-w-2xl">
                            <SectionLabel>For Founders</SectionLabel>
                            <H2 className="mt-5 !text-white">Tell us what you are building.</H2>
                            <p className="mt-5 text-lg leading-relaxed text-slate-400">
                                Share an overview of your company. {APPLICATION_REVIEW_NOTE}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <ArrowLink to={APPLY_LINK.to} variant="light">{APPLY_LINK.longLabel}</ArrowLink>
                            <ArrowLink to="/contact" variant="outline">Contact the Team</ArrowLink>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
