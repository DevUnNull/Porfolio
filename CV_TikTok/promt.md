# MASTER PROMPT — DEVUNNULL FEED
## Build a TikTok-Style Interactive Portfolio for a Unity Game Developer

### 1. YOUR ROLE

You are a Senior Frontend Engineer, Creative Web Developer, Product Designer, and Game Developer Portfolio Specialist.

Your task is to research, design, and build a complete, production-ready interactive personal portfolio website for a Unity Game Developer known as **DevUnNull**.

**THE CORE CONCEPT:**

Create a personal game development portfolio that looks, feels, and behaves extremely close to the TikTok website and mobile app.

The portfolio must provide a short-form video browsing experience where visitors can discover the developer's games, technical skills, gameplay systems, and development journey by scrolling through a vertical content feed.

This is NOT a traditional portfolio with a TikTok-inspired color scheme.

It must behave like a real short-video platform.

Project name: **UnNull Feed**

Brand identity: **DevUnNull**

Tagline: **I don't just write code. I build worlds.**

Visual inspiration: TikTok Web and TikTok Mobile, dark theme.

Recreate the familiar design language, layout density, video dimensions, navigation placement, typography hierarchy, hover behavior, and interaction patterns as closely as practical.

Use original DevUnNull branding instead of official TikTok logos, trademarks, or proprietary assets. The website must not pretend to be affiliated with TikTok.

---

### 2. RESEARCH THE DEVELOPER

Before writing code, inspect these websites:

**Primary sources**

GitHub:
https://github.com/DevUnNull

itch.io:
https://devunnull.itch.io/

Existing portfolio:
https://devunnull.github.io/Online_Portfolio/

Research and extract:

- Developer name and identity
- Unity development experience
- Technical skills
- Published games
- Project descriptions
- Game genres
- Gameplay features
- Public GitHub repositories
- Project screenshots
- Real gameplay videos
- Valid game download or play links
- Verified individual contributions
- Studio or team participation
- Public professional contact information

Do not invent any personal details, awards, statistics, or game projects.

Do not confuse games developed individually with games developed as part of a team.

Do not treat public repositories as automatically completed games.

If information is unavailable, create an editable placeholder marked as missing.

### Known information

Developer identity: DevUnNull / UnNull.

Primary role: Unity Game Developer.

Technical interests identified from public profiles include:

- Unity
- C#
- Gameplay Programming
- Object-Oriented Programming
- State Machines
- Factory Pattern
- Strategy Pattern
- Object Pooling
- Photon Fusion
- Game UI Systems
- Multiplayer Programming
- Git and GitHub

Use the public profiles to validate any statements about proficiency or professional experience.

### Verified games to prioritize

**Hero Defense**

https://devunnull.itch.io/hero-defense

Unity HTML5 game.

Game genre: Tower Defense.

Focus on wave systems, defense mechanics, and gameplay architecture.

**Call Out My Cell**

https://devunnull.itch.io/call-out-my-cell

In-development game.

Combines lifestyle choices with immune-system tower defense gameplay.

Includes five-lane defensive combat and different immune cell roles.

Do not describe it as a fully released game.

**Lost in the Jungle**

https://devunnull.itch.io/junglesuvivor

Unity HTML5 game.

2D action platformer featuring:

- Double jump
- Dash
- Combat
- Enemies
- Experience and leveling
- Random upgrade selection

**LJ**

https://devunnull.itch.io/j

Downloadable game. Research its contents before writing a description.

Other projects mentioned in public sources may include Heroic Defense, Jungle Survivor, Brainrot Runner, and studio collaborations.

Do not merge projects merely because their names appear similar.

Verify each project's ownership, status, media, and contribution details.

---

### 3. VISUAL DESIGN — EXTREMELY IMPORTANT

The website must closely resemble the real TikTok interface.

Use TikTok's current desktop and mobile UI as visual references.

Target near pixel-level fidelity for:

- Desktop layout
- Navigation sidebar
- Central vertical video feed
- Video aspect ratio
- Action button placement
- Profile page
- Video thumbnail grid
- Search interface
- Mobile bottom navigation
- Dark surfaces
- Typography sizing
- Spacing
- Hover and active states

