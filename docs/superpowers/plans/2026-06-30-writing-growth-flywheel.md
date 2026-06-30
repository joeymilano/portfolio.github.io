# Writing Growth Flywheel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch an editorial writing section with five source articles and a measurable distribution loop across Joey's website and social profiles.

**Architecture:** Preserve the current dependency-light static site. Add a self-contained `writing/` area with one shared stylesheet and script, six crawlable HTML documents, and a validation script; connect it to the existing home page through navigation and a selected-writing section.

**Tech Stack:** Semantic HTML, shared CSS, minimal vanilla JavaScript, JSON-LD, XML sitemap/RSS, Node.js validation, Puppeteer smoke checks.

---

### Task 1: Protect the design contract

**Files:**
- Create: `docs/superpowers/specs/2026-06-30-writing-growth-flywheel-design.md`
- Create: `docs/superpowers/plans/2026-06-30-writing-growth-flywheel.md`

- [ ] Confirm the spec names the five launch articles, approved editorial direction, social identities, source-site model, and acceptance criteria.
- [ ] Scan both documents for `TBD`, `TODO`, unresolved alternatives, or contradictory language.
- [ ] Commit only the two planning documents with `docs: define writing growth flywheel`.

### Task 2: Add deterministic validation

**Files:**
- Create: `scripts/validate-writing.mjs`
- Modify: `package.json`

- [ ] Write checks for the writing index and five exact article slugs.
- [ ] Require one title, meta description, canonical URL, H1, `BlogPosting` JSON-LD, and shared stylesheet on every article.
- [ ] Require every public writing URL in `sitemap.xml` and every article URL in `feed.xml`.
- [ ] Add `npm run validate:writing` and run it before implementation to confirm it fails on missing pages.

### Task 3: Build the shared editorial system

**Files:**
- Create: `writing/writing.css`
- Create: `writing/writing.js`
- Create: `writing/index.html`

- [ ] Implement the dark editorial tokens, fixed navigation, featured-story composition, article list, social footer, responsive breakpoints, visible focus states, and reduced-motion rules.
- [ ] Implement native X and LinkedIn share URLs, copy-link feedback, and copyable WeChat Channels ID with progressive enhancement.
- [ ] Build the writing index with the AI essay featured and four secondary stories.
- [ ] Validate keyboard navigation, semantic heading order, and 320px mobile layout.

### Task 4: Publish the five launch essays

**Files:**
- Create: `writing/ai-designers-cannot-only-sell-screens.html`
- Create: `writing/mcdonalds-seating-business-tradeoffs.html`
- Create: `writing/repurpose-one-brief-eleven-platforms.html`
- Create: `writing/elevator-mirrors-four-problems.html`
- Create: `writing/portfolio-as-evidence.html`

- [ ] Give each document unique SEO/Open Graph metadata, canonical URL, `BlogPosting` JSON-LD, category, date, reading time, author link, and descriptive H1.
- [ ] Rewrite source material in Joey's first-person voice and remove unverified causal claims or invented precision.
- [ ] Add a short takeaway block, relevant links to existing case studies, platform-follow cards, related stories, and a contact path.
- [ ] Run `npm run validate:writing` and fix every content or metadata failure.

### Task 5: Connect the portfolio and discovery surfaces

**Files:**
- Modify: `index.html`
- Modify: `sitemap.xml`
- Modify: `robots.txt`
- Create: `feed.xml`
- Create: `docs/content-distribution-playbook.md`

- [ ] Add Writing to desktop/mobile navigation and translation dictionaries.
- [ ] Add a selected-writing section before Contact, using the AI essay as the featured professional story and the McDonald's essay as the proven traffic story.
- [ ] Add X and WeChat Channels to the visible contact area; add X to Person `sameAs`.
- [ ] Add six writing URLs to the sitemap with accurate dates and publish an RSS feed containing all five essays.
- [ ] Document exact UTM templates and the native adaptation shape for LinkedIn, X, Xiaohongshu, and WeChat Channels.

### Task 6: Verify the shipped experience

**Files:**
- Use: `take-screenshots.js` or a temporary Puppeteer check without rewriting tracked assets.

- [ ] Run `npm run validate:writing` and require a zero exit code.
- [ ] Serve the repository locally and open the home page, writing index, and all five articles.
- [ ] Check desktop and mobile screenshots for overflow, unreadable typography, broken navigation, or missing images.
- [ ] Check browser console output and all internal writing links.
- [ ] Review `git diff --check` and `git status --short`, confirming the two unrelated screenshot files remain untouched.

