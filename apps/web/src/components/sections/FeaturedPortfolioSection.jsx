import React from 'react';
import Reveal from '@/components/Reveal';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { getFeaturedPortfolio, HOMEPAGE_PORTFOLIO_LIMIT, portfolioPath } from '@/data/portfolio';

export default function FeaturedPortfolioSection({ className = 'bg-mist', spacing, limit = HOMEPAGE_PORTFOLIO_LIMIT }) {
    const featured = getFeaturedPortfolio(limit);
    if (featured.length === 0) return null;
    return (
        <Section id="portfolio" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="Selected Portfolio"
                        title="A selection of the companies we back."
                        action={<ArrowLink to="/portfolio" variant="solid">View Portfolio</ArrowLink>}
                    />
                </Reveal>
                <PortfolioGrid companies={featured} getHref={portfolioPath} className="mt-14" />
            </Container>
        </Section>
    );
}
