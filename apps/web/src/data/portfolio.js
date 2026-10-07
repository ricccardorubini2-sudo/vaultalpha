// Single source of truth for portfolio companies.
//
// Owner-confirmed (Step 5, 2026-10-06): VaultAlpha has invested in every
// company below. See SITE_CONTENT_DECISIONS.md. Websites were checked on
// 2026-10-06; descriptions summarise each company's own public description.
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
    company('bvnk', 'BVNK', 'https://www.bvnk.com/', 'Stablecoin payments infrastructure for enterprises.', mark('bvnk.png'), true),
    company('centrifuge', 'Centrifuge', 'https://centrifuge.io/', 'Infrastructure to tokenize, manage and invest in real-world assets onchain.', mark('centrifuge.png'), true),
    company('layerzero', 'LayerZero', 'https://www.layerzero.org/', 'An interoperability protocol for moving messages and assets between blockchains.', mark('layerzero.png'), true),
    company('privy', 'Privy', 'https://www.privy.io/', 'Wallet and digital-asset infrastructure for financial products.', mark('privy.png'), true),
    company('maple-finance', 'Maple Finance', 'https://maple.finance/', 'Onchain asset management and lending for institutions.', mark('maple-finance.png'), true),
    company('morpho', 'Morpho', 'https://morpho.org/', 'An open credit network connecting lenders and borrowers onchain.', mark('morpho.svg'), true),
    company('turnkey', 'Turnkey', 'https://www.turnkey.com/', 'Wallet and private-key infrastructure delivered through a single API.', mark('turnkey.png')),
    company('zerohash', 'zerohash', 'https://zerohash.com/', 'API-first infrastructure for launching crypto and stablecoin products.', mark('zerohash.png')),
    company('fireblocks', 'Fireblocks', 'https://www.fireblocks.com/', 'Enterprise infrastructure for digital assets and stablecoins.', mark('fireblocks.png')),
    company('anchorage-digital', 'Anchorage Digital', 'https://www.anchorage.com/', 'An institutional crypto platform for custody and related services.', mark('anchorage-digital.png')),
    company('figment', 'Figment', 'https://www.figment.io/', 'Staking infrastructure for institutions.', wordmark('figment.svg')),
    company('copper', 'Copper', 'https://copper.co/', 'Custody, trading, settlement and collateral infrastructure for institutions.', mark('copper.svg')),
    company('plume', 'Plume', 'https://www.plume.org/', 'A blockchain for bringing institutional assets onchain.', mark('plume.png')),
    // eigenlayer.xyz now redirects to eigencloud.xyz (the company's current brand).
    company('eigenlayer', 'EigenLayer', 'https://www.eigenlayer.xyz/', "A restaking protocol that extends Ethereum's security to other services.", mark('eigenlayer.png')),
    company('wormhole', 'Wormhole', 'https://wormhole.com/', 'Open-source infrastructure for moving tokens, data and assets between blockchains.', mark('wormhole.png')),
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
