import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Gamepad2, Maximize, Minimize, RotateCw } from 'lucide-react';
import type { Project } from '../../data/types';
import { useT } from '../../i18n/useT';

/**
 * itch.io HTML5 embed. Nothing heavy loads until the visitor presses the
 * button, and the frame keeps the build's own aspect ratio.
 */
export function GamePlayer({ project }: { project: Project }) {
  const { t } = useT();
  const web = project.web!;
  const wrap = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [full, setFull] = useState(false);
  const canFull = typeof document !== 'undefined' && Boolean(document.fullscreenEnabled);
  const ratio = web.width / web.height;
  const portrait = ratio < 1;

  useEffect(() => {
    const on = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const toggleFull = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await wrap.current?.requestFullscreen();
    } catch {
      /* not allowed here */
    }
  };

  return (
    <div>
      <div
        ref={wrap}
        className="relative mx-auto overflow-hidden rounded-xl bg-black [&:fullscreen]:rounded-none"
        style={{
          aspectRatio: String(ratio),
          // Fit inside the viewport whatever the build's shape.
          width: `min(100%, calc((100dvh - 220px) * ${ratio}))`,
        }}
      >
        {loaded ? (
          <>
            {!ready && (
              <div className="absolute inset-0 grid place-items-center text-[14px] font-semibold text-white/80">
                <span className="flex items-center gap-2">
                  <RotateCw size={18} className="animate-spin" /> {t('player.loading')}
                </span>
              </div>
            )}
            <iframe
              src={`https://itch.io/embed-upload/${web.uploadId}?color=000000`}
              title={t('player.title', { title: project.title })}
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              onLoad={() => setReady(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0">
            {project.thumbnail && <img src={project.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/65 p-6 text-center">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="inline-flex h-12 items-center gap-2 rounded-md bg-pink px-6 text-[16px] font-bold text-white transition hover:brightness-110 active:scale-[0.98]"
              >
                <Gamepad2 size={20} /> {t('player.load')}
              </button>
              <p className="max-w-[40ch] text-[13px] text-white/85">{t('player.loadNote')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2">
        {canFull && loaded && (
          <button type="button" onClick={toggleFull} className="inline-flex h-10 items-center gap-2 rounded-md bg-chip px-4 text-[15px] font-semibold text-fg hover:bg-chip-hover">
            {full ? <Minimize size={18} /> : <Maximize size={18} />}
            {full ? t('player.exitFullscreen') : t('player.fullscreen')}
          </button>
        )}
        {project.itchUrl && (
          <a href={project.itchUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md bg-chip px-4 text-[15px] font-semibold text-fg hover:bg-chip-hover">
            <ExternalLink size={18} /> {t('player.openItch')}
          </a>
        )}
      </div>
      {!portrait && <p className="mt-2 text-center text-[13px] text-fg-2 md:hidden">{t('player.rotate')}</p>}
    </div>
  );
}
