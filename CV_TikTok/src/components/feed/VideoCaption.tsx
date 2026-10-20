import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, BadgeCheck } from 'lucide-react';
import type { Post } from '../../data/types';
import { useT } from '../../i18n/useT';
import { projectOf, isMoving } from '../../services/content';
import { metaLine } from '../../services/projectMeta';
import type { MessageKey } from '../../i18n/en';

export function VideoCaption({ post }: { post: Post }) {
  const { t, l } = useT();
  const [open, setOpen] = useState(false);
  const project = projectOf(post);
  const text = l(post.caption);
  const long = text.length > 90;
  if (post.media.kind === 'intro') return null;

  return (
    <div className="on-video text-white" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-1.5">
        <Link to="/@devunnull" className="text-[16px] font-bold hover:underline">
          DevUnNull
        </Link>
        <BadgeCheck size={15} className="fill-cyan text-black" aria-label="Portfolio owner" />
        <span className="text-[14px] text-white/80">· {t(`type.${post.type}` as MessageKey)}</span>
      </div>
      {project && (
        <Link to={`/projects/${project.slug}`} className="mt-1 block text-[17px] font-bold leading-tight hover:underline">
          {project.title}
        </Link>
      )}
      {project && <p className="mt-0.5 text-[13px] font-medium text-white/85">{metaLine(project, t)}</p>}
      <p className={`mt-1.5 text-[15px] leading-[1.35] ${open ? '' : 'line-clamp-2'}`}>
        {text}{' '}
        {post.tags.map((tag) => (
          <Link key={tag} to={`/explore?q=${encodeURIComponent(tag)}`} className="font-bold hover:underline">
            #{tag}{' '}
          </Link>
        ))}
      </p>
      {(long || post.tags.length > 2) && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-0.5 text-[14px] font-bold text-white/90 hover:underline">
          {open ? t('feed.seeLess') : t('feed.seeMore')}
        </button>
      )}
      {isMoving(post) && project && (
        <div className="mt-2 flex items-center gap-1.5 overflow-hidden text-[14px]">
          <Gamepad2 size={14} className="shrink-0" />
          <div className="relative w-[200px] overflow-hidden">
            <div className="marquee flex w-max whitespace-nowrap">
              <span className="pr-10">Made with {project.engine} — {project.title}</span>
              <span aria-hidden="true" className="pr-10">Made with {project.engine} — {project.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
