import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { HEADER_IMAGES } from '@/config/headerImages';
import TeamSection from '@/components/sections/TeamSection';
import NextStepsSection from '@/components/sections/NextStepsSection';

const NEXT_STEPS = [
    {
        to: '/themes',
        eyebrow: 'Investment Themes',
        title: 'What we invest in',
        desc: 'Digital-asset infrastructure and crypto-native commerce — the two focuses of our book.',
        cta: 'Explore Themes',
    },
    {
        to: '/contact',
        eyebrow: 'Contact',
        title: 'Work with us',
        desc: 'Share an overview of your company with our investment team.',
        cta: 'Contact the Team',
    },
];

export default function TeamPage() {
    return (
        <>
            <PageHeader image={HEADER_IMAGES.team}
                label="Team"
                title="The people behind VaultAlpha"
                intro="The leadership team working with founders for the long term."
            />
            <TeamSection className="bg-canvas" showHeader={false} showBios />
            <NextStepsSection items={NEXT_STEPS} label="Next Steps" className="bg-mist" />
        </>
    );
}
