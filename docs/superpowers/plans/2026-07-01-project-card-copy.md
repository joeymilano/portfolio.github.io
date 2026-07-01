# Project Card Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WeNeed and Narrative Card RPG homepage subtitles in both supported languages without touching other agents' work.

**Architecture:** Keep the existing single-file homepage and i18n dictionary. Update each subtitle in the static English fallback and in the `en` and `zh` translation objects, then verify exact text occurrence counts and the existing site checks.

**Tech Stack:** Static HTML, vanilla JavaScript i18n, Node.js validation scripts

---

### Task 1: Update and verify the two project-card subtitles

**Files:**
- Modify: `index.html:1205-1240`
- Modify: `index.html:1763-1770`
- Modify: `index.html:2232-2244`

- [ ] **Step 1: Run the content assertion before editing**

```bash
node -e "const s=require('fs').readFileSync('index.html','utf8'); for (const x of ['Short-video item gifting + We Points.','A card roguelike built with an Agentic Engineering mindset.','短视频闲置物品赠送 + We 积分','Agentic Engineering 思维开发的卡牌肉鸽游戏']) if(!s.includes(x)) throw new Error('Missing: '+x)"
```

Expected: FAIL with `Missing: Short-video item gifting + We Points.`

- [ ] **Step 2: Replace the English fallback and i18n values**

Set the WeNeed subtitle to:

```text
Short-video item gifting + We Points.
```

Set the Narrative Card RPG subtitle to:

```text
A card roguelike built with an Agentic Engineering mindset.
```

Set the Chinese WeNeed subtitle to:

```text
短视频闲置物品赠送 + We 积分
```

Set the Chinese Narrative Card RPG subtitle to:

```text
Agentic Engineering 思维开发的卡牌肉鸽游戏
```

- [ ] **Step 3: Run the content assertion after editing**

Run the Step 1 command again.

Expected: command exits successfully with no output.

- [ ] **Step 4: Run repository validation**

```bash
npm run validate:seo
npm run validate:writing
git diff --check -- index.html
```

Expected: both validation scripts pass and `git diff --check` produces no output.

- [ ] **Step 5: Commit only this task's files**

```bash
git add index.html docs/superpowers/plans/2026-07-01-project-card-copy.md
git commit -m "fix: clarify side project card positioning"
```

- [ ] **Step 6: Push the scoped commits**

```bash
git push origin main
```

Expected: `main` advances with only the copy-specification and copy-update commits; unrelated working-tree files remain uncommitted.
