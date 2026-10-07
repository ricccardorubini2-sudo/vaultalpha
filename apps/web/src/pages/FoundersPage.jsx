import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { HEADER_IMAGES } from '@/config/headerImages';
import AlternatingSections from '@/components/site/AlternatingSections';
import ThemesSection from '@/components/sections/ThemesSection';
import InvestmentParametersSection from '@/components/sections/InvestmentParametersSection';
import InvestmentCriteriaSection from '@/components/sections/InvestmentCriteriaSection';
import FounderSupportSection from '@/components/sections/FounderSupportSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FounderApplicationSection from '@/components/sections/FounderApplicationSection';
import { getPublicParameters, STRATEGY_PARAMETER_FIELDS } from '@/config/investmentParameters';
import { getPublicTestimonials } from '@/data/testimonials';

export default function FoundersPage() {
    const hasParameters = getPublicParameters(STRATEGY_PARAMETER_FIELDS).length > 0;
    const testimonials = getPublicTestimonials();

    return (
        <>
            <PageHeader image={HEADER_IMAGES.founders}
                label="For Founders"
                title="Partner With VaultAlpha"
                intro="What we invest in, what we look for and what to expect — so you can judge whether we are the right partner before you apply."
            >
                <a
                    href="#apply"
                    className="mt-10 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-slate-200"
                >
                    Submit Your Company
                </a>
            </PageHeader>
            <AlternatingSections
                sections={[
                    { key: 'themes', render: (bg) => <ThemesSection className={bg} spacing="compact" showStrategyLink /> },
                    hasParameters && { key: 'parameters', render: (bg) => <InvestmentParametersSection className={bg} spacing="compact" /> },
                    { key: 'criteria', render: (bg) => <InvestmentCriteriaSection className={bg} spacing="compact" /> },
                    { key: 'support', render: (bg) => <FounderSupportSection className={bg} spacing="compact" /> },
                    { key: 'process', render: (bg) => <ProcessSection className={bg} spacing="compact" showParameters={false} /> },
                    testimonials.length > 0 && { key: 'testimonials', render: (bg) => <TestimonialsSection className={bg} testimonials={testimonials} /> },
                    { key: 'apply', render: (bg) => <FounderApplicationSection className={bg} spacing="compact" /> },
                ]}
            />
        </>
    );
}
