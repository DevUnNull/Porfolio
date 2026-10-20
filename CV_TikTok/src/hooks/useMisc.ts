import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');

/** false while the browser tab is hidden. */
export function usePageVisible() {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  return visible;
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · UnNull Feed` : 'UnNull Feed — DevUnNull, Unity Game Developer';
  }, [title]);
}

/** Restore a scroll container's position for this key when coming back to a page. */
export function useScrollMemory(ref: React.RefObject<HTMLElement>, key: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(`scroll:${key}`);
    } catch {
      /* storage blocked */
    }
    if (saved) requestAnimationFrame(() => (el.scrollTop = Number(saved)));
    const onScroll = () => {
      try {
        sessionStorage.setItem(`scroll:${key}`, String(el.scrollTop));
      } catch {
        /* storage blocked */
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [ref, key]);
}
