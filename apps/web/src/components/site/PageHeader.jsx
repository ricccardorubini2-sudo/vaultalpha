import React from 'react';
import Atmosphere from './Atmosphere';
import { SectionLabel } from './primitives';

// Full-screen dark page intro with atmospheric architecture wash: the header
// image fills the first viewport on every page and device. The headline
// renders visible from the first paint (LCP); the optional aside fades in.
export default function PageHeader({ label, title, intro, before, aside, image, children }) {
    const text = (
        <div>
            {before}
            {label && <SectionLabel className="!text-champagne/80">{label}</SectionLabel>}
            <h1 className="mt-5 max-w-4xl break-words font-display text-4xl font-normal !leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                {title}
            </h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>}
            {children}
        </div>
    );
    return (
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-white/10 bg-ink text-white">
            <Atmosphere src={image} intensity="soft" />
            <div className="relative mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-6 pb-16 pt-28 sm:pb-20 sm:pt-36 lg:px-12">
                {aside ? (
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
                        <div className="lg:col-span-7">{text}</div>
                        <div className="animate-enter lg:col-span-5" style={{ '--enter-delay': '0.12s' }}>{aside}</div>
                    </div>
                ) : text}
            </div>
        </section>
    );
}
