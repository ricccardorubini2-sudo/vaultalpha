import React from 'react';
import { Link } from 'react-router-dom';
import ArticleMeta from './ArticleMeta';
import { articlePath, getAuthor } from '@/data/research';

function Cover({ article, className }) {
    if (!article.coverImage?.src) return null;
    return (
        <div className={`overflow-hidden rounded-sm bg-slate-100 ${className}`}>
            <img
                src={article.coverImage.src}
                alt={article.coverImage.alt ?? ''}
                loading="lazy"
                className="h-full w-full object-cover"
            />
        </div>
    );
}

const Byline = ({ article }) => {
    const author = getAuthor(article);
    if (!author) return null;
    return (
        <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">{author.name}</span>
            {author.role && <>, {author.role}</>}
        </p>
    );
};

const TITLE = 'font-display font-medium tracking-tight text-slate-900 underline-offset-[5px] decoration-1 group-hover:underline';

/**
 * variant: 'lead' (featured story), 'row' (editorial list), 'card' (grid)
 */
export default function ArticleCard({ article, variant = 'card' }) {
    const to = articlePath(article);

    if (variant === 'lead') {
        return (
            <Link to={to} className="group grid gap-8 lg:grid-cols-12 lg:gap-12">
                <Cover article={article} className="aspect-[16/10] lg:col-span-7" />
                <div className={`flex flex-col justify-center ${article.coverImage?.src ? 'lg:col-span-5' : 'max-w-4xl lg:col-span-12'}`}>
                    <ArticleMeta article={article} />
                    <h2 className={`mt-5 text-[1.75rem] leading-tight sm:text-3xl xl:text-4xl ${TITLE}`}>{article.title}</h2>
                    {article.summary && <p className="mt-5 text-lg leading-relaxed text-slate-600">{article.summary}</p>}
                    <div className="mt-6"><Byline article={article} /></div>
                </div>
            </Link>
        );
    }

    if (variant === 'row') {
        return (
            <Link to={to} className="group grid gap-6 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                    <ArticleMeta article={article} className="md:flex-col md:items-start md:gap-y-2 md:[&>span[aria-hidden]]:hidden" />
                </div>
                <div className="md:col-span-6">
                    <h3 className={`text-2xl leading-snug ${TITLE}`}>{article.title}</h3>
                    {article.summary && <p className="mt-3 leading-relaxed text-slate-600">{article.summary}</p>}
                    <div className="mt-4"><Byline article={article} /></div>
                </div>
                <Cover article={article} className="hidden aspect-[4/3] md:col-span-3 md:block" />
            </Link>
        );
    }

    return (
        <Link to={to} className="group flex h-full flex-col border-t border-slate-900 pt-6">
            <ArticleMeta article={article} />
            <h3 className={`mt-3 text-lg leading-snug ${TITLE}`}>{article.title}</h3>
            {article.summary && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>}
            <Cover article={article} className="mt-6 aspect-[16/10]" />
        </Link>
    );
}
