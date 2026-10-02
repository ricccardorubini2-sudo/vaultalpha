import React from 'react';
import { Linkedin } from 'lucide-react';

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' };

export default function TestimonialCard({ testimonial }) {
    const { personName, role, company, quote, photo, linkedinUrl, companyUrl } = testimonial;

    return (
        <figure className="flex h-full flex-col border-t border-slate-900 pt-8">
            <blockquote className="flex-1 font-display text-xl font-normal leading-relaxed tracking-[-0.01em] text-slate-900">
                <p>{quote}</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-4">
                {photo && (
                    <img
                        src={photo}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                )}
                <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900">{personName}</div>
                    {(role || company) && (
                        <div className="text-sm text-slate-500">
                            {role}
                            {role && company && ', '}
                            {company && (companyUrl ? (
                                <a href={companyUrl} {...EXTERNAL} className="underline-offset-2 hover:text-slate-900 hover:underline">
                                    {company}
                                    <span className="sr-only"> (opens in a new tab)</span>
                                </a>
                            ) : company)}
                        </div>
                    )}
                </div>
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        {...EXTERNAL}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-900"
                    >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">{personName} on LinkedIn (opens in a new tab)</span>
                    </a>
                )}
            </figcaption>
        </figure>
    );
}
