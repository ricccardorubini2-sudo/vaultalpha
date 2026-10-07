import { THEMES } from './themes.js';
import { getPublicLocations, formatList } from '../data/locations.js';

// Single source of truth for VaultAlpha's investment parameters.
//
// A field is shown publicly only when `confirmed: true` AND it has a value.
// `value` may be a string, an array of strings, or null.
// `detail` is optional supporting text.
//
// Never fill a field with an estimate. Leave it null until confirmed, and only
// set `confirmed: true` once the partners have approved the wording.
//
// Owner-confirmed (Step 2, 2026-10-06). See SITE_CONTENT_DECISIONS.md.

const locationCities = getPublicLocations().map((l) => l.city);

export const INVESTMENT_PARAMETERS = [
    {
        id: 'stage',
        label: 'Investment stage',
        value: ['Pre-seed', 'Seed', 'Series A', 'Token rounds'],
        detail: null,
        confirmed: true,
    },
    {
        id: 'checkSize',
        label: 'Initial check size',
        // The owner chose not to publish a minimum or a typical range.
        value: 'Sized to each round',
        detail: 'No fixed minimum.',
        confirmed: true,
    },
    {
        id: 'geography',
        label: 'Geography',
        value: 'Global',
        detail: locationCities.length ? `Offices in ${formatList(locationCities)}.` : null,
        confirmed: true,
    },
    {
        id: 'instruments',
        label: 'Investment instruments',
        value: 'Hybrid equity and token structures',
        detail: null,
        confirmed: true,
    },
    {
        id: 'leadFollow',
        label: 'Lead / follow',
        value: 'Lead and co-invest',
        detail: 'Depending on the round.',
        confirmed: true,
    },
    {
        id: 'themes',
        label: 'Primary themes',
        value: THEMES.map((t) => t.title),
        detail: null,
        confirmed: true,
    },
];

// Themes are presented separately on the Strategy page.
export const STRATEGY_PARAMETER_FIELDS = ['stage', 'checkSize', 'geography', 'instruments', 'leadFollow'];

// TODO: Confirm disclaimer wording with legal before publication.
export const INVESTMENT_PARAMETERS_NOTE =
    'Parameters are indicative and may vary by opportunity.';

export const hasParameterValue = (v) =>
    v != null && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== '');

// Confirmed, populated parameters, optionally limited to `fields` (in that order).
export const getPublicParameters = (fields) => {
    const source = fields
        ? fields.map((id) => INVESTMENT_PARAMETERS.find((p) => p.id === id)).filter(Boolean)
        : INVESTMENT_PARAMETERS;
    return source.filter((p) => p.confirmed === true && hasParameterValue(p.value));
};
