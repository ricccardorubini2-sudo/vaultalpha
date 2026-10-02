import React, { useState } from 'react';

// Falls back to the company initials if the logo is missing or fails to load.
export default function PortfolioLogo({ company, size = 'md' }) {
    const { src, tile, wide } = company.logo ?? {};
    const [failed, setFailed] = useState(false);
    const showImage = Boolean(src) && !failed;
    const lg = size === 'lg';
    const height = lg ? 'h-20' : 'h-14';
    const width = showImage && wide ? (lg ? 'w-[10rem]' : 'w-[7.5rem]') : lg ? 'w-20' : 'w-14';
    const initials = company.companyName
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div className={`grid shrink-0 place-items-center overflow-hidden rounded-md p-2 ring-1 ring-slate-200 ${tile === 'dark' ? 'bg-slate-900' : 'bg-white'} ${height} ${width}`}>
            {showImage ? (
                <img
                    src={src}
                    alt={`${company.companyName} logo`}
                    loading={lg ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setFailed(true)}
                    className={`h-full w-full object-contain ${wide ? 'object-left' : ''}`}
                />
            ) : (
                <span aria-hidden="true" className={`font-display font-medium text-slate-500 ${lg ? 'text-xl' : 'text-base'}`}>{initials}</span>
            )}
        </div>
    );
}
