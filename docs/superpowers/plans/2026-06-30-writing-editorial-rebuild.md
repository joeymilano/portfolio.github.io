# Writing Editorial Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Joey's Writing section into a visually rich, evidence-led publication with five substantive launch essays.

**Architecture:** Keep the existing static HTML publication and shared stylesheet, but add a dedicated optimized image set, richer semantic article components, and stricter validation. Each essay remains independently indexable and uses the website as the canonical source for social adaptations.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, Node.js validation, existing local JPEG/PNG assets.

---

### Task 1: Lock the editorial contract

**Files:**
- Create: `docs/editorial/joey-writing-standard.md`
- Modify: `docs/superpowers/specs/2026-06-30-writing-growth-flywheel-design.md`

- [ ] **Step 1:** Record the approved voice: firsthand scenes, causal reasoning, evidence boundaries, practical takeaways, and a ban on generic AI filler.
- [ ] **Step 2:** Add measurable length, image, caption, sourcing, and automatic-failure criteria.
- [ ] **Step 3:** Cross-check the design spec against the new editorial contract.

### Task 2: Build the article image library

**Files:**
- Create: `images/writing/`
- Source: `/Users/joeyzhao/Documents/香港新加坡多媒体娱乐设计/小红书内容/mcd_assets/`
- Source: `/Users/joeyzhao/Documents/香港新加坡多媒体娱乐设计/小红书内容/elevator_assets/`
- Source: `images/yiyuduochi-*.png`
- Source: `images/render_p25.jpg` through `images/render_p30.jpg`
- Source: `images/revvity-*.png`

- [ ] **Step 1:** Copy only images that support a specific claim or comparison.
- [ ] **Step 2:** Resize oversized images to web-ready dimensions while preserving originals.
- [ ] **Step 3:** Verify every output opens and record its intended article role.

### Task 3: Add editorial image and evidence components

**Files:**
- Modify: `writing/writing.css`
- Modify: `writing/writing.js`

- [ ] **Step 1:** Add responsive hero images, full-width figures, two-image comparisons, captions, evidence notes, decision records, checklists, and source-list styles.
- [ ] **Step 2:** Ensure article typography remains readable at 390px and 1440px.
- [ ] **Step 3:** Respect reduced motion and preserve visible keyboard focus.

### Task 4: Rewrite the five launch essays

**Files:**
- Modify: `writing/ai-designers-cannot-only-sell-screens.html`
- Modify: `writing/mcdonalds-seating-business-tradeoffs.html`
- Modify: `writing/repurpose-one-brief-eleven-platforms.html`
- Modify: `writing/elevator-mirrors-four-problems.html`
- Modify: `writing/portfolio-as-evidence.html`

- [ ] **Step 1:** Rewrite the AI designer essay around real product decisions in Signals, 一鱼多吃, and Bill Vampire.
- [ ] **Step 2:** Rewrite the McDonald's essay as a bounded photo analysis of visible seating choices and business trade-offs.
- [ ] **Step 3:** Rewrite 一鱼多吃 as a candid build log covering fake-data removal, model failure, workbench architecture, guardrails, pricing, and unresolved risks.
- [ ] **Step 4:** Rewrite the elevator essay from the Shenzhen observation, keeping only claims that can be verified or explicitly bounded.
- [ ] **Step 5:** Rewrite the portfolio essay as a teardown of Joey's own Signals, UnifyUX, and 一鱼多吃 evidence.
- [ ] **Step 6:** Give every image descriptive alt text and a caption explaining why it matters.

### Task 5: Rebuild the Writing cover

**Files:**
- Modify: `writing/index.html`
- Modify: `writing/writing.css`

- [ ] **Step 1:** Replace the abstract purple feature block with a real product image and overlay treatment.
- [ ] **Step 2:** Add photographic thumbnails and useful editorial summaries for all five stories.
- [ ] **Step 3:** Preserve canonical metadata, structured data, and platform routes.

### Task 6: Enforce and verify quality

**Files:**
- Modify: `scripts/validate-writing.mjs`

- [ ] **Step 1:** Add checks for 1,800+ Chinese characters, 4+ figures, matching captions, descriptive alt text, a source/method section, and forbidden filler phrases.
- [ ] **Step 2:** Run `npm run validate:writing`; expect all five articles and feed/sitemap coverage to pass.
- [ ] **Step 3:** Render the hub and all articles at 1440px and 390px; inspect overflow, broken images, hierarchy, captions, and console errors.
- [ ] **Step 4:** Read every article against `docs/editorial/joey-writing-standard.md` and remove any unsupported claim or generic paragraph.
