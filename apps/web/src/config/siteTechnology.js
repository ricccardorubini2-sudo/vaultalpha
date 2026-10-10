// Inventory of the technologies this website actually uses, as the single
// source for the Privacy and Cookies pages. Update this file whenever a
// cookie, storage key, script, or third-party service is added or removed,
// and re-check both pages.
//
// Current state (audited): no cookies are set, and no analytics, advertising,
// tracking pixels, session recording, or social media embeds are loaded.

import { APPLICATION_ENDPOINT } from './founders.js';

export const COOKIES = [];

export const BROWSER_STORAGE = [
    {
        name: 'va:human-check',
        type: 'Local storage',
        purpose: 'Records that you completed the "verify you are human" puzzle, so it is not shown again on every visit.',
        duration: '30 days, or until you clear your browser storage.',
        essential: true,
    },
    {
        name: 'va:last-application',
        type: 'Local storage',
        purpose: 'Records when an application was last submitted from this browser, to prevent repeated automated submissions.',
        duration: 'Until you clear your browser storage; only checked for 60 seconds after a submission.',
        essential: true,
    },
];

// Keys written by earlier versions of the site; removed by "Clear stored data".
export const LEGACY_STORAGE_KEYS = ['va-cookie-prefs', 'va-cookie-consent'];

// Fonts are self-hosted from /fonts and involve no third party.
export const THIRD_PARTY_SERVICES = [
    {
        name: 'Image hosting',
        provider: 'Hostinger',
        purpose: 'Serves some research cover images from images.hostinger.com.',
        data: 'Your browser requests images from that server, which receives your IP address and browser details.',
    },
    ...(APPLICATION_ENDPOINT
        ? [{
            name: 'Application processing',
            // TODO: Name the form-processing provider once chosen.
            provider: 'Our form-processing provider',
            purpose: 'Receives founder applications submitted through this site.',
            data: 'The details you enter in the application form.',
        }]
        : []),
];

// TODO: Name the hosting provider once confirmed.
export const HOSTING_PROVIDER = 'our hosting provider';
