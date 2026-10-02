import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import ContactSection from '@/components/sections/ContactSection';
import CareersSection from '@/components/sections/CareersSection';

export default function ContactPage() {
    return (
        <>
            <PageHeader label="Contact" title="Contact" intro="Choose the path that matches your enquiry so it reaches the right team." />
            <ContactSection />
            <CareersSection className="bg-[#f5f6f8]" spacing="compact" showPartners={false} />
        </>
    );
}
