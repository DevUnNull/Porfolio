# Asset sources

Every picture, video and code sample on UnNull Feed comes from the developer's own public pages, checked on **2026-10-20**. Nothing is generated or taken from stock libraries. Files are copied into `public/assets/` so the site does not depend on hotlinks; videos stay on YouTube and are embedded with the official player.

**Usage restrictions:** all material belongs to DevUnNull / UnNull (Nguyễn Mai Ngọc Hải), SSS Studio and the team members named below. It is used here only for the owner's own portfolio. Team projects keep their team credits.

## Images

| File | Source | Notes |
| --- | --- | --- |
| `profile/avatar.png` | https://avatars.githubusercontent.com/u/181600327 | GitHub avatar of DevUnNull |
| `profile/sss-logo.webp` | https://devunnull.github.io/Online_Portfolio/assets/Logo.webp | SSS Studio logo (not used on screen yet) |
| `games/hero-defense/cover.webp` | https://devunnull.github.io/Online_Portfolio/assets/HeroicDefender.webp | Key art; itch.io page has no cover |
| `games/lost-in-the-jungle/itch-cover.jpg` | https://devunnull.itch.io/junglesuvivor (cover image) | |
| `games/lost-in-the-jungle/cover.webp` | https://devunnull.github.io/Online_Portfolio/assets/Jungle.webp | |
| `games/call-out-my-cell/cover.jpg` | https://devunnull.itch.io/call-out-my-cell (cover, re-encoded to JPEG 1600px) | Team project, FPT University EXE_GD1911-AD Group 4 |
| `games/call-out-my-cell/shot-1..3.jpg` | https://devunnull.itch.io/call-out-my-cell (screenshots) | |
| `games/call-out-my-cell/banner.jpg` | https://devunnull.itch.io/call-out-my-cell (page banner) | Not used on screen yet |
| `games/other-projects/brainrot-runner.webp` | https://devunnull.github.io/Online_Portfolio/assets/BrainrotRunner.webp | Team project published by Monomee |
| `games/other-projects/brainrot-runner-cover.jpg` | https://monomee.itch.io/brain-rot-runner (cover) | |
| `games/other-projects/behind-the-mask*.webp` | https://devunnull.github.io/Online_Portfolio/BehindTheMask.html | Global Game Jam 2026, team AbsoluteSingleton |
| `games/other-projects/game-jam.webp` | https://devunnull.github.io/Online_Portfolio/assets/GameJam.webp | Team photo at Global Game Jam 2026 |
| `games/other-projects/chien-binh-xanh-nhi.webp` | https://devunnull.github.io/Online_Portfolio/assets/pannerChienBinhXanhNhi.webp | SSS Studio project |
| `thumbnails/yt-<id>.jpg` | `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` | Poster frames of the videos below |
| `public/og-image.jpg` | Rendered from `avatar.png` and the Hero Defense video poster | Social preview |

## Videos (YouTube embeds)

| Post | Video | Uploaded by | Linked from |
| --- | --- | --- | --- |
| Hero Defense | https://www.youtube.com/watch?v=Rm03AIO-GHY | Ngọc Hải Nguyễn Mai | Portfolio, HeroicDefense.html |
| Lost in the Jungle | https://www.youtube.com/watch?v=3jibVCOz_Oc | Ngọc Hải Nguyễn Mai | itch.io page and portfolio |
| Behind the Mask | https://www.youtube.com/watch?v=GHNWE27c4rQ | Ngọc Hải Nguyễn Mai | Portfolio, BehindTheMask.html |
| WaveEnemy walkthrough | https://www.youtube.com/watch?v=HVYx18PSEIQ | Ngọc Hải Nguyễn Mai | Portfolio, Package.html |
| Chiến Binh Xanh Nhí | https://www.youtube.com/watch?v=hGJtJTHICOM | Hoàng Nguyễn Việt (SSS Studio) | Portfolio, ChienBinhXanhNhi.html |

## Playable builds (loaded only after pressing Play)

| Game | itch.io upload | Embed |
| --- | --- | --- |
| Hero Defense | 15528948 (1920×1080) | `https://itch.io/embed-upload/15528948` |
| Lost in the Jungle | 15526706 (1920×1080) | `https://itch.io/embed-upload/15526706` |
| Brain Rot Runner | 17082548 (1080×1920) | `https://itch.io/embed-upload/17082548` |

## Code samples

| Sample | Source | Changes |
| --- | --- | --- |
| `UpgradeFactory.cs`, `UpgradeManager.cs`, `IUpgrade.cs` | https://github.com/DevUnNull/Jungle | Vietnamese comments translated; `IUpgrade.cs` shortened to one implementation |
| `Pool.cs`, README usage | https://github.com/DevUnNull/Object-Pool_Unity | `Create()` omitted from the excerpt |
| `PlayerStateMachine.cs`, `IState.cs` | https://github.com/DevUnNull/EchoArea | Comments translated |
| Hero Defense `WaveSpawner.cs` | — | **Conceptual example.** The Hero Defense source is not public; the site labels it as such |

## Missing media (to supply)

These are listed in `src/data/projects.ts` under `missing` and are **not** shown as published content:

- Call Out My Cell — gameplay video; DevUnNull's individual contribution within the team.
- Brain Rot Runner — gameplay video.
- Chiến Binh Xanh Nhí — DevUnNull's individual contribution.
- LJ — description, genre, engine, cover, screenshots, video, solo/team. The itch.io page has no text; the build (`LJ.zip`, 15 MB) was not inspected.
- 707: The Reunion — DevUnNull's contribution (the game is credited to P1MAN). Listed only under "SSS Studio projects".
