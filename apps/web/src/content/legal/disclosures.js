// LEGAL REVIEW REQUIRED BEFORE PUBLICATION
//
// This is a DRAFT structure written by the development team. It has NOT been
// reviewed or approved by lawyers or compliance. Do not change `status` from
// 'draft' until qualified counsel has reviewed and approved the final text.
//
// Do not add any regulatory licence, registration, authorisation, or
// exemption (or imply one exists) unless counsel has confirmed it in writing.

import { BRAND, DOMAIN } from '../../config/site.js';
import { PRIMARY_CONTACT_EMAIL } from '../../config/contact.js';

export default {
    slug: 'disclosures',
    title: 'Disclosures',
    subtitle: 'Important information about the content of this website.',
    status: 'draft',
    lastUpdated: null,
    sections: [
        {
            id: 'informational-purposes',
            heading: 'Informational purposes only',
            blocks: [
                `The content of ${DOMAIN} is provided for general information about ${BRAND} and its areas of interest. It is not intended to be relied upon for any purpose.`,
            ],
        },
        {
            id: 'no-investment-advice',
            heading: 'No investment advice',
            blocks: [
                'Nothing on this website is investment, legal, tax, accounting, or other professional advice, and nothing on it takes account of your objectives, financial situation, or needs. You should obtain independent professional advice before making any investment decision.',
            ],
        },
        {
            id: 'no-offer',
            heading: 'No offer or solicitation',
            blocks: [
                'Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security, fund interest, digital asset, or other investment product or service, in any jurisdiction.',
                // TODO (counsel): confirm whether any wording about offering documents or investor eligibility is appropriate.
            ],
        },
        {
            id: 'investment-risk',
            heading: 'Investment risk',
            blocks: [
                'Investing in private and early-stage companies involves a high degree of risk, including the possible loss of the entire amount invested. Such investments are typically illiquid and may be difficult to value or sell.',
            ],
        },
        {
            id: 'digital-asset-risk',
            heading: 'Digital asset risk',
            blocks: [
                'Digital assets, stablecoins, tokenised assets and blockchain-based systems carry additional risks. These include price volatility, technical failures such as software or smart-contract defects, custody and security failures, loss of access to private keys and changes in law or regulation that may affect their use or value.',
            ],
        },
        {
            id: 'forward-looking-statements',
            heading: 'Forward-looking statements',
            blocks: [
                'Some content on this website, including descriptions of markets, technologies and investment themes, contains forward-looking statements. These reflect current views, are subject to risks and uncertainties and are not guarantees of future events. Actual outcomes may differ materially. We do not undertake to update them.',
            ],
        },
        {
            id: 'third-party-information',
            heading: 'Third-party information',
            blocks: [
                'Some information on this website may come from third-party sources that we believe to be reliable but have not independently verified. We make no representation as to its accuracy or completeness. Links to third-party websites are provided for convenience; we are not responsible for their content.',
            ],
        },
        {
            id: 'portfolio-references',
            heading: 'Portfolio references',
            blocks: [
                'References to portfolio companies are provided for identification and illustration only. They may not represent all investments made, and should not be taken as an indication that any investment was or will be profitable. Company names and logos belong to their respective owners, and their inclusion does not imply that those companies endorse us.',
                'Descriptive labels such as sector, stage, or geography are summaries that may change over time.',
            ],
        },
        {
            id: 'past-performance',
            heading: 'Past performance and future results',
            blocks: [
                'Past performance is not a reliable indicator of future results. Any reference to the past performance of a company, investment, or strategy should not be relied upon as an indication of future performance.',
            ],
        },
        {
            id: 'jurisdiction',
            heading: 'Jurisdiction limitations',
            blocks: [
                'This website is not directed at any person in any jurisdiction where its publication or availability would be contrary to local law or regulation. Persons who access it are responsible for complying with the laws that apply to them.',
                // TODO (counsel): add any jurisdiction-specific restrictions or notices required.
            ],
        },
        {
            id: 'contact',
            heading: 'Questions',
            blocks: [`Questions about these disclosures may be sent to ${PRIMARY_CONTACT_EMAIL}.`],
        },
    ],
};
