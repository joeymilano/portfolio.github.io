# joeyzhao.cc

Source of **[joeyzhao.cc](https://joeyzhao.cc)** — the personal site of Joey Zhao, a senior AI product designer in Shanghai focused on trustworthy AI agents, AI agent UX, enterprise SaaS, and growth design. Portfolio, interactive work explorer, and bilingual writing (中文 / English).

- 🌐 Live site: <https://joeyzhao.cc> · Explorer: <https://joeyzhao.cc/explore/> · English: <https://joeyzhao.cc/en/>
- ✍️ Writing: <https://joeyzhao.cc/writing/> · <https://joeyzhao.cc/en/writing/>
- 🧰 Selected products: [Finfold](https://finfold.app) · [Pagemi](https://pagemi.joeyzhao.cc) · [Portfolio OS](https://joeymilano.github.io/portfolio-os/) · [BillVampire](https://billvampire.com)
- 🏢 Studio: [1% Design Lab](https://1-design-lab.com)
- ✉️ Contact: super666joey@gmail.com

## What's inside

Plain HTML/CSS/JS pages behind a custom domain:

- `explore/` — interactive studio & profile explorer
- per-project case pages — `signals.html`, `unifyux.html`, `finfold.html`, `collov.html`, …
- `writing/` + `en/` — bilingual essays and notes
- `resume/`, `docs/`, `screenshots/`, `videos/`
- `llms.txt`, `sitemap.xml`, `robots.txt`, `feed.xml` — kept current for search and AI crawlers

## Scripts

No build step. Node scripts guard content quality and search indexing:

```sh
npm run validate:writing   # lint the writing sections
npm run validate:seo       # SEO invariants
npm run seo:indexnow       # submit URLs to IndexNow
```
