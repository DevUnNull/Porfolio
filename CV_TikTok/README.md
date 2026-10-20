# UnNull Feed

A short-video style portfolio for **DevUnNull**, Unity game developer. You scroll through gameplay videos, technical breakdowns with real C# from public repositories, and games you can play in the browser.

> I don't just write code. I build worlds.

Built with React 18, TypeScript, Vite 5, Tailwind CSS 4, React Router 6, Zustand, Motion and Lucide icons. There is no backend: likes, saves and followed topics stay in the visitor's browser.

This is a personal portfolio. It uses its own branding and is not affiliated with TikTok.

## Run it

Needs Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build to dist/, then write per-route HTML, sitemap, robots, 404
npm run preview    # serve dist/ at http://localhost:4173
```

## Configure

| Variable | Where | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_SITE_URL` | `.env` | `https://unnull-feed.pages.dev` | Public URL with no trailing slash. Used for canonical links, Open Graph tags and the sitemap. **Set it before deploying.** |
| `BASE_PATH` | build environment | `/` | Sub-path when the site is not at the domain root, e.g. `/UnNull-Feed/` on GitHub Pages |

There are no API keys or secrets.

## Routes

| URL | Page |
| --- | --- |
| `/` | For You feed |
| `/@devunnull/video/<post-id>` | One post, opened in the feed; the address bar follows as you scroll |
| `/explore` | Search and categories (`?q=`, `?cat=`, `?sort=`) |
| `/following` | Topics the visitor follows |
| `/projects`, `/projects/<slug>` | All games; one game with its technical breakdown |
| `/play/<slug>` | itch.io HTML5 build, loaded only after pressing **Load game** |
| `/development`, `/skills` | Behind-the-scenes and skills feeds |
| `/@devunnull` | Profile with Games / Code / Development / Saved tabs (`?tab=`) |
| `/contact` | Email and links |

`npm run build` writes a real `index.html` for every route above (53 at the moment), each with its own title, description and preview image, so direct links and social previews work even on hosts without rewrites.

## Deploy

The output is a static folder, `dist/`.

**Cloudflare Pages:** build command `npm run build`, output `dist`. The build writes `dist/_redirects` for client-side routes.

**Vercel:** import the repo; `vercel.json` already rewrites unknown paths to `index.html`. Framework preset: Vite.

**GitHub Pages:** the workflow in `.github/workflows/deploy-pages.yml` builds and publishes on every push to `main`. In the repository settings set *Pages → Source* to *GitHub Actions*. For a project site (`https://devunnull.github.io/<repo>/`) the workflow sets `BASE_PATH=/<repo>/` automatically; also set `VITE_SITE_URL` to `https://devunnull.github.io/<repo>`. Unknown paths fall back to `404.html`, which is a copy of the app.

## Keyboard and gestures

| Input | Action |
| --- | --- |
| Mouse wheel, ↑ ↓, PageUp/PageDown, J K | Previous / next post |
| Swipe up / down | Previous / next post (phones) |
| Click or tap the video | Play / pause |
| Double-click or double-tap | Like |
| M | Mute / unmute |
| Swipe left / right on photos | Next / previous photo |
| Esc | Close the details panel or share sheet |

Videos start muted (browsers block sound without a gesture), pause when they scroll away or the tab is hidden, and only the visible post and its neighbours keep a player mounted.

## Content

- How to add a game, upload a video or write a breakdown: [`docs/CONTENT.md`](docs/CONTENT.md)
- Where every image, video and code sample comes from: [`ASSET_SOURCES.md`](ASSET_SOURCES.md)

## Project structure

```text
src/
├── components/
│   ├── layout/     AppLayout, Sidebar, MobileNavigation, Page
│   ├── feed/       VideoFeed, VideoCard, VideoPlayer, PostMedia, VideoActions, VideoCaption
│   ├── profile/    VideoGrid (thumbnail grids)
│   ├── projects/   DetailsPanel, ProjectDetails, TechnicalBreakdown, GamePlayer
│   └── shared/     Brand, CodeView (C# highlighter), Overlays (share sheet, toast)
├── pages/          Home (feeds), Explore, Following, Projects, Play, Profile, Contact
├── data/           types, profile, projects, posts, skills
├── i18n/           en, vi, useT
├── store/          useStore (Zustand, persisted to localStorage)
├── services/       asset, content, projectMeta, share
├── hooks/          useMisc
└── styles/         index.css (tokens, feed, highlighter)
scripts/postbuild.mjs   per-route HTML, sitemap, robots, 404, _redirects
```
