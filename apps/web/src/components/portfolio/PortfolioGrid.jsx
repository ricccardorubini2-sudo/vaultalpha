import React, { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import { getUsefulFilters, matchesFilters } from './portfolioFilters';

function FilterRow({ filter, companies, filters, selected, onSelect }) {
    const current = selected[filter.id] ?? null;
    const countFor = (value) =>
        companies.filter((c) => matchesFilters(c, filters, selected, filter.id) && filter.getValue(c) === value).length;
    const pill = (active) =>
        `rounded-md border px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'}`;
    return (
        <div role="group" aria-labelledby={`filter-${filter.id}`} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span id={`filter-${filter.id}`} className="w-20 shrink-0 text-sm text-slate-500">{filter.label}</span>
            <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => onSelect(filter.id, null)} aria-pressed={!current} className={pill(!current)}>All</button>
                {filter.options.map((o) => {
                    const count = countFor(o);
                    return (
                        <button
                            key={o}
                            type="button"
                            onClick={() => onSelect(filter.id, current === o ? null : o)}
                            aria-pressed={current === o}
                            disabled={count === 0 && current !== o}
                            className={pill(current === o)}
                        >
                            {o} <span className={current === o ? 'text-white/60' : 'text-slate-400'}>{count}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * companies:  already-filtered list (e.g. getActivePortfolio()).
 * filterable: show Sector / Stage / Region filters, but only those the data
 *             can meaningfully support (see portfolioFilters.js). Selections
 *             are kept in the URL so they survive back-navigation.
 * getHref:    optional (company) => internal route for each card.
 */
export default function PortfolioGrid({ companies, filterable = false, getHref, className = '' }) {
    const [params, setParams] = useSearchParams();
    const filters = useMemo(() => (filterable ? getUsefulFilters(companies) : []), [filterable, companies]);

    const selected = Object.fromEntries(
        filters.map((f) => [f.id, params.get(f.id)]).filter(([, v]) => v && filters.some((f) => f.options.includes(v))),
    );
    const activeCount = Object.keys(selected).length;
    const visible = companies.filter((c) => matchesFilters(c, filters, selected));
    // Re-keying the list on every filter change replays a short fade; the
    // first render (including arriving with filters in the URL) does not animate.
    const filterKey = JSON.stringify(selected);
    const initialKey = useRef(filterKey);
    const filtered = filterKey !== initialKey.current;

    const setFilter = (id, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(id, value);
        else next.delete(id);
        setParams(next, { replace: true });
    };
    const clearFilters = () => {
        const next = new URLSearchParams(params);
        filters.forEach((f) => next.delete(f.id));
        setParams(next, { replace: true });
    };

    if (companies.length === 0) return null;

    return (
        <div className={className}>
            {filters.length > 0 && (
                <div className="border-y border-slate-200 py-6">
                    <div className="space-y-4">
                        {filters.map((f) => (
                            <FilterRow key={f.id} filter={f} companies={companies} filters={filters} selected={selected} onSelect={setFilter} />
                        ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
                        <p aria-live="polite" className="text-slate-500">
                            Showing {visible.length} of {companies.length} {companies.length === 1 ? 'company' : 'companies'}
                        </p>
                        {activeCount > 0 && (
                            <button type="button" onClick={clearFilters} className="font-medium text-slate-900 underline-offset-4 hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            )}
            {visible.length > 0 ? (
                <ul key={filterKey} className={`grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3 ${filters.length ? 'mt-10' : ''}`}>
                    {visible.map((c) => (
                        <li key={c.slug} className={`h-full border-b border-r border-slate-200 ${filtered ? 'animate-fade' : ''}`}>
                            <PortfolioCard company={c} href={getHref?.(c)} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-10 border-y border-slate-200 px-6 py-16 text-center">
                    <p className="text-slate-500">No companies match these filters.</p>
                    <button type="button" onClick={clearFilters} className="mt-4 text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
