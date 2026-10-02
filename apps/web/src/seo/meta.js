// Route metadata for every public URL: titles, descriptions, canonical URLs,
// social images, and structured data. Used both in the browser (RouteSeo) and
// at build time (plugins/vite-plugin-seo.js) to write per-route HTML, the
// sitemap, and robots.txt.
//
// Plain JS with relative imports only (no JSX, no `@/`), so the build plugin
// can load it.
//
// Structured data rule: include ONLY verified facts that are already published
// on the site. Never add AUM, offices/addresses, telephone numbers, founding
// date, fund size, or regulatory status here.

import { BRAND, DOMAIN, FOOTER_DESCRIPTION, getVerifiedSocialLinks } from '../config/site.js';
import { CONTACT_CATEGORIES, getContactEmail } from '../config/contact.js';
import { getActivePortfolio, getPortfolioCompany, portfolioPath, hasValue } from '../data/portfolio.js';
import { getActiveTeam, getTeamMember, teamPath } from '../data/team.js';
import { getPublishedArticles, getArticle, articlePath, getAuthor, getCategory } from '../data/research.js';
import { LEGAL_DOCUMENTS } from '../content/legal/index.js';

// TODO: Confirm the production domain. Override per environment with VITE_SITE_URL.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || `https://${DOMAIN}`).replace(/\/+$/, '');

// TODO: Replace with a dedicated 1200×630 social image once designed.
const DEFAULT_IMAGE = { url: '/logo-mark.png', width: 680, height: 680, alt: `${BRAND} logo` };

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const TITLE_SEPARATOR = ' | ';

export const absoluteUrl = (path) => new URL(path, `${SITE_URL}/`).href;

const pageTitle = (title) => (title ? `${title}${TITLE_SEPARATOR}${BRAND}` : BRAND);

const truncate = (text, max = 160) => {
    const clean = String(text).replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

// ---------- Structured data ----------

export function organizationSchema() {
    const contactPoint = CONTACT_CATEGORIES
        .map((c) => ({ c, email: getContactEmail(c.id) }))
        .filter(({ email }) => email)
        .map(({ c, email }) => ({ '@type': 'ContactPoint', contactType: c.label, email }));
    const sameAs = getVerifiedSocialLinks().map((s) => s.url);

    return {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: BRAND,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/logo-mark.png'), width: 680, height: 680 },
        description: FOOTER_DESCRIPTION,
        ...(contactPoint.length > 0 && { contactPoint }),
        ...(sameAs.length > 0 && { sameAs }),
    };
}

const websiteSchema = () => ({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: BRAND,
    url: `${SITE_URL}/`,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
});

const breadcrumbSchema = (crumbs) => ({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
    })),
});

function articleSchema(article, url, image) {
    const author = getAuthor(article);
    const category = getCategory(article.category);
    return {
        '@type': 'Article',
        headline: article.title,
        ...(article.summary && { description: article.summary }),
        ...(image && { image: [image] }),
        datePublished: article.publishDate,
        ...(article.updatedDate && { dateModified: article.updatedDate }),
        ...(author && {
            author: {
                '@type': 'Person',
                name: author.name,
                ...(author.href && { url: absoluteUrl(author.href) }),
            },
        }),
        ...(category && { articleSection: category.label }),
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: url,
        inLanguage: 'en',
    };
}

function profileSchema(member, url, image) {
    return {
        '@type': 'ProfilePage',
        url,
        mainEntity: {
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            url,
            ...(image && { image }),
            worksFor: { '@id': ORG_ID },
            ...(hasValue(member.linkedinUrl) && { sameAs: [member.linkedinUrl] }),
        },
    };
}

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });

// ---------- Pages ----------

const HOME = { name: 'Home', path: '/' };

