import { BRAND, FIRM_DESCRIPTOR } from './site.js';
import { SECTOR_SUMMARY } from './themes.js';

// Copy for the About page and the homepage thesis. Positioning only: never add
// founding dates, regulatory status, AUM, returns, fund size, or office counts
// here unless they have been confirmed for publication.
//
// Claims that the firm's engineers review every investment were withdrawn by
// the owner (Step 1, 2026-10-06); do not reintroduce them without confirmation.

export const COMPANY_OVERVIEW = [
    `${BRAND} is a ${FIRM_DESCRIPTOR.toLowerCase()} backing founders in ${SECTOR_SUMMARY}.`,
    'We invest in companies building core infrastructure for digital finance and technology.',
];

export const PHILOSOPHY = {
    title: 'A long-term partner to technical founders.',
    // Homepage summary.
    thesis: `${BRAND} invests in companies building core infrastructure for digital finance and technology, from pre-seed through Series A, including token rounds.`,
    // About page.
    paragraphs: [
        'We expect open, verifiable systems to play a growing role in finance and infrastructure.',
    ],
};

// TODO: Confirm mission wording with the partners before publication.
export const MISSION = 'To back the founders building the systems that issue, move and secure value in the digital economy.';

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
        desc: 'We prioritise sustainable business models over short-term market narratives and weigh risk alongside potential return.',
    },
];

// About page closing argument. Restates commitments already made elsewhere on
// the site (principles, process); add no new claims or figures here.
export const WHY_VAULTALPHA = {
    title: 'Disciplined capital for long-term builders.',
    paragraphs: [
        'Digital assets, payments, tokenized real-world assets and trading infrastructure are complex markets that reward patience and careful underwriting.',
        'Each investment is assessed on its market, team, technology and terms through a structured review before we commit.',
        'We invest with a multi-year horizon, remain engaged as companies scale and make introductions across our international network.',
    ],
};

export const FOUNDER_PARTNERSHIP_INTRO =
    'We aim to move decisively and remain committed for the long term.';
