import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/useT';

// One interface for both kinds of footage: self-hosted files use <video>,
// the developer's YouTube uploads use the IFrame API over postMessage.

export interface PlayerProps {
  /** This post is the one on screen. */
  active: boolean;
  /** Adjacent post: mount and buffer, but do not play. */
  preload: boolean;
  /** Visitor paused, or the tab is hidden. */
  paused: boolean;
  muted: boolean;
  poster: string;
  /** width / height of the footage. */
  aspect: number;
  title: string;
  onProgress: (fraction: number) => void;
  onPlaying: (playing: boolean) => void;
  seekRef: React.MutableRefObject<((fraction: number) => void) | null>;
}

/** Landscape footage sits in the centre; the same frame, blurred, fills the rest. */
export function Backdrop({ src }: { src: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <img src={src} alt="" className="h-full w-full scale-125 object-cover opacity-60 blur-2xl" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}

function Spinner() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="relative h-10 w-10">
        <span className="absolute left-0 top-1/2 h-4 w-4 dot-l rounded-full bg-cyan mix-blend-screen" />
        <span className="absolute right-0 top-1/2 h-4 w-4 dot-r rounded-full bg-pink mix-blend-screen" />
      </div>
    </div>
  );
}

function ErrorState({ onRetry, href }: { onRetry: () => void; href?: string }) {
  const { t } = useT();
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/60 p-6 text-center">
      <div>
        <p className="mb-3 text-[15px] font-semibold text-white">{t('feed.error')}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={onRetry} className="flex items-center gap-1.5 rounded-md bg-white/15 px-3 py-2 text-[14px] font-semibold text-white hover:bg-white/25">
            <RotateCcw size={16} /> {t('feed.retry')}
          </button>
          {href && (
            <a href={href} target="_blank" rel="noreferrer" className="rounded-md bg-pink px-3 py-2 text-[14px] font-semibold text-white hover:brightness-110">
              {t('feed.watchYoutube')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- YouTube */

const YT_ORIGIN = 'https://www.youtube-nocookie.com';

export function YouTubePlayer({ id, start = 0, ...p }: PlayerProps & { id: string; start?: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playingNow, setPlayingNow] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const duration = useRef(0);
  const { onProgress, onPlaying, seekRef } = p;

  const send = useCallback((func: string, args: unknown[] = []) => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), YT_ORIGIN);
  }, []);

  // Listen to the player once its iframe is mounted.
  useEffect(() => {
    if (!p.preload && !p.active) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || e.source !== frame.current?.contentWindow) return;
      let data: { event?: string; info?: Record<string, number> | number } = {};
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === 'onReady') setReady(true);
      if (data.event === 'onError') setFailed(true);
      if (data.event === 'onStateChange' && typeof data.info === 'number') {
        const s = data.info;
        if (s === 1) setStarted(true);
        setBuffering(s === 3);
        setPlayingNow(s === 1);
        onPlaying(s === 1);
      }
      if (data.event === 'infoDelivery' && data.info && typeof data.info === 'object') {
        const info = data.info;
        if (typeof info.duration === 'number' && info.duration > 0) duration.current = info.duration;
        if (typeof info.playerState === 'number') {
          if (info.playerState === 1) setStarted(true);
          setBuffering(info.playerState === 3);
          setPlayingNow(info.playerState === 1);
          onPlaying(info.playerState === 1);
        }
        if (typeof info.currentTime === 'number' && duration.current) onProgress(info.currentTime / duration.current);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [p.preload, p.active, onPlaying, onProgress]);

  // Keep the player in the state the feed asks for.
  useEffect(() => {
    if (!ready) return;
    if (p.muted) send('mute');
    else {
      send('unMute');
      send('setVolume', [100]);
    }
    if (p.active && !p.paused) send('playVideo');
    else send('pauseVideo');
  }, [ready, p.active, p.paused, p.muted, send]);

  // YouTube draws its own title and "more videos" chrome while paused and for
  // the first seconds of playback; the poster covers the frame until then.
  useEffect(() => {
    if (!playingNow) {
      setRevealed(false);
      return;
    }
    const id = window.setTimeout(() => setRevealed(true), 2600);
    return () => window.clearTimeout(id);
  }, [playingNow]);

  // Rewind when the post leaves the screen, like TikTok.
  useEffect(() => {
    if (!p.active && ready) {
      send('seekTo', [start, true]);
      send('pauseVideo');
      onProgress(0);
    }
  }, [p.active, ready, send, start, onProgress]);

  useEffect(() => {
    seekRef.current = (f: number) => duration.current && send('seekTo', [f * duration.current, true]);
    return () => {
      seekRef.current = null;
    };
  }, [seekRef, send]);

  const mounted = p.active || p.preload;
  const src =
    `${YT_ORIGIN}/embed/${id}?enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1` +
    `&playsinline=1&rel=0&loop=1&playlist=${id}&mute=1&start=${start}&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <div className="absolute inset-0">
      <Backdrop src={p.poster} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full" style={{ aspectRatio: String(p.aspect) }}>
          {mounted && !failed && (
            <iframe
              key={attempt}
              ref={frame}
              src={src}
              title={p.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
              onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id }), YT_ORIGIN)}
            />
          )}
          {/* Poster until the first frame plays, so no YouTube chrome flashes. */}
          <img
            src={p.poster}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${revealed && !failed ? 'opacity-0' : 'opacity-100'}`}
            decoding="async"
          />
        </div>
      </div>
      {p.active && !failed && (!started || buffering) && !p.paused && <Spinner />}
      {failed && (
        <ErrorState
          href={`https://www.youtube.com/watch?v=${id}`}
          onRetry={() => {
            setFailed(false);
            setReady(false);
            setStarted(false);
            setAttempt((a) => a + 1);
          }}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- <video> */

export function NativePlayer({ src, ...p }: PlayerProps & { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [waiting, setWaiting] = useState(false);
  const [failed, setFailed] = useState(false);
  const { onProgress, onPlaying, seekRef } = p;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = p.muted;
    if (p.active && !p.paused) {
      // Browsers can refuse unmuted autoplay; fall back to muted.
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => onPlaying(false));
      });
    } else {
      v.pause();
    }
  }, [p.active, p.paused, p.muted, onPlaying]);

  useEffect(() => {
    const v = ref.current;
    if (v && !p.active) {
      v.currentTime = 0;
      onProgress(0);
    }
  }, [p.active, onProgress]);

  useEffect(() => {
    seekRef.current = (f: number) => {
      const v = ref.current;
      if (v && v.duration) v.currentTime = f * v.duration;
    };
    return () => {
      seekRef.current = null;
    };
  }, [seekRef]);

  return (
    <div className="absolute inset-0">
      <Backdrop src={p.poster} />
      <video
        ref={ref}
        src={p.active || p.preload ? src : undefined}
        poster={p.poster}
        muted
        playsInline
        loop
        preload={p.active ? 'auto' : p.preload ? 'metadata' : 'none'}
        aria-label={p.title}
        className="absolute inset-0 h-full w-full object-contain"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) onProgress(v.currentTime / v.duration);
        }}
        onPlaying={() => {
          setWaiting(false);
          onPlaying(true);
        }}
        onPause={() => onPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onError={() => setFailed(true)}
      />
      {p.active && waiting && !p.paused && <Spinner />}
      {failed && (
        <ErrorState
          onRetry={() => {
            setFailed(false);
            ref.current?.load();
          }}
        />
      )}
    </div>
  );
}
