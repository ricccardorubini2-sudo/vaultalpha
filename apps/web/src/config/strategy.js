// Copy for the Strategy page. Evaluation criteria and market thesis —
// not claims about fund performance. Do not add AUM, returns or deal
// counts here. Market observations below are industry structure, not
// VaultAlpha results.

import { CORE_THEME_SUMMARY } from './themes.js';

export const STRATEGY_INTRO =
    `Our core focus is ${CORE_THEME_SUMMARY}: the rails that move value between institutions, platforms and people. Blockchain infrastructure, tokenized assets and trading venues are adjacent — they matter because they sit around the digital dollar.`;

export const MARKET_THESIS = {
    label: 'Why Payments & Stablecoins',
    title: 'Digital dollars are becoming market infrastructure.',
    lead: 'Most digital-asset activity still looks like a market for speculation. The quieter, more durable shift is happening in settlement: dollars that move on public networks, twenty-four hours a day, with finality measured in minutes rather than correspondent-banking days.',
    paragraphs: [
        'For a decade the public conversation around crypto was dominated by price. That obscured a simpler fact. The product that institutions, platforms and emerging-market users actually keep using is the stablecoin: a digital dollar that can be issued, transferred and redeemed on open rails. Once a unit of account is cheap to move, everything else — trading, lending, payroll, treasury, onchain funds — organises around it.',
        'Traditional cross-border payments remain slow, expensive and opaque. Correspondent chains, weekend cut-offs and trapped liquidity are still the default for much of the world. Stablecoin rails compress that stack. They do not replace banking so much as they reroute the last mile of value transfer onto software. That is why payment companies, card networks, exchanges and fintechs are building issuance, custody and on/off ramps rather than treating digital assets as a side bet.',
        'Regulation is catching up to that reality. As licensing, reserve disclosure and redemption standards tighten, the winners will not be the loudest brands. They will be the firms that can issue, move and settle digital dollars inside the rules of the markets they serve. That is a payments problem as much as a protocol problem: compliance, liquidity, treasury, merchant acceptance and institutional distribution.',
        'We invest at that intersection. Core capital goes to companies building stablecoin issuance, payment and settlement infrastructure, and the liquidity that makes those rails usable. Blockchain, tokenization and trading venues matter because they sit around the dollar: custody and base layers that secure it, tokenized assets that settle in it, and markets that price it. They are branches of the same tree, not four equal themes.',
    ],
    observations: [
        {
            title: 'Unit of account first',
            desc: 'A market needs a dollar it can hold overnight. Speculation is cyclical; settlement demand is structural.',
        },
        {
            title: 'Software replaces correspondent chains',
            desc: 'When transfer is an API call, weekends, nostro accounts and multi-day FX legs stop being destiny.',
        },
        {
            title: 'Distribution is the scarce asset',
            desc: 'Issuance is necessary. The harder work is getting digital dollars into treasuries, wallets, merchants and banks.',
        },
        {
            title: 'Adjacent markets follow the dollar',
            desc: 'Tokenized credit, onchain funds and exchange liquidity scale fastest where settlement is already cheap and trusted.',
        },
    ],
};

export const THEMES_INTRO =
    'Payments and stablecoins are the centre of the book. The other three themes are how that centre reaches the rest of the stack.';

export const BRANCH_THEMES_INTRO =
    'We look at these markets when they strengthen the payments thesis: the rails, the assets that settle on them and the venues that provide liquidity.';

// `qualifier` marks criteria that apply only to some companies.
export const INVESTMENT_CRITERIA = [
    {
        id: 'team',
        title: 'Team',
        desc: 'Founders with deep domain expertise, clear ownership of the problem and the ability to attract strong engineers.',
    },
    {
        id: 'technology',
        title: 'Technology',
        desc: 'Sound architecture and engineering decisions that hold up under scrutiny.',
    },
    {
        id: 'market-structure',
        title: 'Market structure',
        desc: 'A clear view of who the buyers are, how value moves through the market and where incumbents are exposed.',
    },
    {
        id: 'distribution',
        title: 'Distribution',
        desc: 'A credible path to customers, whether through direct sales, partnerships, or developer adoption.',
    },
    {
        id: 'defensibility',
        title: 'Defensibility',
        desc: 'Advantages that strengthen over time, such as network effects, proprietary data, integration depth, or switching costs.',
    },
    {
        id: 'token-economics',
        title: 'Token economics',
        qualifier: 'Where relevant',
        desc: 'Where a token is part of the design: a clear functional role, sustainable incentives and alignment between users, builders and holders.',
    },
    {
        id: 'security',
        title: 'Security',
        desc: 'Security treated as a design requirement, with considered practices for key management, audits and incident response.',
    },
    {
        id: 'regulatory',
        title: 'Regulatory viability',
        desc: 'A business model that can operate within the regulatory frameworks of its target markets — especially where money movement is licensed activity.',
    },
];
