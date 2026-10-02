import React from 'react';
import { SectionLabel } from './primitives';

// Dark page intro for inner pages: plain black with a hairline base, so the
// typography carries the page rather than background effects. The headline
// renders visible from the first paint (it is usually the Largest Contentful
// Paint element); only the optional aside fades in.
// `before` renders above the label (e.g. a back link or logo).
// `aside` renders in a right-hand column on large screens (e.g. a portrait).
export default function PageHeader({ label, title, intro, before, aside, children }) {
    const text = (
        <div>
            {before}
            {label && <SectionLabel>{label}</SectionLabel>}
            <h1 className="mt-5 max-w-4xl break-words font-display text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{intro}</p>}
            {children}
        </div>
    );
    return (
        <section className="relative border-b border-white/10 bg-black text-white">
            <div className="relative mx-auto max-w-[80rem] px-6 pb-14 pt-28 sm:pb-16 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-44">
                {aside ? (
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
                        <div className="lg:col-span-7">{text}</div>
                        <div className="animate-enter lg:col-span-5" style={{ '--enter-delay': '0.1s' }}>{aside}</div>
                    </div>
                ) : text}
            </div>
        </section>
    );
}
