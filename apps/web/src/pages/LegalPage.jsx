import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import { Container } from '@/components/site/primitives';
import { LEGAL_DOCUMENTS, getLegalDocument } from '@/content/legal';
import { BROWSER_STORAGE, COOKIES, LEGACY_STORAGE_KEYS } from '@/config/siteTechnology';

function DraftNotice() {
    return (
        <div role="note" className="mt-8 flex max-w-2xl gap-3 rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
            <p>
                <span className="font-medium uppercase tracking-[0.18em] text-amber-300">Draft</span>
                <span className="mx-2 text-amber-300/60" aria-hidden>·</span>
                This document is a working draft pending legal review. It has not been reviewed or approved by legal counsel.
            </p>
        </div>
    );
}

function Block({ block }) {
    if (typeof block === 'string') return <p>{block}</p>;
    if (block.type === 'list') {
        return (
            <ul className="space-y-2 pl-5 [list-style:disc] marker:text-slate-400">
                {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
        );
    }
    if (block.type === 'table') {
        return (
            <div className="overflow-x-auto border-y border-slate-200 bg-white">
                <table className="w-full min-w-[36rem] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <tr>{block.columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-medium">{c}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {block.rows.map((row) => (
                            <tr key={row[0]} className="align-top">
                                {row.map((cell, i) => (
                                    <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-slate-900' : 'text-slate-600'}`}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    return null;
}

function ClearStoredData() {
    const [cleared, setCleared] = useState(false);
    const keys = [...BROWSER_STORAGE, ...COOKIES].map((i) => i.name).concat(LEGACY_STORAGE_KEYS);

    const clear = () => {
        try {
            keys.forEach((k) => window.localStorage.removeItem(k));
        } catch {
            // Storage may be unavailable (e.g. blocked by the browser); nothing to clear.
        }
        setCleared(true);
    };

    return (
        <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
                type="button"
                onClick={clear}
                className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
                Clear stored data
            </button>
            {cleared && (
                <span role="status" className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-slate-900" aria-hidden /> Stored data for this site has been cleared.
                </span>
            )}
        </div>
    );
}

export default function LegalPage({ slug }) {
    const doc = getLegalDocument(slug);
    const isDraft = doc.status === 'draft';

    return (
        <>
            <PageHeader label="Legal" title={doc.title} intro={doc.subtitle}>
                {isDraft && <DraftNotice />}
            </PageHeader>

            <section className="bg-canvas py-16 lg:py-24">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        <aside className="min-w-0 lg:col-span-3">
                            <nav aria-label="Legal documents" className="lg:sticky lg:top-28">
                                <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                                    {LEGAL_DOCUMENTS.map((d) => {
                                        const active = d.slug === doc.slug;
                                        return (
                                            <li key={d.slug}>
                                                <Link
                                                    to={`/${d.slug}`}
                                                    aria-current={active ? 'page' : undefined}
                                                    className={`block border-l py-2 pl-4 text-sm transition-colors ${active ? 'border-slate-900 font-medium text-slate-900' : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900'}`}
                                                >
                                                    {d.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <p className="mt-8 hidden text-xs font-medium uppercase tracking-[0.24em] text-slate-400 lg:block">On this page</p>
                                <ul className="mt-3 hidden space-y-2 lg:block">
                                    {doc.sections.map((s) => (
                                        <li key={s.id}>
                                            <a href={`#${s.id}`} className="text-sm text-slate-500 transition-colors hover:text-slate-900">{s.heading}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>

                        <article className="min-w-0 lg:col-span-9">
                            {doc.lastUpdated && <p className="mb-10 text-sm text-slate-500">Last updated: {doc.lastUpdated}</p>}
                            <div className="divide-y divide-slate-200">
                                {doc.sections.map((s) => (
                                    <section key={s.id} id={s.id} className="scroll-mt-28 py-10 first:pt-0">
                                        <h2 className="font-display text-xl font-medium tracking-tight text-slate-900">{s.heading}</h2>
                                        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600">
                                            {s.blocks.filter(Boolean).map((b, i) => <Block key={i} block={b} />)}
                                        </div>
                                        {doc.showClearStorage && s.id === 'control' && <ClearStoredData />}
                                    </section>
                                ))}
                            </div>
                        </article>
                    </div>
                </Container>
            </section>
        </>
    );
}
