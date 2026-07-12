import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const origin = "https://joeyzhao.cc";
const failures = [];

const casePages = [
  "billvampire.html",
  "collov.html",
  "cryptocopilot.html",
  "ctrip.html",
  "pleasurecontract.html",
  "signals.html",
  "unifyux.html",
  "weneed.html",
  "finfold.html",
];

const articleSlugs = [
  "ai-designers-cannot-only-sell-screens",
  "mcdonalds-seating-business-tradeoffs",
  "finfold-one-brief-eleven-platforms",
  "elevator-mirrors-four-problems",
  "portfolio-as-evidence",
];

const publicPages = [
  { file: "index.html", url: `${origin}/`, lang: "en", schema: "Person" },
  ...casePages.map((file) => ({
    file,
    url: `${origin}/${file}`,
    lang: "en",
    schema: "CreativeWork",
  })),
  {
    file: "writing/index.html",
    url: `${origin}/writing/`,
    lang: "zh-CN",
    schema: "CollectionPage",
    alternate: `${origin}/en/writing/`,
  },
  {
    file: "en/writing/index.html",
    url: `${origin}/en/writing/`,
    lang: "en",
    schema: "CollectionPage",
    alternate: `${origin}/writing/`,
  },
  ...articleSlugs.flatMap((slug) => [
    {
      file: `writing/${slug}.html`,
      url: `${origin}/writing/${slug}.html`,
      lang: "zh-CN",
      schema: "BlogPosting",
      alternate: `${origin}/en/writing/${slug}.html`,
    },
    {
      file: `en/writing/${slug}.html`,
      url: `${origin}/en/writing/${slug}.html`,
      lang: "en",
      schema: "BlogPosting",
      alternate: `${origin}/writing/${slug}.html`,
    },
  ]),
];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function requirePattern(content, pattern, label, file) {
  if (!pattern.test(content)) failures.push(`${file}: missing ${label}`);
}

function parseJsonLd(html, file) {
  const blocks = [];
  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }
  return blocks.flatMap((block) => (Array.isArray(block) ? block : [block]));
}

function schemaContainsType(value, expectedType) {
  if (!value || typeof value !== "object") return false;
  if (value["@type"] === expectedType) return true;
  if (Array.isArray(value["@graph"])) {
    return value["@graph"].some((entry) => schemaContainsType(entry, expectedType));
  }
  return false;
}

function schemaContainsUrl(value, expectedUrl) {
  if (!value || typeof value !== "object") return false;
  if (
    value.url === expectedUrl ||
    value["@id"] === expectedUrl ||
    value.mainEntityOfPage === expectedUrl ||
    value.mainEntityOfPage?.["@id"] === expectedUrl
  ) {
    return true;
  }
  return Object.values(value).some((entry) => {
    if (Array.isArray(entry)) {
      return entry.some((item) => schemaContainsUrl(item, expectedUrl));
    }
    return schemaContainsUrl(entry, expectedUrl);
  });
}

