// Technical SEO for the client-rendered app.
//
// Build: writes one HTML file per route (dist/<route>/index.html) with that
// route's title, description, canonical, Open Graph/Twitter tags, JSON-LD, and
// a <noscript> fallback, so crawlers and link-preview bots that do not run
// JavaScript still see correct metadata. Also writes sitemap.xml, robots.txt,
// 404.html, and an Apache/LiteSpeed .htaccess that maps clean URLs to them.
//
// Dev: serves /sitemap.xml and /robots.txt from the same source.
//
// Metadata comes from src/seo/meta.js (loaded through Vite so data files that
// use import.meta.glob work).

import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const META_MODULE = '/src/seo/meta.js';
const HEAD_MODULE = '/src/seo/head.js';

async function loadSeoModules(loader) {
    const [meta, head] = await Promise.all([loader(META_MODULE), loader(HEAD_MODULE)]);
    return { meta, head };
}

function noscriptHtml(meta, navLinks, facts, escapeHtml) {
    const link = (l) => `<li><a href="${escapeHtml(l.path)}">${escapeHtml(l.label)}</a></li>`;
    const children = meta.links?.length ? `<ul>${meta.links.map(link).join('')}</ul>` : '';
    const company = facts.length
        ? `<dl aria-label="Company">${facts.map((f) => `<dt>${escapeHtml(f.label)}</dt><dd>${escapeHtml(f.value)}</dd>`).join('')}</dl>`
        : '';
    return `<noscript><main style="max-width:48rem;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,sans-serif;color:#0f172a"><h1>${escapeHtml(meta.heading ?? meta.title)}</h1><p>${escapeHtml(meta.description)}</p>${children}${company}<nav aria-label="Site"><ul>${navLinks.map(link).join('')}</ul></nav></main></noscript>`;
}

function injectMeta(template, meta, head, navLinks, facts, preloads = '') {
    const { title, tags } = head.renderHeadHtml(meta);
    return template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>\n\t\t${tags}`)
        .replace('</head>', `${preloads}</head>`)
        .replace('<div id="root"></div>', `<div id="root"></div>\n\t\t${noscriptHtml(meta, navLinks, facts, head.escapeHtml)}`);
}

// Pages are lazy chunks. Without a hint the browser only discovers a page's
// chunk after the main bundle has run; preloading it from the HTML lets both
// download in parallel. Returns (route) => '<link rel="modulepreload">...'.
async function makeRoutePreloader(outDir, routes, base) {
    let manifest;
    try {
        manifest = JSON.parse(await fs.readFile(path.join(outDir, '.vite', 'manifest.json'), 'utf-8'));
    } catch {
        return () => '';
    }
    const entry = Object.values(manifest).find((c) => c.isEntry);
    const loaded = new Set();
    const markLoaded = (key) => {
        if (!key || loaded.has(key)) return;
        loaded.add(key);
        manifest[key]?.imports?.forEach(markLoaded);
    };
    const entryKey = Object.keys(manifest).find((k) => manifest[k] === entry);
    markLoaded(entryKey);

    const filesFor = (key, out = new Set()) => {
        if (!key || loaded.has(key) || out.has(key) || !manifest[key]) return out;
        out.add(key);
        manifest[key].imports?.forEach((k) => filesFor(k, out));
        return out;
    };
    return (pathname, pageId) => {
        const id = pageId ?? routes.findRoute(pathname)?.page;
        const module = id && routes.getPage(id)?.module;
        if (!module) return '';
        return [...filesFor(module)]
            .map((k) => `\t\t<link rel="modulepreload" crossorigin href="${base}${manifest[k].file}">\n`)
            .join('');
    };
}

// Resolve image URLs that only exist as hashed build assets (e.g. team photos
// imported via import.meta.glob) to their emitted file in dist/assets.
async function makeAssetResolver(outDir, siteUrl) {
    let files = [];
    try {
        files = await fs.readdir(path.join(outDir, 'assets'));
    } catch {
        // No assets directory; nothing to resolve.
    }
    // Social previews need a widely supported format, so prefer the largest
    // JPEG (then PNG) variant emitted for the source image.
    const rank = (f) => (/\.jpe?g$/i.test(f) ? 2 : /\.png$/i.test(f) ? 1 : 0);
    return async (url) => {
        if (!url || !url.startsWith(siteUrl) || !/\/(@fs|teams_image)\//.test(url)) return url;
        const base = decodeURIComponent(url.split('?')[0].split('/').pop()).replace(/\.[^.]+$/, '');
        const candidates = files.filter((f) => f.startsWith(`${base}-`) && rank(f) > 0);
        if (!candidates.length) return null;
        const sized = await Promise.all(candidates.map(async (f) => ({ f, rank: rank(f), size: (await fs.stat(path.join(outDir, 'assets', f))).size })));
        sized.sort((a, b) => b.rank - a.rank || b.size - a.size);
        return new URL(`/assets/${sized[0].f}`, `${siteUrl}/`).href;
    };
}

async function fixImages(meta, resolveAsset) {
    if (!meta.image?.url) return meta;
    const url = await resolveAsset(meta.image.url);
    const next = { ...meta, image: url ? { ...meta.image, url } : null };
    if (next.jsonLd) {
        next.jsonLd = JSON.parse(JSON.stringify(next.jsonLd).split(meta.image.url).join(url ?? ''));
    }
    return next;
}

function htaccess(redirects) {
    const legacy = Object.entries(redirects)
        .map(([from, to]) => `RewriteRule ^${from.slice(1)}/?$ ${to} [R=301,L]`)
        .join('\n');
    return `# Generated by vite-plugin-seo. Maps clean URLs to prerendered HTML.
Options -MultiViews
DirectoryIndex index.html
DirectorySlash Off
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On

${legacy}

# Remove trailing slashes (canonical URLs have none).
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Real files (assets, images, sitemap, robots).
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Prerendered routes.
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.+)$ /$1/index.html [L]

