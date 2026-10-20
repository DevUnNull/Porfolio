import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { Post } from '../../data/types';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { projectOf, isMoving } from '../../services/content';
import { PostMedia } from './PostMedia';
import { VideoActions } from './VideoActions';
import { VideoCaption } from './VideoCaption';

interface Props {
  post: Post;
  index: number;
  active: boolean;
  /** Within one post of the active one: mount the player and buffer. */
  near: boolean;
  pageVisible: boolean;
  onNext: () => void;
  goTo: (id: string) => void;
}

export const VideoCard = memo(function VideoCard({ post, active, near, pageVisible, onNext, goTo }: Props) {
  const { t } = useT();
  const muted = useStore((s) => s.muted);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  // Bumped each time playback resumes; shows the play glyph once.
  const [flash, setFlash] = useState(0);
  const seekRef = useRef<((f: number) => void) | null>(null);
  const clickTimer = useRef<number | null>(null);
  const project = projectOf(post);
  const moving = isMoving(post);
  const timed = moving || post.media.kind === 'gallery';
  const title = project ? `${project.title} — DevUnNull` : 'DevUnNull';

  // A post that scrolls away forgets the visitor's pause, like TikTok.
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) setUserPaused(false);
  }

  const paused = userPaused || !pageVisible;

  const togglePlay = useCallback(() => {
    setUserPaused((p) => !p);
  }, []);

  // Resuming after a pause shows the play glyph once.
  const wasPaused = useRef(userPaused);
  useEffect(() => {
    if (wasPaused.current && !userPaused) setFlash((f) => f + 1);
    wasPaused.current = userPaused;
  }, [userPaused]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const s = useStore.getState();
    s.markGesture();
    s.setMuted(!s.muted);
  };

  // Single click toggles playback; a double click/tap likes, with a heart where you tapped.
  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    useStore.getState().markGesture();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
      const s = useStore.getState();
      if (!s.likes.includes(post.id)) {
        s.toggleLike(post.id);
        s.showToast(t('toast.liked'));
      }
      setHearts((h) => [...h, { id: Date.now(), x, y }]);
      return;
    }
    clickTimer.current = window.setTimeout(() => {
      clickTimer.current = null;
      if (timed) togglePlay();
    }, 250);
  };

  return (
    <article
      className="feed-item flex items-center justify-center md:gap-4 md:px-4"
      aria-label={title}
      data-post-id={post.id}
    >
      <div className="group relative h-full w-full overflow-hidden bg-stage md:stage-desktop md:w-auto md:rounded-2xl" onClick={onStageClick}>
        {near ? (
          <PostMedia
            post={post}
            title={title}
            active={active}
            preload={near && !active}
            paused={paused}
            muted={muted}
            onProgress={setProgress}
            onPlaying={setPlaying}
            seekRef={seekRef}
            onNext={onNext}
            goTo={goTo}
          />
        ) : (
          <div className="absolute inset-0 bg-stage" />
        )}

        {/* Top controls */}
        {moving && (
          <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 z-[3] flex h-20 items-start justify-start p-3 md:p-4">
            <div className="pointer-events-auto mt-12 flex gap-2 md:mt-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={paused ? t('feed.play') : t('feed.pause')}
                className="icon-on-video hidden h-9 w-9 place-items-center rounded-full text-white transition hover:bg-white/15 md:grid"
              >
                {paused ? <Play size={20} className="fill-white" /> : <Pause size={20} className="fill-white" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? t('feed.unmute') : t('feed.mute')}
                className="icon-on-video flex h-9 items-center gap-1.5 rounded-full px-2 text-white transition hover:bg-white/15"
              >
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                {muted && active && <span className="text-[13px] font-semibold md:hidden">{t('feed.tapUnmute')}</span>}
              </button>
            </div>
          </div>
        )}

        {/* Centre play glyph while paused */}
        <AnimatePresence>
          {timed && active && userPaused && (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute inset-0 z-[3] grid place-items-center"
            >
              <Play size={72} className="fill-white/80 text-white/80 icon-on-video" />
            </motion.div>
          )}
          {flash > 0 && active && !userPaused && (
            <motion.div
              key={`flash-${flash}`}
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: 0, scale: 1.4 }}
              onAnimationComplete={() => setFlash(0)}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 z-[3] grid place-items-center"
            >
              <Play size={64} className="fill-white/80 text-white/80" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double-tap hearts */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="pointer-events-none absolute z-[4] text-pink"
              style={{ left: h.x - 48, top: h.y - 48 }}
              initial={{ scale: 0.2, opacity: 0, rotate: -12 }}
              animate={{ scale: [0.2, 1.2, 1], opacity: [0, 1, 1], rotate: [-12, 8, 0], y: [0, 0, -60] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, times: [0, 0.3, 1] }}
              onAnimationComplete={() => setHearts((hs) => hs.filter((x) => x.id !== h.id))}
            >
              <Heart size={96} className="fill-pink drop-shadow-lg" strokeWidth={0} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Caption */}
        <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[3] pb-[calc(var(--nav-h)+14px)] pl-3 pr-20 pt-16 md:pb-5 md:pl-4 md:pr-4">
          <div className="pointer-events-auto max-w-[480px]">
            <VideoCaption post={post} />
          </div>
        </div>

        {/* Progress */}
        {timed && (
          <div
            className="group/progress absolute inset-x-0 bottom-[calc(var(--nav-h))] z-[4] h-3 cursor-pointer md:bottom-0"
            onClick={(e) => {
              e.stopPropagation();
              if (!moving) return;
              const r = e.currentTarget.getBoundingClientRect();
              seekRef.current?.((e.clientX - r.left) / r.width);
            }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/25 transition-[height] group-hover/progress:h-1">
              <div className="h-full bg-white transition-[width] duration-300 ease-linear" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}

        {/* Mobile action rail sits on the video */}
        {post.media.kind !== 'intro' && (
          <VideoActions post={post} playing={playing} className="absolute bottom-[calc(var(--nav-h)+20px)] right-2 z-[5] md:hidden" />
        )}
      </div>

      {/* Desktop action rail sits beside the video */}
      <VideoActions post={post} playing={playing} className="hidden self-end pb-4 md:flex" />
    </article>
  );
});
