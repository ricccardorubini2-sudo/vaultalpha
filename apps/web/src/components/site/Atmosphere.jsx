import React from 'react';

/**
 * Full-bleed atmosphere for dark heroes and page headers.
 * Photoreal European architecture under a navy wash — institutional, not flashy.
 */
export default function Atmosphere({
    src = '/hero-atmosphere.jpg',
    className = '',
    intensity = 'default',
}) {
    const washes = {
        default: 'from-[hsl(215_42%_7%_/_0.88)] via-[hsl(215_42%_8%_/_0.72)] to-[hsl(215_35%_12%_/_0.55)]',
        soft: 'from-[hsl(215_42%_7%_/_0.8)] via-[hsl(215_42%_9%_/_0.65)] to-[hsl(215_35%_14%_/_0.5)]',
        strong: 'from-[hsl(215_42%_6%_/_0.92)] via-[hsl(215_42%_7%_/_0.82)] to-[hsl(215_35%_10%_/_0.68)]',
    };

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <img
                src={src}
                alt=""
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_35%] animate-atmosphere"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${washes[intensity] ?? washes.default}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_42%_6%)] via-transparent to-[hsl(215_42%_6%_/_0.35)]" />
            <div className="atmosphere-grain absolute inset-0 opacity-[0.28]" />
        </div>
    );
}