# Anything else is a real 404 (the 404 page still boots the app).
RewriteRule ^ - [R=404,L]
</IfModule>
`;
}

export default function seoPlugin() {
    let config;

    return {
        name: 'vaultalpha-seo',

        configResolved(resolved) {
            config = resolved;
        },

        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = req.url?.split('?')[0];
                if (url !== '/sitemap.xml' && url !== '/robots.txt' && url !== '/llms.txt') return next();
                try {
                    const { meta } = await loadSeoModules((id) => server.ssrLoadModule(id));
                    const xml = url === '/sitemap.xml';
                    res.setHeader('Content-Type', xml ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8');
                    res.end(xml ? meta.buildSitemap() : url === '/llms.txt' ? meta.buildLlmsTxt() : meta.buildRobots());
                } catch (err) {
                    next(err);
                }
            });
        },

        async closeBundle() {
            if (config.command !== 'build' || config.build.ssr) return;
            const outDir = path.resolve(config.root, config.build.outDir);
            const loaderServer = await createServer({
                configFile: false,
                root: config.root,
                logLevel: 'error',
                mode: config.mode,
                resolve: { alias: config.resolve.alias },
                server: { middlewareMode: true, hmr: false, watch: null },
                appType: 'custom',
                optimizeDeps: { noDiscovery: true, include: [] },
            });

            try {
                const { meta, head } = await loadSeoModules((id) => loaderServer.ssrLoadModule(id));
                const { NAV_LINKS } = await loaderServer.ssrLoadModule('/src/config/site.js');
                const navLinks = [{ label: 'Home', path: '/' }, ...NAV_LINKS.map((l) => ({ label: l.label, path: l.to })), { label: 'Contact', path: '/contact' }];
                const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf-8');
                const resolveAsset = await makeAssetResolver(outDir, meta.SITE_URL);
                const routes = await loaderServer.ssrLoadModule('/src/routes.js');
                const preloadsFor = await makeRoutePreloader(outDir, routes, config.base);

                const paths = meta.listAllPaths();
                for (const route of paths) {
                    const html = injectMeta(template, await fixImages(meta.getPageMeta(route), resolveAsset), head, navLinks, meta.COMPANY_FACTS, preloadsFor(route));
                    const file = route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.slice(1), 'index.html');
                    await fs.mkdir(path.dirname(file), { recursive: true });
                    await fs.writeFile(file, html);
                }
                await fs.writeFile(path.join(outDir, '404.html'), injectMeta(template, meta.notFoundMeta(), head, navLinks, meta.COMPANY_FACTS, preloadsFor(null, routes.NOT_FOUND_PAGE)));
                await fs.rm(path.join(outDir, '.vite'), { recursive: true, force: true });
                await fs.writeFile(path.join(outDir, 'sitemap.xml'), meta.buildSitemap());
                await fs.writeFile(path.join(outDir, 'robots.txt'), meta.buildRobots());
                await fs.writeFile(path.join(outDir, 'llms.txt'), meta.buildLlmsTxt());
                await fs.writeFile(path.join(outDir, '.htaccess'), htaccess(meta.LEGACY_REDIRECTS));
                config.logger.info(`[seo] wrote ${paths.length} route pages, 404.html, sitemap.xml, robots.txt, llms.txt, .htaccess`);
            } finally {
                await loaderServer.close();
            }
        },
    };
}
