import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
    return (
        <>
            <PageHeader label="Contact" title="Contact" intro="How to reach the VaultAlpha team." />
            <ContactSection />
        </>
    );
}
