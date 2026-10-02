import React from 'react';
import { getCategory, getReadingTime, formatPublishDate } from '@/data/research';

// Category · date · reading time. Missing parts are simply left out.
export default function ArticleMeta({ article, showCategory = true, dark = false, className = '' }) {
    const category = showCategory ? getCategory(article.category) : null;
    const minutes = getReadingTime(article);
    const parts = [
        category && <span key="c" className={`font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>{category.label}</span>,
        article.publishDate && <time key="d" dateTime={article.publishDate}>{formatPublishDate(article.publishDate)}</time>,
        minutes && <span key="r">{minutes} min read</span>,
    ].filter(Boolean);
    if (parts.length === 0) return null;
    return (
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] ${dark ? 'text-slate-400' : 'text-slate-500'} ${className}`}>
            {parts.map((p, i) => (
                <React.Fragment key={p.key}>
                    {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-40" />}
                    {p}
                </React.Fragment>
            ))}
        </div>
    );
}
