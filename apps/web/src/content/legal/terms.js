// LEGAL REVIEW REQUIRED BEFORE PUBLICATION
//
// Draft written by the development team. It has NOT been reviewed by lawyers.
// Keep `status: 'draft'` until counsel has approved the final text.
// Governing law and jurisdiction are intentionally omitted until confirmed.

import { BRAND, DOMAIN, LEGAL_NAME } from '../../config/site.js';
import { PRIMARY_CONTACT_EMAIL } from '../../config/contact.js';
import { companyInformationSection } from '../../config/company.js';

export default {
    slug: 'terms',
    title: 'Terms of Use',
    subtitle: `The terms that apply when you use ${DOMAIN}.`,
    status: 'draft',
    lastUpdated: null,
    sections: [
        {
            id: 'acceptance',
            heading: 'Using this website',
            blocks: [
                `By using ${DOMAIN}, you agree to these terms. If you do not agree, please do not use the site. Our Privacy Policy explains how we handle personal information.`,
            ],
        },
        {
            id: 'information-only',
            heading: 'Information only',
            blocks: [
                'The site provides general information about our firm and interests. It is not an offer, solicitation, or recommendation, and it is not investment, legal, or tax advice. Please read our Disclosures.',
            ],
        },
        {
            id: 'applications',
            heading: 'Founder applications',
            blocks: [
                'Submitting an application does not create any obligation on us to invest or to enter into any agreement. Please share only information you are entitled to share, and do not send confidential material unless we have agreed confidentiality terms with you separately.',
                'You confirm that the information you submit is accurate to the best of your knowledge.',
            ],
        },
        {
            id: 'intellectual-property',
            heading: 'Intellectual property',
            blocks: [
                `The content and design of this site belong to ${BRAND} or its licensors. You may view the site and share links to it. You may not copy, scrape, or commercially use its content without our written permission. Third-party names and logos belong to their owners.`,
            ],
        },
        {
            id: 'acceptable-use',
            heading: 'Acceptable use',
            blocks: [
                'You agree not to misuse the site, including by attempting unauthorised access, introducing malicious code, submitting spam, or interfering with its operation.',
            ],
        },
        {
            id: 'third-party-links',
            heading: 'Third-party websites',
            blocks: [
                'Links to other websites are provided for convenience. We do not control and are not responsible for their content or practices.',
            ],
        },
        {
            id: 'liability',
            heading: 'Disclaimer and liability',
            blocks: [
                // TODO (counsel): confirm the scope of this disclaimer for applicable jurisdictions.
                'The site is provided “as is” without warranties of any kind. To the extent permitted by law, we are not liable for any loss arising from your use of, or reliance on, the site.',
            ],
        },
        {
            id: 'changes',
            heading: 'Changes',
            blocks: ['We may update these terms from time to time. Changes take effect when published on this page.'],
        },
        companyInformationSection(LEGAL_NAME),
        {
            id: 'contact',
            heading: 'Contact',
            blocks: [`Questions about these terms may be sent to ${PRIMARY_CONTACT_EMAIL}.`],
        },
    ],
};
