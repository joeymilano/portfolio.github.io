import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articles = [
  "ai-designers-cannot-only-sell-screens",
  "mcdonalds-seating-business-tradeoffs",
  "repurpose-one-brief-eleven-platforms",
  "elevator-mirrors-four-problems",
  "portfolio-as-evidence",
];
const failures = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireMatch(content, pattern, label, file) {
  if (!pattern.test(content)) failures.push(`${file}: missing ${label}`);
}

const hub = read("writing/index.html");
requireMatch(hub, /<title>[^<]+<\/title>/, "title", "writing/index.html");
requireMatch(hub, /rel="canonical" href="https:\/\/joeyzhao\.cc\/writing\/"/, "canonical URL", "writing/index.html");
requireMatch(hub, /<h1[\s>]/, "H1", "writing/index.html");

for (const slug of articles) {
  const file = `writing/${slug}.html`;
  const html = read(file);
  requireMatch(html, /<title>[^<]+<\/title>/, "title", file);
  requireMatch(html, /<meta name="description" content="[^"]+"/, "meta description", file);
  if (!html.includes(`rel="canonical" href="https://joeyzhao.cc/writing/${slug}.html"`)) {
    failures.push(`${file}: missing canonical URL`);
  }
  requireMatch(html, /<h1[\s>]/, "H1", file);
  requireMatch(html, /"@type":\s*"BlogPosting"/, "BlogPosting JSON-LD", file);
  requireMatch(html, /href="writing\.css"/, "shared stylesheet", file);
  requireMatch(html, /https:\/\/x\.com\/JoeyKonad/, "X profile", file);
  requireMatch(html, /sphmQz03lemSzBD/, "WeChat Channels ID", file);
}

const sitemap = read("sitemap.xml");
const feed = read("feed.xml");
for (const slug of articles) {
  const url = `https://joeyzhao.cc/writing/${slug}.html`;
  if (!sitemap.includes(url)) failures.push(`sitemap.xml: missing ${url}`);
  if (!feed.includes(url)) failures.push(`feed.xml: missing ${url}`);
}
if (!sitemap.includes("https://joeyzhao.cc/writing/")) {
  failures.push("sitemap.xml: missing writing hub");
}

if (failures.length) {
  console.error(`Writing validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Writing validation passed: ${articles.length} articles, sitemap and RSS coverage complete.`);
