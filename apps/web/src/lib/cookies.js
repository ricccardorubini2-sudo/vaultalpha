const PREFS_KEY = 'va-cookie-prefs';
const CONSENT_KEY = 'va-cookie-consent';

export const COOKIE_DEFAULTS = {
    essential: true,
    analytics: false,
    functional: false,
};

export function readCookiePrefs() {
    try {
        const raw = localStorage.getItem(PREFS_KEY);
        if (!raw) return { ...COOKIE_DEFAULTS };
        return { ...COOKIE_DEFAULTS, ...JSON.parse(raw), essential: true };
    } catch {
        return { ...COOKIE_DEFAULTS };
    }
}

export function writeCookiePrefs(prefs) {
    const next = { ...COOKIE_DEFAULTS, ...prefs, essential: true };
    localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    localStorage.setItem(CONSENT_KEY, '1');
    return next;
}

export function hasCookieConsent() {
    try {
        return localStorage.getItem(CONSENT_KEY) === '1';
    } catch {
        return false;
    }
}

export function clearCookieConsent() {
    try {
        localStorage.removeItem(PREFS_KEY);
        localStorage.removeItem(CONSENT_KEY);
    } catch {
        /* ignore */
    }
}
