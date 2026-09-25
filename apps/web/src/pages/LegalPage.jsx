import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { COOKIE_DEFAULTS, readCookiePrefs, writeCookiePrefs } from '@/lib/cookies';

const BRAND = 'VaultAlpha Fund';
const DOMAIN = 'vaultalpha.fund';
const CONTACT = 'founders@vaultalpha.fund';
const UPDATED = '22 September 2026';

const LEGAL_NAV = [
    { slug: 'privacy-policy', label: 'Privacy Policy' },
    { slug: 'terms-of-service', label: 'Terms of Service' },
    { slug: 'disclosures', label: 'Disclosures' },
    { slug: 'cookie-settings', label: 'Cookie Settings' },
];

const SECTIONS = {
    'privacy-policy': {
        title: 'Privacy Policy',
        subtitle: 'How we collect, use, and protect information when you visit vaultalpha.fund or contact our firm.',
        body: [
            {
                heading: '1. Who we are',
                paragraphs: [
                    `${BRAND} (“we”, “us”, or “our”) operates the website at ${DOMAIN}. We are a technology investment institution partnering with founders across blockchain infrastructure, artificial intelligence, digital finance, digital assets, cybersecurity, and related fields. Our principal offices are in London, New York, and Singapore.`,
                    `Questions about this policy may be sent to ${CONTACT}.`,
                ],
            },
            {
                heading: '2. Information we collect',
                paragraphs: [
                    'We may collect information you choose to provide, including your name, work email, company name, funding stage, and any message you submit through our founder application or research subscription forms.',
                    'We may also collect limited technical data automatically, such as browser type, device identifiers, approximate location derived from IP address, pages viewed, and referring URLs. This helps us operate, secure, and improve the site.',
                ],
            },
            {
                heading: '3. How we use information',
                paragraphs: [
                    'We use personal information to review founder applications, respond to enquiries, send research updates you request, maintain the security of our systems, analyse aggregate site performance, and meet legal or regulatory obligations.',
                    'We do not sell personal information. We do not use founder application materials for marketing to third parties.',
                ],
            },
            {
                heading: '4. Sharing',
                paragraphs: [
                    'We may share information with trusted service providers who help us host the site, process email, or provide analytics — only as needed to perform those services and under confidentiality obligations.',
                    'We may also disclose information if required by law, regulation, legal process, or to protect the rights, safety, and integrity of VaultAlpha Fund, our portfolio companies, or others.',
                ],
            },
            {
                heading: '5. Retention and security',
                paragraphs: [
                    'We retain application and contact records for as long as reasonably necessary to evaluate opportunities, maintain business records, and comply with applicable law. Technical logs are kept for shorter operational periods unless a security or legal issue requires longer retention.',
                    'We apply administrative and technical safeguards appropriate to the sensitivity of the data. No method of transmission over the internet is completely secure; please use care when sharing confidential materials.',
                ],
            },
            {
                heading: '6. Your choices',
                paragraphs: [
                    'Depending on where you live, you may have rights to access, correct, delete, or restrict processing of your personal information, or to withdraw consent for optional communications. To exercise these rights, email us at the address above. You may unsubscribe from research emails at any time using the link in those messages.',
                    'For cookie preferences, see our Cookie Settings page.',
                ],
            },
            {
                heading: '7. International transfers',
                paragraphs: [
                    'Because we operate globally, information may be processed in countries other than where you reside, including the United Kingdom, the United States, and Singapore. Where required, we use appropriate safeguards for cross-border transfers.',
                ],
            },
            {
                heading: '8. Updates',
                paragraphs: [
                    `We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page reflects the latest revision. Continued use of the site after changes means you acknowledge the updated policy.`,
                ],
            },
        ],
    },
    'terms-of-service': {
        title: 'Terms of Service',
        subtitle: 'The conditions that govern your use of the VaultAlpha Fund website and related online materials.',
        body: [
            {
                heading: '1. Acceptance',
                paragraphs: [
                    `By accessing ${DOMAIN}, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the site.`,
                ],
            },
            {
                heading: '2. Informational purpose only',
                paragraphs: [
                    'This website is provided for general informational purposes. Nothing on this site constitutes an offer to sell, a solicitation to buy, or a recommendation regarding any security, digital asset, fund interest, or investment product.',
                    'Content describing our investment focus areas — including blockchain infrastructure, AI, stablecoins, real-world assets, cybersecurity, and developer tools — is illustrative of our research interests and does not guarantee future investment activity.',
                ],
            },
            {
                heading: '3. No investment advice',
                paragraphs: [
                    'VaultAlpha Fund does not provide personalised investment, legal, tax, or accounting advice through this website. You should consult qualified professional advisers before making any investment decision. Past performance of any portfolio company or strategy referenced here is not indicative of future results.',
                ],
            },
            {
                heading: '4. Founder applications',
                paragraphs: [
                    'Submitting an application through our contact form does not create an obligation for us to invest, respond within a specific timeframe beyond our stated courtesy window, or keep materials confidential beyond reasonable industry practice and any separate non-disclosure agreement we may execute.',
                    'You represent that information you submit is accurate to the best of your knowledge and that you have the right to share it with us.',
                ],
            },
            {
                heading: '5. Intellectual property',
                paragraphs: [
                    `The site’s design, text, graphics, logos, research titles, and other content are owned by ${BRAND} or our licensors. You may view and share links for personal, non-commercial use. You may not copy, scrape, reverse engineer, or commercially exploit the site without our prior written consent.`,
                ],
            },
            {
                heading: '6. Third-party sites and portfolio companies',
                paragraphs: [
                    'Links to portfolio companies, research imagery hosts, or other third-party websites are provided for convenience. We do not control and are not responsible for third-party content, privacy practices, or availability.',
                ],
            },
            {
                heading: '7. Acceptable use',
                paragraphs: [
                    'You agree not to misuse the site — including attempting unauthorised access, introducing malware, overloading infrastructure, harvesting data, or using automated systems in a way that impairs service for others.',
                ],
            },
            {
                heading: '8. Disclaimer and limitation of liability',
                paragraphs: [
                    'The site is provided “as is” and “as available” without warranties of any kind, express or implied. To the fullest extent permitted by law, VaultAlpha Fund and its partners, officers, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site.',
                ],
            },
            {
                heading: '9. Governing law',
                paragraphs: [
                    'These terms are governed by the laws of England and Wales, without regard to conflict-of-law principles, except where mandatory local consumer or investor-protection rules apply. Courts in London shall have non-exclusive jurisdiction, subject to those mandatory rights.',
                ],
            },
            {
                heading: '10. Contact',
                paragraphs: [
                    `For questions about these Terms, contact ${CONTACT}.`,
                ],
            },
        ],
    },
    disclosures: {
        title: 'Disclosures',
        subtitle: 'Important notices regarding investments, digital assets, and the nature of information on this site.',
        body: [
            {
                heading: '1. General risk warning',
                paragraphs: [
                    'Investing in private technology companies, blockchain protocols, digital assets, and early-stage ventures involves substantial risk, including the possible loss of all capital invested. Markets can be volatile. Liquidity may be limited. Regulatory frameworks continue to evolve.',
                ],
            },
            {
                heading: '2. Not an offer or solicitation',
                paragraphs: [
                    `Nothing on ${DOMAIN} is an offer to sell or a solicitation of an offer to buy interests in any fund, special purpose vehicle, or security managed or advised by ${BRAND}. Any offering, if made, will be made only pursuant to definitive offering documents and only to persons who meet applicable eligibility and suitability requirements under the laws of their jurisdiction.`,
                ],
            },
            {
                heading: '3. Forward-looking statements',
                paragraphs: [
                    'Statements about markets, technology frontiers, portfolio themes, or “the next decade” are forward-looking and inherently uncertain. Actual outcomes may differ materially. We undertake no obligation to update forward-looking content.',
                ],
            },
            {
                heading: '4. Portfolio companies',
                paragraphs: [
                    'References to portfolio or partner companies are illustrative and may not represent a complete list of investments. Company logos and names are the property of their respective owners and are used for identification. Inclusion does not imply endorsement of VaultAlpha Fund by those companies, nor does it constitute a recommendation to invest in them.',
                    'Status labels such as “Active” or “Growth” and stage labels such as “Seed” or “Series A” are descriptive summaries and may change over time.',
                ],
            },
            {
                heading: '5. Digital assets and decentralised technologies',
                paragraphs: [
                    'Digital assets, stablecoins, tokenised real-world assets, and decentralised systems may be subject to unique risks: smart-contract bugs, custody failures, oracle failures, protocol governance disputes, forks, sanctions exposure, and sudden changes in law or exchange access. These risks can result in total loss.',
                ],
            },
            {
                heading: '6. Research and insights',
                paragraphs: [
                    'Articles and insight titles on this site are educational and thematic. They are not research reports prepared for regulatory purposes, and they should not be relied upon as the sole basis for any investment decision.',
                ],
            },
            {
                heading: '7. Performance figures and statistics',
                paragraphs: [
                    'Figures such as assets under management, number of portfolio companies, countries, or network size are approximate, may be rounded, and may include affiliated or predecessor activity. They are presented for orientation only and are not audited statements.',
                ],
            },
            {
                heading: '8. Regulatory status',
                paragraphs: [
                    'VaultAlpha Fund structures and authorisations vary by jurisdiction and vehicle. Access to certain strategies may be restricted to professional, qualified, or accredited investors. This website does not itself constitute marketing of a regulated fund in any particular jurisdiction.',
                ],
            },
            {
                heading: '9. Contact for disclosure questions',
                paragraphs: [
                    `If you need clarification on any disclosure, email ${CONTACT}.`,
                ],
            },
        ],
    },
};

