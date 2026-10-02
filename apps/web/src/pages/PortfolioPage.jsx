import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { Section, Container } from '@/components/site/primitives';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import FounderCtaSection from '@/components/sections/FounderCtaSection';
import { getActivePortfolio, portfolioPath } from '@/data/portfolio';

export default function PortfolioPage() {
    const companies = getActivePortfolio();
    return (
        <>
            <PageHeader label="Portfolio" title="Portfolio companies" intro="A selection of the companies we back." />
            <Section id="portfolio" className="bg-white" spacing="compact">
                <Container>
                    <h2 className="sr-only">All portfolio companies</h2>
                    {companies.length > 0 ? (
                        <PortfolioGrid companies={companies} filterable getHref={portfolioPath} />
                    ) : (
                        <p className="text-slate-500">Portfolio information will be published here.</p>
                    )}
                </Container>
            </Section>
            <FounderCtaSection />
        </>
    );
}
