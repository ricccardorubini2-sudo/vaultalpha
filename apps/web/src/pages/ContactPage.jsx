import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { HEADER_IMAGES } from '@/config/headerImages';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
    return (
        <>
            <PageHeader image={HEADER_IMAGES.contact} label="Contact" title="Contact" intro="How to reach the VaultAlpha team." />
            <ContactSection />
        </>
    );
}
