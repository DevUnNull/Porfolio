// Content model. Projects hold the facts about a game; posts are the feed
// entries that point at a project (one project can have several posts).

export type Lang = 'en' | 'vi';

/** A string in both supported languages. */
export type L = { en: string; vi: string };

export type Category =
  | 'games'
  | 'unity'
  | 'csharp'
  | 'gameplay'
  | 'multiplayer'
  | 'systems'
  | 'development';

export type ProjectStatus = 'released' | 'in-development' | 'prototype' | 'jam' | 'concept' | 'tool';

export type FeedId = 'for-you' | 'development' | 'skills';

export interface CodeSample {
  title: L;
  /** File path inside the repository. */
  file: string;
  /** Direct link to the file on GitHub. Required when `verified` is true. */
  url?: string;
  /** true = copied from the developer's public source; false = conceptual example. */
  verified: boolean;
  code: string;
}

export interface TechnicalBreakdown {
  system: L;
  concepts: string[];
  architecture: L;
  challenges: { problem: L; solution: L }[];
  samples: CodeSample[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  genre: L;
  engine: string;
  technologies: string[];
  status: ProjectStatus;
  /** Free-form period as published by the developer, e.g. "10/2025 – 11/2025". */
  period?: string;
  team: { kind: 'solo' } | { kind: 'unknown' } | { kind: 'team'; size?: number; name?: string; credits?: string };
  description: L;
  features: L[];
  /** What DevUnNull personally did. null = not documented publicly. */
  contributions: L[] | null;
  thumbnail: string;
  screenshots: string[];
  /** YouTube id of the developer's own gameplay upload. */
  youtubeId?: string;
  /** A self-hosted MP4/WebM, preferred over YouTube when present. */
  videoUrl?: string;
  itchUrl?: string;
  githubUrl?: string;
  /** itch.io HTML5 upload, loaded only when the visitor presses Play. */
  web?: { uploadId: number; width: number; height: number };
  download?: { file: string; size: string };
  breakdown?: TechnicalBreakdown;
  /** Fields the owner still needs to supply. Shown in the editor notes, not as content. */
  missing?: string[];
  categories: Category[];
  featured: boolean;
  /** ISO date used for "Newest" sorting. Approximate where only a month is known. */
  date: string;
}

export type Media =
  | { kind: 'youtube'; id: string; start?: number; poster: string; aspect: number }
  | { kind: 'video'; src: string; poster: string; aspect: number }
  | { kind: 'image'; src: string; aspect: number; alt: L }
  | { kind: 'gallery'; items: { src: string; aspect: number; alt: L }[] }
  | { kind: 'code'; sample: CodeSample; poster?: string }
  | { kind: 'intro' }
  | { kind: 'skill'; skillId: string }
  | { kind: 'skills-overview' }
  | { kind: 'placeholder'; title: string };

export type PostType =
  | 'intro'
  | 'gameplay'
  | 'poster'
  | 'breakdown'
  | 'devlog'
  | 'team'
  | 'skill';

export interface Post {
  /** Used in the shareable URL: /@devunnull/video/:id */
  id: string;
  type: PostType;
  projectId?: string;
  media: Media;
  caption: L;
  tags: string[];
  categories: Category[];
  /** Which feeds show this post. */
  feeds: FeedId[];
}

export interface Skill {
  id: string;
  name: string;
  group: 'gameplay' | 'architecture' | 'networking' | 'tools';
  /** demonstrated = shown in a public project; learning = current interest. */
  level: 'demonstrated' | 'learning';
  what: L;
  why: L;
  where: L;
  problem: L;
  projectIds: string[];
  /** Public repositories that show the skill. */
  repos?: { name: string; url: string }[];
  sample?: CodeSample;
}
