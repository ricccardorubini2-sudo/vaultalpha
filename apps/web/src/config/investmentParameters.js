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

const locationCities = getPublicLocations().map((l) => l.city);

export const INVESTMENT_PARAMETERS = [
    {
        id: 'stage',
        label: 'Investment stage',
        // TODO: Confirm actual VaultAlpha investment stage(s) before publication.
        // The portfolio currently lists companies from Seed to Series C, but
        // that is not a stated mandate.
        value: null,
        detail: null,
        confirmed: false,
    },
    {
        id: 'checkSize',
        label: 'Initial check size',
        // TODO: Confirm actual VaultAlpha check-size range before publication.
        value: null,
        detail: null,
        confirmed: false,
    },
    {
        id: 'geography',
        label: 'Geography',
        // TODO: Confirm geographic mandate before publication. "Global" reflects
        // existing site copy ("Global technology investment firm"), not a
        // confirmed mandate.
        value: 'Global',
        detail: locationCities.length ? `Locations in ${formatList(locationCities)}.` : null,
        confirmed: false,
    },
    {
        id: 'instruments',
        label: 'Investment instruments',
        // TODO: Confirm actual VaultAlpha investment instruments before publication.
        value: null,
        detail: null,
        confirmed: false,
    },
    {
        id: 'leadFollow',
        label: 'Lead / follow',
        // TODO: Confirm lead/follow preference before publication.
        value: null,
        detail: null,
        confirmed: false,
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
