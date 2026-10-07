import { BRAND, FIRM_DESCRIPTOR } from './site.js';
import { CORE_THEME_SUMMARY, SECTOR_SUMMARY } from './themes.js';

// Copy for the About page and the homepage thesis. Positioning only: never add
// founding dates, regulatory status, AUM, returns, fund size, or office counts
// here unless they have been confirmed for publication.
//
// Claims that the firm's engineers review every investment were withdrawn by
// the owner (Step 1, 2026-10-06); do not reintroduce them without confirmation.
// Founding story lives in config/history.js (confirmed March 2025).

export const COMPANY_OVERVIEW = [
    `${BRAND} is a ${FIRM_DESCRIPTOR.toLowerCase()} built by angel investors who put their own capital behind a simple idea: that the future of finance will be settled in software, and that the first durable layer of that future is ${CORE_THEME_SUMMARY}.`,
    'We are still close to the beginning. That is not a disclaimer. It is the reason the partnership exists — to grow a larger fund, a deeper network and a lasting role in the infrastructure of digital finance.',
];

export const PHILOSOPHY = {
    title: 'A long-term partner to founders building the rails.',
    // Homepage summary.
    thesis: `${BRAND} invests primarily in ${CORE_THEME_SUMMARY}, from pre-seed through Series A, including token rounds. Adjacent work in blockchain infrastructure, tokenized assets and trading follows from that centre.`,
    // About page.
    paragraphs: [
        'We expect open, verifiable systems to take a growing share of how value is issued, moved and stored. We underwrite that shift with our own judgement first — the same standard we used when the firm was only a team and a chequebook.',
    ],
};

export const MISSION = 'To back the founders building the rails of digital finance — and to grow, with them, a fund and a network equal to that future.';

export const OPERATING_PRINCIPLES = [
    {
        id: 'underwriting',
        title: 'Disciplined underwriting',
        desc: 'Each investment is assessed on its market, team, technology and terms through a structured review before we commit.',
    },
    {
        id: 'partnership',
        title: 'Long-term partnership',
        desc: 'We invest with a multi-year horizon and remain engaged with founding teams as their companies scale.',
    },
    {
        id: 'global',
        title: 'Global perspective',
        desc: 'We work with founders and institutions internationally and make introductions across our network.',
    },
    {
        id: 'capital',
        title: 'Responsible capital allocation',
        desc: 'We started with our own capital. We still weigh every commitment as if it were personal — sustainable models over short-term narratives, risk beside return.',
    },
];

export const WHY_VAULTALPHA = {
    title: 'Own capital. Patient ambition. The rails of what comes next.',
    paragraphs: [
        'VaultAlpha is young on purpose. Angel investors formed a team in 2025 because the opportunity in digital payments would not wait for a fully institutionalised vehicle. We began with what we had: judgement, a network and our own money.',
        'That origin is the culture. Founders meet partners who still write as principals. The diligence is ours. The introductions are ours. The horizon is measured in years, not in the next mark-to-market cycle.',
        `The destination is larger than the starting point: a bigger fund, a wider network of operators and institutions, and a body of companies that make ${SECTOR_SUMMARY} feel like ordinary finance. We are building toward that. We are not pretending we have already arrived.`,
    ],
};

export const FOUNDER_PARTNERSHIP_INTRO =
    'We aim to move decisively and remain committed for the long term.';
