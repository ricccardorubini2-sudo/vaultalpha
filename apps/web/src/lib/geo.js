// Approximate country positions for placing dots on the network map only.
// Add an entry here when a portfolio company is listed in a new country.
export const COUNTRY_COORDINATES = {
    'United States': { lat: 39, lon: -98 },
    'United Kingdom': { lat: 54, lon: -2 },
    Singapore: { lat: 1.35, lon: 103.8 },
    Germany: { lat: 51, lon: 10 },
    Switzerland: { lat: 46.8, lon: 8.2 },
    Israel: { lat: 31.5, lon: 34.8 },
    Canada: { lat: 56, lon: -106 },
    'United Arab Emirates': { lat: 24, lon: 54 },
    Estonia: { lat: 58.6, lon: 25 },
};

// Standard geographic regions, used to group portfolio companies for filtering.
// Add an entry here when a portfolio company is listed in a new country.
export const COUNTRY_REGIONS = {
    'United States': 'Americas',
    Canada: 'Americas',
    'United Kingdom': 'Europe',
    Germany: 'Europe',
    Switzerland: 'Europe',
    Estonia: 'Europe',
    Israel: 'Middle East',
    'United Arab Emirates': 'Middle East',
    Singapore: 'Asia-Pacific',
};

export const getRegion = (country) => COUNTRY_REGIONS[country] ?? null;

// Equirectangular projection onto a 2:1 box, as CSS percentages.
export const projectToMap = ({ lat, lon }) => ({
    left: `${((lon + 180) / 360) * 100}%`,
    top: `${((90 - lat) / 180) * 100}%`,
});
