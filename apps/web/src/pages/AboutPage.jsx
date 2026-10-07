import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { ArrowLink } from '@/components/site/primitives';
import CompanyOverviewSection from '@/components/sections/CompanyOverviewSection';
import MissionSection from '@/components/sections/MissionSection';
import HistorySection from '@/components/sections/HistorySection';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import ProcessSection from '@/components/sections/ProcessSection';
import GlobalNetworkSection from '@/components/sections/GlobalNetworkSection';
import NextStepsSection from '@/components/sections/NextStepsSection';
import { COMPANY_OVERVIEW, WHY_VAULTALPHA, FOUNDER_PARTNERSHIP_INTRO } from '@/config/about';
import { BRAND, FIRM_DESCRIPTOR } from '@/config/site';

const NEXT_STEPS = [
    {
        to: '/strategy',
        eyebrow: 'Investment Strategy',
        title: 'What we invest in',
        desc: 'Why we centre on payments and stablecoins, and how we underwrite around that thesis.',
        cta: 'Explore Strategy',
    },
    {
        to: '/team',
        eyebrow: 'Team',
        title: 'Who you will work with',
        desc: 'The executive officers and senior leadership behind VaultAlpha.',
        cta: 'Meet the Team',
    },
];

// Who we are → history → mission → values → why us, then how we work.
export default function AboutPage() {
    return (
        <>
            <PageHeader
                label="About"
                title="About VaultAlpha"
                intro={`Founded in March 2025. A ${FIRM_DESCRIPTOR.toLowerCase()} started with our own capital, built to grow a larger fund and a lasting network in digital finance.`}
            />
            <CompanyOverviewSection paragraphs={COMPANY_OVERVIEW} />
            <HistorySection className="bg-mist" />
            <MissionSection />
            <PrinciplesSection label="Our Values" title="The principles behind our decisions." spacing="compact" />
            <PhilosophySection
                className="bg-mist"
                spacing="compact"
                label={`Why ${BRAND}`}
                title={WHY_VAULTALPHA.title}
                paragraphs={WHY_VAULTALPHA.paragraphs}
            />
            <ProcessSection
                className="bg-canvas"
                label="How We Work with Founders"
                intro={FOUNDER_PARTNERSHIP_INTRO}
                spacing="compact"
                showParameters={false}
                action={<ArrowLink to="/founders" variant="solid">For Founders</ArrowLink>}
            />
            <GlobalNetworkSection />
            <NextStepsSection items={NEXT_STEPS} />
        </>
    );
}
