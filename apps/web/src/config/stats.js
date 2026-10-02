// Single source of truth for public-facing VaultAlpha figures.
// Plain JS (no JSX, no `@/` imports) so vite.config.js can also read it
// to emit the static no-JavaScript fallback.

// Master switch for every public rendering of STATS, including the
// no-JavaScript fallback. Keep false until each figure below is verified.
export const STATS_PUBLISHED = false;

export const STATS = [
    // VERIFY before public release: assets under management.
    { id: 'aum', value: 2.4, decimals: 1, prefix: '$', suffix: 'B+', label: 'Assets under management' },
    // VERIFY before public release: number of portfolio companies.
    { id: 'portfolioCompanies', value: 180, suffix: '+', label: 'Portfolio companies' },
    // VERIFY before public release: number of countries.
    { id: 'countries', value: 38, label: 'Countries' },
    // VERIFY before public release: size of founder network.
    { id: 'founderNetwork', value: 400, suffix: '+', label: 'Founder network' },
    // VERIFY before public release: headcount of investment professionals.
    { id: 'investmentProfessionals', value: 25, suffix: '+', label: 'Investment professionals' },
];

export const getStat = (id) => STATS.find((s) => s.id === id);

export const formatStatValue = (stat, value = stat.value) => {
    if (stat.text) return stat.text;
    return `${stat.prefix ?? ''}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`;
};
