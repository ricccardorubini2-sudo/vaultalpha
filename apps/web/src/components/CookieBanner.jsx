import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COOKIE_DEFAULTS, hasCookieDecision, writeCookiePrefs } from '@/lib/cookie-prefs';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!hasCookieDecision());
        const onChange = () => setVisible(!hasCookieDecision());
        window.addEventListener('va-cookie-prefs-changed', onChange);
        return () => window.removeEventListener('va-cookie-prefs-changed', onChange);
    }, []);

    if (!visible) return null;

    const acceptAll = () => {
        writeCookiePrefs({ essential: true, analytics: true, functional: true });
        setVisible(false);
    };

    const rejectOptional = () => {
        writeCookiePrefs(COOKIE_DEFAULTS);
        setVisible(false);
    };

    return (
        <div
            role="dialog"
            aria-label="Cookie settings"
            className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6"
        >
            <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-slate-900">We use cookies</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                        Essential cookies keep the site secure. Optional analytics and functional cookies help us improve — you can change this anytime in{' '}
                        <Link to="/cookie-settings" className="text-sky-600 underline-offset-2 hover:underline">
                            Cookie Settings
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={rejectOptional}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                    >
                        Reject optional
                    </button>
                    <Link
                        to="/cookie-settings"
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-sky-400/50 hover:text-slate-900"
                    >
                        Customize
                    </Link>
                    <button
                        type="button"
                        onClick={acceptAll}
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
}
