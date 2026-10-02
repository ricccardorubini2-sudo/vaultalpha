import React, { useEffect, useRef, useState } from 'react';
import { formatStatValue } from '@/config/stats';
import { useInViewOnce, usePrefersReducedMotion } from '@/lib/motion';

const DURATION = 1800;

// The final value is always the real DOM text (readable by crawlers and
// screen readers, and it reserves the final width). The count-up is an
// aria-hidden overlay shown only while animating.
export default function AnimatedStatValue({ stat, className = '' }) {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);
    const reduceMotion = usePrefersReducedMotion();
    const [current, setCurrent] = useState(null);
    const canAnimate = typeof stat.value === 'number' && !stat.text && !reduceMotion;

    useEffect(() => {
        if (!inView || !canAnimate) return;
        let raf;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / DURATION, 1);
            if (p < 1) {
                setCurrent(stat.value * (1 - Math.pow(1 - p, 3)));
                raf = requestAnimationFrame(tick);
            } else {
                setCurrent(null);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            setCurrent(null);
        };
    }, [inView, canAnimate, stat.value]);

    const animating = current !== null;

    return (
        <span ref={ref} className={`relative inline-block whitespace-nowrap ${className}`}>
            <span className={animating ? 'opacity-0' : undefined}>{formatStatValue(stat)}</span>
            {animating && (
                <span aria-hidden="true" className="absolute inset-0">
                    {formatStatValue(stat, current)}
                </span>
            )}
        </span>
    );
}
