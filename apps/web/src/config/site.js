export const BRAND = 'VaultAlpha Fund';
export const DOMAIN = 'vaultalpha.fund';

export const NAV_LINKS = [
    { label: 'About', to: '/about' },
    { label: 'Strategy', to: '/strategy' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Team', to: '/team' },
    { label: 'Research', to: '/research' },
    { label: 'Founders', to: '/founders' },
];

export const NAV_CTA = { label: 'Contact', to: '/contact' };

export const APPLY_LINK = { label: 'Apply', longLabel: 'Submit Your Company', to: '/founders' };

export const FOOTER_DESCRIPTION =
    'A global technology investment firm backing founders in digital assets and blockchain, payments and stablecoins, artificial intelligence and security infrastructure.';

export const FOOTER_COLUMNS = [
    {
        title: 'Company',
        links: [
            { label: 'About', to: '/about' },
            { label: 'Strategy', to: '/strategy' },
            { label: 'Portfolio', to: '/portfolio' },
            { label: 'Team', to: '/team' },
        ],
    },
    {
        title: 'Insights',
        links: [{ label: 'Research', to: '/research' }],
    },
    {
        title: 'Work With Us',
        links: [
            { label: 'Founders', to: '/founders' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
            { label: 'Disclosures', to: '/disclosures' },
            { label: 'Cookies', to: '/cookies' },
        ],
    },
];

// Official firm profiles. A link is shown only when `url` is set AND
// `verified` is true (confirmed as the firm's own account). Never guess URLs.
export const SOCIAL_LINKS = [
    { id: 'linkedin', label: 'LinkedIn', url: '', verified: false },
];

export const getVerifiedSocialLinks = () => SOCIAL_LINKS.filter((s) => s.verified && s.url);