Avoid making it look like a generic streaming platform or a normal SaaS website.

### Main color palette

- Background: #000000
- Secondary surfaces: #161823
- Dark panels: #121212
- Text primary: #FFFFFF
- Text secondary: #A1A1AA
- Accent Pink: #FE2C55
- Accent Cyan: #25F4EE
- Divider: #2F2F2F

Use a modern sans-serif font similar to TikTok's interface typography.

Use Lucide icons or another consistent icon library.

Do not use random emojis as navigation icons.

Animations should be smooth, subtle, and polished.

---

### 4. DESKTOP LAYOUT

Create a layout inspired by TikTok Web.

#### A. Left Navigation Sidebar

Fixed vertical navigation.

Contents:

**UNNULL FEED**

Navigation items:

- For You
- Explore
- Following
- Game Projects
- Development
- Skills
- Profile

Bottom area:

- GitHub
- itch.io
- Contact
- Language
- Theme

The sidebar should visually resemble TikTok's desktop navigation, with recognizable spacing and active states.

Do not create fake Following relationships with other real accounts.

For this portfolio, Following may instead display saved or followed project categories if implemented clearly.

All navigation items must work.

#### B. Main Content Area

Display vertically oriented game videos.

Video aspect ratio: 9:16.

Center the active video within the available screen.

Use a visually accurate short-form video player.

Each video contains:

- Gameplay footage or approved poster
- Creator handle
- Game title
- Short description
- Technology tags
- Project status
- Action buttons

The video player should support different desktop heights.

Never stretch gameplay footage or distort original game proportions.

If a game is landscape-oriented, fit it correctly inside the portrait video frame using an intentional background treatment.

#### C. Right Action Buttons

Create TikTok-style vertical actions:

- Like
- Project Details
- Save
- Share
- Play Game
- View Source Code when available

Use familiar circular icon placement.

Buttons should have meaningful hover animations and feedback.

Do not display fabricated popularity numbers.

---

### 5. VERTICAL VIDEO FEED

This is the most important feature.

Implement a fully functional vertical scrolling feed.

Requirements:

1. Scroll to move between videos.
2. One primary active video at a time.
3. Smooth scroll snapping.
4. Mouse wheel navigation.
5. Touch swipe navigation.
6. Keyboard arrow navigation.
7. Video autoplay when active, muted by default.
8. Pause videos when they leave the visible viewport.
9. Pause videos when the browser tab becomes inactive.
10. Support mute/unmute.
11. Support play/pause.
12. Support video progress display.
13. Support poster previews while loading.
14. Preload nearby content intelligently.
15. Provide useful loading and error states.

Use IntersectionObserver and native browser video APIs.

Respect browser autoplay restrictions.

Avoid rendering or playing every video simultaneously.

Support reduced-motion preferences.

### Content types

The feed must support multiple content types.

**Gameplay Video**

A short gameplay showcase for a game.

**Game Poster**

A beautiful project cover when video footage is unavailable.

**Technical Breakdown**

A short demonstration of a Unity system or programming concept.

**Development Showcase**

Screenshots or recordings showing the game development process.

**Studio / Team Work**

Team projects with clear contribution information.

Do not fabricate footage.

When a real video does not exist, use a real screenshot or cover as a static poster. Clearly distinguish it from a playable video.

---

### 6. FIRST VIDEO — INTRODUCTION

When visitors first open the website, show an introduction post.

Creator: @DevUnNull

Headline:

**HI, I'M UNNULL**

Subtitle:

**UNITY GAME DEVELOPER**

Tagline:

"I don't just write code. I build worlds."

Use real game screenshots or footage in the background if available.

Display the following actions:

- Explore My Games
- View GitHub
- My Skills

Include a clear hint:

"Scroll to discover my work."

Do not create an unnecessarily long intro animation.

Visitors should understand the website immediately.

---

### 7. GAME SHOWCASE FEED

Each featured game needs its own vertical post.

#### GAME POST 01 — HERO DEFENSE

Title: Hero Defense

Genre: Tower Defense

Engine: Unity

Source:
https://devunnull.itch.io/hero-defense

