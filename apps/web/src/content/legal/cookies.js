// LEGAL REVIEW REQUIRED BEFORE PUBLICATION
//
// Generated from config/siteTechnology.js so it always matches what the site
// actually stores. It has NOT been reviewed by lawyers.
// If non-essential cookies or analytics are ever added, a consent mechanism
// must be added BEFORE they load, and this page updated.

import { DOMAIN } from '../../config/site.js';
import { COOKIES, BROWSER_STORAGE, THIRD_PARTY_SERVICES } from '../../config/siteTechnology.js';

const storageRows = [...COOKIES, ...BROWSER_STORAGE].map((i) => [i.name, i.type, i.purpose, i.duration]);

export default {
    slug: 'cookies',
    title: 'Cookies',
    subtitle: `What ${DOMAIN} stores on your device and why.`,
    status: 'draft',
    lastUpdated: null,
    showClearStorage: true,
    sections: [
        {
            id: 'summary',
            heading: 'Summary',
            blocks: [
                COOKIES.length === 0
                    ? 'This website does not currently set any cookies, and it does not use analytics, advertising, or tracking technologies. Because nothing optional is stored, we do not show a cookie banner.'
                    : 'This website sets the cookies listed below.',
            ],
        },
        {
            id: 'storage',
            heading: COOKIES.length ? 'Cookies and browser storage' : 'Browser storage',
            blocks: storageRows.length
                ? [
                    'The site uses browser storage, which works like a cookie but is never sent to our servers. Everything listed here is strictly necessary for the feature it supports.',
                    { type: 'table', columns: ['Name', 'Type', 'Purpose', 'Duration'], rows: storageRows },
                ]
                : ['The site does not store anything in your browser.'],
        },
        {
            id: 'third-party-requests',
            heading: 'Third-party requests',
            blocks: [
                `Loading the site also fetches resources from ${THIRD_PARTY_SERVICES.map((s) => s.provider).join(' and ')}. These requests do not set cookies from this site, but those providers receive your IP address and browser details. See our Privacy Policy for more information.`,
            ],
        },
        {
            id: 'control',
            heading: 'Your choices',
            blocks: [
                'You can clear the items stored by this site using the button below, or through your browser settings. Blocking storage will not prevent you from browsing the site.',
            ],
        },
        {
            id: 'changes',
            heading: 'Changes',
            blocks: ['If we introduce optional cookies or similar technologies, we will update this page and ask for your consent before using them.'],
        },
    ],
};
