import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PortfolioLogo from '@/components/portfolio/PortfolioLogo';
import { getPortfolioCompany, portfolioPath } from '@/data/portfolio';

// Dark strip of portfolio logos scrolling right → left, each in its own colours
// on its tile. The row is duplicated so the CSS loop has no gap. Hidden when no
// slug resolves to an active portfolio company.
export default function EntityMarquee({ slugs = [], label = 'Selected collaboration entities' }) {
    const entities = useMemo(
        () => slugs.map((slug) => getPortfolioCompany(slug)).filter(Boolean),
        [slugs],
    );
    if (entities.length === 0) return null;

    const loop = [...entities, ...entities];

    return (
        <div className="mt-10 border-t border-slate-200 pt-8">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-500">{label}</p>
                <Link
                    to="/portfolio"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                    View all partners
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                </Link>
            </div>
            <div className="group/marquee relative overflow-hidden rounded-sm bg-[hsl(215_42%_10%)]">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[hsl(215_42%_10%)] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[hsl(215_42%_10%)] to-transparent" />
                <ul
                    className="flex w-max animate-marquee py-5 group-hover/marquee:[animation-play-state:paused]"
                    style={{ '--marquee-duration': `${Math.max(30, entities.length * 5)}s` }}
                >
                    {loop.map((company, i) => {
                        const duplicate = i >= entities.length;
                        return (
                            <li key={`${company.slug}-${i}`} aria-hidden={duplicate || undefined} className="shrink-0 px-3">
                                <Link
                                    to={portfolioPath(company)}
                                    tabIndex={duplicate ? -1 : undefined}
                                    className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/[0.04] py-2 pl-2 pr-5 transition-colors hover:border-champagne/50 hover:bg-white/[0.08]"
                                >
                                    <PortfolioLogo company={company} />
                                    <span className="whitespace-nowrap text-sm font-medium text-white/85">{company.companyName}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
