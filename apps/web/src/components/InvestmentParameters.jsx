import React from 'react';
import { INVESTMENT_PARAMETERS_NOTE, getPublicParameters } from '@/config/investmentParameters';

const formatValue = (value) => (Array.isArray(value) ? value.join(' · ') : value);

/**
 * variant: 'compact' (homepage summary) | 'detailed' (Strategy page)
 * fields:  optional list of parameter ids to include, in display order
 */
export default function InvestmentParameters({
    variant = 'compact',
    fields,
    title = 'Investment Parameters',
    intro,
    showNote = true,
    className = '',
}) {
    const items = getPublicParameters(fields);

    if (items.length === 0) return null;

    if (variant === 'detailed') {
        return (
            <div className={className}>
                {(title || intro) && (
                    <div className="max-w-2xl">
                        {title && <h3 className="font-display text-2xl font-medium tracking-tight text-slate-900 lg:text-3xl">{title}</h3>}
                        {intro && <p className="mt-3 leading-relaxed text-slate-600">{intro}</p>}
                    </div>
                )}
                <dl className={`${title || intro ? 'mt-10' : ''} border-t border-slate-900`}>
                    {items.map((p) => (
                        <div key={p.id} className="grid gap-3 border-b border-slate-200 py-7 md:grid-cols-12 md:gap-8">
                            <dt className="text-sm text-slate-500 md:col-span-4 md:pt-1">{p.label}</dt>
                            <dd className="md:col-span-8">
                                <span className="font-display text-xl font-medium tracking-tight text-slate-900">{formatValue(p.value)}</span>
                                {p.detail && <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.detail}</p>}
                            </dd>
                        </div>
                    ))}
                </dl>
                {showNote && INVESTMENT_PARAMETERS_NOTE && (
                    <p className="mt-6 text-xs text-slate-500">{INVESTMENT_PARAMETERS_NOTE}</p>
                )}
            </div>
        );
    }

    return (
        <div className={`border-y border-slate-200 ${className}`}>
            {title && <p className="pt-6 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{title}</p>}
            <dl className="flex flex-wrap gap-x-12">
                {items.map((p) => (
                    <div key={p.id} className={`flex-1 py-6 ${Array.isArray(p.value) ? 'basis-[22rem]' : 'basis-[12rem]'}`}>
                        <dt className="text-sm text-slate-500">{p.label}</dt>
                        <dd className="mt-2">
                            <span className="text-slate-900">{formatValue(p.value)}</span>
                            {p.detail && <p className="mt-1 text-sm text-slate-500">{p.detail}</p>}
                        </dd>
                    </div>
                ))}
            </dl>
            {showNote && INVESTMENT_PARAMETERS_NOTE && (
                <p className="border-t border-slate-200 py-3 text-xs text-slate-500">{INVESTMENT_PARAMETERS_NOTE}</p>
            )}
        </div>
    );
}
