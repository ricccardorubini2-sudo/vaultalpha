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
            </Routes>
        </Router>
    );
}

export default App;
