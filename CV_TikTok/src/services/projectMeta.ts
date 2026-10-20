import type { Project } from '../data/types';
import type { MessageKey } from '../i18n/en';

type T = (key: MessageKey, vars?: Record<string, string | number>) => string;

/** "Released · Solo project · Playable in browser" */
export function metaLine(p: Project, t: T): string {
  const parts = [t(`status.${p.status}` as MessageKey)];
  if (p.team.kind === 'solo') parts.push(t('team.solo'));
  else if (p.team.kind === 'team') parts.push(p.team.size ? `${t('team.team')} · ${t('team.members', { n: p.team.size })}` : t('team.team'));
  if (p.web) parts.push(t('play.web'));
  else if (p.download) parts.push(t('play.download'));
  return parts.join(' · ');
}

export type PlayAction =
  | { kind: 'web'; to: string }
  | { kind: 'download'; href: string }
  | { kind: 'visit'; href: string };

/** What the Play button should do, matching what itch.io really offers. */
export function playAction(p?: Project): PlayAction | null {
  if (!p) return null;
  if (p.web) return { kind: 'web', to: `/play/${p.slug}` };
  if (p.download && p.itchUrl) return { kind: 'download', href: p.itchUrl };
  if (p.itchUrl) return { kind: 'visit', href: p.itchUrl };
  return null;
}
