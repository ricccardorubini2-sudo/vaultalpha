// Owner-confirmed company registration (2026-10-07). Shown on the legal pages,
// in every page's no-JavaScript fallback and in /llms.txt (seo/meta.js); keep
// out of JSON-LD structured data unless the owner approves otherwise.

export const COMPANY_REGISTRATION = {
    entityType: 'limited liability company',
    jurisdiction: 'Florida, United States',
    documentNumber: 'L26000508741',
    registeredAddress: ['7901 4th St N', 'Ste 300', 'Saint Petersburg, FL 33702', 'United States'],
};

export const MAIN_OFFICE_SUMMARY = 'St. Petersburg, Florida, United States';
export const BRANCH_OFFICES_SUMMARY = 'London and Singapore';

export const formatRegisteredAddress = () => COMPANY_REGISTRATION.registeredAddress.join(', ');

// Shared "Company information" section for the legal documents.
export const companyInformationSection = (legalName) => ({
    id: 'company-information',
    heading: 'Company information',
    blocks: [
        `${legalName} is a ${COMPANY_REGISTRATION.entityType} registered in ${COMPANY_REGISTRATION.jurisdiction}.`,
        {
            type: 'table',
            columns: ['Detail', 'Information'],
            rows: [
                ['State of registration', COMPANY_REGISTRATION.jurisdiction],
                ['LLC document number', COMPANY_REGISTRATION.documentNumber],
                ['Registered address', formatRegisteredAddress()],
                ['Main office', MAIN_OFFICE_SUMMARY],
                ['Branch offices', BRANCH_OFFICES_SUMMARY],
            ],
        },
    ],
});
