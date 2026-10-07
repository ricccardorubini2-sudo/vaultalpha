// LEGAL REVIEW REQUIRED BEFORE PUBLICATION
//
// Draft written by the development team to reflect what the site actually
// does (see config/siteTechnology.js). It has NOT been reviewed by lawyers.
// Keep `status: 'draft'` until counsel has approved the final text.

import { BRAND, DOMAIN, LEGAL_NAME } from '../../config/site.js';
import { PRIMARY_CONTACT_EMAIL } from '../../config/contact.js';
import { APPLICATION_ENDPOINT, APPLICATION_FALLBACK_EMAIL } from '../../config/founders.js';
import { COOKIES, BROWSER_STORAGE, THIRD_PARTY_SERVICES, HOSTING_PROVIDER } from '../../config/siteTechnology.js';

const applicationChannel = APPLICATION_ENDPOINT
    ? 'Applications submitted through the form are sent securely to our form-processing provider, who stores them on our behalf.'
    : `Applications are not stored by this website. Submitting the form opens your own email program with the details filled in, and the application reaches us only if you send that email to ${APPLICATION_FALLBACK_EMAIL}.`;

export default {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: `How ${BRAND} handles personal information collected through ${DOMAIN}.`,
    status: 'draft',
    lastUpdated: null,
    sections: [
        {
            id: 'who-we-are',
            heading: 'Who we are',
            blocks: [
                // TODO (counsel): add the jurisdiction, registered address, and any data-protection representative.
                `This website is operated by ${LEGAL_NAME} (“we”, “us”). Questions about this policy may be sent to ${PRIMARY_CONTACT_EMAIL}.`,
            ],
        },
        {
            id: 'what-we-collect',
            heading: 'Information we collect',
            blocks: [
                'Founder applications. If you apply through our founder application form, we collect the details you enter: your name, work email, company name, company website, LinkedIn URL, sector, stage, geography, fundraising amount, company description, deck link, any additional notes and your confirmation that you have read this policy.',
                applicationChannel,
                'Emails. If you email us, we receive your email address and whatever you include in your message.',
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
