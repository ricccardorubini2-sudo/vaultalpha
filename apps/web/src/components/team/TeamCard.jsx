import React from 'react';
import { Link } from 'react-router-dom';
import TeamPhoto from './TeamPhoto';
import { hasValue } from '@/data/portfolio';

// Photo-led, unboxed: portrait, then name and role set as a caption.
export default function TeamCard({ member, href, showBio = false, headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;
    const body = (
        <>
            <TeamPhoto member={member} />
            <div className="pt-4">
                <Heading className="font-display text-base font-medium tracking-tight text-slate-900 underline-offset-4 group-hover:underline">{member.name}</Heading>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                {showBio && hasValue(member.shortBio) && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{member.shortBio}</p>
                )}
            </div>
        </>
    );
    const className = 'group block h-full';
    return href ? <Link to={href} className={className}>{body}</Link> : <div className={className}>{body}</div>;
}
