// Single source of truth for portfolio companies.
//
// Owner-replaced (2026-10-19): VaultAlpha has invested in every company
// below. See SITE_CONTENT_DECISIONS.md. Names, websites and descriptions are
// as supplied by the owner; logos were taken from each company's public site.
//
// Field rules:
// - Use null for anything not yet confirmed. Never fill a field with an estimate.
// - The owner asked not to classify companies by type, so `sector` stays null.
// - `investmentStage`, `geography` and `investmentYear` stay null until the
//   owner confirms them for publication.
// - `active: false` keeps an entry in the data layer but hides it everywhere
//   on the public site (grids and /portfolio/[slug]).
// - `featured: true` entries appear on the homepage, in array order, capped at
//   HOMEPAGE_PORTFOLIO_LIMIT.
// - `logo`: { src, tile: 'light'|'dark', wide?: boolean }. Files live in
//   /public/portfolio and were taken from each company's public site icons.
// - `founders` is optional: null or [{ name, role, verified }]. Only founders
//   with `verified: true` are shown publicly.

const company = (slug, companyName, companyWebsite, shortDescription, logo, featured = false) => ({
    slug,
    companyName,
    logo,
    shortDescription,
    sector: null,
    investmentStage: null,
    geography: null,
    investmentYear: null,
    companyWebsite,
    featured,
    active: true,
    investmentRationale: null,
    founders: null,
});

const mark = (file, tile = 'light') => ({ src: `/portfolio/${file}`, tile, wide: false });
const wordmark = (file, tile = 'light') => ({ src: `/portfolio/${file}`, tile, wide: true });

export const PORTFOLIO = [
    company('monerium', 'Monerium', 'https://monerium.com/', 'Issues regulated on-chain euros and connects bank accounts with Web3 wallets for payments and settlement.', mark('monerium.png'), true),
    company('finchtrade', 'FinchTrade', 'https://finchtrade.com/', 'Institutional stablecoin liquidity, crypto/fiat conversions, large-block execution and settlement for payment providers.', mark('finchtrade.png'), true),
    company('brickken', 'Brickken', 'https://brickken.com/', 'Institutional infrastructure to tokenize, issue and manage real-world assets, funds and securities.', mark('brickken.png'), true),
    company('centrifuge', 'Centrifuge', 'https://centrifuge.io/', 'Infrastructure for tokenized funds, on-chain investment vaults and institutional RWA liquidity.', mark('centrifuge.png'), true),
    company('blockscout', 'Blockscout', 'https://blockscout.com/', 'Blockchain explorers, transaction indexing, smart-contract verification and APIs for EVM networks.', mark('blockscout.png'), true),
    company('gelato', 'Gelato', 'https://gelato.cloud/', 'Blockchain automation, gasless transactions and rollup infrastructure for Web3 developers.', mark('gelato.png'), true),
    company('flovtec', 'flovtec', 'https://flovtec.com/', 'Algorithmic market making, liquidity provision and order-book management for tokens and exchanges.', mark('flovtec.png')),
    company('keyrock', 'Keyrock', 'https://keyrock.com/', 'Algorithmic market making, institutional liquidity, OTC execution and trading services across digital-asset markets.', mark('keyrock.png')),
    company('lcx', 'LCX', 'https://www.lcx.com/', 'Digital-asset exchange and tokenization infrastructure, including asset-backed token markets.', wordmark('lcx.png')),
    company('coinmetro', 'Coinmetro', 'https://coinmetro.com/', 'Cryptocurrency trading platform offering spot markets, fiat access and digital-asset services.', mark('coinmetro.png')),
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
