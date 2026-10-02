import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Copy, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel } from '@/components/site/primitives';
import {
    CONTACT_CATEGORIES,
    CONTACT_EMAIL_PENDING_LABEL,
    getContactEmailWithFallback,
    getContactPhone,
    buildMailto,
} from '@/config/contact';
import { getPublicLocations, getLocationTypeLabel } from '@/data/locations';
import { hasValue } from '@/data/portfolio';

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);
    if (typeof navigator === 'undefined' || !navigator.clipboard) return null;
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked; the address remains visible to copy manually.
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label={copied ? `${label} copied` : `Copy ${label}`}
        >
            {copied ? <Check className="h-4 w-4 text-slate-900" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
    );
}

function ContactPath({ category, index }) {
    const email = getContactEmailWithFallback(category.id);
    const phone = getContactPhone(category.id);
    return (
        <li className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
                <span className="text-sm tabular-nums text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-slate-900">{category.label}</h2>
                <p className="mt-1.5 text-sm text-slate-500">{category.description}</p>
            </div>

            <div className="md:col-span-5">
                {email ? (
                    <div className="flex items-center gap-2">
                        <a href={buildMailto(email, category.subject)} className="break-all font-display text-lg text-slate-900 underline-offset-4 hover:underline">
                            {email}
                        </a>
                        <CopyButton value={email} label={`${category.label} email address`} />
                    </div>
                ) : (
                    <p className="text-slate-400">{CONTACT_EMAIL_PENDING_LABEL}</p>
                )}
                {phone && (
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-3 flex items-center gap-2 text-slate-700 hover:text-slate-900">
                        <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" />{phone}
                    </a>
                )}
                {category.note && <p className="mt-3 text-sm leading-relaxed text-slate-500">{category.note}</p>}
            </div>

            <div className="flex items-start md:col-span-3 md:justify-end">
                {category.action ? (
                    <Link to={category.action.to} className="group inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                        {category.action.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                ) : email ? (
                    <a href={buildMailto(email, category.subject)} className="group inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900">
                        Send an email <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                ) : null}
            </div>
        </li>
    );
}

function Locations({ locations }) {
    return (
        <div className="mt-20">
            <SectionLabel as="h2">{locations.length === 1 ? 'Address' : 'Addresses'}</SectionLabel>
            <ul className="mt-8 grid gap-px overflow-hidden border-y border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                {locations.map((l) => {
                    const type = getLocationTypeLabel(l);
                    return (
                        <li key={l.id} className="bg-white p-7">
                            <div className="font-display text-lg font-medium tracking-tight text-slate-900">
                                {l.city}
                            </div>
                            {type && <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{type}</p>}
                            <address className="mt-4 text-sm not-italic leading-relaxed text-slate-600">
                                {hasValue(l.address) && <>{l.address}<br /></>}
                                {l.country !== l.city && l.country}
                            </address>
                            {hasValue(l.description) && <p className="mt-3 text-sm text-slate-500">{l.description}</p>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// Contact paths from config/contact.js, plus verified addresses when any exist.
export default function ContactSection({ className = 'bg-white', spacing = 'compact' }) {
    const locations = getPublicLocations();
    return (
        <Section id="contact" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <ul className="divide-y divide-slate-200 border-y border-slate-200">
                        {CONTACT_CATEGORIES.map((c, i) => <ContactPath key={c.id} category={c} index={i} />)}
                    </ul>
                </Reveal>
                {locations.length > 0 && (
                    <Reveal delay={0.1}>
                        <Locations locations={locations} />
                    </Reveal>
                )}
            </Container>
        </Section>
    );
}
