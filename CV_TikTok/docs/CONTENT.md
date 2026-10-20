# Updating content

All content is data. You never need to touch a component to add a game or a video.

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | Name, bio, studio, contact links, repo count |
| `src/data/projects.ts` | One entry per game or package: facts, contributions, links, technical breakdown |
| `src/data/posts.ts` | Feed entries. Each post points at a project with `projectId`; one project can have many posts |
| `src/data/skills.ts` | Skills, each marked `demonstrated` or `learning`, linked to projects |
| `src/i18n/en.ts`, `src/i18n/vi.ts` | Interface strings. Content text is bilingual inside the data files (`{ en, vi }`) |

Rules the site follows, and that new content should follow too:

- Never invent numbers (likes, views, downloads, followers).
- `contributions: null` when your own part is not documented. The site then says so.
- A code sample copied from a public repo has `verified: true` and a `url`. Anything else is `verified: false` and is shown as a conceptual example.
- Put missing items in `missing: [...]`. They are notes for you and are never shown as content.

## Add a new game

1. Put its images in `public/assets/games/<slug>/` (cover around 1600px wide, JPEG or WebP).
2. Add a project to `src/data/projects.ts`:

```ts
{
  id: 'my-game',
  slug: 'my-game',
  title: 'My Game',
  genre: { en: 'Roguelike', vi: 'Roguelike' },
  engine: 'Unity',
  technologies: ['Unity 2D', 'C#'],
  status: 'released',               // released | in-development | prototype | jam | concept | tool
  team: { kind: 'solo' },           // or { kind: 'team', size: 4, name: '…', credits: '…' }
  description: { en: '…', vi: '…' },
  features: [{ en: 'Dash', vi: 'Dash' }],
  contributions: [{ en: 'Everything', vi: 'Toàn bộ' }],
  thumbnail: asset('assets/games/my-game/cover.jpg'),
  screenshots: [],
  itchUrl: 'https://devunnull.itch.io/my-game',
  web: { uploadId: 12345678, width: 1920, height: 1080 }, // only if itch.io has an HTML5 build
  // download: { file: 'MyGame.zip', size: '80 MB' },     // if it is a download instead
  categories: ['games', 'unity', 'gameplay'],
  featured: true,
  date: '2026-12-01',
}
```

   The itch.io `uploadId` is the number in the game page's HTML (`html-classic.itch.zone/html/<uploadId>/…`), or under *Edit game → Uploads*.

3. Add a post to `src/data/posts.ts` where you want it in the For You order:

```ts
{
  id: 'my-game',                    // becomes /@devunnull/video/my-game
  type: 'gameplay',
  projectId: 'my-game',
  media: { kind: 'youtube', id: '<videoId>', poster: yt('<videoId>'), aspect: 16 / 9 },
  caption: { en: '…', vi: '…' },
  tags: ['Roguelike', 'Unity'],
  categories: ['games', 'unity'],
  feeds: ['for-you'],
}
```

4. `npm run build`. The post gets its own shareable URL, a project page at `/projects/my-game`, a Play page if it has a web build, and an entry in the sitemap.

## Add or upload a video

The feed plays three kinds of moving pictures:

| `media.kind` | Use for | Notes |
| --- | --- | --- |
| `video` | Your own MP4 or WebM file | Best quality and control. Put it in `public/assets/videos/`, keep it short (15–60 s), H.264 MP4 at 720×1280 or 1280×720, under ~8 MB. Add a poster JPEG in `public/assets/thumbnails/`. |
| `youtube` | A video already on YouTube | Download its poster: `curl -o public/assets/thumbnails/yt-<id>.jpg https://i.ytimg.com/vi/<id>/maxresdefault.jpg` |
| `gallery` / `image` | Screenshots when there is no video | Shown with a “Photos” or “Poster” label so nobody mistakes them for video |

```ts
media: { kind: 'video', src: asset('assets/videos/my-game.mp4'), poster: asset('assets/thumbnails/my-game.jpg'), aspect: 9 / 16 }
```

`aspect` is width ÷ height of the footage. Landscape footage is centred in the portrait frame over a blurred copy of its poster, so the HUD is never cropped.

To compress a recording with ffmpeg:

```bash
ffmpeg -i raw.mov -vf "scale=-2:1280" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart public/assets/videos/my-game.mp4
ffmpeg -i public/assets/videos/my-game.mp4 -frames:v 1 -q:v 3 public/assets/thumbnails/my-game.jpg
```

Drop `-an` to keep the sound.

## Add a technical breakdown

Add `breakdown` to the project (see `lost-in-the-jungle` in `projects.ts`). For a feed post that shows code, use:

```ts
media: { kind: 'code', sample: projectById('my-game')!.breakdown!.samples[0], poster: asset('…') }
```

## Record new sources

Add every new file to `ASSET_SOURCES.md` with where it came from.
