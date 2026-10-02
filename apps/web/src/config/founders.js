import { THEMES } from './themes.js';
import { getContactEmail } from './contact.js';

// What founders can expect from VaultAlpha. Each entry restates support the
// site already describes (see `basis`); do not add categories without a basis.
export const FOUNDER_SUPPORT = [
    {
        id: 'capital',
        title: 'Capital',
        desc: 'Investment in companies that fit our themes and pass our review.',
        basis: 'Core activity described throughout the site.',
    },
    {
        id: 'strategic',
        title: 'Strategic support',
        desc: 'Ongoing engagement on go-to-market and company building as the business scales.',
        basis: 'Process step "Long-Term Partnership": go-to-market support; principle "Long-term partnership".',
    },
    {
        id: 'technical',
        title: 'Technical diligence',
        desc: 'Our engineers review architecture, security and protocol design as part of every investment decision.',
        basis: 'Process step "Technical Diligence"; principle "Technical understanding".',
    },
    {
        id: 'network',
        title: 'Network access',
        desc: 'Introductions to talent and institutions across our international network.',
        basis: 'Principle "Global perspective".',
    },
    {
        id: 'recruiting',
        title: 'Recruiting support',
        desc: 'Help with hiring as the team grows.',
        basis: 'Process step "Long-Term Partnership": hiring support.',
    },
    {
        id: 'follow-on',
        title: 'Follow-on support',
        desc: 'Support with follow-on financing as the company raises subsequent rounds.',
        basis: 'Process step "Long-Term Partnership": follow-on financing.',
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
export const APPLICATION_STAGE_OPTIONS = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C or later'];

export const APPLICATION_LIMITS = {
    descriptionMin: 50,
    descriptionMax: 1000,
    notesMax: 800,
    minFillSeconds: 4,
    cooldownSeconds: 60,
};
