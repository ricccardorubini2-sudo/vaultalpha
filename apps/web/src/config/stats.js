// Single source of truth for public-facing VaultAlpha figures.
// Plain JS (no JSX, no `@/` imports) so vite.config.js can also read it
// to emit the static no-JavaScript fallback.
//
// A figure renders only when STATS_PUBLISHED is true AND its own `verified`
// flag is true. Owner-confirmed figures: Step 6, 2026-10-06 (see
// SITE_CONTENT_DECISIONS.md).

export const STATS_PUBLISHED = true;

export const STATS = [
    // Keep out of structured data (see seo/meta.js).
    { id: 'aum', value: 750, prefix: '$', suffix: 'M', label: 'Assets under management', verified: true },
    // Keep in step with the active entries in data/portfolio.js.
    { id: 'portfolioCompanies', value: 15, label: 'Portfolio companies', verified: true },
    { id: 'countries', value: 6, label: 'Portfolio countries', verified: true },
];

export const getPublicStats = () => (STATS_PUBLISHED ? STATS.filter((s) => s.verified === true) : []);

export const getStat = (id) => STATS.find((s) => s.id === id);

export const formatStatValue = (stat, value = stat.value) => {
    if (stat.text) return stat.text;
    return `${stat.prefix ?? ''}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`;
};
