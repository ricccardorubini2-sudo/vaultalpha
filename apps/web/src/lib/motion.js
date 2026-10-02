import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

export function usePrefersReducedMotion() {
    const [reduce, setReduce] = useState(prefersReducedMotion);
    useEffect(() => {
        const mq = window.matchMedia(REDUCED_MOTION_QUERY);
        const onChange = () => setReduce(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return reduce;
}

// True once the element has entered the viewport; never flips back.
export function useInViewOnce(ref, rootMargin = '0px 0px -60px 0px') {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return undefined;
        if (!('IntersectionObserver' in window)) {
            setInView(true);
            return undefined;
        }
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                io.disconnect();
            }
        }, { rootMargin });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, rootMargin, inView]);
    return inView;
}
