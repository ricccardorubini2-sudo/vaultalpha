import { NEWS_ENDPOINT } from '@/config/news';

const CACHE_MS = 5 * 60 * 1000;
let cache = null;

const isSafeUrl = (url) => /^https?:\/\//i.test(url);

export async function loadNews({ force = false } = {}) {
    if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.data;
    const res = await fetch(NEWS_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`News request failed (${res.status})`);
    }
    const json = await res.json();
    const data = {
        updatedAt: json.updatedAt ? new Date(json.updatedAt) : null,
        items: (Array.isArray(json.items) ? json.items : [])
            .filter((i) => i && i.title && isSafeUrl(i.url))
            .map((i) => ({ ...i, publishedAt: new Date(i.publishedAt) })),
    };
    cache = { at: Date.now(), data };
    return data;
}