function localReferenceExists(target, htmlFile) {
  if (/^(?:https?:|mailto:|tel:|data:|#|\/\/)/.test(target)) return true;
  const cleanTarget = decodeURIComponent(target.split("#")[0].split("?")[0]);
  if (!cleanTarget) return true;
  return fs.existsSync(path.resolve(root, path.dirname(htmlFile), cleanTarget));
}

function validateLocalReferences(html, file) {
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    if (!localReferenceExists(match[1], file)) {
      failures.push(`${file}: missing local reference ${match[1]}`);
    }
  }
}

function validateAbsoluteSiteAssets(html, file) {
  for (const match of html.matchAll(/https:\/\/joeyzhao\.cc\/([^"'<>\s?#]+(?:\?[^"'<>\s]*)?)/g)) {
    const assetPath = decodeURIComponent(match[1].split("?")[0]);
    if (!assetPath || assetPath.endsWith("/")) continue;
    if (!fs.existsSync(path.join(root, assetPath))) {
      failures.push(`${file}: missing site asset https://joeyzhao.cc/${assetPath}`);
    }
  }
}

const sitemap = read("sitemap.xml");
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);

for (const page of publicPages) {
  const html = read(page.file);
  if (!html) continue;

  requirePattern(
    html,
    new RegExp(`<html[^>]+lang=["']${escapeRegex(page.lang)}["']`, "i"),
    `html lang="${page.lang}"`,
    page.file,
  );
  requirePattern(html, /<title>[^<]{8,}<\/title>/i, "descriptive title", page.file);
  requirePattern(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{25,}["']/i,
    "meta description",
    page.file,
  );
  requirePattern(
    html,
    new RegExp(
      `<link[^>]+rel=["']canonical["'][^>]+href=["']${escapeRegex(page.url)}["']`,
      "i",
    ),
    `self canonical ${page.url}`,
    page.file,
  );
  requirePattern(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\/joeyzhao\.cc\/[^"']+["']/i,
    "absolute Open Graph image",
    page.file,
  );
  requirePattern(
    html,
    /<meta[^>]+name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i,
    "Twitter large-image card",
    page.file,
  );

  const jsonLd = parseJsonLd(html, page.file);
  if (!jsonLd.some((block) => schemaContainsType(block, page.schema))) {
    failures.push(`${page.file}: missing ${page.schema} JSON-LD`);
  }
  if (!jsonLd.some((block) => schemaContainsUrl(block, page.url))) {
    failures.push(`${page.file}: JSON-LD does not identify canonical URL ${page.url}`);
  }

  if (page.schema === "CreativeWork") {
    requirePattern(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i, "primary h1", page.file);
  }

  validateAbsoluteSiteAssets(html, page.file);

  if (page.alternate) {
    const ownChinese =
      page.lang === "zh-CN" ? page.url : page.alternate;
    const ownEnglish =
      page.lang === "en" ? page.url : page.alternate;
    requirePattern(
      html,
      new RegExp(
        `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']zh-CN["'][^>]+href=["']${escapeRegex(ownChinese)}["']`,
        "i",
      ),
      "zh-CN hreflang",
      page.file,
    );
    requirePattern(
      html,
      new RegExp(
        `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']en["'][^>]+href=["']${escapeRegex(ownEnglish)}["']`,
        "i",
      ),
      "English hreflang",
      page.file,
    );
    requirePattern(
      html,
      new RegExp(
        `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']x-default["'][^>]+href=["']${escapeRegex(ownEnglish)}["']`,
        "i",
      ),
      "x-default hreflang",
      page.file,
    );
    requirePattern(
      html,
      new RegExp(
        `<a[^>]+href=["'][^"']*${escapeRegex(
          page.lang === "zh-CN"
            ? page.file.endsWith("index.html")
              ? `/en/writing/`
              : `/en/writing/${path.basename(page.file)}`
            : page.file.endsWith("index.html")
              ? `../../writing/`
              : `../../writing/${path.basename(page.file)}`,
        )}["'][^>]*>`,
        "i",
      ),
      "crawlable language link",
      page.file,
    );
  }

  if (!sitemapUrls.has(page.url)) {
    failures.push(`sitemap.xml: missing ${page.url}`);
  }
  validateLocalReferences(html, page.file);
}

const robots = read("robots.txt");
requirePattern(
  robots,
  /User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i,
  "explicit OAI-SearchBot allow rule",
  "robots.txt",
);
requirePattern(
  robots,
  /Sitemap:\s*https:\/\/joeyzhao\.cc\/sitemap\.xml/i,
  "sitemap declaration",
  "robots.txt",
);

const llms = read("llms.txt");
requirePattern(llms, /^# Joey Zhao/m, "site identity heading", "llms.txt");
requirePattern(
  llms,
  /https:\/\/joeyzhao\.cc\/writing\//,
  "Chinese Writing hub",
  "llms.txt",
);
requirePattern(
  llms,
  /https:\/\/joeyzhao\.cc\/en\/writing\//,
  "English Writing hub",
  "llms.txt",
);

const feed = read("feed.xml");
for (const slug of articleSlugs) {
  const url = `${origin}/writing/${slug}.html`;
  if (!feed.includes(url)) failures.push(`feed.xml: missing ${url}`);
}

if (failures.length) {
  console.error(`SEO validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO validation passed: ${publicPages.length} public pages, ${articleSlugs.length} bilingual article pairs.`,
);
