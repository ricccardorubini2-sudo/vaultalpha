// LEGAL REVIEW REQUIRED BEFORE PUBLICATION
// Every document below is a draft that has not been reviewed by lawyers.

import privacy from './privacy.js';
import terms from './terms.js';
import disclosures from './disclosures.js';
import cookies from './cookies.js';

export const LEGAL_DOCUMENTS = [privacy, terms, disclosures, cookies];

export function getLegalDocument(slug) {
    return LEGAL_DOCUMENTS.find((d) => d.slug === slug) ?? privacy;
}
