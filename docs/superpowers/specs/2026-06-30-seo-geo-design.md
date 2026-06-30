# SEO / GEO Technical Optimization Design

## Goal

Improve discovery of joeyzhao.cc in traditional and generative search without materially rewriting the existing portfolio cases or Writing articles.

## Scope

- Preserve the current Chinese and English article copy.
- Give each language version a stable, crawlable URL.
- Complete canonical, alternate-language, social-preview, and structured-data signals.
- Ensure every public portfolio and Writing page is represented in the sitemap.
- Make Joey Zhao, his expertise, projects, articles, and social profiles easier for machines to connect.
- Add automated checks so future publishing cannot silently omit these signals.

## URL and language architecture

- Existing `/writing/` URLs remain the canonical Chinese editions.
- Static English editions live under `/en/writing/`.
- Every Chinese and English pair has reciprocal `hreflang="zh-CN"`, `hreflang="en"`, and `hreflang="x-default"` links.
- Language selectors are normal crawlable links. JavaScript may remember a visitor's preference, but indexing must not depend on JavaScript or `localStorage`.
- Each page has a self-referencing canonical URL and an HTML `lang` matching the visible document language.

## Metadata and structured data

- Every public page has a unique title, description, canonical URL, Open Graph image, and Twitter card.
- Writing pages expose `BlogPosting` JSON-LD whose headline, description, language, image, dates, URL, and author match visible content.
- Portfolio case studies expose `CreativeWork` JSON-LD connected to the same `Person` identity used on the homepage.
- Writing hubs expose `CollectionPage` and `ItemList` data.
- The homepage retains `Person` data and gains explicit links to the Writing collection and featured projects where appropriate.

## Discovery files

- `sitemap.xml` lists every canonical portfolio, Chinese Writing, and English Writing URL with truthful modification dates.
- `robots.txt` explicitly permits major search crawlers and `OAI-SearchBot`; GPTBot remains allowed under the current open policy.
- `llms.txt` provides a short machine-readable map of the site. It is an additional navigation aid, not a substitute for normal SEO.
- `feed.xml` remains the Chinese Writing feed and points to canonical Chinese article URLs.

## Internal linking

- Existing article prose remains unchanged.
- Related-reading and project-reference links use crawlable anchors.
- Language links connect equivalent pages.
- The Writing hub and homepage retain clear paths to the articles and relevant case studies.

## Validation

An automated validator will fail when:

- a public page is absent from the sitemap;
- canonical, description, Open Graph image, or language signals are missing;
- paired language pages lack reciprocal `hreflang`;
- structured data is missing or points at a different canonical URL;
- a referenced local asset or internal page is missing;
- discovery files omit required crawler or content-map entries.

The existing editorial validator remains responsible for article length, images, sources, and writing-quality constraints.

## Non-goals

- No keyword stuffing.
- No invented metrics, awards, clients, or credentials.
- No major rewriting of article or case-study content.
- No visual redesign.
- No redirect or framework migration.
- No claim that `llms.txt` guarantees AI citations.
