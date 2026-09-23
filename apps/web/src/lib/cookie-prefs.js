const STORAGE_KEY = 'va-cookie-prefs';

export const COOKIE_DEFAULTS = {
    essential: true,
    analytics: false,
    functional: false,
};

export function hasCookieDecision() {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
        return true;
    }
}

export function readCookiePrefs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...COOKIE_DEFAULTS };
        return { ...COOKIE_DEFAULTS, ...JSON.parse(raw), essential: true };
    } catch {
        return { ...COOKIE_DEFAULTS };
    }
}

export function writeCookiePrefs(prefs) {
    const next = { ...COOKIE_DEFAULTS, ...prefs, essential: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('va-cookie-prefs-changed', { detail: next }));
    return next;
}
