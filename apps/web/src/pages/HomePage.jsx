import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import {
    Menu, X, ArrowRight, ArrowUpRight, ShieldCheck, Compass, Users,
    Sprout, Network, HeartHandshake, Mail, Phone, MapPin, Linkedin, Twitter,
    Github, Quote, Check
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import NetworkCanvas from '@/components/NetworkCanvas';

const BRAND = 'VaultAlpha Fund';

const NAV = [
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Research', href: '#research' },
    { label: 'Network', href: '#network' },
    { label: 'Team', href: '#team' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
];

const STATS = [
    { value: 2.4, suffix: 'B+', prefix: '$', label: 'Assets under management' },
    { value: 180, suffix: '+', label: 'Portfolio companies' },
    { value: 38, suffix: '', label: 'Countries' },
    { value: 400, suffix: '+', label: 'Founder network' },
    { value: 25, suffix: '+', label: 'Investment professionals' },
];

const FOCUS = [
    { icon: '/focus/blockchain.svg', title: 'Blockchain Infrastructure', desc: 'Base layers, rollups, and settlement rails engineered for global scale.' },
    { icon: '/focus/ai.svg', title: 'Artificial Intelligence', desc: 'Applied models and agentic systems redefining how software is built.' },
    { icon: '/focus/assets.svg', title: 'Digital Assets', desc: 'Institutional-grade custody, issuance, and asset management.' },
    { icon: '/focus/finance.svg', title: 'Digital Finance', desc: 'Transparent financial primitives and modern market structure.' },
    { icon: '/focus/usdc.svg', title: 'Stablecoins', desc: 'Compliant settlement money and programmable payment infrastructure.' },
    { icon: '/focus/rwa.svg', title: 'Real World Assets', desc: 'Tokenized credit, treasuries, and commodities bridged on-chain.' },
    { icon: '/focus/cyber.svg', title: 'Cybersecurity', desc: 'Cryptographic security, key management, and threat intelligence.' },
    { icon: '/focus/zk.svg', title: 'Zero-Knowledge', desc: 'Privacy and scale powered by frontier cryptography.' },
    { icon: '/focus/devtools.svg', title: 'Developer Tools', desc: 'The infrastructure that unlocks the next generation of builders.' },
    { icon: '/focus/decentralized.svg', title: 'Decentralized Systems', desc: 'Open, verifiable networks that compound value across participants.' },
];

const PROCESS = [
    { n: '01', title: 'Application', desc: 'Founders share their vision, team, and thesis through our portal.' },
    { n: '02', title: 'Evaluation', desc: 'We assess market, timing, and the strength of the founding team.' },
    { n: '03', title: 'Technical Diligence', desc: 'Our engineers review architecture, security, and protocol design.' },
    { n: '04', title: 'Investment Decision', desc: 'A clear, disciplined decision with transparent terms.' },
    { n: '05', title: 'Long-Term Partnership', desc: 'Hands-on support across hiring, security, growth, and follow-on capital.' },
];

const PORTFOLIO = [
    { name: 'Meridian Labs', industry: 'Infrastructure', stage: 'Series B', country: 'United States', status: 'Active', logo: '/portfolio/meridian-labs-icon.svg', tile: 'light', url: 'https://meridianlabs.ai' },
    { name: 'Halcyon AI', industry: 'Artificial Intelligence', stage: 'Series A', country: 'United Kingdom', status: 'Active', logo: '/portfolio/halcyon-ai-icon.png', tile: 'light', url: 'https://www.halcyon.ai' },
    { name: 'Vault Protocol', industry: 'Digital Finance', stage: 'Seed', country: 'Singapore', status: 'Active', logo: '/portfolio/vault-protocol.svg', tile: 'dark', logoWide: true, url: 'https://vaultprotocol.ai' },
    { name: 'Aurora Chain', industry: 'Infrastructure', stage: 'Series A', country: 'Germany', status: 'Active', logo: '/portfolio/aurora-chain.svg', tile: 'light', url: 'https://aurora.dev' },
    { name: 'Ledgerlyne', industry: 'Digital Assets', stage: 'Series B', country: 'Switzerland', status: 'Active', logo: '/portfolio/ledgerlyne.webp', tile: 'light', url: 'https://www.ledgerly.com' },
    { name: 'Ciphergrid', industry: 'Cybersecurity', stage: 'Seed', country: 'Israel', status: 'Active', logo: '/portfolio/ciphergrid.svg', tile: 'dark', url: 'https://ciphergrid.ai' },
    { name: 'Northwind AI', industry: 'Artificial Intelligence', stage: 'Series C', country: 'Canada', status: 'Growth', logo: '/portfolio/northwind-ai.svg', tile: 'light', url: 'https://northwind.ai' },
    { name: 'Terrafi', industry: 'Digital Finance', stage: 'Series A', country: 'United Arab Emirates', status: 'Active', logo: '/portfolio/terrafi.svg', tile: 'dark', url: 'https://www.terrafi.in' },
    { name: 'Proofstack', industry: 'Cybersecurity', stage: 'Seed', country: 'Estonia', status: 'Active', logo: '/portfolio/proofstack-official.svg', tile: 'light', url: 'https://proofstack.io' },
];
const CATEGORIES = ['All', 'Infrastructure', 'Artificial Intelligence', 'Digital Finance', 'Digital Assets', 'Cybersecurity'];

const PRINCIPLES = [
    { icon: Compass, title: 'Long-term conviction', desc: 'We invest across cycles, not quarters — patient capital for enduring companies.' },
    { icon: Users, title: 'Founder partnership', desc: 'We back exceptional people and stay close through every stage of the journey.' },
    { icon: Network, title: 'Open innovation', desc: 'We believe verifiable, open networks compound value across the ecosystem.' },
    { icon: ShieldCheck, title: 'Technical discipline', desc: 'Deep architecture and security judgment underpins every decision we make.' },
    { icon: Sprout, title: 'Durable growth', desc: 'We favour resilient business models over short-lived market narratives.' },
    { icon: HeartHandshake, title: 'Global reach', desc: 'Warm introductions across 38 countries — from talent to institutions.' },
];

const RESEARCH = [
    { tag: 'Artificial Intelligence', title: 'From Copilots to Autonomous Systems: The Next AI Frontier', read: '8 min read', img: 'https://images.hostinger.com/155c93a8-7a81-462d-b584-ce3a695078fd.png' },
    { tag: 'Blockchain', title: 'Blockchain Infrastructure Enters Its Institutional Era', read: '6 min read', img: 'https://images.hostinger.com/db041275-a603-413e-9fb0-fa482ffa09b9.png' },
    { tag: 'Stablecoins', title: 'Stablecoins Are Becoming the Internet\u2019s Settlement Layer', read: '7 min read', img: 'https://images.hostinger.com/8d4c81b9-3917-4a0d-964e-7f0958d0c0d8.png' },
];

const TEAM_MEMBER_META = {
    'Charles Whitmore': { role: 'Founding Partner', bio: 'Backed 40+ infrastructure companies. Believes patient capital builds category leaders.' },
    'Vadym Yaroshevskyi': { role: 'Managing Partner', bio: 'Former head of digital assets at a global bank. Two decades in markets and technology.' },
    'Maya Becker': { role: 'Head of Technical Diligence', bio: 'Protocol engineer turned investor. Leads architecture and security reviews.' },
    'Sofiia Tkachenko': { role: 'Partner, Portfolio Operations', bio: 'Supports founders across growth, hiring, and follow-on strategy across the portfolio.' },
    'Yuki Tanaka': { role: 'Head of Research', bio: 'Publishes our market outlook and drives thesis development across sectors.' },
    'Yullia Mitchell': { role: 'Partner, Investor Relations', bio: 'Builds relationships with LPs, institutions, and strategic partners worldwide.' },
};

const teamPhotoModules = import.meta.glob('../../../../teams_image/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
});

const TEAM_ORDER = Object.keys(TEAM_MEMBER_META);

const TEAM = Object.entries(teamPhotoModules)
    .filter(([path]) => !path.endsWith('/logo.png'))
    .map(([path, url]) => {
        const file = path.split('/').pop() ?? '';
        const name = file.replace(/\.png$/i, '');
        const meta = TEAM_MEMBER_META[name] ?? { role: 'Partner', bio: '' };
        return { name, ...meta, img: url };
    })
    .sort((a, b) => {
        const ai = TEAM_ORDER.indexOf(a.name);
        const bi = TEAM_ORDER.indexOf(b.name);
        return (ai === -1 ? TEAM_ORDER.length : ai) - (bi === -1 ? TEAM_ORDER.length : bi);
    });

const TESTIMONIALS = [
    { quote: 'They understood our architecture better than most engineers we interviewed. The technical diligence made us a stronger company.', name: 'Elena Vasquez', role: 'Founder & CEO, Meridian Labs' },
    { quote: 'Disciplined, transparent, and genuinely long-term. They were the first call we made for our Series B and the easiest term sheet we signed.', name: 'David Kim', role: 'Co-founder, Halcyon AI' },
    { quote: 'The network they opened for us \u2014 talent, institutions, follow-on capital \u2014 was worth as much as the investment itself.', name: 'Sofia Almeida', role: 'CEO, Vault Protocol' },
];

const HUBS = [
    { city: 'New York', x: '28%', y: '38%' },
    { city: 'London', x: '46%', y: '30%' },
    { city: 'Berlin', x: '52%', y: '32%' },
    { city: 'Dubai', x: '61%', y: '46%' },
    { city: 'Singapore', x: '74%', y: '60%' },
    { city: 'Tokyo', x: '82%', y: '38%' },
    { city: 'São Paulo', x: '35%', y: '72%' },
];

function useCountUp(target, active) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let raf;
        const start = performance.now();
        const dur = 1800;
        const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, target]);
    return val;
}

