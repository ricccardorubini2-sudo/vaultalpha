import React from 'react';
import Reveal from '@/components/Reveal';
import TestimonialCard from '@/components/TestimonialCard';
import { Section, Container, SectionLabel, H2 } from '@/components/site/primitives';
import { getPublicTestimonials } from '@/data/testimonials';

export default function TestimonialsSection({ className = 'bg-canvas', testimonials = getPublicTestimonials() }) {
    if (testimonials.length === 0) return null;
    return (
        <Section id="testimonials" className={className} aria-labelledby="testimonials-heading">
            <Container>
                <Reveal>
                    <SectionLabel>Testimonials</SectionLabel>
                    <H2 id="testimonials-heading" className="mt-7 max-w-3xl">In the words of our founders.</H2>
                </Reveal>
                <ul className="mt-16 grid gap-6 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <li key={`${t.personName}-${t.company}`}>
                            <Reveal delay={i * 0.08} className="h-full">
                                <TestimonialCard testimonial={t} />
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}
