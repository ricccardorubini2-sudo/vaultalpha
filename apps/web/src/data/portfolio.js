// Single source of truth for portfolio companies.
//
// Field rules:
// - Use null for anything not yet verified. Never fill a field with an estimate.
// - `active: false` keeps an entry in the data layer but hides it everywhere
//   on the public site (grids, partner logos, and /portfolio/[slug]).
// - `featured: true` entries appear on the homepage, in array order, capped at
//   HOMEPAGE_PORTFOLIO_LIMIT.
// - `investmentStage` currently holds the stage label the site already showed;
//   it is not yet confirmed whether that is VaultAlpha's entry stage or the
//   company's latest round, so it is labelled "Stage" rather than
//   "Investment stage" on the public site.
// - `founders` is optional: null or [{ name, role, verified }]. Only founders
//   with `verified: true` are shown publicly.
// - `investmentYear`, `shortDescription`, and `investmentRationale` stay null
//   until confirmed; sections without content are omitted, never filled in.
//
// TODO: Verify every entry (relationship, stage, geography, website) before
// publication. Set `active: false` for any entry that cannot be verified.

export const PORTFOLIO = [
    {
        slug: 'meridian-labs',
        companyName: 'Meridian Labs',
        logo: { src: '/portfolio/meridian-labs-icon.svg', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Infrastructure',
        investmentStage: 'Series B',
        geography: 'United States',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://meridianlabs.ai',
        featured: true,
        active: true,
        investmentRationale: null,
        // Taken from the testimonial attribution on the homepage.
        founders: [{ name: 'Elena Vasquez', role: 'Founder & CEO', verified: false }],
    },
    {
        slug: 'halcyon-ai',
        companyName: 'Halcyon AI',
        // TODO: Logo file is missing from public/portfolio.
        logo: { src: '/portfolio/halcyon-ai-icon.png', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Artificial Intelligence',
        // TODO: Homepage testimonial refers to a Series B; resolve before publication.
        investmentStage: 'Series A',
        geography: 'United Kingdom',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://www.halcyon.ai',
        // Not featured until the missing logo and stage conflict are resolved.
        featured: false,
        active: true,
        investmentRationale: null,
        // Taken from the testimonial attribution on the homepage.
        founders: [{ name: 'David Kim', role: 'Co-founder', verified: false }],
    },
    {
        slug: 'vault-protocol',
        companyName: 'Vault Protocol',
        logo: { src: '/portfolio/vault-protocol.svg', tile: 'dark', wide: true },
        shortDescription: null,
        sector: 'Digital Finance',
        investmentStage: 'Seed',
        geography: 'Singapore',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://vaultprotocol.ai',
        featured: true,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'aurora-chain',
        companyName: 'Aurora Chain',
        logo: { src: '/portfolio/aurora-chain.svg', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Infrastructure',
        investmentStage: 'Series A',
        geography: 'Germany',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://aurora.dev',
        featured: true,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'ledgerlyne',
        companyName: 'Ledgerlyne',
        // TODO: Logo file is missing from public/portfolio.
        logo: { src: '/portfolio/ledgerlyne.webp', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Digital Assets',
        investmentStage: 'Series B',
        geography: 'Switzerland',
        investmentYear: null,
        status: 'Active',
        // TODO: Website domain (ledgerly.com) does not match the company name.
        companyWebsite: 'https://www.ledgerly.com',
        // Not featured until the missing logo and website mismatch are resolved.
        featured: false,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'ciphergrid',
        companyName: 'Ciphergrid',
        logo: { src: '/portfolio/ciphergrid.svg', tile: 'dark', wide: false },
        shortDescription: null,
        sector: 'Cybersecurity',
        investmentStage: 'Seed',
        geography: 'Israel',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://ciphergrid.ai',
        featured: true,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'northwind-ai',
        companyName: 'Northwind AI',
        logo: { src: '/portfolio/northwind-ai.svg', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Artificial Intelligence',
        investmentStage: 'Series C',
        geography: 'Canada',
        investmentYear: null,
        status: 'Growth',
        companyWebsite: 'https://northwind.ai',
        featured: true,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'terrafi',
        companyName: 'Terrafi',
        logo: { src: '/portfolio/terrafi.svg', tile: 'dark', wide: false },
        shortDescription: null,
        sector: 'Digital Finance',
        investmentStage: 'Series A',
        geography: 'United Arab Emirates',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://www.terrafi.in',
        featured: true,
        active: true,
        investmentRationale: null,
        founders: null,
    },
    {
        slug: 'proofstack',
        companyName: 'Proofstack',
        logo: { src: '/portfolio/proofstack-official.svg', tile: 'light', wide: false },
        shortDescription: null,
        sector: 'Cybersecurity',
        investmentStage: 'Seed',
        geography: 'Estonia',
        investmentYear: null,
        status: 'Active',
        companyWebsite: 'https://proofstack.io',
        featured: false,
        active: true,
        investmentRationale: null,
        founders: null,
    },
];

export const HOMEPAGE_PORTFOLIO_LIMIT = 6;

export const getActivePortfolio = () => PORTFOLIO.filter((c) => c.active);

export const getFeaturedPortfolio = (limit) => {
    const featured = getActivePortfolio().filter((c) => c.featured);
    return limit ? featured.slice(0, limit) : featured;
};

export const portfolioPath = (company) => `/portfolio/${company.slug}`;

// Returns undefined for unknown or inactive slugs, so inactive entries never render.
export const getPortfolioCompany = (slug) => getActivePortfolio().find((c) => c.slug === slug);

export const getVerifiedFounders = (company) =>
    (company.founders ?? []).filter((f) => f?.verified === true && hasValue(f.name));

// Other active companies, same sector first, for "More from the portfolio".
export const getRelatedPortfolio = (company, limit = 3) => {
    const others = getActivePortfolio().filter((c) => c.slug !== company.slug);
    const sameSector = others.filter((c) => c.sector === company.sector);
    return [...sameSector, ...others.filter((c) => c.sector !== company.sector)].slice(0, limit);
};

export const getWebsiteLabel = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};

// Placeholder strings are treated as missing so they are never shown publicly.
const PLACEHOLDER_VALUES = new Set(['n/a', 'na', 'unknown', 'tbd', 'tbc', 'todo', '-', '—', 'null', 'none']);

export const hasValue = (v) => {
    if (v == null) return false;
    if (Array.isArray(v)) return v.some(hasValue);
    if (typeof v === 'object') return true;
    const s = String(v).trim();
    return s !== '' && !PLACEHOLDER_VALUES.has(s.toLowerCase());
};
