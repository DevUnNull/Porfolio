import type { Post, Project } from '../data/types';
import { projectById } from '../data/projects';
import { skillById } from '../data/skills';
import { asset } from './asset';

export const projectOf = (post: Post): Project | undefined => projectById(post.projectId);

/** A still image for grids and blurred backgrounds, or null when the post is drawn in HTML. */
export function postThumb(post: Post): string | null {
  const m = post.media;
  switch (m.kind) {
    case 'youtube':
    case 'video':
      return m.poster;
    case 'image':
      return m.src;
    case 'gallery':
      return m.items[0]?.src ?? null;
    case 'code':
      return m.poster ?? null;
    case 'intro':
      return asset('assets/games/hero-defense/cover.webp');
    default:
      return null;
  }
}

export const isMoving = (post: Post) => post.media.kind === 'youtube' || post.media.kind === 'video';

/** Everything a visitor might search for, lower-cased, in both languages. */
export function searchText(post: Post): string {
  const p = projectOf(post);
  const parts: string[] = [post.caption.en, post.caption.vi, ...post.tags, ...post.categories, post.type];
  if (p) {
    parts.push(
      p.title,
      p.genre.en,
      p.genre.vi,
      p.engine,
      ...p.technologies,
      p.description.en,
      p.description.vi,
      ...p.features.flatMap((f) => [f.en, f.vi]),
    );
    if (p.breakdown) parts.push(...p.breakdown.concepts, p.breakdown.system.en, p.breakdown.system.vi);
  }
  if (post.media.kind === 'skill') {
    const s = skillById(post.media.skillId);
    if (s) parts.push(s.name, s.what.en, s.what.vi, s.where.en, s.where.vi);
  }
  if (post.media.kind === 'code') parts.push(post.media.sample.file, 'C#', 'csharp', 'code');
  return parts.join(' ').toLowerCase();
}

export function matches(post: Post, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const hay = searchText(post);
  // "c#" is commonly typed for C#; tags spell it CSharp.
  return terms.every((t) => hay.includes(t) || (t === 'c#' && hay.includes('csharp')));
}

export const postDate = (post: Post) => projectOf(post)?.date ?? '2026-01-01';
