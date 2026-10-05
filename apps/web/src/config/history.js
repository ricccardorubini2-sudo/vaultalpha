// Firm history for the About page ("Our History": a short story and a timeline).
//
// Only confirmed facts. Never add founding dates, AUM, fund size, office
// openings, headcount, partnerships, or performance claims here until the
// partners have confirmed them for publication.
//
// - STORY: paragraphs telling how the firm started and developed, or [].
// - MILESTONES: [{ year, title, description, verified }]. An entry renders
//   only when `verified: true` and it has a year and a title; entries are
//   shown oldest first. `description` is optional.
//
// The whole section stays hidden while both lists are empty.

export const STORY = [];

export const MILESTONES = [];

export const getPublicMilestones = () =>
    MILESTONES
        .filter((m) => m?.verified === true && m.year && String(m.title ?? '').trim())
        .sort((a, b) => Number(a.year) - Number(b.year));

export const getPublicStory = () => STORY.filter((p) => String(p ?? '').trim());
