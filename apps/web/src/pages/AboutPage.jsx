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
import { COMPANY_OVERVIEW, PHILOSOPHY, WHY_VAULTALPHA, FOUNDER_PARTNERSHIP_INTRO } from '@/config/about';
import { BRAND, FIRM_DESCRIPTOR } from '@/config/site';
import { SECTOR_SUMMARY } from '@/config/themes';

const NEXT_STEPS = [
    {
        to: '/strategy',
        eyebrow: 'Investment Strategy',
        title: 'What we invest in',
        desc: 'Our four investment themes, investment parameters and process.',
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

// Who we are → mission → history → values → why us, then how we work.
export default function AboutPage() {
    return (
        <>
            <PageHeader
                label="About"
                title="About VaultAlpha"
                intro={`A ${FIRM_DESCRIPTOR.toLowerCase()} backing founders in ${SECTOR_SUMMARY}.`}
            />
            <CompanyOverviewSection paragraphs={[...COMPANY_OVERVIEW, ...PHILOSOPHY.paragraphs]} />
            <MissionSection />
            <HistorySection />
            <PrinciplesSection label="Our Values" title="The principles behind our decisions." spacing="compact" />
            <PhilosophySection
                className="bg-[#f5f6f8]"
                spacing="compact"
                label={`Why ${BRAND}`}
                title={WHY_VAULTALPHA.title}
                paragraphs={WHY_VAULTALPHA.paragraphs}
            />
            <ProcessSection
                className="bg-white"
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
