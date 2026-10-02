import React, { useEffect, useRef } from 'react';

// One observer for every reveal on the page; revealing toggles a class
// directly, so scrolling never triggers a React render.
let observer = null;
function getObserver() {
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        }, { rootMargin: '0px 0px -60px 0px' });
    }
    return observer;
}

// Subtle entrance for section-level blocks. Avoid wrapping individual list
// items; one reveal per block keeps motion from becoming decoration.
// `as` renders a different element (e.g. 'li' inside a list).
const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (!('IntersectionObserver' in window)) {
            el.classList.add('is-revealed');
            return undefined;
        }
        const io = getObserver();
        io.observe(el);
        return () => io.unobserve(el);
    }, []);

    return (
        <Tag ref={ref} className={`reveal ${className}`} style={delay ? { '--reveal-delay': `${delay}s` } : undefined}>
            {children}
        </Tag>
    );
};

export default Reveal;
