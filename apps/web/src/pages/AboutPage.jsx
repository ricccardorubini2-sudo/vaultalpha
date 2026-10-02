import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { ArrowLink } from '@/components/site/primitives';
import CompanyOverviewSection from '@/components/sections/CompanyOverviewSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import MissionSection from '@/components/sections/MissionSection';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import GlobalNetworkSection from '@/components/sections/GlobalNetworkSection';
import NextStepsSection from '@/components/sections/NextStepsSection';
import { FOUNDER_PARTNERSHIP_INTRO } from '@/config/about';

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

export default function AboutPage() {
    return (
        <>
            <PageHeader
                label="About"
                title="About VaultAlpha"
                intro="A technology investment firm backing founders in digital assets, payments, artificial intelligence and security infrastructure."
            />
            <CompanyOverviewSection />
            <PhilosophySection className="bg-white" spacing="compact" />
            <MissionSection />
            <PrinciplesSection spacing="compact" />
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