function CookieSettingsPanel() {
    const [prefs, setPrefs] = useState(readCookiePrefs);
    const [saved, setSaved] = useState(false);

    const toggle = (key) => {
        if (key === 'essential') return;
        setPrefs((p) => ({ ...p, [key]: !p[key] }));
        setSaved(false);
    };

    const save = () => {
        writeCookiePrefs(prefs);
        setSaved(true);
    };

    const acceptAll = () => {
        const next = { essential: true, analytics: true, functional: true };
        setPrefs(next);
        writeCookiePrefs(next);
        setSaved(true);
    };

    const rejectOptional = () => {
        const next = { ...COOKIE_DEFAULTS };
        setPrefs(next);
        writeCookiePrefs(next);
        setSaved(true);
    };

    const rows = [
        {
            key: 'essential',
            title: 'Essential',
            desc: 'Required for security, load balancing, and basic site operation. Always on.',
        },
        {
            key: 'analytics',
            title: 'Analytics',
            desc: 'Helps us understand aggregate traffic and improve content. No sale of personal data.',
        },
        {
            key: 'functional',
            title: 'Functional',
            desc: 'Remembers preferences such as research-subscription prompts and interface choices.',
        },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                    We use cookies and similar technologies on {DOMAIN} to run the site securely and, with your consent, to understand how visitors use our pages. Essential cookies cannot be switched off.
                </p>
                <p>
                    Your choices are stored in this browser. You can return to this page at any time to update them. For how we handle personal data more broadly, see our{' '}
                    <Link to="/privacy-policy" className="text-sky-400 underline-offset-2 hover:underline">Privacy Policy</Link>.
                </p>
            </div>

            <div className="space-y-3">
                {rows.map((row) => (
                    <div
                        key={row.key}
                        className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="max-w-xl">
                            <h3 className="font-display text-lg font-semibold text-slate-900">{row.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">{row.desc}</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={prefs[row.key]}
                            disabled={row.key === 'essential'}
                            onClick={() => toggle(row.key)}
                            className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                                prefs[row.key] ? 'bg-sky-500' : 'bg-slate-200'
                            } ${row.key === 'essential' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                        >
                            <span
                                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
                                    prefs[row.key] ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={save}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Save preferences
                </button>
                <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-sky-400/50"
                >
                    Accept all
                </button>
                <button
                    type="button"
                    onClick={rejectOptional}
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                    Reject optional
                </button>
                {saved && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-sky-600">
                        <Check className="h-4 w-4" /> Saved in this browser
                    </span>
                )}
            </div>
        </div>
    );
}

export default function LegalPage() {
    const { pathname } = useLocation();
    const slug = pathname.replace(/^\//, '');
    const isCookies = slug === 'cookie-settings';
    const doc = SECTIONS[slug];

    useEffect(() => {
        const title = isCookies
            ? `Cookie Settings — ${BRAND}`
            : doc
              ? `${doc.title} — ${BRAND}`
              : BRAND;
        document.title = title;
    }, [slug, isCookies, doc]);

    if (!isCookies && !doc) {
        return <Navigate to="/privacy-policy" replace />;
    }

    const title = isCookies ? 'Cookie Settings' : doc.title;
    const subtitle = isCookies
        ? 'Choose which optional cookies VaultAlpha Fund may use in this browser.'
        : doc.subtitle;

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute -right-24 top-40 h-[22rem] w-[22rem] rounded-full bg-indigo-400/15 blur-3xl" />
            </div>

            <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-4 lg:px-12">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/logo-mark.png"
                            alt={BRAND}
                            className="h-12 w-12 rounded-xl object-contain shadow-[0_0_24px_-4px_rgba(56,189,248,0.75)]"
                        />
                        <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">{BRAND}</span>
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to site
                    </Link>
                </div>
            </header>

            <main className="relative z-10 mx-auto max-w-[80rem] px-6 py-14 lg:px-12 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <aside className="lg:col-span-3">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-400">Legal</p>
                        <nav className="mt-6 space-y-1">
                            {LEGAL_NAV.map((item) => {
                                const active = item.slug === slug;
                                return (
                                    <Link
                                        key={item.slug}
                                        to={`/${item.slug}`}
                                        className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                                            active
                                                ? 'bg-slate-100 font-medium text-slate-900'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    <article className="lg:col-span-9">
                        <p className="text-xs text-slate-500">Last updated: {UPDATED}</p>
                        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">{subtitle}</p>

                        <div className="mt-12 border-t border-slate-200 pt-10">
                            {isCookies ? (
                                <CookieSettingsPanel />
                            ) : (
                                <div className="space-y-10">
                                    {doc.body.map((section) => (
                                        <section key={section.heading}>
                                            <h2 className="font-display text-xl font-semibold text-slate-900">
                                                {section.heading}
                                            </h2>
                                            <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">
                                                {section.paragraphs.map((p) => (
                                                    <p key={p.slice(0, 48)}>{p}</p>
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p className="mt-14 text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} {BRAND}. Investments involve risk. This site is for informational purposes only.
                        </p>
                    </article>
                </div>
            </main>
        </div>
    );
}
