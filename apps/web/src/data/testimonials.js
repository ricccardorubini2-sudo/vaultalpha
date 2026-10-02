import { PORTFOLIO } from './portfolio.js';

// Single source of truth for testimonials.
//
// Only entries with `verified: true` AND `active: true` render publicly.
// Set `verified: true` only after written consent from the person and
// confirmation that the quote, name, role, and company are accurate.
// Use null for anything not confirmed; never guess LinkedIn URLs or photos.
//
// `photo`: path under /public (e.g. '/testimonials/jane-doe.jpg') or null.

const websiteFor = (slug) => PORTFOLIO.find((c) => c.slug === slug)?.companyWebsite ?? null;

export const TESTIMONIALS = [
    // TODO: Unverified. Carried over from the original site copy; confirm the
    // person, quote, and consent before setting verified: true.
    {
        personName: 'Elena Vasquez',
        role: 'Founder & CEO',
        company: 'Meridian Labs',
        quote: 'They understood our architecture better than most engineers we interviewed. The technical diligence made us a stronger company.',
        photo: null,
        linkedinUrl: null,
        companyUrl: websiteFor('meridian-labs'),
        verified: false,
        active: true,
    },
    // TODO: Unverified. Also conflicts with the portfolio record (quote says
    // Series B; portfolio lists Series A).
    {
        personName: 'David Kim',
        role: 'Co-founder',
        company: 'Halcyon AI',
        quote: 'Disciplined, transparent and genuinely long-term. They were the first call we made for our Series B and the easiest term sheet we signed.',
        photo: null,
        linkedinUrl: null,
        companyUrl: websiteFor('halcyon-ai'),
        verified: false,
        active: true,
    },
    // TODO: Unverified. Carried over from the original site copy.
    {
        personName: 'Sofia Almeida',
        role: 'CEO',
        company: 'Vault Protocol',
        quote: 'The network they opened for us \u2014 talent, institutions, follow-on capital \u2014 was worth as much as the investment itself.',
        photo: null,
        linkedinUrl: null,
        companyUrl: websiteFor('vault-protocol'),
        verified: false,
        active: true,
    },
];

export const getPublicTestimonials = () => TESTIMONIALS.filter((t) => t.verified && t.active);
