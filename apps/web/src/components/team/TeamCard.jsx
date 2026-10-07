import React from 'react';
import { Link } from 'react-router-dom';
import TeamPhoto from './TeamPhoto';
import TeamContactLinks from './TeamContactLinks';
import { hasValue } from '@/data/portfolio';

// Photo-led, unboxed: portrait, then name and role set as a caption.
// Contact icons sit outside the profile Link so nested interactive elements stay valid.
export default function TeamCard({ member, href, showBio = false, headingLevel = 3 }) {
    const Heading = `h${headingLevel}`;
    const caption = (
        <div className="pt-4">
            <Heading className={`font-display text-base font-medium tracking-tight text-slate-900 ${href ? 'underline-offset-4 group-hover:underline' : ''}`}>
                {member.name}
            </Heading>
            <p className="mt-1 text-sm text-slate-500">{member.role}</p>
            {showBio && hasValue(member.shortBio) && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{member.shortBio}</p>
            )}
        </div>
    );

    return (
        <div className="h-full">
            {href ? (
                <Link to={href} className="group block">
                    <TeamPhoto member={member} />
                    {caption}
                </Link>
            ) : (
                <div>
                    <TeamPhoto member={member} />
                    {caption}
                </div>
            )}
            <TeamContactLinks member={member} className="mt-3" />
        </div>
    );
}
