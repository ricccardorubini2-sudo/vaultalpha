import React from 'react';
import { Container } from './primitives';

// Light wrapper for detail pages; top padding clears the fixed nav.
export default function DetailShell({ children }) {
    return (
        <div className="min-h-[70vh] bg-white pb-28 pt-36 lg:pt-44">
            <Container>{children}</Container>
        </div>
    );
}
