import React from 'react';
import Reveal from '@/components/Reveal';
import ArticleCard from '@/components/research/ArticleCard';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { getLatestArticles, HOMEPAGE_RESEARCH_LIMIT } from '@/data/research';

// Latest published articles. Renders nothing until at least one is published.
export default function ResearchSection({ className = 'bg-white', spacing, limit = HOMEPAGE_RESEARCH_LIMIT }) {
    const articles = getLatestArticles(limit);
    if (articles.length === 0) return null;
    return (
        <Section id="research" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionHeader
                        label="Latest Research"
                        title="Perspectives from our investment team."
                        action={<ArrowLink to="/research" variant="solid">Read Research</ArrowLink>}
                    />
                </Reveal>
                <ul className="mt-14 grid gap-6 md:grid-cols-3">
                    {articles.map((a, i) => (
                        <Reveal as="li" key={a.slug} delay={i * 0.08} className="h-full">
                            <ArticleCard article={a} />
                        </Reveal>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}
