import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Mail, AlertCircle, Loader2 } from 'lucide-react';
import {
    applicationSchema,
    APPLICATION_DEFAULTS,
    submitApplication,
    getCooldownRemaining,
    canSubmitApplication,
} from '@/lib/founderApplication';
import {
    APPLICATION_SECTOR_OPTIONS,
    APPLICATION_STAGE_OPTIONS,
    APPLICATION_LIMITS,
    APPLICATION_FALLBACK_EMAIL,
} from '@/config/founders';
import { APPLICATION_REVIEW_NOTE } from '@/config/contact';

function Field({ id, label, optional, hint, error, children, className = '' }) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-slate-700">
                <span>{label}{!optional && <span aria-hidden="true" className="text-slate-400"> *</span>}</span>
                {optional && <span className="text-xs font-normal text-slate-400">Optional</span>}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{error}
                </p>
            ) : hint ? (
                <p id={`${id}-hint`} className="text-xs text-slate-500">{hint}</p>
            ) : null}
        </div>
    );
}

const Fieldset = ({ legend, children }) => (
    <fieldset className="grid gap-5 border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 sm:grid-cols-2">
        <legend className="float-left mb-1 w-full text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:col-span-2">{legend}</legend>
        {children}
    </fieldset>
);

function ResultPanel({ icon: Icon, title, children, onReset }) {
    return (
        <div role="status" className="flex flex-col items-center px-4 py-16 text-center">
            <Icon className="h-8 w-8 text-slate-900" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-slate-900">{title}</h3>
            <div className="mt-3 max-w-md leading-relaxed text-slate-500">{children}</div>
            <button type="button" onClick={onReset} className="mt-8 text-sm font-medium text-slate-900 underline-offset-4 hover:underline">
                Submit another company
            </button>
        </div>
    );
}

