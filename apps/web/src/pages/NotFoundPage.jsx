import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';

export default function NotFoundPage() {
    return (
        <PageHeader label="404" title="Page not found" intro="The page you are looking for does not exist or is no longer available.">
            <Link to="/" className="group mt-10 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-slate-200">
                Back to homepage <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
        </PageHeader>
    );
}