Suggested caption:

"Building a tower defense game with Unity and C#. Explore how gameplay systems come together."

Actions:

- Play in Browser
- View Details
- View Technical Breakdown
- Share

Use real gameplay footage when available.

#### GAME POST 02 — CALL OUT MY CELL

Title: Call Out My Cell

Genre: Tower Defense / Lifestyle Choices

Status: In Development

Source:
https://devunnull.itch.io/call-out-my-cell

Suggested caption:

"Your daily choices affect your body's ability to fight infection."

Explain:

- Lifestyle decisions
- Body statistics
- Five-lane combat
- Immune cells
- Enemy waves

Provide a Visit Game Page or Download action matching the actual itch.io availability.

Do not display a Play in Browser button when no web build exists.

#### GAME POST 03 — LOST IN THE JUNGLE

Title: Lost in the Jungle

Genre: Action Platformer

Engine: Unity

Source:
https://devunnull.itch.io/junglesuvivor

Suggested caption:

"Dash, double jump, survive, and upgrade your abilities in a mysterious jungle."

Highlight:

- Double Jump
- Dash
- Combat
- Level Up
- Random Upgrades

Actions:

- Play in Browser
- View Gameplay
- View Project Details

#### OTHER PROJECTS

Discover additional verified projects from GitHub and itch.io.

Add them through an editable project dataset.

Do not create fake posts solely to fill the feed.

---

### 8. VIDEO DETAILS — TECHNICAL BREAKDOWN

Add a unique developer-focused feature.

When a visitor clicks the Code or Technical Details button, open a sliding panel.

The panel should display:

- Project title
- Technology stack
- Gameplay systems
- Developer contributions
- Technical challenges
- Solutions
- Code samples where available
- Architecture explanation
- GitHub repository link when verified

Example:

**Hero Defense — Technical Breakdown**

System: Wave Management

Language: C#

Engine: Unity

Concepts:
- State Machines
- Enemy Spawning
- Object Pooling
- Difficulty Scaling

Only claim actual implementation details when verified by the developer's source code or documentation.

If an example is illustrative rather than real source code, explicitly label it as a conceptual example.

Use a professional syntax-highlighted C# code viewer.

Make this feature accessible without stopping navigation through the rest of the portfolio.

---

### 9. PROFILE PAGE — TIKTOK STYLE

Build a complete TikTok-style creator profile.

Profile identity:

**DevUnNull**

Username:

@DevUnNull

Bio:

Unity Game Developer
Gameplay Programmer
C# • Unity • Game Systems

Optional tagline:

"Building worlds, one line of code at a time."

Profile header:

- Avatar from GitHub if available
- Display name
- Username
- Professional bio
- External links
- Contact button

Do not invent follower counts, total likes, or video views.

Replace unavailable social statistics with real portfolio information such as published projects or verified repositories, clearly labeled.

### Profile Tabs

Create:

- Games
- Code
- Development
- Saved

Games:
Grid of featured game thumbnails.

Code:
Technical showcases and public repositories.

Development:
Game development process and behind-the-scenes content.

Saved:
Projects the current visitor has bookmarked locally.

Use a three-column thumbnail grid on wider layouts where appropriate.

Clicking a thumbnail opens its corresponding post in the video feed.

Preserve scroll position when returning.

---

### 10. LIKE, SAVE, AND SHARE

Implement meaningful TikTok-like interactions.

#### Like

Allow visitors to like a project locally.

Persist locally using browser storage.

Do not show artificial global like counts.

Do not present a local click as engagement from other users.

#### Save

Allow visitors to bookmark a project.

Persist bookmarks in localStorage.

Create a Saved section.

#### Share

Support:

- Copy project URL
- Native share on supported devices
- Open source page

Generate a direct internal link to the selected portfolio post.

Shared URLs must reopen the correct content.

#### Comments / Discussion

Do not create a fake public comment system.

Instead, use a Project Discussion or Technical Notes panel with real project information.

Only implement public comments if a genuine backend and moderation system are intentionally configured.

---

### 11. PLAY GAME FEATURE

This is an important differentiator.

When a visitor clicks Play Game:

