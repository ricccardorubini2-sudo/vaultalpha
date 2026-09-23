import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import LegalPage from './pages/LegalPage';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/privacy-policy" element={<LegalPage />} />
                <Route path="/terms-of-service" element={<LegalPage />} />
                <Route path="/disclosures" element={<LegalPage />} />
                <Route path="/cookie-settings" element={<LegalPage />} />
            </Routes>
            <CookieConsent />
        </Router>
    );
}

export default App;
