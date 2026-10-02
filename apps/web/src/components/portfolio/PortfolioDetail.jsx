import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { hasValue, getVerifiedFounders, getWebsiteLabel } from '@/data/portfolio';
import { BRAND } from '@/config/site';

const FACTS = [
    { key: 'sector', label: 'Sector' },
    { key: 'investmentStage', label: 'Stage' },
    { key: 'geography', label: 'Geography' },
    { key: 'investmentYear', label: 'Investment year' },
];

const Block = ({ title, children }) => (
    <section className="grid gap-4 border-b border-slate-200 py-10 md:grid-cols-12 md:gap-10">
        <h2 className="text-sm text-slate-500 md:col-span-4 md:pt-1">{title}</h2>
        <div className="md:col-span-8">{children}</div>
    </section>
);

/**
 * Body of /portfolio/[slug]. Pass the result of getPortfolioCompany(slug) so
 * inactive entries never render. Every block is omitted when it has no
 * confirmed content; nothing is filled in.
 */
export default function PortfolioDetail({ company }) {
    if (!company) return null;
    const { companyName, companyWebsite, shortDescription, investmentRationale } = company;
    const facts = FACTS.filter((f) => hasValue(company[f.key]));
    const founders = getVerifiedFounders(company);
    const website = hasValue(companyWebsite) ? companyWebsite : null;

    return (
        <Reveal as="article" className="border-t border-slate-900">
            {facts.length > 0 && (
                <dl className="grid grid-cols-2 border-b border-slate-200 md:grid-cols-4">
                    {facts.map((f) => (
                        <div key={f.key} className="py-6 pr-6">
                            <dt className="text-sm text-slate-500">{f.label}</dt>
                            <dd className="mt-2 font-display text-lg font-medium tracking-tight text-slate-900">{company[f.key]}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {hasValue(shortDescription) && (
                <Block title={`About ${companyName}`}>
                    <p className="max-w-3xl text-lg leading-relaxed text-slate-600">{shortDescription}</p>
                </Block>
            )}

            {hasValue(investmentRationale) && (
                <Block title={`Why ${BRAND} invested`}>
                    <p className="max-w-3xl text-lg leading-relaxed text-slate-600">{investmentRationale}</p>
                </Block>
            )}

            {founders.length > 0 && (
                <Block title={founders.length > 1 ? 'Founders' : 'Founder'}>
                    <ul className="space-y-3">
                        {founders.map((f) => (
                            <li key={f.name} className="text-slate-700">
                                <span className="font-medium text-slate-900">{f.name}</span>
                                {hasValue(f.role) && <span className="text-slate-500"> — {f.role}</span>}
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {website && (
                <Block title="Company website">
                    <a
                        href={website}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 font-display text-lg font-medium text-slate-900 underline-offset-[6px] hover:underline"
                    >
                        {getWebsiteLabel(website)}
                        <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-900" strokeWidth={1.75} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                </Block>
            )}
        </Reveal>
    );
}
