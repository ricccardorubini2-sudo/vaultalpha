import React, { Suspense, lazy, useState } from 'react';
import { Newspaper } from 'lucide-react';

const NewsPanel = lazy(() => import('./NewsPanel'));

// Edge tab on the right-middle of every page. The headlines panel is loaded
// on first use so it adds nothing to the initial page load.
export default function NewsWidget() {
    const [open, setOpen] = useState(false);
    const [requested, setRequested] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setRequested(true);
                    setOpen(true);
                }}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Open crypto news"
                title="Crypto news"
                className="fixed right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(36_40%_58%)] to-[hsl(32_34%_40%)] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] ring-2 ring-white/70 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--ink))] sm:right-5"
            >
                <Newspaper className="h-[22px] w-[22px]" strokeWidth={2.25} aria-hidden />
            </button>
            {requested && (
                <Suspense fallback={null}>
                    <NewsPanel open={open} onOpenChange={setOpen} />
                </Suspense>
            )}
        </>
    );
}
