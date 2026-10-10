# VaultAlpha site content decisions

Working record for the staged rebuild (see the owner brief "VaultAlpha Website
Audit + Step-by-Step Cursor Rebuild Prompt"). Only owner-confirmed facts may be
published. No secrets in this file.

Status key: **Confirmed** (owner-supplied), **Unverified** (on the live site,
no evidence yet), **Hidden** (in the codebase but not rendered publicly),
**Removed**.

Last updated: 2026-10-07 (strategy core thesis and About history).

## Confirmed facts

| Fact | Value | Source | Where used |
|---|---|---|---|
| Public description | Digital-asset and technology investment firm | Owner, Step 1 | `FIRM_DESCRIPTOR` in `apps/web/src/config/site.js`: hero eyebrow, About intro and overview, footer, homepage meta description, Organization schema |
| Primary audience | Founders seeking capital; strategic partners second | Owner, Step 1 | Contact paths (`config/contact.js`) |
| Legal / operating name (publishable) | VaultAlpha Fund | Owner, Step 1 | `LEGAL_NAME` in `config/site.js`: Privacy "Who we are", Organization schema `legalName`, footer copyright |
| Placeholder claims | "Our engineers review every investment" and all technical-diligence claims | Owner, Step 1 | Removed (see below) |
| Sectors | Payments & Stablecoins (core); Digital Assets & Blockchain, Real-World Assets, Exchanges & Trading Infrastructure (adjacent) | Owner, Step 2; core vs branch, 2026-10-07 | `THEMES` `role` in `config/themes.js`; Strategy market thesis |
| Founded | March 2025 | Owner, 2026-10-07 | About intro, `config/history.js` |
| Origin | Angel investors formed the team and started with their own capital | Owner, 2026-10-07 | About history and overview |
| Ambition | Grow a larger fund, network and role in the future of finance | Owner, 2026-10-07 | About history (stated as direction, not a completed fact) |
| Stages | Pre-seed, Seed, Series A, token rounds | Owner, Step 2 | `config/investmentParameters.js`, About thesis, application form |
| Minimum investment | No fixed minimum | Owner, Step 2 | Check size detail |
| Typical range | Varies by round; not published | Owner, Step 2 | Shown only as "Sized to each round" |
| Geography | Global | Owner, Step 2 | Investment parameters |
| Structures | Hybrid equity and token structures | Owner, Step 2 | Investment parameters |
| Lead / co-invest | Both, depending on the round | Owner, Step 2 | Investment parameters |
| Support beyond capital | Introductions to institutions, partners and customers; strategic partnerships (exchanges, payment providers, issuers); liquidity support (market-maker / exchange introductions); token design and token economics | Owner, Step 3 | `FOUNDER_SUPPORT` in `config/founders.js`; process step "Long-Term Partnership" |
| "Technical judgment" sentence | Remove | Owner, Step 3 | Removed |
| Founder partnership line | "We aim to move decisively and remain committed for the long term." | Owner, Step 3 (accepted recommendation) | About page |
| Portfolio | Owner states VaultAlpha has invested in all 15 companies below and asked to list them as the portfolio, without type classification | Owner, Step 5 | `data/portfolio.js`: Portfolio page, homepage (first 6), `/portfolio/[slug]` pages, sitemap |

| Portfolio companies (metric) | 15 | Owner, Step 6 | `config/stats.js`: About page "Why VaultAlpha Fund" figures and no-JS fallback |
| Portfolio countries (metric) | 6 (countries where portfolio companies are based) | Owner, Step 6 | Same as above |
| AUM | $750M | Owner, Step 6 | Same as above; kept out of structured data by rule |
| Founder network, Investment professionals | Remove | Owner, Step 6 | Removed |

| Offices | St. Petersburg, Florida, United States (main office); London, United Kingdom and Singapore (branch offices). New York withdrawn | Owner, 2026-10-07 (replaces Step 7) | `data/locations.js`: Contact "Offices", About Global Network, Geography parameter detail, Contact meta description |
| Office addresses | Not published (city and country only) | Owner, Step 7 | `address: null`; offices kept out of structured data |
| Company registration | Florida LLC, document number L26000508741; registered address 7901 4th St N, Ste 300, Saint Petersburg, FL 33702 | Owner, 2026-10-07 | `config/company.js`: "Company information" section on Privacy, Terms and Disclosures; kept out of structured data |
| Footer channels | X @vaultalpha_fund; LinkedIn company page; Telegram @Yuli_Hello; WhatsApp +1 249 536 1789 | Owner, 2026-10-07 | `SOCIAL_LINKS` in `config/site.js`; X and LinkedIn also in Organization `sameAs` |

| Founders email | founders@vaultalpha.fund (real, monitored) | Owner, Step 8 | Contact page, application fallback, legal pages, Organization schema |
| Partnerships / general email, phone | None; fields removed | Owner, Step 8 | `config/contact.js` |
| Response time | No time promise: "We review every application." | Owner, Step 8 (accepted recommendation) | `APPLICATION_REVIEW_NOTE` in `config/contact.js` |
| Application delivery | Form service (e.g. Formspree) | Owner, Step 8 | Pending endpoint URL in `apps/web/.env` (`VITE_FOUNDER_APPLICATION_ENDPOINT`); email fallback until then |

### Portfolio companies (Step 5, 2026-10-06)

Relationship: portfolio (owner-stated). Not independently verified. Stage, year, geography, sector, logos and founders are not published.

| Company | Website (checked 2026-10-06, HTTP 200) |
|---|---|
| BVNK | https://www.bvnk.com/ |
| Centrifuge | https://centrifuge.io/ |
| LayerZero | https://www.layerzero.org/ |
| Privy | https://www.privy.io/ |
| Maple Finance | https://maple.finance/ |
| Morpho | https://morpho.org/ |
| Turnkey | https://www.turnkey.com/ |
| zerohash | https://zerohash.com/ |
| Fireblocks | https://www.fireblocks.com/ |
| Anchorage Digital | https://www.anchorage.com/ |
| Figment | https://www.figment.io/ |
| Copper | https://copper.co/ (redirects to /en-us) |
| Plume | https://www.plume.org/ |
| EigenLayer | https://www.eigenlayer.xyz/ (redirects to eigencloud.xyz) |
| Wormhole | https://wormhole.com/ |

Note: the owner's prompt file (`VaultAlpha_15_Real_Crypto_Companies_Cursor_Prompt.md`) described these as "not confirmed VaultAlpha portfolio companies" for a Market Landscape section. The owner overrode this in chat, stating VaultAlpha really invests in them. Recommendation: keep written evidence of each investment and confirm each company is comfortable being named publicly.

## Claim inventory (live site, 2026-10-06)

| Claim | Section(s) | Status | Evidence supplied? | Proposed action | Owner input |
|---|---|---|---|---|---|
| ~~"Global technology investment firm"~~ | Hero eyebrow, About, footer, metadata | Replaced | Yes (Step 1) | Now "Digital-asset and technology investment firm" | Done |
| Four investment themes (Digital Assets & Blockchain; Payments & Stablecoins; AI; Security & Infrastructure) and their sub-areas | Home, Strategy, Founders, form sector list | Unverified | No | Confirm or narrow to primary / secondary themes | Step 2 |
| "From early conviction through later stages of growth" (implied stage range) | Home, Strategy, About | Unverified | No | Replace with confirmed stages | Step 2 |
| Nine portfolio companies with sector, stage and country | Home (6 featured), Portfolio, detail pages | Unverified; all nine linked websites belong to unrelated or parked businesses | No | Classify each (real / partner / placeholder / remove) | Step 5 |
| "Portfolio companies in 9 countries" | About, Global Network | Unverified (derived from the portfolio list) | No | Falls with the portfolio decision | Step 5 |
| Eight team members, titles and photos; no bios or LinkedIn | Home, Team, profile pages | Unverified | No | Keep / remove each; collect bios | Step 4 |
| ~~"Engineers, operators and researchers"~~ | Team, About | Removed | Owner flagged engineer claims (Step 1) | Team intro now "The leadership team working with founders for the long term." | Done |
| ~~"Our engineers review architecture, security and protocol design"~~ | Process, Principles, Founders, Why VaultAlpha | Removed | Owner: placeholder (Step 1) | Removed everywhere | Done |
| "We pair technical judgment with an international network" | Home, Strategy, About | Unverified | No | Kept for now (not a diligence claim); revisit | Step 3 |
| Four-step investment process (Application, Evaluation, Investment Decision, Long-Term Partnership) | Home, About, Strategy, Founders | Unverified | No | Confirm real process | Step 2 / 8 |
| Support with hiring, security, go-to-market and follow-on financing; network introductions | Process, Founders | Unverified | No | Confirm real capabilities | Step 3 |
| "Founders choose us because we move decisively…" | About | Unverified | No | Confirm or soften | Step 3 |
| "Responds within five business days" | Home CTA, Founders, Contact, form success | Unverified | No | Confirm response policy | Step 8 |
| founders@vaultalpha.fund | Contact, Founders, legal pages, schema | Unverified (inbox not tested) | No | Confirm the inbox works | Step 8 |
| ~~Investors / Media / General contact paths ("Address coming soon")~~ | Contact | Removed | Audience is founders + partners (Step 1) | Investors and Media paths deleted; Strategic partners and General paths stay hidden until an inbox is set | Step 8 |
| Legal pages (Privacy, Terms, Disclosures, Cookies) | Legal | Draft, marked publicly as not reviewed by counsel | — | Entity details + counsel review | Step 9 |

## Hidden in the codebase (not rendered publicly)

| Item | Where | Why hidden |
|---|---|---|
| Metrics: $2.4B+ AUM, 180+ companies, 38 countries, 400+ founder network, 25+ professionals | `apps/web/src/config/stats.js` (`STATS_PUBLISHED = false`) | Unverified |
| Three testimonials (Meridian Labs, Halcyon AI, Vault Protocol) | `apps/web/src/data/testimonials.js` | Unverified; one conflicts with the portfolio stage |
| Office street addresses (St. Petersburg, London, Singapore); New York office (withdrawn) | `apps/web/src/data/locations.js` | Not published by owner decision |
| Investment parameters: stage, check size, instruments, lead/follow | `apps/web/src/config/investmentParameters.js` | No values supplied |
| Three research article titles and covers (no text) | `apps/web/src/data/research.js` | No article text |
| Firm history and timeline | `apps/web/src/config/history.js` | No confirmed history |
## Removed claims

Step 8 (2026-10-06):
- "We review every application and respond within five business days" (homepage CTA, Founders, Contact, form confirmation) — now "We review every application."
- Strategic partners and General inquiries contact paths; all phone fields and `tel:` rendering.
- Contact meta description "strategic partnership enquiries".

Step 7 (2026-10-06):
- Street addresses "1 Finsbury Avenue", "200 Park Avenue" and "Marina Bay Financial Centre" (owner: city and country only).

Step 6 (2026-10-06):
- "$2.4B+ AUM", "180+ portfolio companies", "38 countries" (replaced by owner figures).
- "400+ founder network" and "25+ investment professionals" (removed by owner).

Step 5 (2026-10-06):
- All nine previous portfolio entries (Meridian Labs, Halcyon AI, Vault Protocol, Aurora Chain, Ledgerlyne, Ciphergrid, Northwind AI, Terrafi, Proofstack), their stages, geographies and logo files. Their websites belonged to unrelated businesses.
- The three hidden testimonials attributed to those companies (Elena Vasquez, David Kim, Sofia Almeida).
- Unused `CareersSection.jsx`.

Step 3 (2026-10-06):
- Support items "Strategic support" (go-to-market / company building), "Recruiting support" and "Follow-on support"; process step text "hiring, security, go-to-market and follow-on financing".
- "We pair technical judgment with an international network…" (homepage thesis, About, Strategy).
- "Founders choose us because we … conduct rigorous diligence…" (softened).
- Themes intro "areas where technical depth is a meaningful advantage" (same claim as technical judgment).

Step 2 (2026-10-06):
- Themes "Artificial Intelligence" and "Security & Infrastructure" (not active sectors) and every sector list that named them (hero, Strategy intro, About, footer, Why VaultAlpha, meta descriptions).
- "From early conviction through later stages of growth" (now "from pre-seed through Series A, including token rounds").
- Application stage options "Series B" and "Series C or later" (replaced by "Token round" and "Series B or later").

Step 1 (2026-10-06):
- "Global technology investment firm" (replaced by the confirmed description).
- Process step "Technical Diligence — Our engineers review architecture, security and protocol design."
- Value "Technical understanding — Our engineers review … every investment decision."
- Founder support item "Technical diligence".
- "Our engineers review…" in "Why VaultAlpha" (section retitled "Disciplined capital for long-term builders.").
- "Our team includes engineers, operators and researchers…" (About) and "Engineers, operators and researchers…" (Team intro and meta).
- Strategy criterion wording "independent technical review" (now "hold up under scrutiny").
- Contact paths for Investors / LPs and Media, and every "Address coming soon" label.
- "Careers at VaultAlpha Fund" block on Contact (talent is not a target audience; it linked back to the same page).

Earlier passes:
- Zero-value / demo counters on the homepage.
- "38 connected countries", "12 investment hubs", "400+ founder network", "24/7 live coverage".
- Public testimonials and office addresses (now hidden pending verification).
- Google Fonts (fonts are self-hosted).

## Pending facts / open questions

- Recommendation: add an "as of" date for the figures (none given yet).
- Portfolio companies have no `geography` set, so the 6 portfolio countries cannot be listed by name; supply them if they should appear in the Global Network section.
- Portfolio (optional): investment stage / year per company; short VaultAlpha thesis per company. Logos: public site icons/wordmarks were added 2026-10-06 (Privy and a few others are low-res favicons — replace with official brand packs if available).
- Build script: `npm run build` fails on Windows because `tools/generate-llms.js` is missing and `|| true` is not valid in cmd; `npx vite build` works.
- Pre-existing lint errors: `primitives.jsx` (imagetools query imports) and `TeamPhoto.jsx` (`fetchpriority`).
- Research filter still has an "Artificial Intelligence" category (`data/research.js`); research is hidden, so revisit with research content.
- Hidden testimonial (Meridian Labs) mentions talent and follow-on capital; not publishable as written.
- Step 4 (2026-10-06): owner chose to keep the Team page as is for now (8 members, names, titles and photos; no bios or LinkedIn). Still open: bios, LinkedIn URLs, responsibilities, "Yullia" vs "Yuliia" spelling, and whether "Partner, Investor Relations" fits the founder/partner audience.
- Step 9 (deferred by owner, 2026-10-06): legal entity type and jurisdiction, registration number, registered address on legal pages, regulatory status, counsel review of legal pages, analytics/cookies in use. Legal pages remain drafts (noindex, draft notice) until answered.
- Form service endpoint URL (Step 8): create a form (e.g. Formspree) delivering to founders@vaultalpha.fund and put its URL in `apps/web/.env`, then rebuild.
- Jurisdiction, registered address, registration number (Step 9).
- The hidden Meridian Labs testimonial quotes "technical diligence"; it cannot be published unless the claim is confirmed.
- Steps 3–10: not yet asked.

## Implemented changes log

- 2026-10-06: Created this file with the initial audit. No site content changed.
- 2026-10-06 (Step 1): Applied the confirmed description, legal name and audience; removed engineer / technical-diligence claims; removed placeholder contact paths and the Careers block. Files: `config/site.js`, `config/about.js`, `config/process.js`, `config/founders.js`, `config/strategy.js`, `config/contact.js`, `config/investmentParameters.js` (comment), `content/legal/privacy.js`, `seo/meta.js`, `components/sections/HeroSection.jsx`, `components/sections/ContactSection.jsx`, `pages/AboutPage.jsx`, `pages/TeamPage.jsx`, `pages/ContactPage.jsx`; deleted `components/sections/CareersSection.jsx`. Tested: `/`, `/about`, `/strategy`, `/team`, `/founders`, `/contact`, `/privacy` (no removed wording, no console errors).
- 2026-10-06 (Step 2): Replaced themes with the four confirmed sectors; added `SECTOR_SUMMARY` so every sector list reads from one place; published stage, check size, geography, instruments and lead / co-invest parameters; updated the About thesis and application stage options. Files: `config/themes.js`, `config/investmentParameters.js`, `config/site.js`, `config/about.js`, `config/strategy.js`, `config/founders.js`, `seo/meta.js`, `components/sections/HeroSection.jsx`, `pages/AboutPage.jsx`. Tested: `/`, `/about`, `/strategy`, `/founders`, `/contact`, `/portfolio`, desktop and mobile (parameters render, no console errors, lint clean).
- 2026-10-06 (Step 3): Rebuilt "What Founders Can Expect" from confirmed capabilities (Capital, Introductions, Strategic partnerships, Liquidity support, Token design); updated the Long-Term Partnership process step; removed the technical-judgment sentence and technical-depth intro; softened the founder partnership line. Files: `config/founders.js`, `config/process.js`, `config/about.js`, `components/sections/ThemesSection.jsx`. Tested: `/`, `/about`, `/strategy`, `/founders` (no removed wording, no console errors, lint clean).
- 2026-10-06 (Step 4): Team kept as is by owner decision; no changes.
- 2026-10-07: Added owner-confirmed email and LinkedIn for the four Executive Officers (Serhii Kryveko, Vadym Yaroshevskyi, Iuliia Gomes, Oleksandr Pronoza). Icons on Team cards and profile pages via `TeamContactLinks`.
- 2026-10-09: Executive Officers now Serhii Kryveko (Founding Partner), Vadym Yaroshevskyi, Iuliia Gomes (Chief Business Development Officer) and Oleksandr Pronoza; Vladyslav Blyzniuk and Vadym Nemyrytskyi removed. LinkedIn removed for Serhii Kryveko and Iuliia Gomes (email only). Photo file renamed to `Iuliia Gomes.png` to match the data.
- 2026-10-10: Added a first-visit "verify you are human" slide-puzzle check (client-side only; skipped for search crawlers; remembered 30 days in local storage `va:human-check`, listed on the Cookies page). Files: `components/site/HumanCheck.jsx`, `lib/humanCheck.js`, `components/site/SiteLayout.jsx`, `config/siteTechnology.js`, `index.css`.
- 2026-10-10: Yuliia Lohunkova restored as Chief Business Development Officer (email yuliia@vaultalpha.fund). Iuliia Gomes now Partner, with email iuliia@vertex.me and LinkedIn. Vitalina Petrenko entry removed.
- 2026-10-06 (Step 5): Replaced the portfolio with the 15 owner-confirmed companies (name, website, one-line description; no sector, stage, geography or logo). Removed old logos, fake testimonials and the unused Careers section. Files: `data/portfolio.js`, `data/testimonials.js`, `public/portfolio/*` (deleted), `components/sections/CareersSection.jsx` (deleted). Tested: `/`, `/portfolio`, `/portfolio/fireblocks`, `/about`, desktop and mobile; production build emits 15 company pages and sitemap entries; no console errors.
- 2026-10-06 (Step 6): Published 15 portfolio companies and 6 countries; AUM held back pending unit; removed founder network and headcount figures. Added per-figure `verified` flag and `getPublicStats()`; stat grid adapts to the number of figures. Files: `config/stats.js`, `components/sections/PhilosophySection.jsx`, `vite.config.js`. Tested: `/`, `/about`, `/strategy`; build no-JS fallback contains the figures.
- 2026-10-06 (Step 6, follow-up): Published AUM as $750M; relabelled "Countries" as "Portfolio countries". Confirmed AUM is absent from JSON-LD. File: `config/stats.js`.
- 2026-10-06 (Step 7): Published three offices (city, country, type, "Investment team"); no street addresses. Contact heading "Addresses" became "Offices"; country now always shown. Files: `data/locations.js`, `components/sections/ContactSection.jsx`, `components/sections/GlobalNetworkSection.jsx`, `config/investmentParameters.js`. Tested: `/contact`, `/about`, `/strategy`, `/` (no street addresses, nothing in JSON-LD, no console errors); build passes.
- 2026-10-06 (Step 8): Contact reduced to the founders path; removed partners, general and phone fields; replaced the five-business-day promise with `APPLICATION_REVIEW_NOTE`; legal pages now cite founders@vaultalpha.fund; added `apps/web/.env.example` for the form endpoint. Files: `config/contact.js`, `components/sections/ContactSection.jsx`, `FounderApplicationSection.jsx`, `FounderCtaSection.jsx`, `components/founders/FounderApplicationForm.jsx`, `seo/meta.js`, `apps/web/.env.example`. Tested: `/`, `/contact`, `/founders`, `/strategy`, `/privacy`, `/terms`; build passes.
- 2026-10-06 (Step 9): Deferred by owner; legal pages unchanged (draft).
- 2026-10-06 (Step 10): Full-site audit of 36 routes at 1440px and 375px (titles, descriptions, Open Graph image, canonical, one h1 per page, alt text, accessible names, `target="_blank"` rel, horizontal overflow, demo text, internal links, console errors): no issues except a short meta description on `/portfolio/figment`. Fixes: company-page descriptions now append "<Company> is part of the VaultAlpha Fund portfolio."; Research is hidden from the header and footer while no article is published (the page was already noindex). Files: `seo/meta.js`, `config/site.js`. Build passes; re-audit clean.
- 2026-10-07: Strategy rebuilt around Payments & Stablecoins as the core theme (others adjacent); added a market-structure thesis (no fund-performance claims). About: published founding story (March 2025, angel investors, own capital, ambition for a larger fund and network). Files: `config/themes.js`, `config/strategy.js`, `config/history.js`, `config/about.js`, `components/sections/MarketThesisSection.jsx`, `ThemesSection.jsx`, `HistorySection.jsx`, `HeroSection.jsx`, `pages/StrategyPage.jsx`, `pages/AboutPage.jsx`, `pages/HomePage.jsx`, `seo/meta.js`.
- 2026-10-07: Main office moved to St. Petersburg, Florida; London and Singapore are branches; New York withdrawn. Added Florida LLC registration (document number, registered address) to the legal pages. Added X, LinkedIn, Telegram and WhatsApp icons to the footer. Each page header now has its own background photo (`config/headerImages.js`, `public/headers/*`). Files: `data/locations.js`, `config/company.js`, `config/site.js`, `config/headerImages.js`, `content/legal/{privacy,terms,disclosures}.js`, `components/site/{SiteFooter,SocialIcons,PageHeader,Atmosphere}.jsx`, `components/sections/ContactSection.jsx`, page components, `seo/meta.js`.
- 2026-10-08: AI assistants still reported the old offices (London main, New York branch) because the no-JavaScript HTML never stated locations. Every page's `<noscript>` fallback now lists main office, branch offices and registration (`COMPANY_FACTS` in `seo/meta.js`); the build also writes `/llms.txt`; the About meta description names the offices. Files: `seo/meta.js`, `plugins/vite-plugin-seo.js`.