const STATIC_PAGES = {
    '/': {
        fullTitle: `${BRAND}${TITLE_SEPARATOR}Investing in the Infrastructure of the Digital Economy`,
        heading: 'Investing in the Infrastructure of the Digital Economy',
        description: `${BRAND} is a technology investment firm backing founders in digital assets, payments, artificial intelligence and security infrastructure.`,
    },
    '/about': {
        title: 'About',
        heading: 'About VaultAlpha',
        description: `Who ${BRAND} is: our investment philosophy, mission, operating principles and how we work with founders building digital infrastructure.`,
    },
    '/strategy': {
        title: 'Investment Strategy',
        heading: 'Investment Strategy',
        description: 'Our investment themes across digital assets and blockchain infrastructure, digital finance, artificial intelligence and security — what we look for and how our process works.',
    },
    '/portfolio': {
        title: 'Portfolio',
        heading: 'Portfolio companies',
        description: `A selection of the companies ${BRAND} backs across infrastructure, digital finance, artificial intelligence and security.`,
    },
    '/team': {
        title: 'Team',
        heading: 'The people behind VaultAlpha',
        description: `Meet the ${BRAND} team: engineers, operators and researchers working with founders for the long term.`,
    },
    '/research': {
        title: 'Research',
        heading: 'Research',
        description: `Perspectives from the ${BRAND} investment team on blockchain, stablecoins, artificial intelligence, markets, tokenization and security.`,
        // Thin, empty listing pages should not be indexed.
        noindex: () => getPublishedArticles().length === 0,
    },
    '/founders': {
        title: 'For Founders',
        heading: 'Partner With VaultAlpha',
        description: `What ${BRAND} invests in, how we evaluate companies and what founders can expect. Submit your company for review by our investment team.`,
    },
    '/contact': {
        title: 'Contact',
        heading: 'Contact',
        description: `Contact ${BRAND}: separate contact paths for founders, investors and LPs, media and general inquiries.`,
    },
};

const SECTION_CRUMBS = {
    portfolio: { name: 'Portfolio', path: '/portfolio' },
    team: { name: 'Team', path: '/team' },
    research: { name: 'Research', path: '/research' },
};

function basePage(path, { title, fullTitle, heading, description, image, type = 'website', noindex = false, crumbs, schema = [], article, links }) {
    const canonical = absoluteUrl(path);
    const img = image ?? DEFAULT_IMAGE;
    return {
        path,
        canonical,
        title: fullTitle ?? pageTitle(title),
        heading: heading ?? title,
        description: truncate(description),
        image: { ...img, url: absoluteUrl(img.url) },
        type,
        noindex,
        article,
        links: links ?? [],
        jsonLd: noindex ? null : graph(
            ...schema,
            crumbs && crumbs.length > 1 && breadcrumbSchema(crumbs),
        ),
    };
}

function staticPage(path) {
    const def = STATIC_PAGES[path];
    if (!def) return null;
    const noindex = typeof def.noindex === 'function' ? def.noindex() : Boolean(def.noindex);
    const isHome = path === '/';
    return basePage(path, {
        ...def,
        noindex,
        crumbs: isHome ? null : [HOME, { name: def.title, path }],
        schema: isHome ? [organizationSchema(), websiteSchema()] : [],
        links: listingLinks(path),
    });
}

// Links to child pages, used in the no-JavaScript fallback of listing pages.
function listingLinks(path) {
    if (path === '/portfolio') return getActivePortfolio().map((c) => ({ label: c.companyName, path: portfolioPath(c) }));
    if (path === '/team') return getActiveTeam().map((m) => ({ label: `${m.name}, ${m.role}`, path: teamPath(m) }));
    if (path === '/research') return getPublishedArticles().map((a) => ({ label: a.title, path: articlePath(a) }));
    return [];
}

function legalPage(path) {
    const doc = LEGAL_DOCUMENTS.find((d) => `/${d.slug}` === path);
    if (!doc) return null;
    return basePage(path, {
        title: doc.title,
        description: doc.subtitle,
        noindex: doc.status === 'draft',
        crumbs: [HOME, { name: doc.title, path }],
    });
}

