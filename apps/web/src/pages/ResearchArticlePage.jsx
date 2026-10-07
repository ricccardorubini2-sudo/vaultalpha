import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import ArticleMeta from '@/components/research/ArticleMeta';
import ArticleBody from '@/components/research/ArticleBody';
import ArticleCard from '@/components/research/ArticleCard';
import { getArticle, getAuthor, getRelatedArticles } from '@/data/research';
import NotFoundPage from './NotFoundPage';

export default function ResearchArticlePage() {
    const { slug } = useParams();
    const article = getArticle(slug);
    if (!article) return <NotFoundPage />;

    const author = getAuthor(article);
    const related = getRelatedArticles(article);

    return (
        <>
            <article className="bg-canvas pb-24 pt-36 lg:pt-44">
                <Container>
                    <header className="mx-auto max-w-3xl">
                        <Link to="/research" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All research
                        </Link>
                        <ArticleMeta article={article} className="mt-10" />
                        <h1 className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-5xl">{article.title}</h1>
                        {article.summary && <p className="mt-6 text-xl leading-relaxed text-slate-600">{article.summary}</p>}
                        {author && (
                            <p className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
                                By{' '}
                                {author.href ? (
                                    <Link to={author.href} className="font-medium text-slate-900 underline-offset-4 hover:underline">{author.name}</Link>
                                ) : (
                                    <span className="font-medium text-slate-900">{author.name}</span>
                                )}
                                {author.role && <>, {author.role}</>}
                            </p>
                        )}
                    </header>

                    {article.coverImage?.src && (
                        <figure className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-sm bg-slate-100">
                            <img src={article.coverImage.src} alt={article.coverImage.alt ?? ''} className="aspect-[16/8] w-full object-cover" />
                        </figure>
                    )}

                    <div className="mx-auto mt-14 max-w-[42rem]">
                        <ArticleBody body={article.body} />
                    </div>
                </Container>
            </article>

            {related.length > 0 && (
                <Section className="bg-mist" spacing="compact">
                    <Container>
                        <SectionHeader label="Further reading" action={<ArrowLink to="/research" variant="solid">Read Research</ArrowLink>} />
                        <ul className="mt-10 grid gap-6 md:grid-cols-3">
                            {related.map((a) => <li key={a.slug}><ArticleCard article={a} /></li>)}
                        </ul>
                    </Container>
                </Section>
            )}
        </>
    );
}