export default function FounderApplicationForm() {
    const startedAt = useRef(Date.now());
    const honeypot = useRef(null);
    const [result, setResult] = useState(null);
    const [formError, setFormError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(applicationSchema),
        defaultValues: APPLICATION_DEFAULTS,
        mode: 'onTouched',
    });

    const descriptionLength = (watch('description') ?? '').trim().length;

    const a11y = (name, hasHint) => ({
        id: `apply-${name}`,
        'aria-invalid': errors[name] ? 'true' : 'false',
        'aria-describedby': errors[name] ? `apply-${name}-error` : hasHint ? `apply-${name}-hint` : undefined,
    });

    const onSubmit = async (data) => {
        setFormError('');
        // Bots fill hidden fields; show the normal success state without sending.
        if (honeypot.current?.value) {
            setResult('sent');
            return;
        }
        if ((Date.now() - startedAt.current) / 1000 < APPLICATION_LIMITS.minFillSeconds) {
            setFormError('That was quick. Please check your details and submit again.');
            return;
        }
        const wait = getCooldownRemaining();
        if (wait > 0) {
            setFormError(`You have just submitted an application. Please wait ${wait} seconds before sending another.`);
            return;
        }
        try {
            const { status } = await submitApplication(data);
            setResult(status);
        } catch {
            setFormError(
                APPLICATION_FALLBACK_EMAIL
                    ? `We could not send your application. Please try again, or email ${APPLICATION_FALLBACK_EMAIL}.`
                    : 'We could not send your application. Please try again later.',
            );
        }
    };

    const startOver = () => {
        reset(APPLICATION_DEFAULTS);
        startedAt.current = Date.now();
        setResult(null);
        setFormError('');
    };

    const card = 'relative rounded-lg border border-slate-200 bg-white p-7 lg:p-10';

    if (!canSubmitApplication) {
        return (
            <div className={card}>
                <p className="text-slate-600">Online applications are not available yet. Please check back soon.</p>
            </div>
        );
    }

    if (result === 'sent') {
        return (
            <div className={card}>
                <ResultPanel icon={Check} title="Application received" onReset={startOver}>
                    <p>Thank you. {APPLICATION_REVIEW_NOTE}</p>
                </ResultPanel>
            </div>
        );
    }

    if (result === 'email') {
        return (
            <div className={card}>
                <ResultPanel icon={Mail} title="One more step" onReset={startOver}>
                    <p>
                        Your email app should now be open with your application filled in. Send that email to complete your submission.
                        {' '}If nothing opened, email your details to{' '}
                        <a href={`mailto:${APPLICATION_FALLBACK_EMAIL}`} className="font-medium text-slate-900 underline underline-offset-4">{APPLICATION_FALLBACK_EMAIL}</a>.
                    </p>
                </ResultPanel>
            </div>
        );
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={card} aria-describedby="apply-required-note">
            {(formError || hasErrors) && (
                <div role="alert" className="mb-8 flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <p>{formError || 'Please correct the highlighted fields below.'}</p>
                </div>
            )}

            <div className="space-y-8">
                <Fieldset legend="Founder">
                    <Field id="apply-founderName" label="Founder name" error={errors.founderName?.message}>
                        <input {...register('founderName')} {...a11y('founderName')} autoComplete="name" className="field-input" />
                    </Field>
                    <Field id="apply-workEmail" label="Work email" error={errors.workEmail?.message}>
                        <input {...register('workEmail')} {...a11y('workEmail')} type="email" autoComplete="email" inputMode="email" className="field-input" />
                    </Field>
                    <Field id="apply-linkedinUrl" label="LinkedIn" optional hint="Your profile or the company page." error={errors.linkedinUrl?.message} className="sm:col-span-2">
                        <input {...register('linkedinUrl')} {...a11y('linkedinUrl', true)} type="url" inputMode="url" placeholder="linkedin.com/in/…" className="field-input" />
                    </Field>
                </Fieldset>

                <Fieldset legend="Company">
                    <Field id="apply-company" label="Company" error={errors.company?.message}>
                        <input {...register('company')} {...a11y('company')} autoComplete="organization" className="field-input" />
                    </Field>
                    <Field id="apply-companyWebsite" label="Company website" optional error={errors.companyWebsite?.message}>
                        <input {...register('companyWebsite')} {...a11y('companyWebsite')} type="url" inputMode="url" placeholder="company.com" className="field-input" />
                    </Field>
                    <Field id="apply-sector" label="Sector" error={errors.sector?.message}>
                        <select {...register('sector')} {...a11y('sector')} className="field-input">
                            <option value="" disabled>Select a sector</option>
                            {APPLICATION_SECTOR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </Field>
                    <Field id="apply-stage" label="Stage" error={errors.stage?.message}>
                        <select {...register('stage')} {...a11y('stage')} className="field-input">
                            <option value="" disabled>Select a stage</option>
                            {APPLICATION_STAGE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </Field>
                    <Field id="apply-geography" label="Geography" hint="Where the company is based." error={errors.geography?.message}>
                        <input {...register('geography')} {...a11y('geography', true)} autoComplete="country-name" placeholder="e.g. United Kingdom" className="field-input" />
                    </Field>
                    <Field id="apply-fundraisingAmount" label="Fundraising amount" optional hint="The round you are raising." error={errors.fundraisingAmount?.message}>
                        <input {...register('fundraisingAmount')} {...a11y('fundraisingAmount', true)} placeholder="e.g. $3M seed" className="field-input" />
                    </Field>
                    <Field
                        id="apply-description"
                        label="Short company description"
                        hint={`What you are building, for whom and why now. ${descriptionLength}/${APPLICATION_LIMITS.descriptionMax}`}
                        error={errors.description?.message}
                        className="sm:col-span-2"
                    >
                        <textarea {...register('description')} {...a11y('description', true)} rows={5} maxLength={APPLICATION_LIMITS.descriptionMax} className="field-input resize-y" />
                    </Field>
                    <Field id="apply-deckUrl" label="Deck link" optional hint="A shareable link (e.g. DocSend, Google Drive, or Dropbox). File uploads are not supported." error={errors.deckUrl?.message} className="sm:col-span-2">
                        <input {...register('deckUrl')} {...a11y('deckUrl', true)} type="url" inputMode="url" placeholder="https://" className="field-input" />
                    </Field>
                    <Field id="apply-notes" label="Additional notes" optional error={errors.notes?.message} className="sm:col-span-2">
                        <textarea {...register('notes')} {...a11y('notes')} rows={3} maxLength={APPLICATION_LIMITS.notesMax} className="field-input resize-y" />
                    </Field>
                </Fieldset>

                {/* Honeypot: hidden from people and assistive tech, visible to naive bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="apply-company-fax">Company fax</label>
                    <input ref={honeypot} id="apply-company-fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="border-t border-slate-200 pt-8">
                    <label className="flex items-start gap-3 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            {...register('consent')}
                            aria-invalid={errors.consent ? 'true' : 'false'}
                            aria-describedby={errors.consent ? 'apply-consent-error' : undefined}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-slate-900"
                        />
                        <span>
                            I have read the <Link to="/privacy" className="font-medium text-slate-900 underline underline-offset-4">privacy policy</Link> and agree to VaultAlpha using these details to review my application.
                        </span>
                    </label>
                    {errors.consent && (
                        <p id="apply-consent-error" className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{errors.consent.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p id="apply-required-note" className="text-xs text-slate-500"><span className="text-slate-400">*</span> Required</p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…</>
                        ) : (
                            <>Submit your company <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
