import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '@/seo/meta';
import { applyHead } from '@/seo/head';

// Keeps <head> in sync with the current route. Metadata lives in seo/meta.js.
export default function RouteSeo() {
    const { pathname } = useLocation();
    useEffect(() => {
        applyHead(getPageMeta(pathname));
    }, [pathname]);
    return null;
}
