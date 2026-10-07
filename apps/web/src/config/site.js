import { SECTOR_SUMMARY } from './themes.js';
import { getPublishedArticles } from '../data/research.js';

// Research is linked from navigation only once an article is published.
const HAS_RESEARCH = getPublishedArticles().length > 0;

export const BRAND = 'VaultAlpha Fund';
export const DOMAIN = 'vaultalpha.fund';

// Owner-confirmed (Step 1, 2026-10-06). See SITE_CONTENT_DECISIONS.md.
export const LEGAL_NAME = 'VaultAlpha Fund';
export const FIRM_DESCRIPTOR = 'Digital-asset and technology investment firm';

export const NAV_LINKS = [
    { label: 'About', to: '/about' },
    { label: 'Strategy', to: '/strategy' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Team', to: '/team' },
    HAS_RESEARCH && { label: 'Research', to: '/research' },
    { label: 'Founders', to: '/founders' },
].filter(Boolean);

export const NAV_CTA = { label: 'Contact', to: '/contact' };

export const APPLY_LINK = { label: 'Apply', longLabel: 'Submit Your Company', to: '/founders' };

export const FOOTER_DESCRIPTION =
    `A ${FIRM_DESCRIPTOR.toLowerCase()} backing founders in ${SECTOR_SUMMARY}.`;

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
    HAS_RESEARCH && {
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
].filter(Boolean);

// Owner-confirmed footer channels (2026-10-07). A link is shown only when `url`
// is set AND `verified` is true. `profile: true` marks the firm's own social
// profiles, which also go into structured data (sameAs); messaging contacts do not.
export const SOCIAL_LINKS = [
    { id: 'x', label: 'X', handle: '@vaultalpha_fund', url: 'https://x.com/vaultalpha_fund', verified: true, profile: true },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/vaultalpha-fund/', verified: true, profile: true },
    { id: 'telegram', label: 'Telegram', handle: '@Yuli_Hello', url: 'https://t.me/Yuli_Hello', verified: true, profile: false },
    { id: 'whatsapp', label: 'WhatsApp', handle: '+1 249 536 1789', url: 'https://wa.me/12495361789', verified: true, profile: false },
];

export const getVerifiedSocialLinks = () => SOCIAL_LINKS.filter((s) => s.verified && s.url);
export const getSocialProfileUrls = () => getVerifiedSocialLinks().filter((s) => s.profile).map((s) => s.url);
