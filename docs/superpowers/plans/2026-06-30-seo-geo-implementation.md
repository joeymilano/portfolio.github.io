# SEO / GEO Technical Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every portfolio and Writing page technically discoverable in search and generative search without rewriting the existing editorial content.

**Architecture:** Keep Chinese Writing URLs unchanged, generate static English counterparts under `/en/writing/`, and connect each pair with canonical and `hreflang` metadata. Centralize SEO regression checks in a repository validator that audits public HTML, discovery files, structured data, and internal references.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js validation scripts, XML sitemap/RSS, JSON-LD.

---

### Task 1: Add the SEO contract

**Files:**
- Create: `scripts/validate-seo.mjs`
- Modify: `package.json`

- [ ] Write assertions for public-page metadata, sitemap coverage, reciprocal language alternates, structured data, discovery files, and local references.
- [ ] Add `npm run validate:seo`.
- [ ] Run `npm run validate:seo` and confirm it fails on the known missing canonical, sitemap entries, English static pages, and case-study structured data.

### Task 2: Create crawlable English Writing editions

**Files:**
- Create: `en/writing/index.html`
- Create: `en/writing/ai-designers-cannot-only-sell-screens.html`
- Create: `en/writing/mcdonalds-seating-business-tradeoffs.html`
- Create: `en/writing/repurpose-one-brief-eleven-platforms.html`
- Create: `en/writing/elevator-mirrors-four-problems.html`
- Create: `en/writing/portfolio-as-evidence.html`
- Modify: `writing/index.html`
- Modify: `writing/*.html`

- [ ] Render the existing English translations as static HTML without changing their copy.
- [ ] Give every edition the correct HTML language, self-canonical, English metadata, and reciprocal `hreflang`.
- [ ] Replace language buttons with crawlable links between equivalent URLs.
- [ ] Keep all images, sources, project references, and related-reading links valid from the new path.
- [ ] Run `npm run validate:seo` and confirm language-pair checks pass.

### Task 3: Complete portfolio metadata and entity data

**Files:**
- Modify: `cryptocopilot.html`
- Modify: `pleasurecontract.html`
- Modify: `billvampire.html`
- Modify: `collov.html`
- Modify: `ctrip.html`
- Modify: `signals.html`
- Modify: `unifyux.html`
- Modify: `weneed.html`
- Modify: `yiyuduochi.html`
- Modify: `index.html`

- [ ] Add missing canonical and social-preview metadata.
- [ ] Add `CreativeWork` JSON-LD to each case study using only claims already visible in its metadata.
- [ ] Keep the shared `Person` identity and profile URLs consistent.
- [ ] Run `npm run validate:seo` and confirm public-page metadata and schema checks pass.

### Task 4: Complete discovery and indexing files

**Files:**
- Modify: `sitemap.xml`
- Modify: `robots.txt`
- Create: `llms.txt`
- Modify: `feed.xml` only if canonical Writing coverage requires correction.

- [ ] Add every canonical portfolio and language-specific Writing URL to the sitemap.
- [ ] Add explicit crawler guidance without blocking normal indexing.
- [ ] Add a concise site map for language models, with canonical links to the homepage, Writing hubs, articles, and case studies.
- [ ] Run `npm run validate:seo` and confirm discovery checks pass.

### Task 5: Full regression verification

**Files:**
- Verify all modified and generated files.

- [ ] Run `npm run validate:writing`.
- [ ] Run `npm run validate:seo`.
- [ ] Parse every JSON-LD block and sitemap URL.
- [ ] Check the final Git diff for accidental article-body rewrites.
- [ ] Report the exact changes and any follow-up requiring external account access, such as Google Search Console or Bing Webmaster Tools.
