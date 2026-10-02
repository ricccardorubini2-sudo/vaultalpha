// VaultAlpha's investment process, as already described on the site.
// Every process section (homepage, About, Strategy, Founders) renders from
// this list, so steps can be added, removed, renamed, or reordered here.
//
// Only list steps that reflect how VaultAlpha actually operates. Do not add
// stages such as an investment committee until they are confirmed.
//
// Step numbers are derived from order; `id` just needs to be unique.

export const INVESTMENT_PROCESS = [
    { id: 'application', title: 'Application', desc: 'Founders submit an overview of their company, team and market through our application form.' },
    { id: 'evaluation', title: 'Evaluation', desc: 'We assess the market opportunity, timing and the founding team.' },
    { id: 'technical-diligence', title: 'Technical Diligence', desc: 'Our engineers review architecture, security and protocol design.' },
    { id: 'decision', title: 'Investment Decision', desc: 'We reach a clear decision and set out our terms transparently.' },
    { id: 'partnership', title: 'Long-Term Partnership', desc: 'Ongoing support with hiring, security, go-to-market and follow-on financing.' },
];
