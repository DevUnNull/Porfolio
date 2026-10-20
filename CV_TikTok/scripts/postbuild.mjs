// Runs after `vite build`. Writes one HTML file per public route with its own
// title, description, canonical URL and Open Graph tags, so direct links and
// social previews work on any static host. Also writes sitemap.xml,
// robots.txt, 404.html (GitHub Pages fallback) and _redirects (Cloudflare).
import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

async function readEnv() {
  try {
    const txt = await readFile(join(root, '.env'), 'utf8');
    return Object.fromEntries(txt.split('\n').filter((l) => /^\w+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]));
  } catch {
    return {};
  }
}

const env = await readEnv();
const SITE = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'https://unnull-feed.pages.dev').replace(/\/$/, '');
const BASE = process.env.BASE_PATH || '/';

// Load the content modules (TypeScript) through esbuild.
const out = join(root, 'node_modules/.cache/unnull-data.mjs');
await mkdir(dirname(out), { recursive: true });
await build({
  stdin: {
    contents: `export { posts } from './src/data/posts'; export { projects } from './src/data/projects'; export { profile } from './src/data/profile';`,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  define: { 'import.meta.env.BASE_URL': JSON.stringify(BASE) },
  logLevel: 'error',
});
const { posts, projects, profile } = await import(pathToFileURL(out).href + `?t=${Date.now()}`);

const template = await readFile(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (p) => (p.startsWith('http') ? p : `${SITE}/${p.replace(BASE, '').replace(/^\//, '')}`);
const defaultImage = `${SITE}/og-image.jpg`;

function page({ path, title, description, image = defaultImage }) {
  const url = `${SITE}${path}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${image}`);
  return html;
}

const routes = [
  { path: '/', title: 'UnNull Feed — DevUnNull, Unity Game Developer', description: "I don't just write code. I build worlds. Gameplay videos, technical breakdowns and playable Unity games by DevUnNull." },
  { path: '/explore', title: 'Explore · UnNull Feed', description: 'Search DevUnNull’s games, Unity systems and C# breakdowns.' },
  { path: '/following', title: 'Following · UnNull Feed', description: 'Follow topics to build your own feed of game development posts.' },
  { path: '/projects', title: 'Game Projects · UnNull Feed', description: 'Every DevUnNull game with its status, team and where to play it.' },
  { path: '/development', title: 'Development · UnNull Feed', description: 'Behind the scenes: game jams, Unity Editor walkthroughs and studio builds.' },
  { path: '/skills', title: 'Skills · UnNull Feed', description: 'Unity, C#, gameplay programming and architecture — each linked to the project that shows it.' },
  { path: '/@devunnull', title: 'DevUnNull (@devunnull) · UnNull Feed', description: profile.bio.map((b) => b.en).join(' · ') },
  { path: '/contact', title: 'Contact · UnNull Feed', description: profile.seeking.en },
];

const thumb = (post) => {
  const m = post.media;
  const src = m.kind === 'youtube' || m.kind === 'video' ? m.poster : m.kind === 'image' ? m.src : m.kind === 'gallery' ? m.items[0].src : m.kind === 'code' ? m.poster : null;
  return src ? abs(src) : defaultImage;
};

for (const post of posts) {
  const project = projects.find((p) => p.id === post.projectId);
  routes.push({
    path: `/@devunnull/video/${post.id}`,
    title: `${project ? project.title : 'DevUnNull'} · UnNull Feed`,
    description: post.caption.en,
    image: thumb(post),
  });
}
for (const p of projects) {
  routes.push({ path: `/projects/${p.slug}`, title: `${p.title} · UnNull Feed`, description: p.description.en, image: p.thumbnail ? abs(p.thumbnail) : defaultImage });
  if (p.web) routes.push({ path: `/play/${p.slug}`, title: `Play ${p.title} · UnNull Feed`, description: `Play ${p.title} in your browser. ${p.description.en}`, image: p.thumbnail ? abs(p.thumbnail) : defaultImage });
}

for (const r of routes) {
  const file = r.path === '/' ? join(dist, 'index.html') : join(dist, r.path.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(r));
}

await writeFile(join(dist, '404.html'), page({ path: '/', title: 'UnNull Feed', description: routes[0].description }));
await writeFile(join(dist, '_redirects'), `${BASE}* ${BASE}index.html 200\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${encodeURI(r.path)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`postbuild: ${routes.length} routes, sitemap, robots, 404 → ${SITE}`);
