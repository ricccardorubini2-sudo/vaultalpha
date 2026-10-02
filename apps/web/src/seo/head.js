// Turns route metadata (seo/meta.js) into <head> tags. Shared by the browser
// (applyHead) and the build plugin (renderHeadHtml) so both emit the same tags.
// Every managed tag carries `data-seo` so it can be replaced on navigation.

import { BRAND } from '../config/site.js';

export function buildHeadTags(meta) {
    const tags = [
        { tag: 'meta', attrs: { name: 'description', content: meta.description } },
        { tag: 'meta', attrs: { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' } },
    ];
    if (meta.canonical && !meta.noindex) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: meta.canonical } });

    const og = {
        'og:site_name': BRAND,
        'og:locale': 'en_GB',
        'og:type': meta.type === 'profile' ? 'profile' : meta.type === 'article' ? 'article' : 'website',
        'og:title': meta.title,
        'og:description': meta.description,
        'og:url': meta.canonical,
        'og:image': meta.image?.url,
        'og:image:alt': meta.image?.alt,
        'og:image:width': meta.image?.width,
        'og:image:height': meta.image?.height,
        'article:published_time': meta.article?.publishedTime,
        'article:modified_time': meta.article?.modifiedTime,
        'article:author': meta.article?.author,
        'article:section': meta.article?.section,
    };
    Object.entries(og).forEach(([property, content]) => {
        if (content) tags.push({ tag: 'meta', attrs: { property, content: String(content) } });
    });

    const twitter = {
        'twitter:card': meta.image?.large ? 'summary_large_image' : 'summary',
        'twitter:title': meta.title,
        'twitter:description': meta.description,
        'twitter:image': meta.image?.url,
        'twitter:image:alt': meta.image?.alt,
    };
    Object.entries(twitter).forEach(([name, content]) => {
        if (content) tags.push({ tag: 'meta', attrs: { name, content: String(content) } });
    });

    if (meta.jsonLd && meta.jsonLd['@graph']?.length) {
        tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(meta.jsonLd) });
    }
    return tags;
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// JSON inside <script> must not be able to close the tag.
const safeJson = (s) => s.replace(/</g, '\\u003c');

export function renderHeadHtml(meta) {
    const tags = buildHeadTags(meta).map(({ tag, attrs, children }) => {
        const a = Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ');
        return tag === 'script'
            ? `<script data-seo ${a}>${safeJson(children)}</script>`
            : `<${tag} data-seo ${a} />`;
    });
    return { title: escapeHtml(meta.title), tags: tags.join('\n\t\t') };
}

export function applyHead(meta) {
    if (typeof document === 'undefined') return;
    document.title = meta.title;
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    const fragment = document.createDocumentFragment();
    buildHeadTags(meta).forEach(({ tag, attrs, children }) => {
        const el = document.createElement(tag);
        el.setAttribute('data-seo', '');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        if (children) el.textContent = children;
        fragment.appendChild(el);
    });
    document.head.appendChild(fragment);
}