For a verified HTML5 game:

- Open a dedicated game player page or modal.
- Use an authorized itch.io embed when available.
- Preserve the game's intended resolution and aspect ratio.
- Provide fullscreen support when technically possible.
- Provide Open on itch.io as a fallback.

For downloadable games:

- Open the actual download/game page.
- Do not pretend the game is playable in the browser.

For unreleased projects:

- Show current development status.
- Offer the verified project page or a preview if available.

Do not auto-start heavy Unity WebGL builds during normal feed scrolling.

Load them only after the visitor explicitly chooses to play.

---

### 12. EXPLORE PAGE

Create a TikTok-style Explore interface.

Include a search bar and discovery grid.

Searchable categories:

- All
- Games
- Unity
- C#
- Gameplay
- Multiplayer
- Technical Systems
- Development

Search must work against actual portfolio data.

Support searching by:

- Project title
- Genre
- Engine
- Programming language
- Technical feature
- Project description

Include sorting and filtering where useful.

Do not show unrelated entertainment content.

---

### 13. SKILLS FEED

Create a content section specifically showcasing technical knowledge.

Suggested topics:

**Unity Gameplay Programming**
- Player Controllers
- Combat Systems
- Collision and Physics
- UI Systems
- Animation
- Inventory Systems

**Software Architecture**
- OOP
- State Machine
- Factory
- Strategy
- Object Pooling
- Singleton

**Networking**
- Client-Server
- Photon Fusion
- State Synchronization

**Development Tools**
- Unity
- C#
- Git
- GitHub
- Visual Studio Code

Show real use cases when available.

Do not imply the developer has professionally mastered every listed technology.

Distinguish current learning interests from demonstrated experience.

A skill post should explain:

1. What the system is.
2. Why game developers use it.
3. Where it was actually used.
4. What problem it solves.
5. Which project demonstrates it.

---

### 14. DEVELOPMENT PROCESS

Create a Behind the Scenes feed.

Possible content types:

- Unity Editor recordings
- Gameplay system demonstrations
- Debugging clips
- C# source explanations
- Animation development
- UI implementation
- Game testing
- Progress comparisons

All visual content must come from verified developer material.

Do not manufacture fake Unity Editor screenshots.

If media is missing, show a clear upload placeholder in the content management data, not as a fake published development video.

---

### 15. ASSET SOURCING

Media authenticity is critical.

Primary media sources:

- https://devunnull.itch.io/
- https://github.com/DevUnNull
- Verified project pages
- Public media explicitly associated with the developer
- Assets manually supplied by the portfolio owner

Media priority:

1. Official gameplay video
2. Official game trailer
3. Real screenshot
4. Real game cover
5. Neutral fallback poster

Do not generate gameplay footage and present it as genuine.

Do not use unrelated stock videos.

Do not reuse assets from unrelated games.

For landscape footage displayed in portrait video containers:

- Preserve the original central gameplay area.
- Avoid cropping away important HUD elements.
- Use a blurred or darkened background derived from the same approved content.
- Maintain a readable main video.

Asset structure:

```text
public/
└── assets/
    ├── profile/
    ├── games/
    │   ├── hero-defense/
    │   ├── call-out-my-cell/
    │   ├── lost-in-the-jungle/
    │   └── other-projects/
    ├── videos/
    ├── thumbnails/
    └── icons/
```

Maintain an ASSET_SOURCES.md file containing source URLs and any known usage restrictions.

Avoid relying on fragile third-party hotlinks.

Do not bypass access restrictions when collecting media.

---

### 16. MOBILE EXPERIENCE — TOP PRIORITY

The website must feel especially close to the TikTok mobile app.

On mobile:

- Video feed occupies the available screen.
- Vertical swipe navigation.
- Full-height video presentation.
- Bottom navigation bar.
- Right-side action buttons.
- Bottom-left game title and caption.
- Expandable descriptions.
- Touch-friendly interactions.
- Minimal intrusive UI.
- Safe-area support for notches and mobile browser controls.

Bottom navigation:

- Home
- Explore
- Projects
- Inbox/Contact
- Profile

