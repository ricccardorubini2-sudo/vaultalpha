import { getTeamMember } from './team.js';

// Single source of truth for research articles.
//
// Article fields:
// - slug, title: required.
// - summary: one or two sentence standfirst, or null.
// - category: a RESEARCH_CATEGORIES id.
// - author: a team member slug (e.g. 'yuki-tanaka') or { name, role }, or null.
// - publishDate: 'YYYY-MM-DD', or null.
// - readingTime: minutes, or null to calculate it from the body.
// - coverImage: { src, alt }, or null.
// - body: array of blocks, or null. A block is either a paragraph string or
//     { type: 'heading', text }
//     { type: 'paragraph', text }
//     { type: 'quote', text, attribution? }
//     { type: 'list', items: [string], ordered? }
// - featured: leads the /research page (the newest featured article wins).
// - published: must be true for the article to appear anywhere publicly.
//
// An article is public only when it is published AND has a title, a body,
// and a publish date. Never publish an article without its full, approved text.

export const RESEARCH_CATEGORIES = [
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'stablecoins', label: 'Stablecoins' },
    { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { id: 'markets', label: 'Markets' },
    { id: 'tokenization-rwa', label: 'Tokenization / RWA' },
    { id: 'security', label: 'Security' },
];

// The three entries below are titles and cover images carried over from the
// original site. No article text exists, so they stay unpublished.
// TODO: Add the full approved text, author, and publish date before publishing.
export const ARTICLES = [
    {
        slug: 'from-copilots-to-autonomous-systems',
        title: 'From Copilots to Autonomous Systems: The Next AI Frontier',
        summary: null,
        category: 'artificial-intelligence',
        author: null,
        publishDate: null,
        readingTime: null,
        coverImage: { src: 'https://images.hostinger.com/155c93a8-7a81-462d-b584-ce3a695078fd.png', alt: '' },
        body: null,
        featured: false,
        published: false,
    },
    {
        slug: 'blockchain-infrastructure-institutional-era',
        title: 'Blockchain Infrastructure Enters Its Institutional Era',
        summary: null,
        category: 'blockchain',
        author: null,
        publishDate: null,
        readingTime: null,
        coverImage: { src: 'https://images.hostinger.com/db041275-a603-413e-9fb0-fa482ffa09b9.png', alt: '' },
        body: null,
        featured: false,
        published: false,
    },
    {
        slug: 'stablecoins-internet-settlement-layer',
        title: 'Stablecoins Are Becoming the Internet\u2019s Settlement Layer',
        summary: null,
        category: 'stablecoins',
        author: null,
        publishDate: null,
        readingTime: null,
        coverImage: { src: 'https://images.hostinger.com/8d4c81b9-3917-4a0d-964e-7f0958d0c0d8.png', alt: '' },
        body: null,
        featured: false,
        published: false,
    },
];

export const HOMEPAGE_RESEARCH_LIMIT = 3;

const WORDS_PER_MINUTE = 220;

const blockText = (block) => {
    if (typeof block === 'string') return block;
    if (block?.type === 'list') return (block.items ?? []).join(' ');
    return block?.text ?? '';
};

const hasBody = (article) =>
    Array.isArray(article.body) && article.body.some((b) => blockText(b).trim() !== '');

export const isPublished = (article) =>
    article.published === true && Boolean(article.title?.trim()) && Boolean(article.publishDate) && hasBody(article);

// Newest first.
export const getPublishedArticles = () =>
    ARTICLES.filter(isPublished).sort((a, b) => b.publishDate.localeCompare(a.publishDate));

export const getLatestArticles = (limit = HOMEPAGE_RESEARCH_LIMIT) => getPublishedArticles().slice(0, limit);

export const getFeaturedArticle = () => getPublishedArticles().find((a) => a.featured) ?? null;

export const getArticle = (slug) => getPublishedArticles().find((a) => a.slug === slug);

export const getRelatedArticles = (article, limit = 3) => {
    const others = getPublishedArticles().filter((a) => a.slug !== article.slug);
    return [...others.filter((a) => a.category === article.category), ...others.filter((a) => a.category !== article.category)].slice(0, limit);
};

export const getCategory = (id) => RESEARCH_CATEGORIES.find((c) => c.id === id) ?? null;

// Resolves a team slug to { name, role, href }; inline authors pass through.
export const getAuthor = (article) => {
    const { author } = article;
    if (!author) return null;
    if (typeof author === 'string') {
        const member = getTeamMember(author);
        return member ? { name: member.name, role: member.role, href: `/team/${member.slug}` } : null;
    }
    return author.name ? { name: author.name, role: author.role ?? null, href: null } : null;
};

export const getReadingTime = (article) => {
    if (article.readingTime) return article.readingTime;
    if (!hasBody(article)) return null;
    const words = article.body.map(blockText).join(' ').trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const formatPublishDate = (iso) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const articlePath = (article) => `/research/${article.slug}`;
