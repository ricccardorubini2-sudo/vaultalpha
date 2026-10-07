import React from 'react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { getPublicLocations, formatList } from '@/data/locations';
import { getActivePortfolio, hasValue } from '@/data/portfolio';

// Plain facts rather than a decorative map: verified office cities and
// the countries represented in the listed portfolio.
export default function GlobalNetworkSection() {
    const locations = getPublicLocations();
    const portfolioCountries = [...new Set(getActivePortfolio().map((c) => c.geography).filter(hasValue))];
    const cities = formatList(locations.map((l) => l.city));
    const summary = [
        portfolioCountries.length > 0 && `portfolio companies in ${portfolioCountries.length} countries`,
        locations.length > 0 && `offices in ${cities}`,
    ].filter(Boolean);
    const facts = [
        locations.length > 0 && { id: 'locations', label: locations.length === 1 ? 'Office' : 'Offices', value: cities },
        portfolioCountries.length > 0 && { id: 'portfolioCountries', label: 'Portfolio countries', value: formatList(portfolioCountries) },
    ].filter(Boolean);

    return (
        <Section id="network" className="bg-black text-white" spacing="compact">
            <Container>
                <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <SectionLabel>Global Network</SectionLabel>
                        <H2 className="mt-5 !text-white">An international network of founders, investors and institutions.</H2>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
                            We work with founders, institutions and specialist talent internationally{summary.length > 0 && <>, with {summary.join(' and ')}</>}.
                        </p>
                    </div>
                    {facts.length > 0 && (
                        <dl className="self-end border-t border-white/15 lg:col-span-5">
                            {facts.map((f) => (
                                <div key={f.id} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-3">
                                    <dt className="text-sm text-slate-500">{f.label}</dt>
                                    <dd className="text-slate-200 sm:col-span-2">{f.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </Reveal>
            </Container>
        </Section>
    );
}
