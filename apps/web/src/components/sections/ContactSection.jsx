import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { Section, Container, SectionLabel } from '@/components/site/primitives';
import { getPublicContactCategories, getContactEmail, buildMailto } from '@/config/contact';
import { getPublicLocations, getLocationTypeLabel } from '@/data/locations';
import { hasValue } from '@/data/portfolio';
import { formatRegisteredAddress } from '@/config/company';
import buildingPicture from '@/assets/contact/building.jpg?w=480;768;1024&format=avif;webp;jpg&quality=78&as=picture';
import mapPicture from '@/assets/contact/map.png?w=480;768;1024&format=webp;png&quality=90&as=picture';

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
    const email = getContactEmail(category.id);
    return (
        <li className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
                <span className="text-sm tabular-nums text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-slate-900">{category.label}</h2>
                <p className="mt-1.5 text-sm text-slate-500">{category.description}</p>
            </div>

            <div className="md:col-span-5">
                {email && (
                    <div className="flex items-center gap-2">
                        <a href={buildMailto(email, category.subject)} className="break-all font-display text-lg text-slate-900 underline-offset-4 hover:underline">
                            {email}
                        </a>
                        <CopyButton value={email} label={`${category.label} email address`} />
                    </div>
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

const MIME = { avif: 'image/avif', webp: 'image/webp', jpeg: 'image/jpeg', jpg: 'image/jpeg', png: 'image/png' };

function Photo({ picture, alt, sizes, className = '' }) {
    return (
        <picture>
            {Object.entries(picture.sources ?? {}).map(([format, srcSet]) => (
                <source key={format} type={MIME[format]} srcSet={srcSet} sizes={sizes} />
            ))}
            <img
                src={picture.img.src}
                width={picture.img.w}
                height={picture.img.h}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover ${className}`}
            />
        </picture>
    );
}

function Locations({ locations }) {
    const address = formatRegisteredAddress();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    return (
        <div className="mt-20">
            <SectionLabel as="h2">{locations.length === 1 ? 'Office' : 'Offices'}</SectionLabel>
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
                <figure className="overflow-hidden rounded-md bg-[hsl(var(--mist))] lg:col-span-7">
                    <Photo
                        picture={buildingPicture}
                        alt="Exterior of the VaultAlpha office building"
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="aspect-[4/3] lg:aspect-auto"
                    />
                </figure>
                <div className="flex flex-col gap-6 lg:col-span-5">
                    <LocationList locations={locations} />
                    <figure className="group">
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            aria-hidden="true"
                            className="block overflow-hidden rounded-md border border-slate-200"
                        >
                            <Photo
                                picture={mapPicture}
                                alt={`Map showing the office at ${address}`}
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            />
                        </a>
                        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
                            <span>{address}</span>
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-slate-900 underline-offset-4 hover:underline"
                            >
                                Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}

function LocationList({ locations }) {
    return (
        <ul className="grid gap-px overflow-hidden border-y border-slate-200 bg-slate-200">
            {locations.map((l) => {
                const type = getLocationTypeLabel(l);
                return (
                    <li key={l.id} className="bg-[hsl(var(--card))] p-7">
                        <div className="font-display text-lg font-medium tracking-tight text-slate-900">
                            {l.city}
                        </div>
                        {type && <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{type}</p>}
                        <address className="mt-4 text-sm not-italic leading-relaxed text-slate-600">
                            {hasValue(l.address) && <>{l.address}<br /></>}
                            {[l.region, l.country].filter(hasValue).join(', ')}
                        </address>
                        {hasValue(l.description) && <p className="mt-3 text-sm text-slate-500">{l.description}</p>}
                    </li>
                );
            })}
        </ul>
    );
}

// Contact paths from config/contact.js, plus verified addresses when any exist.
export default function ContactSection({ className = 'bg-canvas', spacing = 'compact' }) {
    const locations = getPublicLocations();
    return (
        <Section id="contact" className={className} spacing={spacing}>
            <Container>
                <Reveal>
                    <ul className="divide-y divide-slate-200 border-y border-slate-200">
                        {getPublicContactCategories().map((c, i) => <ContactPath key={c.id} category={c} index={i} />)}
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
