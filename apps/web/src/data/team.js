import { getPortfolioCompany } from './portfolio.js';

// Single source of truth for team members.
//
// Field rules (never fill a field with an estimate or a guess):
// - `photo`: file name in /teams_image, resolved below; null shows initials.
// - `shortBio`: one or two sentences for cards, or null.
// - `longBio`: array of paragraphs for the profile page, or null.
// - `linkedinUrl`: full profile URL, or null.
// - `areasOfExpertise`: array of short labels.
// - `selectedInvestments`: [{ portfolioSlug, verified }]. Shown only when
//   `verified: true` and the slug matches an active portfolio company.
// - `education`: [{ institution, qualification }].
// - `previousCompanies`: [{ name, role }].
// - `active: false` hides a member everywhere on the public site.
//
// Names, roles, and photos are carried over from the existing site.
// TODO: Collect confirmed biographies, LinkedIn URLs, and backgrounds from
// each team member before adding them here.

export const TEAM_GROUPS = [
    { id: 'executive', label: 'Executive Officers' },
    { id: 'senior', label: 'Senior Leadership' },
];

// Build-time responsive variants (vite-imagetools): AVIF and WebP sources with
// a JPEG fallback, cropped to the 3:4 top-anchored frame every team photo is
// shown in. Widths larger than a source allows fall back to the original
// image rather than being upscaled.
const photoModules = import.meta.glob(['../../../../teams_image/*.png', '!**/logo.png'], {
    eager: true,
    query: {
        w: '240;360;480;640;800',
        aspect: '3:4',
        position: 'top',
        format: 'avif;webp;jpg',
        quality: '78',
        as: 'picture',
    },
    import: 'default',
});

// `image` is { sources: { avif, webp }, img: { src, w, h } }. `file` lets the
// SEO build map the photo to its emitted JPEG for social previews.
const photo = (file) => {
    const entry = Object.entries(photoModules).find(([path]) => path.endsWith(`/${file}`));
    return entry ? { file, image: entry[1] } : null;
};

const EMPTY_PROFILE = {
    shortBio: null,
    longBio: null,
    linkedinUrl: null,
    areasOfExpertise: [],
    selectedInvestments: [],
    education: [],
    previousCompanies: [],
};

export const TEAM = [
    { slug: 'vladyslav-blyzniuk', name: 'Vladyslav Blyzniuk', role: 'Founding Partner', group: 'executive', photo: photo('Vladyslav Blyzniuk.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'vadym-nemyrytskyi', name: 'Vadym Nemyrytskyi', role: 'Chief Executive Officer, Partner', group: 'executive', photo: photo('Vadym Nemyrytskyi.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'vadym-yaroshevskyi', name: 'Vadym Yaroshevskyi', role: 'Managing Partner', group: 'executive', photo: photo('Vadym Yaroshevskyi.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'oleksandr-pronoza', name: 'Oleksandr Pronoza', role: 'Chief Investment Officer', group: 'executive', photo: photo('Oleksandr Pronoza.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'yuliia-lohunkova', name: 'Yuliia Lohunkova', role: 'Chief Business Development Officer', group: 'executive', photo: photo('Yuliia Lohunkova.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'vitalina-petrenko', name: 'Vitalina Petrenko', role: 'Investment Partner', group: 'senior', photo: photo('Vitalina Petrenko.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'yuki-tanaka', name: 'Yuki Tanaka', role: 'Head of Research', group: 'senior', photo: photo('Yuki Tanaka.png'), ...EMPTY_PROFILE, active: true },
    { slug: 'yullia-mitchell', name: 'Yullia Mitchell', role: 'Partner, Investor Relations', group: 'senior', photo: photo('Yullia Mitchell.png'), ...EMPTY_PROFILE, active: true },
];

export const getActiveTeam = () => TEAM.filter((m) => m.active);

export const getTeamMember = (slug) => getActiveTeam().find((m) => m.slug === slug);

export const getTeamGroup = (member) => TEAM_GROUPS.find((g) => g.id === member.group) ?? null;

// Verified investments that resolve to an active portfolio company.
export const getVerifiedInvestments = (member) =>
    (member.selectedInvestments ?? [])
        .filter((i) => i?.verified === true)
        .map((i) => getPortfolioCompany(i.portfolioSlug))
        .filter(Boolean);

export const teamPath = (member) => `/team/${member.slug}`;
