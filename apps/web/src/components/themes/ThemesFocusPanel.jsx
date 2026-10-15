import React, { useEffect, useId, useState } from 'react';
import {
    Blocks,
    CandlestickChart,
    CarFront,
    ChevronDown,
    ChevronRight,
    Clapperboard,
    Coins,
    Dices,
    Gem,
    Landmark,
} from 'lucide-react';
import EntityMarquee from '@/components/themes/EntityMarquee';
import casinoSrc from '@/assets/themes/casino.jpg?w=720&format=webp&quality=72';
import luxurySrc from '@/assets/themes/luxury.jpg?w=720&format=webp&quality=72';
import carsSrc from '@/assets/themes/cars.jpg?w=720&format=webp&quality=72';
import entertainmentSrc from '@/assets/themes/entertainment.jpg?w=720&format=webp&quality=72';

const ICONS = {
    coins: Coins,
    blocks: Blocks,
    candlestick: CandlestickChart,
    landmark: Landmark,
    dices: Dices,
    gem: Gem,
    car: CarFront,
    clapperboard: Clapperboard,
};

// Sub-areas with a photo render as dark image cards; the rest as light cards.
const BACKGROUNDS = {
    casino: casinoSrc,
    luxury: luxurySrc,
    cars: carsSrc,
    entertainment: entertainmentSrc,
};

function SubAreaCard({ area }) {
    const Icon = ICONS[area.icon];
    const bg = BACKGROUNDS[area.id];

    if (bg) {
        return (
            <li className="group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-sm bg-[hsl(215_42%_8%)] p-6 text-white shadow-sm">
                <img
                    src={bg}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[hsl(215_42%_6%)] via-[hsl(215_42%_6%/0.72)] to-[hsl(215_42%_6%/0.15)]" />
                {Icon && (
                    <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-champagne backdrop-blur-sm">
                        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                )}
                <h3 className="font-display text-xl font-medium tracking-tight text-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{area.desc}</p>
            </li>
        );
    }

    return (
        <li className="group flex h-full flex-col rounded-sm border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:border-slate-300">
            {Icon && (
                <span className="grid h-12 w-12 place-items-center rounded-sm bg-[hsl(215_42%_12%)] text-champagne transition-colors group-hover:bg-[hsl(215_42%_18%)]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
            )}
            <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-slate-900">{area.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{area.desc}</p>
        </li>
    );
}

export default function ThemesFocusPanel({ focus, open, onOpen, onClose }) {
    const panelId = useId();
    const [finePointer, setFinePointer] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        const sync = () => setFinePointer(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const toggle = () => {
        if (open) onClose();
        else onOpen();
    };

    return (
        <article
            className={`rounded-sm border transition-colors duration-300 ${open ? 'border-slate-300 bg-white shadow-sm' : 'border-slate-200 bg-mist/80 hover:border-slate-300 hover:bg-white'}`}
            onMouseEnter={() => finePointer && onOpen()}
        >
            <button
                type="button"
                className="flex w-full items-start gap-5 px-6 py-6 text-left sm:items-center sm:px-8 sm:py-7"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => (finePointer ? onOpen() : toggle())}
            >
                <span className="shrink-0 pt-0.5 font-display text-2xl tabular-nums text-slate-400 sm:text-3xl">{focus.n}</span>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">{focus.title}</h2>
                        {focus.badge && (
                            <span
                                className={`rounded-sm px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
                                    focus.badge === 'New'
                                        ? 'bg-rose-100 text-rose-700'
                                        : 'bg-slate-100 text-slate-600'
                                }`}
                            >
                                {focus.badge}
                            </span>
                        )}
                    </div>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{focus.summary}</p>
                </div>
                <span className="ml-auto hidden shrink-0 items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500 sm:inline-flex">
                    {open ? focus.collapseLabel : focus.expandLabel}
                    {open ? <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> : <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
                </span>
            </button>

            <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className={`border-t border-slate-200 px-6 pb-8 pt-2 sm:px-8 sm:pb-10 ${open ? 'animate-focus-in' : ''}`}>
                        {focus.purpose && (
                            <div className="mb-8 max-w-3xl border-b border-slate-100 pb-8">
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-500">Purpose</p>
                                <p className="mt-3 text-base leading-relaxed text-slate-700">{focus.purpose}</p>
                                {focus.approach?.length > 0 && (
                                    <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                                        {focus.approach.map((item) => (
                                            <li key={item.title}>
                                                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {focus.subAreas.map((area) => (
                                <SubAreaCard key={area.id} area={area} />
                            ))}
                        </ul>

                        <EntityMarquee slugs={focus.entitySlugs} />
                    </div>
                </div>
            </div>
        </article>
    );
}
