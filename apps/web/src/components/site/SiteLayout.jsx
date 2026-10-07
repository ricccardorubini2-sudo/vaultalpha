import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import RouteSeo from '@/components/seo/RouteSeo';

// Pages load as separate chunks. The fallback holds the viewport so the footer
// never flashes up while a page's code arrives on a first visit; in-app
// navigation keeps the current page on screen until the next one is ready.
const PageFallback = () => <div className="min-h-screen bg-ink" aria-hidden="true" />;

export default function SiteLayout() {
    return (
        <div className="bg-canvas">
            <RouteSeo />
            <SiteNav />
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
                <Suspense fallback={<PageFallback />}>
                    <Outlet />
                </Suspense>
            </main>
            <SiteFooter />
        </div>
    );
}
