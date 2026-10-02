// Single source of truth for public contact details.
//
// Per contact path:
// - `email`: leave empty until an address is confirmed. Empty paths fall back
//   to the general inbox once that is set; otherwise a neutral label is shown.
// - `phone`: leave empty. Only add a real, confirmed number; it is shown
//   (with a tel: link) only when present.
// - `subject`: pre-filled subject line for mailto links.
// - `note`: optional one-line expectation (only statements already made on the site).
// - `action`: optional primary route, e.g. the founder application.

export const CONTACT_CATEGORIES = [
    {
        id: 'founders',
        label: 'Founders',
        description: 'Pitches and founder applications',
        email: 'founders@vaultalpha.fund',
        phone: '',
        subject: 'Founder enquiry',
        note: 'We review every application and respond within five business days.',
        action: { label: 'Submit Your Company', to: '/founders#apply' },
    },
    {
        id: 'investors',
        label: 'Investors / LPs',
        description: 'Fund and limited partner relations',
        email: '',
        phone: '',
        subject: 'Investor enquiry',
        note: null,
        action: null,
    },
    {
        id: 'media',
        label: 'Media',
        description: 'Press, interviews and speaking requests',
        email: '',
        phone: '',
        subject: 'Media enquiry',
        note: null,
        action: null,
    },
    {
        id: 'general',
        label: 'General inquiries',
        description: 'Everything else',
        email: '',
        phone: '',
        subject: 'General enquiry',
        note: null,
        action: null,
    },
];

export const CONTACT_EMAIL_PENDING_LABEL = 'Address coming soon';

const findCategory = (id) => CONTACT_CATEGORIES.find((c) => c.id === id);

export const getContactEmail = (id) => findCategory(id)?.email?.trim() || '';

// A path's own address, else the general inbox (never another team's inbox).
export const getContactEmailWithFallback = (id) => getContactEmail(id) || (id !== 'general' ? getContactEmail('general') : '');

export const getContactPhone = (id) => findCategory(id)?.phone?.trim() || '';

export const buildMailto = (email, subject) =>
    `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

// Used in legal pages; prefers the general inbox once it is configured.
export const PRIMARY_CONTACT_EMAIL = getContactEmail('general') || getContactEmail('founders');
