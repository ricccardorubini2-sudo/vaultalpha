import React, { lazy } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SiteLayout from './components/site/SiteLayout';
import HomePage from './pages/HomePage';
import { LAZY_ROUTES, NOT_FOUND_PAGE, getPage } from './routes';

const components = {};
const lazyPage = (id) => (components[id] ??= lazy(getPage(id).load));
const NotFoundPage = lazyPage(NOT_FOUND_PAGE);

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<HomePage />} />
                    {LAZY_ROUTES.map(({ path, page, props }) => {
                        const Page = lazyPage(page);
                        return <Route key={path} path={path} element={<Page key={props?.slug} {...props} />} />;
                    })}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
                <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
                <Route path="/cookie-settings" element={<Navigate to="/cookies" replace />} />
                <Route path="/founders" element={<Navigate to="/contact" replace />} />
                <Route path="/team/svitlana-pancuk" element={<Navigate to="/team" replace />} />
                <Route path="/portfolio/bvnk" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/layerzero" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/privy" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/maple-finance" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/morpho" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/turnkey" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/zerohash" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/fireblocks" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/anchorage-digital" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/figment" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/copper" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/plume" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/eigenlayer" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio/wormhole" element={<Navigate to="/portfolio" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
