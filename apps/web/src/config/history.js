// Firm history for the About page ("Our History": a short story and a timeline).
//
// Only confirmed facts. Never add AUM, fund size, office openings, headcount,
// partnerships, or performance claims here until the partners have confirmed
// them for publication.
//
// Owner-confirmed (2026-10-07): founded March 2025; angel investors formed the
// team and began with their own capital; ambition is a larger fund, a deeper
// network and a role in building the future of finance.
//
// - STORY: paragraphs telling how the firm started and developed, or [].
// - MILESTONES: [{ year, title, description, verified }]. An entry renders
//   only when `verified: true` and it has a year and a title; entries are
//   shown oldest first. `description` is optional.
//
// The whole section stays hidden while both lists are empty.

export const STORY = [
    'VaultAlpha Fund was founded in March 2025. It did not begin as an institution looking for a story. It began as a group of angel investors who decided that conviction was not enough if it stayed private: they formed a team, put their own capital to work and started underwriting the companies they believed would move value in the digital economy.',
    'Starting with your own money changes the temperature of every decision. There is no inherited mandate to hide behind, no distant committee to dilute the judgement. The first book is personal. That is a constraint and a gift. It forces patience. It forces the question every serious allocator eventually has to answer: would I still write this cheque if it were only mine?',
    'From that beginning the firm has a clear direction of travel. We intend to grow a larger fund, to deepen the network around the companies we back and to take a durable role in building the future of finance — not as a slogan, but as a practice of putting capital behind payment rails, settlement and the infrastructure that makes digital dollars usable at institutional scale.',
    'The work is still early. That is the point. History, for a young firm, is not a list of monuments. It is a record of why we started, what we refused to pretend and where we are going.',
];

export const MILESTONES = [
    {
        year: '2025',
        title: 'The firm is founded',
        description: 'In March, angel investors form VaultAlpha Fund, assemble a team and begin investing with their own capital.',
        verified: true,
    },
    {
        year: 'Now',
        title: 'Building what comes next',
        description: 'The work ahead is a larger fund, a wider network and a lasting position in the infrastructure of digital finance.',
        verified: true,
    },
];

export const getPublicMilestones = () =>
    MILESTONES
        .filter((m) => m?.verified === true && m.year && String(m.title ?? '').trim())
        .sort((a, b) => {
            const na = Number(a.year);
            const nb = Number(b.year);
            if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb;
            if (Number.isFinite(na) !== Number.isFinite(nb)) return Number.isFinite(na) ? -1 : 1;
            return 0;
        });

export const getPublicStory = () => STORY.filter((p) => String(p ?? '').trim());
