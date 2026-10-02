import { z } from 'zod';
import {
    APPLICATION_ENDPOINT,
    APPLICATION_FALLBACK_EMAIL,
    APPLICATION_LIMITS as L,
    APPLICATION_SECTOR_OPTIONS,
    APPLICATION_STAGE_OPTIONS,
} from '@/config/founders';

const normalizeUrl = (value) => {
    const v = value.trim();
    if (!v) return '';
    return /^https?:\/\//i.test(v) ? v : `https://${v}`;
};

const isHttpUrl = (value) => {
    try {
        const u = new URL(value);
        return (u.protocol === 'https:' || u.protocol === 'http:') && u.hostname.includes('.');
    } catch {
        return false;
    }
};

const optionalUrl = (message, extraCheck) =>
    z.string().max(300, 'This link is too long.')
        .transform(normalizeUrl)
        .refine((v) => v === '' || (isHttpUrl(v) && (!extraCheck || extraCheck(v))), message);

const required = (label, max = 120) =>
    z.string().trim().min(1, `Please enter ${label}.`).max(max, `Please keep this under ${max} characters.`);

export const applicationSchema = z.object({
    founderName: required('your name', 100).refine((v) => v.length >= 2, 'Please enter your full name.'),
    workEmail: z.string().trim().min(1, 'Please enter your work email.').pipe(z.email('Please enter a valid email address.')),
    company: required('your company name'),
    companyWebsite: optionalUrl('Please enter a valid website address, e.g. company.com.'),
    linkedinUrl: optionalUrl('Please enter a LinkedIn profile or company URL.', (v) => /(^|\.)linkedin\.com$/i.test(new URL(v).hostname)),
    sector: z.string().refine((v) => APPLICATION_SECTOR_OPTIONS.includes(v), 'Please choose a sector.'),
    stage: z.string().refine((v) => APPLICATION_STAGE_OPTIONS.includes(v), 'Please choose a stage.'),
    geography: required('where the company is based', 80),
    fundraisingAmount: z.string().trim().max(60, 'Please keep this under 60 characters.'),
    description: z.string().trim()
        .min(L.descriptionMin, `Please write at least ${L.descriptionMin} characters.`)
        .max(L.descriptionMax, `Please keep this under ${L.descriptionMax} characters.`),
    deckUrl: optionalUrl('Please enter a valid link to your deck.'),
    notes: z.string().trim().max(L.notesMax, `Please keep this under ${L.notesMax} characters.`),
    consent: z.literal(true, { error: 'Please confirm you have read the privacy policy.' }),
});

export const APPLICATION_DEFAULTS = {
    founderName: '', workEmail: '', company: '', companyWebsite: '', linkedinUrl: '',
    sector: '', stage: '', geography: '', fundraisingAmount: '', description: '',
    deckUrl: '', notes: '', consent: false,
};

const FIELD_LABELS = [
    ['founderName', 'Founder'],
    ['workEmail', 'Email'],
    ['company', 'Company'],
    ['companyWebsite', 'Website'],
    ['linkedinUrl', 'LinkedIn'],
    ['sector', 'Sector'],
    ['stage', 'Stage'],
    ['geography', 'Based in'],
    ['fundraisingAmount', 'Raising'],
    ['deckUrl', 'Deck'],
];

const COOLDOWN_KEY = 'va:last-application';

export const getCooldownRemaining = () => {
    try {
        const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
        return Math.max(0, Math.ceil((last + L.cooldownSeconds * 1000 - Date.now()) / 1000));
    } catch {
        return 0;
    }
};

const markSubmitted = () => {
    try {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch {
        // Storage unavailable (private mode); the cooldown is best-effort.
    }
};

export const canSubmitApplication = Boolean(APPLICATION_ENDPOINT || APPLICATION_FALLBACK_EMAIL);

const buildMailto = (data) => {
    const lines = FIELD_LABELS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`);
    const body = [...lines, '', 'About the company:', data.description, ...(data.notes ? ['', 'Additional notes:', data.notes] : [])].join('\n');
    const subject = `Founder application: ${data.company}`;
    return `mailto:${APPLICATION_FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Returns { status: 'sent' } when the endpoint accepted the application, or
 * { status: 'email' } when the visitor's email client was opened instead.
 * Throws if the endpoint rejects the request.
 */
export async function submitApplication(data) {
    const { consent, ...fields } = data;
    if (APPLICATION_ENDPOINT) {
        const res = await fetch(APPLICATION_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...fields, privacyConsent: consent, source: 'vaultalpha.fund/founders', submittedAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(`Submission failed (${res.status})`);
        markSubmitted();
        return { status: 'sent' };
    }
    if (APPLICATION_FALLBACK_EMAIL) {
        window.location.href = buildMailto(fields);
        markSubmitted();
        return { status: 'email' };
    }
    throw new Error('No submission channel configured');
}
