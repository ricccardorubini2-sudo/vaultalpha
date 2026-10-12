import React, { useCallback, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, RotateCw, X } from 'lucide-react';
import { NEWS_DISCLAIMER } from '@/config/news';
import { loadNews } from '@/lib/news';

const isValidDate = (date) => date instanceof Date && !Number.isNaN(date.getTime());

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const DATE_TIME = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const TIME = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
const isToday = (date) => date.toDateString() === new Date().toDateString();
// Today's headlines show the time (14:05); older ones show the date (12 Oct 2026).
const formatDate = (date) => (isValidDate(date) ? (isToday(date) ? TIME : DATE).format(date) : '');
const formatDateTime = (date) => (isValidDate(date) ? DATE_TIME.format(date) : '');

function NewsList({ state, onRetry }) {
    if (state.status === 'loading') {
        return (
            <ul aria-busy="true" aria-label="Loading headlines">
                {Array.from({ length: 6 }, (_, i) => (
                    <li key={i} className="border-b border-white/10 px-6 py-5">
                        <div className="h-2.5 w-28 animate-pulse rounded bg-white/10" />
                        <div className="mt-3 h-3.5 w-full animate-pulse rounded bg-white/10" />
                        <div className="mt-2 h-3.5 w-2/3 animate-pulse rounded bg-white/10" />
                    </li>
                ))}
            </ul>
        );
    }
    if (state.status === 'error') {
        return (
            <div className="px-6 py-10 text-sm text-white/60">
                <p>News is unavailable right now.</p>
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 inline-flex items-center gap-2 text-champagne transition-colors hover:text-white"
                >
                    <RotateCw className="h-3.5 w-3.5" aria-hidden /> Try again
                </button>
            </div>
        );
    }
    if (!state.data?.items.length) {
        return <p className="px-6 py-10 text-sm text-white/60">No major headlines yet. Please check back soon.</p>;
    }
    return (
        <ul>
            {state.data.items.map((item) => (
                <li key={item.url} className="border-b border-white/10">
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group block px-6 py-4 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none"
                    >
                        <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-champagne/80">
                            {item.source}
                            <span className="mx-2 text-white/25" aria-hidden>·</span>
                            <time
                                dateTime={isValidDate(item.publishedAt) ? item.publishedAt.toISOString() : undefined}
                                className="normal-case tracking-normal text-white/45"
                            >
                                {formatDate(item.publishedAt)}
                            </time>
                        </p>
                        <p className="mt-1.5 flex gap-2 text-[0.95rem] leading-snug text-white/85 group-hover:text-white">
                            <span>{item.title}</span>
                            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-champagne" aria-hidden />
                        </p>
                        <span className="sr-only"> (opens {item.source} in a new tab)</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function NewsPanel({ open, onOpenChange }) {
    const [state, setState] = useState({ status: 'idle', data: null });

    const fetchNews = useCallback(async (force = false) => {
        setState((s) => ({ status: s.data ? 'ready' : 'loading', data: s.data }));
        try {
            setState({ status: 'ready', data: await loadNews({ force }) });
        } catch {
            setState((s) => (s.data ? { status: 'ready', data: s.data } : { status: 'error', data: null }));
        }
    }, []);

    useEffect(() => {
        if (open) fetchNews();
    }, [open, fetchNews]);

    const updatedAt = state.data?.updatedAt;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/10 bg-ink text-white shadow-2xl duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right sm:max-w-md">
                    <div className="relative border-b border-white/10 px-6 pb-5 pt-7">
                        <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-champagne">Market News</p>
                        <Dialog.Title className="mt-3 font-display text-3xl font-normal text-white">Crypto headlines</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm leading-relaxed text-white/55">
                            Major stories from leading crypto publications, updated hourly.
                        </Dialog.Description>
                        <Dialog.Close
                            className="absolute right-4 top-5 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70"
                            aria-label="Close news"
                        >
                            <X className="h-4 w-4" aria-hidden />
                        </Dialog.Close>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                        <NewsList state={state} onRetry={() => fetchNews(true)} />
                    </div>
                    <div className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-white/40">
                        {updatedAt && <p className="mb-1.5 text-white/55">Updated {formatDateTime(updatedAt)}</p>}
                        <p>{NEWS_DISCLAIMER}</p>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