If an Inbox is not implemented, label it Contact directly.

Do not create a fake private messaging interface.

The result must resemble a native short-video experience.

Use responsive viewport units such as dvh carefully to avoid mobile browser layout problems.

Support both Android and iPhone browsers.

---

### 17. DESKTOP EXPERIENCE

On desktop:

- Fixed left sidebar.
- Centered portrait feed.
- Action buttons beside the active video.
- Functional navigation.
- Appropriate empty space and alignment.
- Smooth mouse wheel scrolling.
- Keyboard navigation.
- Accessible profile and Explore pages.

Do not simply enlarge the mobile layout to desktop width.

Follow the proportions of the real TikTok Web interface.

The active video should remain the visual focus.

---

### 18. NAVIGATION AND ANIMATIONS

Provide:

- Smooth route transitions
- Video change animation
- Active navigation states
- Like heart animation
- Bookmark feedback
- Share feedback
- Sliding technical panels
- Profile grid hover preview
- Search result transitions
- Loading skeletons

Keep transitions short and subtle.

Avoid excessive glow, gradients, parallax, or unrelated visual effects.

Respect prefers-reduced-motion.

Ensure gestures do not cause accidental navigation during scrolling.

---

### 19. LANGUAGE SUPPORT

Support:

- English
- Vietnamese

Default: English.

Allow switching languages from the navigation or profile settings.

Translate:

- Navigation labels
- Profile biography
- Project descriptions
- Buttons
- Technical explanations
- Contact content

Do not translate official game titles or source-code identifiers.

Store translations in separate files.

---

### 20. TECH STACK

Use a modern frontend stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Motion / Framer Motion for selective animation
- Zustand or a similar lightweight store

Use native HTML5 video playback.

Use:

- CSS scroll snap
- IntersectionObserver
- Lazy loading
- LocalStorage
- Responsive image and video loading
- Web Share API when available

No backend is required for the first version.

Do not add authentication, a real social network, or public engagement systems unnecessarily.

Prioritize performance and reliable media handling.

---

### 21. APPLICATION STRUCTURE

