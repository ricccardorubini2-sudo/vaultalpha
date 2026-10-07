import { PORTFOLIO } from './portfolio.js';

// Single source of truth for testimonials.
//
// Only entries with `verified: true` AND `active: true` render publicly.
// Set `verified: true` only after written consent from the person and
// confirmation that the quote, name, role, and company are accurate.
// Use null for anything not confirmed; never guess LinkedIn URLs or photos.
//
// `photo`: path under /public (e.g. '/testimonials/jane-doe.jpg') or null.
// `companyUrl`: use websiteFor('<portfolio slug>') for portfolio companies.

const websiteFor = (slug) => PORTFOLIO.find((c) => c.slug === slug)?.companyWebsite ?? null;

export const TESTIMONIALS = [];

export const getPublicTestimonials = () => TESTIMONIALS.filter((t) => t.verified && t.active);
