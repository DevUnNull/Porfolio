import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Code2, Download, ExternalLink, Forward, Gamepad2, Heart, Info } from 'lucide-react';
import type { Post } from '../../data/types';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { profile } from '../../data/profile';
import { projectOf } from '../../services/content';
import { playAction } from '../../services/projectMeta';

interface Props {
  post: Post;
  playing: boolean;
  className?: string;
}

/**
 * The right-hand action column. Labels replace TikTok's counters: this site
 * has no global engagement numbers, so it never shows any.
 */
export function VideoActions({ post, playing, className = '' }: Props) {
  const { t } = useT();
  const navigate = useNavigate();
  const project = projectOf(post);
  const liked = useStore((s) => s.likes.includes(post.id));
  const saved = useStore((s) => s.saves.includes(post.id));
  const { toggleLike, toggleSave, openPanel, openShare, showToast } = useStore.getState();
  const play = playAction(project);
  const hasCode = Boolean(project?.breakdown || post.media.kind === 'code' || project?.githubUrl);

  const like = () => showToast(toggleLike(post.id) ? t('toast.liked') : t('toast.unliked'));
  const save = () => showToast(toggleSave(post.id) ? t('toast.saved') : t('toast.unsaved'));

  return (
    <div className={`flex flex-col items-center gap-3 md:gap-2.5 ${className}`} onClick={(e) => e.stopPropagation()}>
      <Link to="/@devunnull" aria-label={t('action.profile')} className="mb-1 block transition-transform hover:scale-105 active:scale-95">
        <img src={profile.avatar} alt="" className="h-12 w-12 rounded-full border border-white/80 object-cover md:h-12 md:w-12" />
      </Link>

      <RailButton label={liked ? t('action.liked') : t('action.like')} onClick={like} pressed={liked}>
        <HeartIcon on={liked} />
      </RailButton>

      <RailButton label={t('action.details')} onClick={() => openPanel(post.id, 'details')}>
        <Info strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
      </RailButton>

      <RailButton label={saved ? t('action.saved') : t('action.save')} onClick={save} pressed={saved}>
        <motion.span key={String(saved)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
          <Bookmark strokeWidth={2.4} className={`h-[30px] w-[30px] md:h-6 md:w-6 ${saved ? 'fill-[#face15] text-[#face15]' : ''}`} />
        </motion.span>
      </RailButton>

      <RailButton label={t('action.share')} onClick={() => openShare(post.id)}>
        <Forward strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
      </RailButton>

      {play && (
        <RailButton
          label={play.kind === 'web' ? t('action.play') : play.kind === 'download' ? t('action.download') : t('action.visit')}
          onClick={() => (play.kind === 'web' ? navigate(play.to) : window.open(play.href, '_blank', 'noopener'))}
          accent
        >
          {play.kind === 'web' ? (
            <Gamepad2 strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
          ) : play.kind === 'download' ? (
            <Download strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
          ) : (
            <ExternalLink strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
          )}
        </RailButton>
      )}

      {hasCode && (
        <RailButton label={t('action.code')} onClick={() => openPanel(post.id, 'technical')}>
          <Code2 strokeWidth={2.4} className="h-[30px] w-[30px] md:h-6 md:w-6" />
        </RailButton>
      )}

      {project?.thumbnail && (
        <Link
          to={`/projects/${project.slug}`}
          aria-label={project.title}
          className={`mt-1 grid h-11 w-11 place-items-center rounded-full bg-[#2b2b2b] ${playing ? '' : 'paused'}`}
        >
          <span className="spin-disc block h-7 w-7 overflow-hidden rounded-full border-[5px] border-[#161616]">
            <img src={project.thumbnail} alt="" className="h-full w-full object-cover" />
          </span>
        </Link>
      )}
    </div>
  );
}

function RailButton({
  label,
  onClick,
  children,
  pressed,
  accent,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  pressed?: boolean;
  accent?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} aria-pressed={pressed} className="group flex flex-col items-center gap-0.5 md:gap-1">
      <span
        className={`icon-on-video grid h-12 w-12 place-items-center rounded-full text-white transition-transform duration-150 group-hover:scale-105 group-active:scale-90 md:bg-chip md:text-fg md:group-hover:bg-chip-hover ${accent ? 'md:!bg-pink md:!text-white' : ''}`}
      >
        {children}
      </span>
      <span className="on-video text-[12px] font-semibold text-white md:text-fg-2 md:[text-shadow:none]">{label}</span>
    </button>
  );
}

function HeartIcon({ on }: { on: boolean }) {
  const [burst, setBurst] = useState(0);
  return (
    <span className="relative" onClick={() => !on && setBurst((b) => b + 1)}>
      <motion.span key={String(on)} initial={{ scale: on ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 520, damping: 14 }} className="block">
        <Heart strokeWidth={on ? 0 : 2.4} className={`h-[30px] w-[30px] md:h-6 md:w-6 ${on ? 'fill-pink text-pink' : ''}`} />
      </motion.span>
      <AnimatePresence>
        {burst > 0 && on && (
          <motion.span
            key={burst}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-pink"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </span>
  );
}
