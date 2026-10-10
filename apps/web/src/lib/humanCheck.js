// First-visit "slide the puzzle piece" check. Client-side only: it deters
// casual automated browsing but is not a security boundary. Must stay in sync
// with config/siteTechnology.js.

export const HUMAN_CHECK_KEY = 'va:human-check';
const VALID_MS = 30 * 24 * 60 * 60 * 1000;

// Search engines and link-preview crawlers skip the check so indexing still works.
const CRAWLER_UA = /bot|crawler|spider|slurp|lighthouse|facebookexternalhit|embedly|preview/i;

export function needsHumanCheck() {
    if (typeof window === 'undefined') return false;
    if (CRAWLER_UA.test(window.navigator.userAgent)) return false;
    try {
        const at = Number(window.localStorage.getItem(HUMAN_CHECK_KEY));
        return !(at && Date.now() - at < VALID_MS);
    } catch {
        return true;
    }
}

export function markHumanVerified() {
    try {
        window.localStorage.setItem(HUMAN_CHECK_KEY, String(Date.now()));
    } catch {
        // Storage blocked: the check shows again on the next full page load.
    }
}
