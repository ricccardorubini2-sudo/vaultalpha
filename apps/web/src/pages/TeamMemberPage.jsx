import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PageHeader from '@/components/site/PageHeader';
import { Section, Container } from '@/components/site/primitives';
import TeamPhoto from '@/components/team/TeamPhoto';
import TeamContactLinks from '@/components/team/TeamContactLinks';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import TeamSection from '@/components/sections/TeamSection';
import { getTeamMember, getTeamGroup, getVerifiedInvestments } from '@/data/team';
import { hasValue, portfolioPath } from '@/data/portfolio';
import NotFoundPage from './NotFoundPage';

const Block = ({ title, children }) => (
    <Reveal>
        <section className="grid gap-4 py-10 md:grid-cols-12 md:gap-10">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 md:col-span-3 md:pt-1">{title}</h2>
            <div className="md:col-span-9">{children}</div>
        </section>
    </Reveal>
);

const listOf = (items, isValid) => (items ?? []).filter(isValid);

export default function TeamMemberPage() {
    const { slug } = useParams();
    const member = getTeamMember(slug);
    if (!member) return <NotFoundPage />;

    const group = getTeamGroup(member);
    const paragraphs = [].concat(hasValue(member.longBio) ? member.longBio : member.shortBio).filter(hasValue);
    const expertise = listOf(member.areasOfExpertise, hasValue);
    const investments = getVerifiedInvestments(member);
    const previous = listOf(member.previousCompanies, (c) => hasValue(c?.name));
    const education = listOf(member.education, (e) => hasValue(e?.institution));
    const hasProfile = paragraphs.length || expertise.length || investments.length || previous.length || education.length;
    const hasContact = hasValue(member.email) || hasValue(member.linkedinUrl);

    return (
        <>
            <PageHeader
                label={group?.label ?? 'Team'}
                title={member.name}
                intro={member.role}
                before={
                    <Link to="/team" className="-my-2 mb-8 inline-flex items-center gap-2 py-2 text-sm text-slate-400 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All team members
                    </Link>
                }
                aside={<TeamPhoto member={member} size="profile" className="w-full max-w-[15rem] sm:max-w-xs lg:ml-auto lg:max-w-sm" />}
            >
                {hasContact && <TeamContactLinks member={member} variant="dark" className="mt-8" />}
            </PageHeader>

            {hasProfile ? (
                <Section className="bg-canvas" spacing="compact">
                    <Container>
                        <div className="mx-auto max-w-[64rem] divide-y divide-slate-200 [&>*:first-child>section]:pt-0">
                            {paragraphs.length > 0 && (
                                <Block title="Biography">
                                    <div className="space-y-5 text-lg leading-relaxed text-slate-600">
                                        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                                    </div>
                                </Block>
                            )}
                            {expertise.length > 0 && (
                                <Block title="Areas of expertise">
                                    <ul className="divide-y divide-slate-200 border-y border-slate-200">
                                        {expertise.map((a) => (
                                            <li key={a} className="py-3 text-slate-700">{a}</li>
                                        ))}
                                    </ul>
                                </Block>
                            )}
                            {investments.length > 0 && (
                                <Block title="Selected investments">
                                    <ul className="grid border-l border-t border-slate-200 sm:grid-cols-2">
                                        {investments.map((c) => (
                                            <li key={c.slug} className="border-b border-r border-slate-200"><PortfolioCard company={c} href={portfolioPath(c)} /></li>
                                        ))}
                                    </ul>
                                </Block>
                            )}
                            {previous.length > 0 && (
                                <Block title="Previously">
                                    <ul className="space-y-3">
                                        {previous.map((c) => (
                                            <li key={`${c.name}-${c.role ?? ''}`} className="text-slate-700">
                                                <span className="font-medium text-slate-900">{c.name}</span>
                                                {hasValue(c.role) && <span className="text-slate-500"> — {c.role}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </Block>
                            )}
                            {education.length > 0 && (
                                <Block title="Education">
                                    <ul className="space-y-3">
                                        {education.map((e) => (
                                            <li key={`${e.institution}-${e.qualification ?? ''}`} className="text-slate-700">
                                                <span className="font-medium text-slate-900">{e.institution}</span>
                                                {hasValue(e.qualification) && <span className="text-slate-500"> — {e.qualification}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </Block>
                            )}
                        </div>
                    </Container>
                </Section>
            ) : null}

            <TeamSection
                className={hasProfile ? 'bg-mist' : 'bg-canvas'}
                spacing="compact"
                label="More from the team"
                excludeSlug={member.slug}
                showAllTeamLink
            />
        </>
    );
}
