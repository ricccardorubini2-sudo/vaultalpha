// Single source of truth for VaultAlpha's physical locations.
//
// - `locationType` must be one of LOCATION_TYPES, or null while unconfirmed.
//   Null and 'Other' are not shown as a label, so an address is never
//   presented as an "office" unless its type says so.
// - `address` and `description` are null unless confirmed.
// - A location appears on the public site only when `verified: true` (its
//   existence, city, and address are confirmed) and `active: true`.
//   `active: false` withdraws a verified location without losing its data.
// - `coordinates` only positions the pin on the network map.
//
// TODO: Verify each location's status and type, then set `verified: true`.

export const LOCATION_TYPES = [
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
        // Carried over from the original site; unverified.
        address: '1 Finsbury Avenue',
        locationType: null,
        description: null,
        verified: false,
        active: true,
        coordinates: { lat: 51.51, lon: -0.09 },
    },
    {
        id: 'new-york',
        city: 'New York',
        country: 'United States',
        // Carried over from the original site; unverified.
        address: '200 Park Avenue',
        locationType: null,
        description: null,
        verified: false,
        active: true,
        coordinates: { lat: 40.75, lon: -73.98 },
    },
    {
        id: 'singapore',
        city: 'Singapore',
        country: 'Singapore',
        // Carried over from the original site; unverified.
        address: 'Marina Bay Financial Centre',
        locationType: null,
        description: null,
        verified: false,
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
