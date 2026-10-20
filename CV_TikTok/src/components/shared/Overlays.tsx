import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Link2, Share2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { useIsDesktop } from '../../hooks/useMisc';
import { postById } from '../../data/posts';
import { projectOf } from '../../services/content';
import { canNativeShare, copyText, postUrl } from '../../services/share';

export function ShareSheet() {
  const id = useStore((s) => s.sharePostId);
  const { t, l } = useT();
  const desktop = useIsDesktop();
  const post = id ? postById(id) : undefined;
  const project = post ? projectOf(post) : undefined;
  const url = id ? postUrl(id) : '';
  const source = project?.itchUrl ?? project?.githubUrl ?? (post?.media.kind === 'code' ? post.media.sample.url : undefined);
  const first = useRef<HTMLButtonElement>(null);
  const close = () => useStore.getState().closeShare();

  useEffect(() => {
    if (!id) return;
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [id]);

  const copy = async () => {
    const ok = await copyText(url);
    useStore.getState().showToast(ok ? t('share.copied') : t('share.failed'));
    if (ok) close();
  };

  const native = async () => {
    try {
      await navigator.share({ title: project ? `${project.title} — DevUnNull` : 'DevUnNull', text: post ? l(post.caption) : '', url });
      close();
    } catch {
      /* dismissed */
    }
  };

  const item = 'flex flex-col items-center gap-2 text-[13px] font-medium text-fg';
  const circle = 'grid h-14 w-14 place-items-center rounded-full transition group-hover:brightness-110 group-active:scale-95';

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          key="share"
          className={`fixed inset-0 z-50 flex bg-black/50 ${desktop ? 'items-center justify-center' : 'items-end'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('share.title')}
            className={`bg-panel p-5 ${desktop ? 'w-[400px] rounded-xl' : 'w-full rounded-t-xl pb-[calc(20px+env(safe-area-inset-bottom))]'}`}
            initial={desktop ? { scale: 0.96, opacity: 0 } : { y: '100%' }}
            animate={desktop ? { scale: 1, opacity: 1 } : { y: 0 }}
            exit={desktop ? { scale: 0.96, opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-fg">{t('share.title')}</h2>
              <button type="button" onClick={close} aria-label={t('feed.close')} className="grid h-8 w-8 place-items-center rounded-full bg-chip text-fg hover:bg-chip-hover">
                <X size={18} />
              </button>
            </div>
            <div className="flex justify-around gap-2">
              <button ref={first} type="button" onClick={copy} className={`group ${item}`}>
                <span className={`${circle} bg-cyan text-black`}>
                  <Link2 size={24} />
                </span>
                {t('share.copy')}
              </button>
              {canNativeShare() && (
                <button type="button" onClick={native} className={`group ${item}`}>
                  <span className={`${circle} bg-pink text-white`}>
                    <Share2 size={24} />
                  </span>
                  {t('share.native')}
                </button>
              )}
              {source && (
                <a href={source} target="_blank" rel="noreferrer" className={`group ${item}`}>
                  <span className={`${circle} bg-chip text-fg`}>
                    <ExternalLink size={24} />
                  </span>
                  {t('share.source')}
                </a>
              )}
            </div>
            <label className="mt-5 flex items-center gap-2 rounded-md bg-chip px-3 py-2">
              <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 bg-transparent text-[13px] text-fg-2 focus:outline-none" aria-label="URL" />
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast() {
  const toast = useStore((s) => s.toast);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => useStore.setState({ toast: null }), 2200);
    return () => clearTimeout(id);
  }, [toast]);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-16 z-[60] flex justify-center px-4 md:top-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-md bg-[#545454]/95 px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
