import React from 'react';
import Reveal from '@/components/Reveal';
import TeamCard from '@/components/team/TeamCard';
import { Section, Container, SectionHeader, ArrowLink } from '@/components/site/primitives';
import { getActiveTeam, TEAM_GROUPS, TEAM_TIERS, teamPath } from '@/data/team';

// Splits a group into rows by `tier`, in TEAM_TIERS order; untiered members form the last row.
const toRows = (members) => {
    const rows = TEAM_TIERS.map((t) => members.filter((m) => m.tier === t));
    rows.push(members.filter((m) => !TEAM_TIERS.includes(m.tier)));
    return rows.filter((r) => r.length > 0);
};

/**
 * groupIds:        optional list of TEAM_GROUPS ids to include (e.g. ['executive'] for a preview)
 * excludeSlug:     omit one member (e.g. the profile being viewed)
 * showAllTeamLink: adds a "Meet the Team" link to /team
 * showBios:        show each member's shortBio on the card, when one exists
 */
export default function TeamSection({
    className = 'bg-mist',
    spacing,
    label = 'Leadership',
    showHeader = true,
    linkProfiles = true,
    groupIds,
    excludeSlug,
    showAllTeamLink = false,
    showBios = false,
}) {
    const members = getActiveTeam().filter((m) => m.slug !== excludeSlug);
    const groups = TEAM_GROUPS
        .filter((g) => !groupIds || groupIds.includes(g.id))
        .map((g) => ({ ...g, members: members.filter((m) => m.group === g.id) }))
        .filter((g) => g.members.length > 0);
    if (groups.length === 0) return null;
    const GroupHeading = showHeader ? 'h3' : 'h2';
    return (
        <Section id="team" className={className} spacing={spacing}>
            <Container>
                {showHeader && (
                    <Reveal>
                        <SectionHeader
                            label={label}
                            action={showAllTeamLink && <ArrowLink to="/team" variant="solid">Meet the Team</ArrowLink>}
                        />
                    </Reveal>
                )}
                {groups.map((g, i) => (
                    <Reveal key={g.id} delay={0.08 + i * 0.04}>
                        <div className={showHeader || i > 0 ? 'mt-16' : ''}>
                            <GroupHeading className="border-t border-slate-900 pt-5 text-sm font-medium text-slate-900">{g.label}</GroupHeading>
                            {toRows(g.members).map((row, r) => (
                                <ul
                                    key={r}
                                    className={`grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 ${r === 0 ? 'mt-8' : 'mt-12 border-t border-slate-200 pt-12'}`}
                                >
                                    {row.map((m) => (
                                        <li key={m.slug}>
                                            <TeamCard
                                                member={m}
                                                href={linkProfiles ? teamPath(m) : undefined}
                                                showBio={showBios}
                                                headingLevel={showHeader ? 4 : 3}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </Reveal>
                ))}
            </Container>
        </Section>
    );
}
