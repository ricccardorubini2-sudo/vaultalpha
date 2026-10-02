import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import AlternatingSections from '@/components/site/AlternatingSections';
import PhilosophySection from '@/components/sections/PhilosophySection';
import ThemesSection from '@/components/sections/ThemesSection';
import InvestmentParametersSection from '@/components/sections/InvestmentParametersSection';
import InvestmentCriteriaSection from '@/components/sections/InvestmentCriteriaSection';
import ProcessSection from '@/components/sections/ProcessSection';
import FounderCtaSection from '@/components/sections/FounderCtaSection';
import { getPublicParameters, STRATEGY_PARAMETER_FIELDS } from '@/config/investmentParameters';
import { STRATEGY_INTRO } from '@/config/strategy';

export default function StrategyPage() {
    const hasParameters = getPublicParameters(STRATEGY_PARAMETER_FIELDS).length > 0;

    return (
        <>
            <PageHeader label="Strategy" title="Investment Strategy" intro={STRATEGY_INTRO} />
            <AlternatingSections
                sections={[
                    { key: 'philosophy', render: (bg) => <PhilosophySection variant="compact" showAboutLink={false} className={bg} spacing="compact" /> },
                    { key: 'themes', render: (bg) => <ThemesSection className={bg} /> },
                    hasParameters && { key: 'parameters', render: (bg) => <InvestmentParametersSection className={bg} /> },
                    { key: 'criteria', render: (bg) => <InvestmentCriteriaSection className={bg} /> },
                    { key: 'process', render: (bg) => <ProcessSection className={bg} layout="timeline" showParameters={false} /> },
                ]}
            />
            <FounderCtaSection />
        </>
    );
}
