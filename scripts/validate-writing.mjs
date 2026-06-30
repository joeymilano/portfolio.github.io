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
const forbiddenPatterns = [
  ["时代背景套话", /在这个快速变化的时代|在当今.{0,12}时代/g],
  ["发展套话", /随着.{0,18}(?:不断|快速|迅速)?发展/g],
  ["不仅仅是", /不仅仅是/g],
  ["空泛过渡", /值得注意的是|不难发现|众所周知/g],
  ["咨询黑话", /赋能|抓手|全链路闭环/g],
  ["总结套话", /从本质上说|这让我意识到|一句话总结|综上所述/g],
];

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

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function localAssetExists(src, htmlFile) {
  if (/^(?:https?:|data:|#)/.test(src)) return true;
  const cleanPath = src.split("#")[0].split("?")[0];
  return fs.existsSync(path.resolve(root, path.dirname(htmlFile), cleanPath));
}

function validateLocalReferences(html, file) {
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|data:|mailto:|tel:|#|\/\/)/.test(target)) continue;
    if (!localAssetExists(target, file)) failures.push(`${file}: missing local reference ${target}`);
  }
}

const portfolioHome = read("index.html");
requireMatch(
  portfolioHome,
  /<div class="writing-feature-art">[\s\S]*?<img[^>]+src="images\/writing\/ai-design-judgment-feature\.jpg"/,
  "generated Writing feature image",
  "index.html",
);
if (/Cormorant(?:\+| )Garamond/.test(portfolioHome)) {
  failures.push("index.html: Writing typography must use the portfolio sans-serif family");
}
validateLocalReferences(portfolioHome, "index.html");

const hub = read("writing/index.html");
requireMatch(hub, /<title>[^<]+<\/title>/, "title", "writing/index.html");
requireMatch(hub, /rel="canonical" href="https:\/\/joeyzhao\.cc\/writing\/"/, "canonical URL", "writing/index.html");
requireMatch(hub, /<h1[\s>]/, "H1", "writing/index.html");
requireMatch(hub, /href="writing\.css\?v=20260630-2"/, "versioned Writing stylesheet", "writing/index.html");
validateLocalReferences(hub, "writing/index.html");

const writingStyles = read("writing/writing.css");
if (/Cormorant(?:\+| )Garamond/.test(writingStyles)) {
  failures.push("writing/writing.css: standalone Writing typography must match the portfolio sans-serif family");
}
if (/--serif|var\(--serif\)/.test(writingStyles)) {
  failures.push("writing/writing.css: legacy serif display channel must be removed");
}

for (const slug of articles) {
  const file = `writing/${slug}.html`;
  const html = read(file);
  requireMatch(html, /<title>[^<]+<\/title>/, "title", file);
  requireMatch(html, /<meta name="description" content="[^"]+"/, "meta description", file);
  requireMatch(html, /<meta property="og:image" content="https:\/\/joeyzhao\.cc\/[^"]+"/, "Open Graph image", file);
  if (!html.includes(`rel="canonical" href="https://joeyzhao.cc/writing/${slug}.html"`)) {
    failures.push(`${file}: missing canonical URL`);
  }
  requireMatch(html, /<h1[\s>]/, "H1", file);
  requireMatch(html, /"@type":\s*"BlogPosting"/, "BlogPosting JSON-LD", file);
  requireMatch(html, /href="writing\.css"/, "shared stylesheet", file);
  requireMatch(html, /https:\/\/x\.com\/JoeyKonad/, "X profile", file);
  requireMatch(html, /sphmQz03lemSzBD/, "WeChat Channels ID", file);

  const articleMatch = html.match(/<article class="article-body"[^>]*>([\s\S]*?)<\/article>/);
  if (!articleMatch) {
    failures.push(`${file}: missing article body`);
    continue;
  }
  const articleText = articleMatch[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, "");
  const hanCount = countMatches(articleText, /\p{Script=Han}/gu);
  if (hanCount < 1800) failures.push(`${file}: only ${hanCount} Chinese characters; minimum is 1800`);

  const figures = countMatches(html, /<figure[\s>]/g);
  const captions = countMatches(html, /<figcaption[\s>]/g);
  if (figures < 4) failures.push(`${file}: only ${figures} figures; minimum is 4`);
  if (captions !== figures) failures.push(`${file}: ${figures} figures but ${captions} captions`);

  const images = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/g)];
  if (images.length < 4) failures.push(`${file}: only ${images.length} images; minimum is 4`);
  for (const image of images) {
    const tag = image[0];
    const src = image[1];
    const alt = tag.match(/\salt="([^"]*)"/)?.[1] ?? "";
    if (alt.trim().length < 8) failures.push(`${file}: image ${src} needs descriptive alt text`);
    if (!localAssetExists(src, file)) failures.push(`${file}: missing image asset ${src}`);
  }
  if (html.includes("elevator-mirror-concept.jpg") && !/概念示意（AI 生成）/.test(html)) {
    failures.push(`${file}: generated concept image is not disclosed`);
  }
  requireMatch(html, /class="references"/, "sources or method note", file);
  requireMatch(html, /class="reader-tool"/, "practical reader tool", file);
  validateLocalReferences(html, file);

  let fillerCount = 0;
  for (const [label, pattern] of forbiddenPatterns) {
    const count = countMatches(articleText, pattern);
    fillerCount += count;
    if (count) failures.push(`${file}: contains ${count} instance(s) of forbidden ${label}`);
  }
  if (fillerCount > 2) failures.push(`${file}: too many generic filler patterns (${fillerCount})`);
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
