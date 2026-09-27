# Joey Zhao: search and AI discovery repair

## Verified production issue

On 2026-09-27, https://joeyzhao.cc/explore/ returned `noindex,nofollow` in its HTML. The root homepage redirects JavaScript-enabled visitors to this studio. The studio had no canonical, profile schema, social preview metadata, or direct static case-study links. Existing SEO validation did not cover it.

Production robots.txt allows general crawling, OAI-SearchBot, and Baiduspider. This does not override page-level noindex or prove that every crawler passes the CDN's security controls.

## Implemented locally

- Indexable studio with a self canonical and descriptive English/Chinese runtime titles.
- Person, ProfilePage, and WebSite metadata share the existing person identity and verified site profile links.
- Social previews use the existing studio poster.
- A native HTML profile directory exposes the same identity, case studies, writing, and contact links to visitors and crawlers. It works without JavaScript or WebGL.
- Studio included in sitemap.xml and llms.txt. The latter is only a navigation aid.
- Existing GA4 measurement added to the studio, restricted to production hostnames.
- SEO validation now includes the studio and rejects noindex/nofollow on public pages.
- GitHub Actions workflow runs SEO, writing, and IndexNow payload validation on pushes to main/master and pull requests; it can also be run manually. It does not submit URLs before deployment.
- Changed module URLs are versioned to avoid stale immutable caches.

## Validation

The expanded validator first reproduced 18 studio failures. After repairs:

- SEO validation: 40 public pages and 12 bilingual article pairs passed.
- Existing writing validator: 9 articles, sitemap and RSS checks passed (its coverage differs from the SEO validator).
- IndexNow dry run: 40 URLs; no external submission made.
- Browser checks at 1440px and 390px: native directory opens with JavaScript disabled, 15 links available, no horizontal overflow.
- With JavaScript enabled: root-to-studio navigation, metadata, Chinese language switch, and existing Work dialog checked. Model loading was deliberately blocked in this check to exercise the fallback; this is not a full 3D performance assessment.
- Whitespace/diff checks passed.

## Release and measurement

Integrated on top of the latest studio changes. The previous local review did not publish this work; release status is tracked by the repository commit and Cloudflare deployment. Existing unrelated studio edits were preserved.

After publication, verify the actual HTML and response headers on /explore/, its stylesheet and versioned modules, sitemap, and robots. Only then run the existing IndexNow submission and record the response; acceptance is not indexing. Use Search Console URL Inspection to request a fresh crawl and check Google-selected canonical. Compare impressions, clicks, queries and landing pages over the next 28 days, and inspect GA4 referral traffic and contact conversions. No Search Console or Bing account data was accessed in this pass, so no ranking or traffic lift is claimed.

## Editorial direction

Prioritize the existing evidence around AI agent UX (Finfold and agent-design essay), enterprise scientific workflows (Signals Notebook), and design systems (UnifyUX). Keep professional identity and profile links consistent across the site and public profiles. Future content should add original project decisions, constraints, and attributable outcomes. Do not invent client endorsements, rankings, or performance claims.

Google states that eligibility for AI Overviews and AI Mode uses ordinary search fundamentals; indexing and serving are not guaranteed, and special AI text files or schema are not required:
https://developers.google.com/search/docs/appearance/ai-features
