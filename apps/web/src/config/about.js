import { BRAND } from './site.js';

// Copy for the About page and the homepage thesis. Positioning only: never add
// founding dates, regulatory status, AUM, returns, fund size, or office counts
// here unless they have been confirmed for publication.

export const COMPANY_OVERVIEW = [
    `${BRAND} is a global technology investment firm backing founders in digital assets and blockchain, payments and stablecoins, artificial intelligence and security infrastructure.`,
    'We invest in companies building core infrastructure for digital finance and technology.',
];

export const PHILOSOPHY = {
    title: 'A long-term partner to technical founders.',
    // Homepage summary.
    thesis: `${BRAND} invests in companies building core infrastructure for digital finance and technology. We pair technical judgment with an international network and work with founders from early conviction through later stages of growth.`,
    // About page.
    paragraphs: [
        'We pair technical judgment with an international network and work with founders from early conviction through later stages of growth.',
        'Our team includes engineers, operators and researchers who expect open, verifiable systems to play a growing role in finance and infrastructure.',
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
        id: 'technical',
        title: 'Technical understanding',
        desc: 'Our engineers review architecture, security and protocol design, and that review informs every investment decision.',
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

export const FOUNDER_PARTNERSHIP_INTRO =
    'Founders choose us because we move decisively, conduct rigorous diligence and remain committed for the long term.';
