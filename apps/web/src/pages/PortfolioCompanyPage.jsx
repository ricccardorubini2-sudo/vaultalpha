import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import PortfolioLogo from '@/components/portfolio/PortfolioLogo';
import PortfolioDetail from '@/components/portfolio/PortfolioDetail';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { getPortfolioCompany, getRelatedPortfolio, portfolioPath, hasValue, getWebsiteLabel } from '@/data/portfolio';
import NotFoundPage from './NotFoundPage';

export default function PortfolioCompanyPage() {
    const { slug } = useParams();
    const company = getPortfolioCompany(slug);
    if (!company) return <NotFoundPage />;

    const website = hasValue(company.companyWebsite) ? company.companyWebsite : null;
    const related = getRelatedPortfolio(company);

    return (
        <>
            <PageHeader
                label={hasValue(company.sector) ? company.sector : 'Portfolio'}
                title={company.companyName}
                before={
                    <div className="mb-10 flex flex-col gap-8">
                        <Link to="/portfolio" className="-my-2 inline-flex w-fit items-center gap-2 py-2 text-sm text-slate-400 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All portfolio companies
                        </Link>
                        <PortfolioLogo company={company} size="lg" />
                    </div>
                }
            >
                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-8 inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
                    >
                        {getWebsiteLabel(website)}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                )}
            </PageHeader>

            <Section className="bg-white" spacing="compact">
                <Container>
                    <div className="mx-auto max-w-[64rem]">
                        <PortfolioDetail company={company} />
                    </div>
                </Container>
            </Section>

            {related.length > 0 && (
                <Section className="bg-[#f5f6f8]" spacing="compact">
                    <Container>
                        <SectionHeader
                            label="More from the portfolio"
                            action={<ArrowLink to="/portfolio" variant="solid">View Portfolio</ArrowLink>}
                        />
                        <PortfolioGrid companies={related} getHref={portfolioPath} className="mt-10" />
                    </Container>
                </Section>
            )}
        </>
    );
}
