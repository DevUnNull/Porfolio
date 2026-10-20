import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import type { Post } from '../../data/types';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { usePageVisible } from '../../hooks/useMisc';
import { VideoCard } from './VideoCard';

interface Props {
  posts: Post[];
  initialId?: string;
  onActiveChange?: (post: Post, index: number) => void;
}

/** How many posts on each side of the active one keep their media mounted. */
const MOUNT_RANGE = 1;

export function VideoFeed({ posts, initialId, onActiveChange }: Props) {
  const { t } = useT();
  const scroller = useRef<HTMLDivElement>(null);
  const initialIndex = Math.max(0, posts.findIndex((p) => p.id === initialId));
  const [active, setActive] = useState(initialIndex);
  const activeRef = useRef(active);
  activeRef.current = active;
  const pageVisible = usePageVisible();
  const reduced = useReducedMotion();
  const wheelLock = useRef(0);
  const wheelAcc = useRef(0);

  const go = useCallback(
    (i: number) => {
      const el = scroller.current;
      if (!el) return;
      const target = Math.max(0, Math.min(posts.length - 1, i));
      el.scrollTo({ top: target * el.clientHeight, behavior: reduced ? 'auto' : 'smooth' });
    },
    [posts.length, reduced],
  );

  const goTo = useCallback(
    (id: string) => {
      const i = posts.findIndex((p) => p.id === id);
      if (i >= 0) go(i);
    },
    [posts, go],
  );

  // Jump to the requested post before the first paint.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = initialIndex * el.clientHeight;
    setActive(initialIndex);
    // Only when the requested post changes from outside (a new link).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId, posts]);

  // The post that covers most of the viewport is the active one.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { root: el, threshold: [0.6] },
    );
    el.querySelectorAll<HTMLElement>('[data-index]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [posts]);

  useEffect(() => {
    const post = posts[active];
    if (!post) return;
    onActiveChange?.(post, active);
    // An open details panel follows the feed.
    const { panel, openPanel } = useStore.getState();
    if (panel && panel.postId !== post.id) openPanel(post.id, panel.tab);
  }, [active, posts, onActiveChange]);

  // Re-align after a resize (rotation, browser chrome showing/hiding).
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      el.scrollTop = activeRef.current * el.clientHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse wheel: one post per gesture. Trackpads send many small events, so
  // accumulate and lock until the snap has settled.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      // Let inner scrollable areas (code, skill cards) scroll first.
      const inner = (e.target as HTMLElement).closest<HTMLElement>('[data-scrollable]');
      if (inner) {
        const canDown = inner.scrollTop + inner.clientHeight < inner.scrollHeight - 1;
        const canUp = inner.scrollTop > 0;
        if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
      }
      e.preventDefault();
      const now = Date.now();
      if (now < wheelLock.current) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) >= 30) {
        const dir = wheelAcc.current > 0 ? 1 : -1;
        wheelAcc.current = 0;
        wheelLock.current = now + 650;
        go(activeRef.current + dir);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [go]);

  // Keyboard: arrows / Page keys / J K move, M mutes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt.closest('input, textarea, select, [contenteditable], [role="dialog"]')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'j') {
        e.preventDefault();
        go(activeRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') {
        e.preventDefault();
        go(activeRef.current - 1);
      } else if (e.key === 'm') {
        const s = useStore.getState();
        s.markGesture();
        s.setMuted(!s.muted);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (!posts.length) return <p className="grid h-full place-items-center text-fg-2">{t('feed.empty')}</p>;

  return (
    <div className="relative h-full">
      <div ref={scroller} className="feed-scroller" tabIndex={-1} aria-label="Feed">
        {posts.map((post, i) => {
          const dist = Math.abs(i - active);
          return (
            <div key={post.id} data-index={i} className="h-full">
              {dist <= MOUNT_RANGE + 1 ? (
                <VideoCard
                  post={post}
                  index={i}
                  active={i === active}
                  near={dist <= MOUNT_RANGE}
                  pageVisible={pageVisible}
                  onNext={() => go(i + 1)}
                  goTo={goTo}
                />
              ) : (
                // Distant posts are empty snap targets, which keeps memory flat.
                <div className="feed-item" />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop up/down buttons, as on TikTok Web */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label={t('feed.prev')}
          className="grid h-12 w-12 place-items-center rounded-full bg-chip text-fg transition hover:bg-chip-hover disabled:cursor-default disabled:opacity-30"
        >
          <ChevronUp size={26} />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === posts.length - 1}
          aria-label={t('feed.next')}
          className="grid h-12 w-12 place-items-center rounded-full bg-chip text-fg transition hover:bg-chip-hover disabled:cursor-default disabled:opacity-30"
        >
          <ChevronDown size={26} />
        </button>
      </div>
    </div>
  );
}
