import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PortfolioLogo from './PortfolioLogo';
import { hasValue } from '@/data/portfolio';

// A directory cell: sits inside a hairline grid, so it has no border or radius of its own.
const CARD_CLASS = 'group flex h-full flex-col bg-white p-6 transition-colors hover:bg-slate-50 sm:p-7 lg:p-8';

/**
 * href: optional internal route (e.g. `/portfolio/${slug}`). Without it the
 * card links to the company website, or renders unlinked if there is none.
 * Missing or placeholder values are omitted rather than shown.
 */
export default function PortfolioCard({ company, href }) {
    const { companyName, sector, shortDescription, investmentStage, geography, companyWebsite } = company;
    const website = hasValue(companyWebsite) ? companyWebsite : null;
    const meta = [investmentStage, geography].filter(hasValue);

    const body = (
        <>
            <div className="flex items-start justify-between gap-3">
                <PortfolioLogo company={company} />
                {(href || website) && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-slate-900" strokeWidth={1.75} aria-hidden="true" />
                )}
            </div>
            <h3 className="mt-6 font-display sm:mt-8 text-xl font-medium tracking-tight text-slate-900">{companyName}</h3>
            {hasValue(sector) && <p className="mt-1 text-sm text-slate-500">{sector}</p>}
            {hasValue(shortDescription) && <p className="mt-4 text-sm leading-relaxed text-slate-600">{shortDescription}</p>}
            {meta.length > 0 && (
                <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-6 sm:pt-8 text-sm text-slate-500">
                    {hasValue(investmentStage) && (
                        <div>
                            <dt className="sr-only">Stage</dt>
                            <dd>{investmentStage}</dd>
                        </div>
                    )}
                    {hasValue(geography) && (
                        <div>
                            <dt className="sr-only">Geography</dt>
                            <dd>{geography}</dd>
                        </div>
                    )}
                </dl>
            )}
        </>
    );

    if (href) return <Link to={href} className={CARD_CLASS}>{body}</Link>;
    if (website) {
        return (
            <a href={website} target="_blank" rel="noreferrer" className={CARD_CLASS}>
                {body}
                <span className="sr-only"> (opens company website in a new tab)</span>
            </a>
        );
    }
    return <div className={CARD_CLASS}>{body}</div>;
}
