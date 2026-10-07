// Owner-confirmed sectors (Step 2, 2026-10-06). Core vs branch: owner,
// 2026-10-07. See SITE_CONTENT_DECISIONS.md.
export const THEMES = [
    {
        id: 'payments',
        n: '01',
        icon: '/focus/usdc.svg',
        title: 'Payments & Stablecoins',
        role: 'core',
        desc: 'Compliant stablecoins and the payment, settlement and liquidity rails that move value between institutions and the open internet.',
        areas: ['Payment infrastructure', 'Stablecoins', 'Settlement', 'Liquidity infrastructure'],
    },
    {
        id: 'digital-assets',
        n: '02',
        icon: '/focus/blockchain.svg',
        title: 'Digital Assets & Blockchain',
        role: 'branch',
        desc: 'Protocols, base-layer infrastructure and institutional-grade custody — the stack that payments and settlement run on.',
        areas: ['Protocols', 'Blockchain infrastructure', 'Custody', 'Digital assets'],
    },
    {
        id: 'rwa',
        n: '03',
        icon: '/focus/rwa.svg',
        title: 'Real-World Assets',
        role: 'branch',
        desc: 'Issuance, servicing and distribution of tokenized assets. The same rails that move dollars onchain will move credit, funds and commercial paper.',
        areas: ['Tokenization', 'Asset issuance', 'Asset servicing', 'Distribution'],
    },
    {
        id: 'exchanges',
        n: '04',
        icon: '/focus/finance.svg',
        title: 'Exchanges & Trading Infrastructure',
        role: 'branch',
        desc: 'Venues, brokerage and market infrastructure that provide liquidity and price discovery around digital dollars and the assets they settle.',
        areas: ['Exchanges', 'Brokerage', 'Market making', 'Trading infrastructure'],
    },
];

export const CORE_THEME = THEMES.find((t) => t.role === 'core') ?? THEMES[0];
export const BRANCH_THEMES = THEMES.filter((t) => t.role === 'branch');

export const SECTOR_SUMMARY =
    'payments and stablecoins, with related work in blockchain infrastructure, tokenized real-world assets and trading';

export const CORE_THEME_SUMMARY = 'payments and stablecoins';
