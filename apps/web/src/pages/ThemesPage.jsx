import React from 'react';
import PageHeader from '@/components/site/PageHeader';
import { HEADER_IMAGES } from '@/config/headerImages';
import ThemesFocusSection from '@/components/sections/ThemesFocusSection';
import FounderCtaSection from '@/components/sections/FounderCtaSection';
import { THEMES_PAGE_INTRO } from '@/config/themes';

export default function ThemesPage() {
    return (
        <>
            <PageHeader
                image={HEADER_IMAGES.themes}
                label="Investment Themes"
                title="Building the Real Economy of Digital Assets"
                intro={THEMES_PAGE_INTRO}
            />
            <ThemesFocusSection className="bg-canvas" showHeader={false} />
            <FounderCtaSection />
        </>
    );
}
