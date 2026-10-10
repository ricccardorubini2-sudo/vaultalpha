import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import HumanCheck from './HumanCheck';
import RouteSeo from '@/components/seo/RouteSeo';
import { needsHumanCheck } from '@/lib/humanCheck';

// Pages load as separate chunks. The fallback holds the viewport so the footer
// never flashes up while a page's code arrives on a first visit; in-app
// navigation keeps the current page on screen until the next one is ready.
const PageFallback = () => <div className="min-h-screen bg-ink" aria-hidden="true" />;

export default function SiteLayout() {
    const [checking, setChecking] = useState(needsHumanCheck);
    const contentRef = useRef(null);

    // The page behind the check must not be reachable by keyboard or screen reader.
    useEffect(() => {
        if (contentRef.current) contentRef.current.inert = checking;
    }, [checking]);

    return (
        <div className="bg-canvas">
            <RouteSeo />
            <div ref={contentRef}>
                <SiteNav />
                <main id="main-content" tabIndex={-1} className="focus:outline-none">
                    <Suspense fallback={<PageFallback />}>
                        <Outlet />
                    </Suspense>
                </main>
                <SiteFooter />
            </div>
            {checking && <HumanCheck onVerified={() => setChecking(false)} />}
        </div>
    );
}
