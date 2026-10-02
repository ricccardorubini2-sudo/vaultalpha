import React, { Fragment } from 'react';

// Two white sections (divided by a hairline, see index.css), then a tinted band.
const DEFAULT_BACKGROUNDS = ['bg-white', 'bg-white', 'bg-[#f5f6f8]'];

/**
 * Cycles light backgrounds over the sections that actually render.
 * sections: [{ key, render: (className) => node }, false, …]; falsy entries
 * are skipped, so conditional sections never break the pattern.
 */
export default function AlternatingSections({ sections, backgrounds = DEFAULT_BACKGROUNDS }) {
    return sections
        .filter(Boolean)
        .map((s, i) => <Fragment key={s.key}>{s.render(backgrounds[i % backgrounds.length])}</Fragment>);
}
