// Route table shared by the router (App.jsx) and the build (vite-plugin-seo.js
// adds a <link rel="modulepreload"> for each route's chunk to its prerendered
// HTML, so lazy pages download in parallel with the main bundle).
//
// `module` must be the page's path relative to apps/web, matching the key Vite
// writes to the build manifest.

const pages = {
    about: { module: 'src/pages/AboutPage.jsx', load: () => import('./pages/AboutPage.jsx') },
    strategy: { module: 'src/pages/StrategyPage.jsx', load: () => import('./pages/StrategyPage.jsx') },
    portfolio: { module: 'src/pages/PortfolioPage.jsx', load: () => import('./pages/PortfolioPage.jsx') },
    portfolioCompany: { module: 'src/pages/PortfolioCompanyPage.jsx', load: () => import('./pages/PortfolioCompanyPage.jsx') },
    team: { module: 'src/pages/TeamPage.jsx', load: () => import('./pages/TeamPage.jsx') },
    teamMember: { module: 'src/pages/TeamMemberPage.jsx', load: () => import('./pages/TeamMemberPage.jsx') },
    research: { module: 'src/pages/ResearchPage.jsx', load: () => import('./pages/ResearchPage.jsx') },
    researchArticle: { module: 'src/pages/ResearchArticlePage.jsx', load: () => import('./pages/ResearchArticlePage.jsx') },
    founders: { module: 'src/pages/FoundersPage.jsx', load: () => import('./pages/FoundersPage.jsx') },
    contact: { module: 'src/pages/ContactPage.jsx', load: () => import('./pages/ContactPage.jsx') },
    legal: { module: 'src/pages/LegalPage.jsx', load: () => import('./pages/LegalPage.jsx') },
    notFound: { module: 'src/pages/NotFoundPage.jsx', load: () => import('./pages/NotFoundPage.jsx') },
};

// The homepage is bundled with the app shell, so it has no entry here.
export const LAZY_ROUTES = [
    { path: '/about', page: 'about' },
    { path: '/strategy', page: 'strategy' },
    { path: '/portfolio', page: 'portfolio' },
    { path: '/portfolio/:slug', page: 'portfolioCompany' },
    { path: '/team', page: 'team' },
    { path: '/team/:slug', page: 'teamMember' },
    { path: '/research', page: 'research' },
    { path: '/research/:slug', page: 'researchArticle' },
    { path: '/founders', page: 'founders' },
    { path: '/contact', page: 'contact' },
    { path: '/privacy', page: 'legal', props: { slug: 'privacy' } },
    { path: '/terms', page: 'legal', props: { slug: 'terms' } },
    { path: '/disclosures', page: 'legal', props: { slug: 'disclosures' } },
    { path: '/cookies', page: 'legal', props: { slug: 'cookies' } },
];

export const NOT_FOUND_PAGE = 'notFound';

export const getPage = (id) => pages[id];

const matches = (pattern, pathname) => {
    const a = pattern.split('/');
    const b = pathname.replace(/\/+$/, '').split('/');
    return a.length === b.length && a.every((seg, i) => seg.startsWith(':') ? Boolean(b[i]) : seg === b[i]);
};

export const findRoute = (pathname) => LAZY_ROUTES.find((r) => matches(r.path, pathname)) ?? null;

// Starts downloading a route's code before navigation (on hover, focus or touch).
export function prefetchPath(pathname) {
    const route = findRoute(pathname);
    if (route) pages[route.page].load().catch(() => {});
}