Suggested project structure:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header
│   │   ├── Sidebar
│   │   ├── MobileNavigation
│   │   └── AppLayout
│   │
│   ├── feed/
│   │   ├── VideoFeed
│   │   ├── VideoCard
│   │   ├── VideoPlayer
│   │   ├── VideoActions
│   │   ├── VideoCaption
│   │   └── FeedControls
│   │
│   ├── profile/
│   │   ├── ProfileHeader
│   │   ├── ProfileTabs
│   │   └── VideoGrid
│   │
│   ├── projects/
│   │   ├── ProjectDetails
│   │   ├── TechnicalBreakdown
│   │   └── GamePlayer
│   │
│   ├── search/
│   └── shared/
│
├── pages/
│   ├── Home
│   ├── Explore
│   ├── Projects
│   ├── Skills
│   ├── Profile
│   └── Contact
│
├── data/
│   ├── profile
│   ├── projects
│   ├── posts
│   ├── skills
│   └── social
│
├── hooks/
├── store/
├── services/
├── styles/
└── App.tsx
```

Use reusable components and data-driven rendering.

---

### 22. CONTENT MANAGEMENT

All portfolio content must be easy to update.

Create structured project and post data.

Each project should support:

- ID
- Slug
- Title
- Description
- Genre
- Engine
- Technologies
- Status
- Team/solo classification
- Personal contributions
- Thumbnail
- Video URL
- Screenshot URLs
- itch.io URL
- GitHub URL
- Playable status
- Download status
- Technical breakdowns

Separate projects from feed posts.

One game may have multiple posts:

- Gameplay Trailer
- Technical Breakdown
- Behind the Scenes
- Development Progress

Do not duplicate project information unnecessarily.

Include documentation showing how to add a new game or upload a new video.

---

### 23. PERFORMANCE OPTIMIZATION

This website is media-heavy, so performance is essential.

Requirements:

- Render only the active and nearby video posts when practical.
- Never load all full-resolution videos immediately.
- Preload the next video intelligently.
- Pause inactive players.
- Unload distant players.
- Optimize video formats.
- Use poster images.
- Lazy-load images.
- Prevent layout shifts.
- Avoid memory leaks.
- Handle unsupported video formats.
- Use graceful media fallbacks.
- Avoid blocking the interface while loading Unity WebGL games.

The website must remain usable on mid-range mobile devices.

---

### 24. SEO AND SHARING

Implement:

- Page title
- Meta description
- Open Graph metadata
- Social preview images
- Canonical URLs
- Sitemap
- robots.txt
- Proper headings
- Descriptive alt text
- Shareable direct project URLs

Each game must have a URL that can be shared independently.

Example route structures:

```text
/
/explore
/@devunnull
/@devunnull/video/hero-defense
/@devunnull/video/call-out-my-cell
/projects/hero-defense
/skills
/contact
```

All routes must support page refresh and direct navigation.

---

### 25. DEPLOYMENT

Prepare the final application for static deployment.

Supported platforms:

- Cloudflare Pages
- Vercel
- GitHub Pages

Include:

- Installation instructions
- Local development commands
- Production build commands
- Environment configuration if needed
- Static hosting route fallback instructions
- README
- Asset source documentation
- Instructions for adding future projects

Do not expose API keys or private credentials.

---

### 26. IMPLEMENTATION WORKFLOW

Follow these phases:

**PHASE 1 — Research**

Inspect GitHub and itch.io.

Collect real information.

Create a verified content inventory.

Identify missing screenshots or videos.

**PHASE 2 — UI Foundation**

Build the TikTok-style desktop and mobile shell.

Focus on visual fidelity.

Implement the sidebar, feed container, action buttons, and mobile navigation.

**PHASE 3 — Video Feed**

Implement scrolling, autoplay, pause, mute, progress, and media fallbacks.

Test on desktop and mobile.

**PHASE 4 — Portfolio Content**

Populate verified game content.

Build profile, Explore, Skills, and Contact.

**PHASE 5 — Unique Developer Features**

Implement Technical Breakdown, source code viewer, game player, and project detail panels.

**PHASE 6 — Interactions**

Implement local likes, bookmarks, sharing, filtering, search, and direct links.

**PHASE 7 — Visual Polish**

Match TikTok's spacing and responsive behavior.

Optimize animations and transitions.

**PHASE 8 — Testing**

Test:

- Desktop
- Mobile
- Navigation
- Video playback
- Loading failures
- Game links
- Performance
- Accessibility
- Localization

**PHASE 9 — Production**

Complete production build and deployment preparation.

---

### 27. DEFINITION OF DONE

The project is complete only when:

1. The desktop interface closely resembles TikTok Web.
2. The mobile interface closely resembles TikTok Mobile.
3. Vertical feed scrolling works.
4. Video playback and autoplay work correctly.
5. Inactive videos pause automatically.
6. Project posts use authentic media where available.
7. Profile tabs work.
8. Like and Save work locally.
9. Share generates valid project URLs.
10. Search works.
11. Technical Breakdown works.
12. Verified HTML5 games can be opened appropriately.
13. All project links are correct.
14. There are no fabricated statistics or game achievements.
15. The application works on desktop and mobile.
16. Media loading is optimized.
17. English and Vietnamese are supported.
18. The production build completes successfully.
19. No visible buttons are decorative or non-functional.
20. The site is ready for public deployment.

---

## FINAL CREATIVE DIRECTION

**"TikTok, but every post is something I've built."**

Visitors should be able to discover the developer's career as naturally as scrolling through short videos.

They should immediately understand:

- Who DevUnNull is.
- Which games DevUnNull developed or contributed to.
- What technologies and systems were used.
- How to play those games.
- Where to view publicly available source code.
- How to contact the developer.

The website must combine the familiarity and engaging navigation of TikTok with the credibility of a professional Unity Game Developer portfolio.

Prioritize:

1. TikTok-like visual fidelity.
2. Authentic gameplay content.
3. Smooth vertical browsing.
4. Clear evidence of technical ability.
5. Excellent mobile experience.
6. Performance and usability.

Start with source inspection and a concise design plan, then implement the complete website.

Do not stop at a mockup.

Build the working project.
