// Investment themes — two major focuses. Owner direction 2026-10-14.
// See SITE_CONTENT_DECISIONS.md. Do not invent portfolio companies for a focus.

export const THEMES_PAGE_INTRO =
    'We invest in the infrastructure, financial system and real-world businesses that drive the next phase of digital asset adoption.';

export const FOCUS_AREAS = [
    {
        id: 'infrastructure',
        n: '01',
        title: 'Digital Asset Infrastructure & Financial Markets',
        summary:
            'Investing in the core infrastructure and financial ecosystem that powers the digital asset economy.',
        badge: 'Core Focus',
        expandLabel: 'Core Focus',
        collapseLabel: 'Core Focus',
        subAreas: [
            {
                id: 'stablecoin-payments',
                title: 'Stablecoin & Payments',
                desc: 'Infrastructure for global stablecoin issuance, settlement and payment rails.',
                icon: 'coins',
            },
            {
                id: 'blockchain',
                title: 'Blockchain Infrastructure',
                desc: 'Scalable, secure infrastructure for protocols, custody and the base layers digital finance runs on.',
                icon: 'blocks',
            },
            {
                id: 'exchanges',
                title: 'Exchanges & Trading',
                desc: 'Trading venues, liquidity and market infrastructure around digital assets.',
                icon: 'candlestick',
            },
            {
                id: 'rwa',
                title: 'Real-World Assets (RWA)',
                desc: 'Tokenization platforms and RWA infrastructure connecting traditional assets with blockchain.',
                icon: 'landmark',
            },
        ],
        // Confirmed portfolio companies (owner, Step 5). Shown as selected entities for this focus.
        entitySlugs: [
            'bvnk',
            'zerohash',
            'fireblocks',
            'anchorage-digital',
            'layerzero',
            'privy',
            'turnkey',
            'copper',
            'figment',
            'eigenlayer',
            'wormhole',
            'centrifuge',
            'plume',
            'maple-finance',
            'morpho',
        ],
    },
    {
        id: 'commerce',
        n: '02',
        title: 'Crypto-Native Commerce & Services',
        summary:
            'Investing in real-world businesses that accept cryptocurrency and bring digital assets into everyday life.',
        badge: 'New',
        expandLabel: 'Expand to Everyday Life',
        collapseLabel: 'Everyday Life',
        purpose:
            'To grow crypto-native commerce — businesses where digital assets are used in everyday services — and to help capable operators scale.',
        approach: [
            {
                title: 'How we invest',
                desc: 'We find entities that are willing to grow and that we can invest alongside as they expand.',
            },
            {
                title: 'Franchise and build',
                desc: 'We also franchise well-operating entities and invest in building branches in Central Europe.',
            },
        ],
        subAreas: [
            {
                id: 'casino',
                title: 'Casino',
                desc: 'Crypto-native gaming and casino operators bringing digital-asset payments into entertainment venues.',
                icon: 'dices',
            },
            {
                id: 'luxury',
                title: 'Luxury',
                desc: 'Luxury retail and services that accept cryptocurrency and serve high-value customers.',
                icon: 'gem',
            },
            {
                id: 'cars',
                title: 'Cars',
                desc: 'Automotive sales and services where digital-asset settlement supports real-world transactions.',
                icon: 'car',
            },
            {
                id: 'entertainment',
                title: 'Entertainment',
                desc: 'Entertainment and leisure businesses integrating cryptocurrency into the customer experience.',
                icon: 'clapperboard',
            },
        ],
        // No confirmed commerce portfolio companies yet — marquee hidden until owner adds slugs or names.
        entitySlugs: [],
    },
];

// Flat list of professional-crypto sub-areas (focus 01). Kept for parameters and legacy references.
export const THEMES = FOCUS_AREAS[0].subAreas.map((area, i) => ({
    ...area,
    n: String(i + 1).padStart(2, '0'),
    role: area.id === 'stablecoin-payments' ? 'core' : 'branch',
    areas: [],
}));

export const CORE_THEME = THEMES.find((t) => t.role === 'core') ?? THEMES[0];
export const BRANCH_THEMES = THEMES.filter((t) => t.role === 'branch');

export const SECTOR_SUMMARY =
    'digital-asset infrastructure — payments, blockchain, trading and tokenized assets — and crypto-native commerce and services';

export const CORE_THEME_SUMMARY = 'payments and stablecoins';