function Stat({ stat }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const v = useCountUp(stat.value, inView);
    const display = stat.value % 1 !== 0 ? v.toFixed(1) : Math.round(v);
    return (
        <div ref={ref} className="text-center lg:text-left">
            <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white">
                {stat.prefix || ''}{display}{stat.suffix}
            </div>
            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
        </div>
    );
}

const SectionLabel = ({ children }) => (
    <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-sky-400">
        <span className="h-px w-8 bg-sky-400/50" />
        {children}
    </div>
);

const H2 = ({ children, className = '' }) => (
    <h2 className={`font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl ${className}`}>
        {children}
    </h2>
);

const Logo = ({ dark }) => (
    <a href="#top" className="flex items-center gap-3">
        <img src="/logo-mark.png" alt={BRAND} className="h-14 w-14 rounded-xl object-contain shadow-[0_0_24px_-4px_rgba(56,189,248,0.75)] sm:h-16 sm:w-16" />
        <span className={`font-display text-xl font-semibold tracking-tight sm:text-2xl ${dark ? 'text-white' : 'text-white'}`}>{BRAND}</span>
    </a>
);

function Nav() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-white/10 bg-[#060a16]/85 backdrop-blur-xl' : 'bg-transparent'}`}>
            <div className="mx-auto flex max-w-[92rem] items-center justify-between px-6 py-4 lg:px-12">
                <Logo />
                <nav className="hidden items-center gap-9 xl:flex">
                    {NAV.map((n) => (
                        <a key={n.href} href={n.href} className="text-sm text-slate-300 transition-colors hover:text-white">{n.label}</a>
                    ))}
                </nav>
                <div className="hidden xl:block">
                    <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#060a16] transition-all hover:gap-3 hover:shadow-[0_0_26px_-4px_rgba(255,255,255,0.5)]">
                        Apply <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                    </a>
                </div>
                <button className="text-white xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
                    {open ? <X /> : <Menu />}
                </button>
            </div>
            {open && (
                <div className="border-t border-white/10 bg-[#060a16]/95 backdrop-blur-xl xl:hidden">
                    <div className="flex flex-col px-6 py-4">
                        {NAV.map((n) => (
                            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-sm text-slate-300 last:border-0">{n.label}</a>
                        ))}
                        <a href="#contact" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#060a16]">
                            Apply for Funding <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#050813] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#070c1c] via-[#050813] to-[#04060f]" />
                <div className="absolute -left-40 top-0 h-[40rem] w-[40rem] rounded-full bg-sky-600/20 blur-[150px] animate-float-slow" />
                <div className="absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-indigo-600/20 blur-[150px] animate-float-slow-2" />
            </div>
            <NetworkCanvas className="pointer-events-auto absolute inset-0 h-full w-full opacity-70" density={0.00013} />
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 40%, transparent 30%, #050813 85%)' }} />
            <div className="pointer-events-none relative mx-auto w-full max-w-[80rem] px-6 pt-32 pb-20 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs tracking-wide text-slate-300 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.8)]" /> Global technology investment institution
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.2rem]"
                >
                    Investing in the <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-sky-200 bg-clip-text text-transparent">Architecture</span> of Tomorrow
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300"
                >
                    {BRAND} partners with exceptional founders building the future of blockchain infrastructure, artificial intelligence, digital finance, cybersecurity, and decentralized technologies.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.34 }}
                    className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row"
                >
                    <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#050813] transition-all hover:gap-3 hover:shadow-[0_0_34px_-6px_rgba(255,255,255,0.6)]">
                        Apply for Funding <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-sky-400/50 hover:bg-white/[0.07]">
                        Explore Portfolio
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function Marquee() {
    const items = ['Blockchain', 'Artificial Intelligence', 'Digital Finance', 'Zero-Knowledge', 'Stablecoins', 'Cybersecurity', 'Real World Assets', 'Developer Tools'];
    const row = [...items, ...items];
    return (
        <div className="border-y border-white/10 bg-[#070c1c] py-5 overflow-hidden">
            <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
                {row.map((t, i) => (
                    <span key={i} className="flex items-center gap-12 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                        {t} <span className="h-1 w-1 rounded-full bg-sky-500" />
                    </span>
                ))}
            </div>
        </div>
    );
}

