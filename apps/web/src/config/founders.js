import { THEMES } from './themes.js';
import { getContactEmail } from './contact.js';

// What founders can expect from VaultAlpha beyond capital. Owner-confirmed
// (Step 3, 2026-10-06); see SITE_CONTENT_DECISIONS.md. Recruiting,
// go-to-market and follow-on fundraising support were not confirmed; do not
// add categories without owner confirmation.
export const FOUNDER_SUPPORT = [
    {
        id: 'capital',
        title: 'Capital',
        desc: 'Investment in companies that fit our themes and pass our review.',
    },
    {
        id: 'introductions',
        title: 'Introductions',
        desc: 'Introductions to institutions, partners and customers across our international network.',
    },
    {
        id: 'partnerships',
        title: 'Strategic partnerships',
        desc: 'Connections with exchanges, payment providers and asset issuers relevant to the business.',
    },
    {
        id: 'liquidity',
        title: 'Liquidity support',
        desc: 'Introductions to market makers and exchanges when a token or asset comes to market.',
    },
    {
        id: 'token-design',
        title: 'Token design',
        desc: 'Input on token design and token economics where a token is part of the model.',
    },
];

// Founder application form.
//
// Submissions are POSTed as JSON to VITE_FOUNDER_APPLICATION_ENDPOINT (e.g. a
// form service or your own API). Set it in apps/web/.env:
//   VITE_FOUNDER_APPLICATION_ENDPOINT=https://...
// Without an endpoint, the form opens a pre-filled email to the founders
// inbox instead, so an application is never silently lost.
//
// Decks are collected as links: file uploads need server-side storage and
// malware scanning, which this static site does not have.
//
// Client-side anti-spam (honeypot, minimum fill time, cooldown) only deters
// simple bots. The receiving endpoint should apply its own spam filtering
// and rate limiting.
export const APPLICATION_ENDPOINT = import.meta.env?.VITE_FOUNDER_APPLICATION_ENDPOINT || '';
export const APPLICATION_FALLBACK_EMAIL = getContactEmail('founders');

export const APPLICATION_SECTOR_OPTIONS = [...THEMES.map((t) => t.title), 'Other'];
export const APPLICATION_STAGE_OPTIONS = ['Pre-seed', 'Seed', 'Series A', 'Token round', 'Series B or later'];

export const APPLICATION_LIMITS = {
    descriptionMin: 50,
    descriptionMax: 1000,
    notesMax: 800,
    minFillSeconds: 4,
    cooldownSeconds: 60,
};
