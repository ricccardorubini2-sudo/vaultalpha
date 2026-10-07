// Single source of truth for VaultAlpha's physical locations.
//
// - `locationType` must be one of LOCATION_TYPES, or null while unconfirmed.
//   Null and 'Other' are not shown as a label, so an address is never
//   presented as an "office" unless its type says so.
// - `address` and `description` are null unless confirmed.
// - A location appears on the public site only when `verified: true` (its
//   existence and city are confirmed) and `active: true`.
//   `active: false` withdraws a verified location without losing its data.
// - `coordinates` only positions the pin on the network map.
//
// Owner-confirmed (Step 7, 2026-10-06): main office in London, branches in
// New York and Singapore, each with investment team presence. The owner asked
// not to publish street addresses, so `address` stays null.

export const LOCATION_TYPES = [
    'Main Office',
    'Branch Office',
    'Registered Office',
    'Investment Team',
    'Representative Office',
    'Correspondence Address',
    'Partner Network',
    'Other',
];

export const LOCATIONS = [
    {
        id: 'london',
        city: 'London',
        country: 'United Kingdom',
        address: null,
        locationType: 'Main Office',
        description: 'Investment team',
        verified: true,
        active: true,
        coordinates: { lat: 51.51, lon: -0.09 },
    },
    {
        id: 'new-york',
        city: 'New York',
        country: 'United States',
        address: null,
        locationType: 'Branch Office',
        description: 'Investment team',
        verified: true,
        active: true,
        coordinates: { lat: 40.75, lon: -73.98 },
    },
    {
        id: 'singapore',
        city: 'Singapore',
        country: 'Singapore',
        address: null,
        locationType: 'Branch Office',
        description: 'Investment team',
        verified: true,
        active: true,
        coordinates: { lat: 1.28, lon: 103.85 },
    },
];

export const getPublicLocations = () => LOCATIONS.filter((l) => l.verified === true && l.active);

// Label to display for a location's type, or null if it should not be shown.
export const getLocationTypeLabel = (location) =>
    location.locationType && location.locationType !== 'Other' && LOCATION_TYPES.includes(location.locationType)
        ? location.locationType
        : null;

export const formatList = (items) =>
    items.length < 2
        ? items.join('')
        : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
