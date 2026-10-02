import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { getActivePortfolio, portfolioPath } from '@/data/portfolio';
import { BRAND } from '@/config/site';

export default function CareersSection({ className = 'bg-[#f5f6f8]', spacing, showPartners = true }) {
    const partners = showPartners ? getActivePortfolio().filter((p) => p.slug !== 'vault-protocol') : [];
    const CareersHeading = partners.length > 0 ? 'h3' : 'h2';
    return (
        <Section id="careers" className={className} spacing={spacing}>
            <Container>
                {partners.length > 0 && (<>
                    <Reveal>
                        <SectionLabel>Partner Companies</SectionLabel>
                        <H2 className="mt-7 max-w-3xl">Companies we work alongside.</H2>
                    </Reveal>
                    <div className="mt-14 mb-16 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
                        {partners.map((p) => (
                            <Link
                                key={p.slug}
                                to={portfolioPath(p)}
                                className="group flex flex-col items-center justify-center gap-4 bg-white px-6 py-10 transition-colors hover:bg-slate-50"
                            >
                                <img src={p.logo.src} alt="" loading="lazy" className="h-14 w-auto max-w-[8.5rem] object-contain" />
                                <span className="font-display text-sm font-medium tracking-tight text-slate-500 transition-colors group-hover:text-slate-900">{p.companyName}</span>
                            </Link>
                        ))}
                    </div>
                </>)}
                <Reveal delay={0.1}>
                    <div className="flex flex-col items-start justify-between gap-6 border-y border-slate-200 py-10 sm:flex-row sm:items-center lg:py-12">
                        <div>
                            <CareersHeading className="font-display text-2xl font-medium tracking-tight text-slate-900 lg:text-3xl">Careers at {BRAND}</CareersHeading>
                            <p className="mt-2 text-slate-600">We welcome enquiries from investors, engineers and researchers with deep technical expertise.</p>
                        </div>
                        <Link to="/contact#contact" className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                            Contact us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
