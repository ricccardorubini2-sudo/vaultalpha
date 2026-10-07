import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel } from '@/components/site/primitives';

// items: [{ to, eyebrow, title, desc, cta }]
export default function NextStepsSection({ items, label = 'Learn More', className = 'bg-canvas', spacing = 'compact' }) {
    if (!items?.length) return null;
    return (
        <Section id="next-steps" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <SectionLabel as="h2">{label}</SectionLabel>
                    <ul className="mt-8 grid border-t border-slate-900 md:grid-cols-2">
                        {items.map((item, i) => (
                            <li key={item.to} className={`border-b border-slate-200 ${i % 2 === 1 ? 'md:border-l md:pl-10' : 'md:pr-10'}`}>
                                <Link to={item.to} className="group flex h-full flex-col justify-between py-10">
                                    <div>
                                        {item.eyebrow && <p className="text-sm text-slate-500">{item.eyebrow}</p>}
                                        <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-slate-900 lg:text-3xl">{item.title}</h3>
                                        {item.desc && <p className="mt-3 max-w-md leading-relaxed text-slate-600">{item.desc}</p>}
                                    </div>
                                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-[6px] group-hover:underline">
                                        {item.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </Container>
        </Section>
    );
}
