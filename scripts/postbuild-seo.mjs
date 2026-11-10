// Runs after `vite build`. Writes per-route static HTML (GitHub Pages serves
// /<route>/index.html with HTTP 200), 404.html, sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const { siteUrl, routes, notFound } = JSON.parse(readFileSync("src/seo/routes.json", "utf8"));
const base = readFileSync(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render({ title, description, url, indexable }) {
  let html = base;
  const swap = (re, val) => {
    if (!re.test(html)) throw new Error(`Missing in index.html: ${re}`);
    html = html.replace(re, () => val);
  };
  swap(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`);
  swap(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`);
  swap(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`);
  swap(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}" />`);
  swap(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  swap(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  const extra = [];
  if (url) extra.push(`<meta property="og:url" content="${url}" />`);
  if (url && indexable) extra.push(`<link rel="canonical" href="${url}" />`);
  if (!indexable) extra.push(`<meta name="robots" content="noindex" />`);
  return html.replace("</head>", () => `  ${extra.join("\n      ")}\n    </head>`);
}

for (const [path, r] of Object.entries(routes)) {
  const url = siteUrl + path;
  const out = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  if (path !== "/") mkdirSync(join(dist, path), { recursive: true });
  writeFileSync(out, render({ ...r, url }));
}
// 404.html: no canonical, noindex; the app renders NotFound.
writeFileSync(join(dist, "404.html"), render({ ...notFound, url: null, indexable: false }));

const pub = Object.entries(routes).filter(([, r]) => r.indexable);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pub.map(([p]) => `  <url><loc>${siteUrl}${p}</loc></url>`).join("\n") +
    `\n</urlset>\n`,
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`SEO files written for ${Object.keys(routes).length} routes`);
