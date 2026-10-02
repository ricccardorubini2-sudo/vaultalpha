import React, { useState } from 'react';

const SIZES = {
    card: 'rounded-sm',
    profile: 'rounded-sm',
};

// Rendered widths, so the browser picks the smallest variant that stays sharp
// on the current screen density (see the team grid and profile header).
const IMAGE_SIZES = {
    card: '(min-width: 1280px) 272px, (min-width: 1024px) 22vw, (min-width: 768px) 31vw, 46vw',
    profile: '(min-width: 1024px) 384px, (min-width: 640px) 320px, 240px',
};

const MIME = { avif: 'image/avif', webp: 'image/webp', jpeg: 'image/jpeg', jpg: 'image/jpeg', png: 'image/png' };

// Single photo treatment for every team image: fixed 3:4 frame, top-anchored
// crop, neutral backdrop, and an initials fallback if the photo is missing.
// The profile portrait is usually the page's largest element, so it loads
// eagerly at high priority; grid photos load lazily.
export default function TeamPhoto({ member, size = 'card', className = '' }) {
    const [failed, setFailed] = useState(false);
    const picture = member.photo?.image;
    const showImage = Boolean(picture?.img?.src) && !failed;
    const initials = member.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    // On cards the name is printed right below the photo, so the image is decorative there.
    const alt = size === 'profile' ? `Portrait of ${member.name}` : '';
    const priority = size === 'profile';

    return (
        <div className={`relative aspect-[3/4] overflow-hidden bg-slate-100 ${SIZES[size]} ${className}`}>
            {showImage ? (
                <picture>
                    {Object.entries(picture.sources ?? {}).map(([format, srcSet]) => (
                        <source key={format} type={MIME[format]} srcSet={srcSet} sizes={IMAGE_SIZES[size]} />
                    ))}
                    <img
                        src={picture.img.src}
                        width={picture.img.w}
                        height={picture.img.h}
                        alt={alt}
                        loading={priority ? 'eager' : 'lazy'}
                        fetchpriority={priority ? 'high' : undefined}
                        decoding={priority ? undefined : 'async'}
                        onError={() => setFailed(true)}
                        className="h-full w-full object-cover object-top"
                    />
                </picture>
            ) : (
                <div {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })} className="grid h-full w-full place-items-center">
                    <span aria-hidden="true" className={`font-display font-medium text-slate-400 ${size === 'profile' ? 'text-6xl' : 'text-3xl'}`}>{initials}</span>
                </div>
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" style={{ borderRadius: 'inherit' }} />
        </div>
    );
}
