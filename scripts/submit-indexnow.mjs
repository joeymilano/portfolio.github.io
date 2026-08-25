import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const origin = "https://joeyzhao.cc";
const host = "joeyzhao.cc";
const key = "8c9a9f96077ab8e22b8c9757d885d0b4";
const keyLocation = `${origin}/${key}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const softFail = args.has("--soft-fail");

function fail(message) {
  if (softFail) {
    console.warn(`IndexNow skipped: ${message}`);
    process.exit(0);
  }
  throw new Error(message);
}

const keyFile = path.join(root, `${key}.txt`);
if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, "utf8").trim() !== key) {
  fail(`ownership key file ${key}.txt is missing or invalid`);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urlList.length) fail("sitemap.xml contains no URLs");
if (urlList.some((url) => !url.startsWith(`${origin}/`))) {
  fail("sitemap.xml contains a URL outside joeyzhao.cc");
}

const payload = { host, key, keyLocation, urlList };

if (dryRun) {
  console.log(`IndexNow dry run: ${urlList.length} URLs, key at ${keyLocation}`);
  process.exit(0);
}

let response;
try {
  response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
} catch (error) {
  fail(`request failed (${error.message})`);
}

if (!response.ok) {
  const details = (await response.text()).trim();
  fail(`HTTP ${response.status}${details ? `: ${details}` : ""}`);
}

console.log(`IndexNow accepted ${urlList.length} canonical URLs (HTTP ${response.status}).`);
