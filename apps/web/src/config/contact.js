// Single source of truth for public contact details.
//
// Owner-confirmed (2026-10-11, replaces founders@vaultalpha.fund):
// hello@vaultalpha.fund is the only public email. There is no partnerships
// inbox or phone number; do not add them without owner confirmation.
//
// Per contact path:
// - `email`: a confirmed address; a path with no address and no action is not shown.
// - `subject`: pre-filled subject line for mailto links.
// - `note`: optional one-line expectation (only statements the owner has confirmed).
// - `action`: optional primary route shown instead of the email button.

export const APPLICATION_REVIEW_NOTE = 'We review every application.';

export const CONTACT_CATEGORIES = [
    {
        id: 'founders',
        label: 'Founders',
        description: 'Pitches and founder applications',
        email: 'hello@vaultalpha.fund',
        subject: 'Founder enquiry',
        note: APPLICATION_REVIEW_NOTE,
    },
];

const findCategory = (id) => CONTACT_CATEGORIES.find((c) => c.id === id);

export const getContactEmail = (id) => findCategory(id)?.email?.trim() || '';

// Paths a visitor can actually use: an address or an action.
export const getPublicContactCategories = () =>
    CONTACT_CATEGORIES.filter((c) => getContactEmail(c.id) || c.action);

export const buildMailto = (email, subject) =>
    `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

// Used in legal pages.
export const PRIMARY_CONTACT_EMAIL = getContactEmail('founders');
