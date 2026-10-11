// None of the documents below has been reviewed by lawyers. They are published
// without the draft notice at the owner's request (2026-10-10).

import privacy from './privacy.js';
import terms from './terms.js';
import disclosures from './disclosures.js';
import cookies from './cookies.js';

export const LEGAL_DOCUMENTS = [privacy, terms, disclosures, cookies];

export function getLegalDocument(slug) {
    return LEGAL_DOCUMENTS.find((d) => d.slug === slug) ?? privacy;
}
