import React from 'react';

function Block({ block }) {
    if (typeof block === 'string') return <p>{block}</p>;
    switch (block?.type) {
        case 'heading':
            return <h2 className="!mt-14 font-display text-2xl font-medium tracking-[-0.01em] text-slate-900">{block.text}</h2>;
        case 'quote':
            return (
                <blockquote className="!my-10 border-l border-slate-900 pl-6">
                    <p className="font-display text-xl leading-snug text-slate-900">{block.text}</p>
                    {block.attribution && <footer className="mt-3 text-sm text-slate-500">— {block.attribution}</footer>}
                </blockquote>
            );
        case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return (
                <List className={`space-y-2 pl-6 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-slate-400`}>
                    {(block.items ?? []).map((item, i) => <li key={i}>{item}</li>)}
                </List>
            );
        }
        case 'paragraph':
            return <p>{block.text}</p>;
        default:
            return null;
    }
}

// Renders the block format documented in data/research.js.
export default function ArticleBody({ body }) {
    if (!Array.isArray(body) || body.length === 0) return null;
    return (
        <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-slate-700">
            {body.map((block, i) => <Block key={i} block={block} />)}
        </div>
    );
}
