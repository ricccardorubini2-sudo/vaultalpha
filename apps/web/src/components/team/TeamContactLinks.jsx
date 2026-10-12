import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { hasValue } from '@/data/portfolio';

const ICON = 'h-4 w-4';

/**
 * Email and LinkedIn icon links for a team member.
 * variant: 'light' (white cards) | 'dark' (PageHeader on black)
 */
export default function TeamContactLinks({ member, variant = 'light', className = '' }) {
    const email = hasValue(member.email) ? member.email.trim() : null;
    const linkedin = hasValue(member.linkedinUrl) ? member.linkedinUrl.trim() : null;
    if (!email && !linkedin) return null;

    // Hover: email takes the brand champagne, LinkedIn its own brand blue (#0A66C2).
    const base =
        variant === 'dark'
            ? 'border-white/25 text-white hover:text-white'
            : 'border-slate-200 text-slate-500';
    const emailTone =
        variant === 'dark'
            ? 'hover:border-champagne hover:bg-champagne'
            : 'hover:border-champagne hover:bg-champagne/10 hover:text-champagne';
    const linkedinTone =
        variant === 'dark'
            ? 'hover:border-[#0A66C2] hover:bg-[#0A66C2]'
            : 'hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]';

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {email && (
                <a
                    href={`mailto:${email}`}
                    className={`grid h-9 w-9 place-items-center rounded-md border transition-colors ${base} ${emailTone}`}
                    aria-label={`Email ${member.name}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Mail className={ICON} aria-hidden="true" strokeWidth={1.75} />
                </a>
            )}
            {linkedin && (
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`grid h-9 w-9 place-items-center rounded-md border transition-colors ${base} ${linkedinTone}`}
                    aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Linkedin className={ICON} aria-hidden="true" strokeWidth={1.75} />
                </a>
            )}
        </div>
    );
}
