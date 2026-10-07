import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/config/site';
import { prefetchPath } from '@/routes';
import logoSrc from '@/assets/logo-mark.png?w=96&format=webp&quality=90';
import logoSrcSet from '@/assets/logo-mark.png?w=48;96;144&format=webp&quality=90&as=srcset';

const SPACING = {
    default: 'py-20 sm:py-24 lg:py-32',
    compact: 'py-16 sm:py-20 lg:py-28',
};

export function Section({ id, children, className = '', spacing = 'default', ...rest }) {
    return <section id={id} className={`relative ${SPACING[spacing] ?? SPACING.default} ${className}`} {...rest}>{children}</section>;
}

export const Container = ({ children, className = '' }) => (
    <div className={`mx-auto max-w-[80rem] px-6 lg:px-12 ${className}`}>{children}</div>
);

// `as="h2"` when the label is the only heading of its section.
export const SectionLabel = ({ children, as: Tag = 'div', id, className = '' }) => (
    <Tag id={id} className={`text-[0.7rem] font-medium uppercase tracking-[0.26em] text-slate-500 [.bg-black_&]:text-white/50 [.bg-ink_&]:text-white/50 [.bg-ink-gradient_&]:text-champagne/70 ${className}`}>
        {children}
    </Tag>
);

export const H2 = ({ children, className = '', id }) => (
    <h2 id={id} className={`max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${className}`}>
        {children}
    </h2>
);

const ARROW_LINK_STYLES = {
    solid: 'rounded-sm bg-[hsl(215_42%_12%)] px-5 py-3 font-medium text-white transition-all hover:bg-[hsl(215_42%_18%)]',
    light: 'rounded-sm bg-white px-6 py-3.5 font-medium text-[hsl(215_42%_10%)] transition-all hover:bg-white/90',
    outline: 'rounded-sm border border-white/30 px-6 py-3.5 font-medium text-white transition-all hover:border-champagne/60 hover:bg-white/5',
    text: '-my-2 py-2 font-medium text-slate-900 underline-offset-[6px] transition-colors hover:underline',
};

export const ArrowLink = ({ to, children, variant = 'text', className = '' }) => (
    <Link to={to} onPointerEnter={() => prefetchPath(to)} onFocus={() => prefetchPath(to)} className={`group inline-flex shrink-0 items-center justify-center gap-2 text-sm transition-colors ${ARROW_LINK_STYLES[variant]} ${className}`}>
        {children} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
    </Link>
);

// Label + heading on the left, optional call-to-action on the right.
export const SectionHeader = ({ label, title, intro, action, className = '' }) => (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
        <div className="max-w-3xl">
            {label && <SectionLabel as={title ? 'div' : 'h2'}>{label}</SectionLabel>}
            {title && <H2 className="mt-5">{title}</H2>}
            {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{intro}</p>}
        </div>
        {action}
    </div>
);

export const Logo = ({ dark }) => (
    <Link to="/" className="flex items-center gap-3">
        <img src={logoSrc} srcSet={logoSrcSet} sizes="48px" alt="" width="48" height="48" decoding="async" className="h-11 w-11 object-contain sm:h-12 sm:w-12" />
        <span className={`text-lg font-semibold tracking-[-0.02em] sm:text-xl ${dark ? 'text-slate-900' : 'text-white'}`}>{BRAND}</span>
    </Link>
);
