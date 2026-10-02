import React from 'react';
import Reveal from '@/components/Reveal';
import InvestmentParameters from '@/components/InvestmentParameters';
import HeroSection from '@/components/sections/HeroSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import ThemesSection from '@/components/sections/ThemesSection';
import FeaturedPortfolioSection from '@/components/sections/FeaturedPortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TeamSection from '@/components/sections/TeamSection';
import ResearchSection from '@/components/sections/ResearchSection';
import FounderCtaSection from '@/components/sections/FounderCtaSection';

// Themes are already listed directly above the summary.
const PARAMETER_SUMMARY_FIELDS = ['stage', 'checkSize', 'instruments', 'leadFollow', 'geography'];

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <PhilosophySection variant="compact" spacing="compact" />
            <ThemesSection className="bg-white" spacing="compact" showStrategyLink>
                <Reveal delay={0.1}>
                    <InvestmentParameters variant="compact" fields={PARAMETER_SUMMARY_FIELDS} className="mt-10" />
                </Reveal>
            </ThemesSection>
            <FeaturedPortfolioSection className="bg-[#f5f6f8]" spacing="compact" />
            <ProcessSection className="bg-white" label="How We Partner" spacing="compact" showParameters={false} />
            <TeamSection className="bg-white" spacing="compact" groupIds={['executive']} showAllTeamLink />
            <ResearchSection className="bg-[#f5f6f8]" spacing="compact" />
            <FounderCtaSection />
        </>
    );
}