function portfolioCompanyPage(slug) {
    const company = getPortfolioCompany(slug);
    if (!company) return null;
    const path = portfolioPath(company);
    const description = hasValue(company.shortDescription)
        ? company.shortDescription
        : `${company.companyName}${hasValue(company.sector) ? `, ${company.sector},` : ''} is part of the ${BRAND} portfolio.`;
    return basePage(path, {
        title: `${company.companyName}${TITLE_SEPARATOR}Portfolio`,
        heading: company.companyName,
        description,
        crumbs: [HOME, SECTION_CRUMBS.portfolio, { name: company.companyName, path }],
    });
}

function teamMemberPage(slug) {
    const member = getTeamMember(slug);
    if (!member) return null;
    const path = teamPath(member);
    const url = absoluteUrl(path);
    // In the browser this is the JPEG variant; the SEO build maps `file` to the emitted JPEG.
    const photoUrl = member.photo?.image?.img?.src ?? (typeof member.photo?.image === 'string' ? member.photo.image : null);
    const image = photoUrl ? { url: photoUrl, alt: `Portrait of ${member.name}` } : null;
    return basePage(path, {
        title: `${member.name}, ${member.role}`,
        heading: member.name,
        description: hasValue(member.shortBio) ? member.shortBio : `${member.name} is ${member.role} at ${BRAND}.`,
        image,
        type: 'profile',
        crumbs: [HOME, SECTION_CRUMBS.team, { name: member.name, path }],
        schema: [profileSchema(member, url, image && absoluteUrl(image.url))],
    });
}

function articlePage(slug) {
    const article = getArticle(slug);
    if (!article) return null;
    const path = articlePath(article);
    const url = absoluteUrl(path);
    const author = getAuthor(article);
    const image = article.coverImage?.src
        ? { url: article.coverImage.src, alt: article.coverImage.alt || article.title, large: true }
        : null;
    return basePage(path, {
        title: article.title,
        description: article.summary || `${article.title} — research from the ${BRAND} investment team.`,
        image,
        type: 'article',
        article: {
            publishedTime: article.publishDate,
            modifiedTime: article.updatedDate ?? null,
            author: author?.name ?? null,
            section: getCategory(article.category)?.label ?? null,
        },
        crumbs: [HOME, SECTION_CRUMBS.research, { name: article.title, path }],
        schema: [articleSchema(article, url, image && absoluteUrl(image.url))],
    });
}

export function notFoundMeta(path = '/404') {
    return {
        ...basePage(path, {
            title: 'Page not found',
            description: 'The page you are looking for does not exist or is no longer available.',
            noindex: true,
        }),
        canonical: null,
        notFound: true,
    };
}

const normalize = (pathname) => {
    const p = `/${String(pathname).split(/[?#]/)[0].replace(/^\/+|\/+$/g, '')}`;
    return p === '/' ? '/' : p;
};

export function getPageMeta(pathname) {
    const path = normalize(pathname);
    const [section, slug, extra] = path.slice(1).split('/');
    let meta = null;
    if (!slug) meta = staticPage(path) ?? legalPage(path);
    else if (!extra && section === 'portfolio') meta = portfolioCompanyPage(slug);
    else if (!extra && section === 'team') meta = teamMemberPage(slug);
    else if (!extra && section === 'research') meta = articlePage(slug);
    return meta ?? notFoundMeta(path);
}

// Every URL the site serves (including noindex ones), for per-route HTML.
export function listAllPaths() {
    return [
        ...Object.keys(STATIC_PAGES),
        ...LEGAL_DOCUMENTS.map((d) => `/${d.slug}`),
        ...getActivePortfolio().map(portfolioPath),
        ...getActiveTeam().map(teamPath),
        ...getPublishedArticles().map(articlePath),
    ];
}

export const LEGACY_REDIRECTS = {
    '/privacy-policy': '/privacy',
    '/terms-of-service': '/terms',
    '/cookie-settings': '/cookies',
};

export function buildSitemap() {
    const urls = listAllPaths()
        .map(getPageMeta)
        .filter((m) => !m.noindex && !m.notFound)
        .map((m) => {
            const lastmod = m.article?.modifiedTime || m.article?.publishedTime;
            return `  <url>\n    <loc>${m.canonical}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
        });
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildRobots() {
    return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