function Section({ id, children, className = '' }) {
    return <section id={id} className={`relative py-28 lg:py-36 ${className}`}>{children}</section>;
}

function About() {
    return (
        <Section id="about" className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <SectionLabel>Investment Philosophy</SectionLabel>
                            <H2 className="mt-7">A partner for the long arc of technology.</H2>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal delay={0.1}>
                            <p className="text-lg leading-relaxed text-slate-300">
                                {BRAND} funds and builds the foundational companies of the next digital era. We combine deep technical judgment with global reach, partnering with founders from first conviction through category leadership.
                            </p>
                            <p className="mt-5 text-lg leading-relaxed text-slate-400">
                                We are engineers, operators, and researchers who believe open, verifiable technology will reshape finance, infrastructure, and intelligence itself. Founders choose us because we move with discipline, diligence honestly, and stay for the long term.
                            </p>
                        </Reveal>
                    </div>
                </div>
                <Reveal delay={0.15}>
                    <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-14 md:grid-cols-3 lg:grid-cols-5">
                        {STATS.map((s) => <Stat key={s.label} stat={s} />)}
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}

function GlobalNetwork() {
    return (
        <Section id="network" className="overflow-hidden bg-[#04060f]">
            <NetworkCanvas className="absolute inset-0 h-full w-full opacity-40" density={0.00009} interactive={false} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04060f] via-transparent to-[#04060f]" />
            <div className="relative mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Our Global Investment Network</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">A living map of capital, founders, and infrastructure.</H2>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                        Our investment ecosystem spans connected hubs across 38 countries — a real-time fabric of founders, institutions, and blockchain infrastructure.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <div className="relative mt-16 aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#060b1a]/60 backdrop-blur-sm">
                        <NetworkCanvas className="absolute inset-0 h-full w-full opacity-80" density={0.00016} />
                        {HUBS.map((h) => (
                            <div key={h.city} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: h.x, top: h.y }}>
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_14px_3px_rgba(56,189,248,0.8)]" />
                                </span>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-slate-300">{h.city}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>
                <Reveal delay={0.2}>
                    <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                        {[
                            { v: '38', l: 'Connected countries' },
                            { v: '12', l: 'Investment hubs' },
                            { v: '400+', l: 'Founder network' },
                            { v: '24/7', l: 'Live coverage' },
                        ].map((s) => (
                            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                                <div className="font-display text-3xl font-semibold text-white">{s.v}</div>
                                <p className="mt-1 text-sm text-slate-400">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}

function Focus() {
    return (
        <Section id="focus" className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Investment Focus</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">The frontiers where we build conviction.</H2>
                </Reveal>
                <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {FOCUS.map((f, i) => (
                        <Reveal key={f.title} delay={(i % 5) * 0.05}>
                            <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.05] hover:shadow-[0_24px_60px_-24px_rgba(56,189,248,0.4)]">
                                <img src={f.icon} alt="" className="h-12 w-12 object-contain drop-shadow-[0_8px_16px_rgba(56,189,248,0.18)] transition-transform duration-300 group-hover:scale-110" />
                                <h3 className="mt-5 font-display text-base font-semibold text-white">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Portfolio() {
    const [cat, setCat] = useState('All');
    const filtered = cat === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.industry === cat);
    return (
        <Section id="portfolio" className="bg-[#04060f]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Portfolio Companies</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">Companies defining the next decade.</H2>
                </Reveal>
                <div className="mt-12 flex flex-wrap gap-2.5">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCat(c)}
                            className={`rounded-full px-4 py-2 text-sm transition-all ${cat === c ? 'bg-white text-[#04060f]' : 'border border-white/15 text-slate-300 hover:border-sky-400/40 hover:text-white'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((p) => (
                        <motion.a
                            key={p.name}
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-sky-400/50 hover:bg-white/[0.06] hover:shadow-[0_28px_70px_-28px_rgba(56,189,248,0.5)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="flex items-center justify-between gap-3">
                                <div className={`grid h-14 place-items-center overflow-hidden rounded-xl p-2 ${p.tile === 'dark' ? 'bg-[#0b1220] ring-1 ring-white/10' : 'bg-white'} ${p.logoWide ? 'w-[7.5rem]' : 'w-14'}`}>
                                    <img src={p.logo} alt={`${p.name} logo`} className={`h-full w-full ${p.logoWide ? 'object-contain object-left' : 'object-contain'}`} />
                                </div>
                                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-all group-hover:text-sky-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </div>
                            <h3 className="mt-6 font-display text-xl font-semibold text-white">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-400">{p.industry}</p>
                            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                                <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300">{p.stage}</span>
                                <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-sky-300">{p.status}</span>
                                <span className="ml-auto flex items-center gap-1"><MapPin className="h-3 w-3" />{p.country}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Why() {
    return (
        <Section className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Principles</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">Discipline that outlasts market cycles.</H2>
                </Reveal>
                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 3) * 0.06}>
                            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-sky-400/30 hover:bg-white/[0.05]">
                                <p.icon className="h-6 w-6 text-sky-400" strokeWidth={1.75} />
                                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-400">{p.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Process() {
    return (
        <Section id="process" className="bg-[#04060f]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Investment Process</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">From first conversation to lasting partnership.</H2>
                </Reveal>
                <div className="mt-16 grid gap-8 md:grid-cols-5">
                    {PROCESS.map((p, i) => (
                        <Reveal key={p.n} delay={i * 0.08}>
                            <div className="relative">
                                <div className="flex items-center gap-3">
                                    <span className="font-display text-sm font-semibold text-sky-400">{p.n}</span>
                                    <span className="h-px flex-1 bg-white/10" />
                                </div>
                                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Research() {
    return (
        <Section id="research" className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <SectionLabel>Research &amp; Insights</SectionLabel>
                            <H2 className="mt-7">Intelligence from the frontier.</H2>
                        </div>
                        <a href="#research" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                            View all research <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </Reveal>
                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    {RESEARCH.map((r, i) => (
                        <Reveal key={r.title} delay={i * 0.08}>
                            <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_28px_70px_-30px_rgba(56,189,248,0.4)]">
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <span className="font-medium text-sky-400">{r.tag}</span>
                                        <span className="h-1 w-1 rounded-full bg-white/20" />
                                        <span>{r.read}</span>
                                    </div>
                                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">{r.title}</h3>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Team() {
    return (
        <Section id="team" className="bg-[#04060f]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Leadership</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">Engineers, operators, researchers.</H2>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {TEAM.map((m) => (
                            <div key={m.name} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-sky-400/30">
                                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                                    <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="px-2 pb-1 pt-5">
                                    <h3 className="font-display text-lg font-semibold text-white">{m.name}</h3>
                                    <p className="text-sm text-sky-400">{m.role}</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}

function Testimonials() {
    return (
        <Section className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Testimonials</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">Trusted by the founders we back.</H2>
                </Reveal>
                <div className="mt-16 grid gap-6 lg:grid-cols-3">
                    {TESTIMONIALS.map((t, i) => (
                        <Reveal key={t.name} delay={i * 0.08}>
                            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                                <Quote className="h-7 w-7 text-sky-400/50" />
                                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-slate-200">{t.quote}</blockquote>
                                <figcaption className="mt-6 border-t border-white/10 pt-4">
                                    <div className="font-display font-semibold text-white">{t.name}</div>
                                    <div className="text-sm text-slate-400">{t.role}</div>
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Partners() {
    const partners = PORTFOLIO.filter((p) => p.name !== 'Vault Protocol');
    return (
        <Section id="careers" className="bg-[#04060f]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <Reveal>
                    <SectionLabel>Partner Companies</SectionLabel>
                    <H2 className="mt-7 max-w-3xl">Building alongside category leaders.</H2>
                </Reveal>
                <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
                    {partners.map((p) => (
                        <a
                            key={p.name}
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col items-center justify-center gap-4 bg-[#050813] px-6 py-10 transition-colors hover:bg-white/[0.04]"
                        >
                            <img
                                src={p.logo}
                                alt={`${p.name} logo`}
                                className={`h-14 w-auto max-w-[8.5rem] object-contain ${p.name === 'Meridian Labs' ? 'brightness-0 invert' : ''}`}
                            />
                            <span className="font-display text-sm font-semibold tracking-tight text-slate-400 transition-colors group-hover:text-white">{p.name}</span>
                        </a>
                    ))}
                </div>
                <Reveal delay={0.1}>
                    <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-10 sm:flex-row sm:items-center lg:p-14">
                        <div>
                            <h3 className="font-display text-2xl font-semibold text-white lg:text-3xl">Build the future with {BRAND}.</h3>
                            <p className="mt-2 text-slate-300">We are always looking for exceptional investors, engineers, and researchers.</p>
                        </div>
                        <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#050813] transition-all hover:gap-3">
                            View open roles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}

const Field = ({ label, children }) => (
    <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        {children}
    </label>
);

function Contact() {
    const [sent, setSent] = useState(false);
    const offices = [
        { city: 'London', line: '1 Finsbury Avenue' },
        { city: 'New York', line: '200 Park Avenue' },
        { city: 'Singapore', line: 'Marina Bay Financial Centre' },
    ];
    return (
        <Section id="contact" className="bg-[#050813]">
            <div className="mx-auto max-w-[80rem] px-6 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <SectionLabel>Contact</SectionLabel>
                            <H2 className="mt-7">Building something ambitious?</H2>
                            <p className="mt-6 text-lg leading-relaxed text-slate-400">
                                Tell us about your company. We read every application and respond within five business days.
                            </p>
                            <div className="mt-10 space-y-4">
                                <a href="mailto:founders@vaultalpha.fund" className="flex items-center gap-3 text-slate-200 transition-colors hover:text-sky-300">
                                    <Mail className="h-5 w-5 text-sky-400" /> founders@vaultalpha.fund
                                </a>
                                <div className="flex items-center gap-3 text-slate-200">
                                    <Phone className="h-5 w-5 text-sky-400" /> +44 20 7946 0000
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-3 gap-4">
                                {offices.map((o) => (
                                    <div key={o.city} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-white"><MapPin className="h-4 w-4 text-sky-400" />{o.city}</div>
                                        <p className="mt-1 text-xs text-slate-400">{o.line}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal delay={0.1}>
                            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-9">
                                {sent ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="grid h-14 w-14 place-items-center rounded-full bg-sky-500/15 text-sky-300"><Check className="h-7 w-7" /></div>
                                        <h3 className="mt-5 font-display text-xl font-semibold text-white">Application received</h3>
                                        <p className="mt-2 max-w-sm text-slate-400">Thank you. Our team will review your submission and respond within five business days.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-5">
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field label="Full name"><input required className="field-input" placeholder="Jane Founder" /></Field>
                                            <Field label="Work email"><input required type="email" className="field-input" placeholder="jane@company.com" /></Field>
                                        </div>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field label="Company"><input required className="field-input" placeholder="Company name" /></Field>
                                            <Field label="Funding stage"><input className="field-input" placeholder="Seed / Series A" /></Field>
                                        </div>
                                        <Field label="Tell us about your company">
                                            <textarea required rows={4} className="field-input resize-none" placeholder="What are you building and why now?" />
                                        </Field>
                                        <button type="submit" className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#050813] transition-all hover:gap-3">
                                            Submit application <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </button>
                                    </div>
                                )}
                            </form>
                        </Reveal>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Footer() {
    const cols = [
        { title: 'Firm', links: ['About', 'Investment Areas', 'Portfolio', 'Research', 'Careers'] },
        { title: 'Insights', links: ['AI', 'Blockchain', 'Stablecoins', 'Cybersecurity', 'Market Intelligence'] },
        { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Disclosures', 'Cookie Settings'] },
    ];
    return (
        <footer className="border-t border-white/10 bg-[#04060f] text-white">
            <div className="mx-auto max-w-[80rem] px-6 py-16 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Logo />
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                            A global technology investment institution partnering with founders across blockchain infrastructure, AI, digital finance, and decentralized technologies.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm gap-2">
                            <input type="email" required placeholder="Subscribe to our research" className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                            <button className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#04060f]">Join</button>
                        </form>
                    </div>
                    {cols.map((c) => (
                        <div key={c.title} className="lg:col-span-2">
                            <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                            <ul className="mt-4 space-y-3">
                                {c.links.map((l) => (
                                    <li key={l}><a href="#top" className="text-sm text-slate-400 transition-colors hover:text-white">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-semibold text-white">Follow</h4>
                        <div className="mt-4 flex gap-2">
                            {[Linkedin, Twitter, Github].map((Icon, i) => (
                                <a key={i} href="#top" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-slate-400 transition-colors hover:border-sky-400 hover:text-white"><Icon className="h-4 w-4" /></a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
                    <p>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved. — vaultalpha.fund</p>
                    <p>Investments involve risk. This site is for informational purposes only.</p>
                </div>
            </div>
        </footer>
    );
}

const HomePage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
    return (
        <div className="bg-[#050813]">
            <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-sky-400 to-indigo-500" />
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <About />
                <GlobalNetwork />
                <Focus />
                <Portfolio />
                <Why />
                <Research />
                <Process />
                <Team />
                <Testimonials />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
