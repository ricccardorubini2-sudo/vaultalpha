// Written by the development team to reflect what the site actually does
// (see config/siteTechnology.js). Published without the draft notice at the
// owner's request (2026-10-10); it has not been reviewed by lawyers.

import { BRAND, DOMAIN, LEGAL_NAME } from '../../config/site.js';
import { PRIMARY_CONTACT_EMAIL } from '../../config/contact.js';
import { COOKIES, BROWSER_STORAGE, THIRD_PARTY_SERVICES, HOSTING_PROVIDER } from '../../config/siteTechnology.js';
import { COMPANY_REGISTRATION, formatRegisteredAddress, companyInformationSection } from '../../config/company.js';

export default {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: `How ${BRAND} handles personal information collected through ${DOMAIN}.`,
    status: 'published',
    lastUpdated: null,
    sections: [
        {
            id: 'who-we-are',
            heading: 'Who we are',
            blocks: [
                // TODO (counsel): add any data-protection representative required for the UK or EU.
                `This website is operated by ${LEGAL_NAME} (“we”, “us”), a ${COMPANY_REGISTRATION.entityType} registered in ${COMPANY_REGISTRATION.jurisdiction} (document number ${COMPANY_REGISTRATION.documentNumber}), with its registered address at ${formatRegisteredAddress()}. Questions about this policy may be sent to ${PRIMARY_CONTACT_EMAIL}.`,
            ],
        },
        companyInformationSection(LEGAL_NAME),
        {
            id: 'what-we-collect',
            heading: 'Information we collect',
            blocks: [
                `Emails and founder applications. This website has no forms. If you email us, for example to ${PRIMARY_CONTACT_EMAIL} about your company, we receive your email address and whatever you include in your message, such as a company overview or deck link.`,
                'Technical data. When you visit the site, our hosting provider and the third-party services listed below receive standard technical information, such as your IP address, browser type and the time of the request, as part of delivering the site.',
                'We do not ask for sensitive personal information, and we ask that you do not include it in applications or emails.',
            ],
        },
        {
            id: 'what-we-do-not-use',
            heading: 'What this website does not use',
            blocks: [
                `This website ${COOKIES.length === 0 ? 'does not set cookies and ' : ''}does not use analytics, advertising, tracking pixels, session recording, or social media plugins.`,
            ],
        },
        {
            id: 'how-we-use',
            heading: 'How we use information',
            blocks: [
                {
                    type: 'list',
                    items: [
                        'To review founder applications and respond to them.',
                        'To reply to emails and enquiries.',
                        'To protect the site against spam and abuse.',
                        'To comply with legal obligations.',
                    ],
                },
                'We do not sell personal information, and we do not use application materials to market to you or to third parties.',
                // TODO (counsel): confirm legal bases for processing (e.g. legitimate interests, consent) for applicable jurisdictions.
            ],
        },
        {
            id: 'third-parties',
            heading: 'Third-party services',
            blocks: [
                {
                    type: 'table',
                    columns: ['Service', 'Purpose', 'Information received'],
                    rows: THIRD_PARTY_SERVICES.map((s) => [`${s.name} (${s.provider})`, s.purpose, s.data]),
                },
                `The site is delivered by ${HOSTING_PROVIDER}. Links to portfolio company websites, LinkedIn and other external sites take you to services with their own privacy policies.`,
            ],
        },
        {
            id: 'browser-storage',
            heading: 'Information stored in your browser',
            blocks: [
                `${BROWSER_STORAGE.length ? `The site stores ${BROWSER_STORAGE.length === 1 ? 'one small item' : 'a small number of items'} in your browser. It is not sent to us.` : 'The site does not store information in your browser.'} See our Cookies page for details and to clear it.`,
            ],
        },
        {
            id: 'sharing',
            heading: 'Sharing',
            blocks: [
                'We share personal information only with service providers who help us operate the site and handle email or applications, and only as needed for them to provide those services. We may also disclose information where required by law or to protect our rights and the safety of others.',
            ],
        },
        {
            id: 'retention',
            heading: 'Retention',
            blocks: [
                // TODO (counsel): set concrete retention periods for applications and correspondence.
                'We keep application and correspondence records only for as long as needed to evaluate opportunities, maintain business records and meet legal obligations.',
            ],
        },
        {
            id: 'your-rights',
            heading: 'Your rights',
            blocks: [
                `Depending on where you live, you may have the right to access, correct, delete, or restrict the use of your personal information, to object to its use, or to withdraw consent. To make a request, email ${PRIMARY_CONTACT_EMAIL}. You may also have the right to complain to your local data-protection authority.`,
            ],
        },
        {
            id: 'transfers',
            heading: 'International transfers',
            blocks: [
                // TODO (counsel): describe where data is stored and the safeguards used, once providers are confirmed.
                'Our service providers may process information in countries other than the one you live in.',
            ],
        },
        {
            id: 'changes',
            heading: 'Changes to this policy',
            blocks: ['We may update this policy from time to time. Changes take effect when published on this page.'],
        },
    ],
};
