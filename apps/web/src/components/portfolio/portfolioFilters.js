import { hasValue } from '@/data/portfolio';
import { getRegion } from '@/lib/geo';

const STAGE_ORDER = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Growth'];

// Country-level geography is grouped by region: with one company per country,
// a country filter would never narrow the grid to more than one result.
export const FILTER_DIMENSIONS = [
    { id: 'sector', label: 'Sector', getValue: (c) => c.sector },
    { id: 'stage', label: 'Stage', getValue: (c) => c.investmentStage, order: STAGE_ORDER },
    { id: 'region', label: 'Region', getValue: (c) => getRegion(c.geography) },
];

// Below this many companies the grid is short enough to scan without filters.
export const MIN_COMPANIES_FOR_FILTERS = 6;

// A dimension is only useful if at least this many of its options each match
// two or more companies; otherwise every option is effectively a single card.
const MIN_GROUPING_OPTIONS = 2;

const sortOptions = (values, order) =>
    [...values].sort((a, b) => {
        if (order) {
            const ai = order.indexOf(a);
            const bi = order.indexOf(b);
            if (ai !== -1 || bi !== -1) return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
        }
        return a.localeCompare(b);
    });

export function getUsefulFilters(companies) {
    if (companies.length < MIN_COMPANIES_FOR_FILTERS) return [];
    return FILTER_DIMENSIONS.map((d) => {
        const counts = new Map();
        companies.forEach((c) => {
            const v = d.getValue(c);
            if (hasValue(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
        });
        const grouping = [...counts.values()].filter((n) => n >= 2).length;
        return { ...d, options: sortOptions(counts.keys(), d.order), useful: grouping >= MIN_GROUPING_OPTIONS };
    }).filter((d) => d.useful);
}

// `ignoreId` lets an option count be computed against every other active filter.
export const matchesFilters = (company, filters, selected, ignoreId) =>
    filters.every((d) => d.id === ignoreId || !selected[d.id] || d.getValue(company) === selected[d.id]);
