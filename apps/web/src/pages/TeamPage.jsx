import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import TeamSection from '@/components/sections/TeamSection';
import NextStepsSection from '@/components/sections/NextStepsSection';

const NEXT_STEPS = [
    {
        to: '/strategy',
        eyebrow: 'Investment Strategy',
        title: 'What we invest in',
        desc: 'Our four investment themes, what we look for and how our process works.',
        cta: 'Explore Strategy',
    },
    {
        to: '/founders',
        eyebrow: 'For Founders',
        title: 'Work with us',
        desc: 'Share an overview of your company with our investment team.',
        cta: 'Submit Your Company',
    },
];

export default function TeamPage() {
    return (
        <>
            <PageHeader
                label="Team"
                title="The people behind VaultAlpha"
                intro="The leadership team working with founders for the long term."
            />
            <TeamSection className="bg-white" showHeader={false} showBios />
            <NextStepsSection items={NEXT_STEPS} label="Next Steps" className="bg-[#f5f6f8]" />
        </>
    );
}
