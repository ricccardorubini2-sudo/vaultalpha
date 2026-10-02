import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import PageHeader from '@/components/site/PageHeader';
import { Section, Container, ArrowLink } from '@/components/site/primitives';
import ArticleCard from '@/components/research/ArticleCard';
import { getPublishedArticles, getFeaturedArticle, RESEARCH_CATEGORIES } from '@/data/research';

// Category tabs only help once there is enough to browse.
const MIN_ARTICLES_FOR_FILTERS = 4;

function CategoryTabs({ categories, current, onSelect }) {
    const tab = (active) =>
        `whitespace-nowrap border-b-2 pb-3 text-sm transition-colors ${active ? 'border-slate-900 font-medium text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`;
    return (
        <nav aria-label="Research categories" className="-mb-px flex gap-8 overflow-x-auto">
            <button type="button" onClick={() => onSelect(null)} aria-pressed={!current} className={tab(!current)}>All research</button>
            {categories.map((c) => (
                <button key={c.id} type="button" onClick={() => onSelect(c.id)} aria-pressed={current === c.id} className={tab(current === c.id)}>
                    {c.label}
                </button>
            ))}
        </nav>
    );
}

function EmptyState() {
    return (
        <div className="mx-auto max-w-2xl border-y border-slate-200 py-20 text-center">
            <p className="font-display text-2xl font-medium tracking-tight text-slate-900">No research has been published yet.</p>
            <p className="mt-4 leading-relaxed text-slate-500">Articles from our investment team will appear here as they are released.</p>
            <ArrowLink to="/strategy" className="mt-8">Explore our strategy</ArrowLink>
        </div>
    );
}

export default function ResearchPage() {
    const [params, setParams] = useSearchParams();
    const articles = getPublishedArticles();

    const categories = RESEARCH_CATEGORIES.filter((c) => articles.some((a) => a.category === c.id));
    const showTabs = articles.length >= MIN_ARTICLES_FOR_FILTERS && categories.length > 1;
    const requested = params.get('category');
    const category = showTabs && categories.some((c) => c.id === requested) ? requested : null;

    const lead = category ? null : getFeaturedArticle() ?? articles[0] ?? null;
    const list = articles.filter((a) => a !== lead && (!category || a.category === category));

    const selectCategory = (id) => {
        const next = new URLSearchParams(params);
        if (id) next.set('category', id);
        else next.delete('category');
        setParams(next, { replace: true });
    };

    return (
        <>
            <PageHeader label="Research & Insights" title="Research" intro="Perspectives from our investment team." />
            <Section id="research" className="bg-white" spacing="compact">
                <Container>
                    {articles.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {lead && (
                                <Reveal>
                                    <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{lead.featured ? 'Featured' : 'Latest'}</p>
                                    <ArticleCard article={lead} variant="lead" />
                                </Reveal>
                            )}
                            {(list.length > 0 || showTabs) && (
                                <div className={lead ? 'mt-20' : ''}>
                                    <div className="border-b border-slate-300">
                                        {showTabs ? (
                                            <CategoryTabs categories={categories} current={category} onSelect={selectCategory} />
                                        ) : (
                                            <h2 className="pb-3 text-xs font-medium uppercase tracking-[0.28em] text-slate-500">More research</h2>
                                        )}
                                    </div>
                                    <ul className="divide-y divide-slate-200">
                                        {list.map((a) => (
                                            <li key={a.slug}><ArticleCard article={a} variant="row" /></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </Section>
        </>
    );
}
