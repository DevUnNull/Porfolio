import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu, FileCode2, Images, ImageIcon, Play } from 'lucide-react';
import type { Post } from '../../data/types';
import { useT } from '../../i18n/useT';
import { postThumb, projectOf } from '../../services/content';
import { postPath } from '../../services/share';
import { skillById } from '../../data/skills';
import { profile } from '../../data/profile';
import type { MessageKey } from '../../i18n/en';

function KindIcon({ post }: { post: Post }) {
  const k = post.media.kind;
  const cls = 'shrink-0';
  if (k === 'youtube' || k === 'video') return <Play size={14} className={`${cls} fill-white`} />;
  if (k === 'gallery') return <Images size={14} className={cls} />;
  if (k === 'image' || k === 'placeholder') return <ImageIcon size={14} className={cls} />;
  if (k === 'code') return <FileCode2 size={14} className={cls} />;
  return <Cpu size={14} className={cls} />;
}

/** A tile drawn in HTML for posts that have no picture (code, skills, placeholders). */
function TextTile({ post }: { post: Post }) {
  const m = post.media;
  if (m.kind === 'code') {
    return (
      <div aria-hidden="true" className="code-view absolute inset-0 overflow-hidden p-3 font-mono text-[11px] leading-[15px] text-white/75">
        <p className="mb-2 truncate text-[11px] text-white/50">{m.sample.file.split('/').pop()}</p>
        <pre className="whitespace-pre">{m.sample.code.split('\n').slice(0, 18).join('\n')}</pre>
      </div>
    );
  }
  if (m.kind === 'skill' || m.kind === 'skills-overview') {
    const s = m.kind === 'skill' ? skillById(m.skillId) : undefined;
    return (
      <div className="absolute inset-0 flex flex-col justify-end bg-surface p-3">
        <span className={`mb-1 h-2 w-2 rounded-full ${s?.level === 'learning' ? 'bg-white/40' : 'bg-[#4ade80]'}`} />
        <p className="text-[20px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">{s?.name ?? 'Skills'}</p>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 grid place-items-center bg-surface">
      <span className="text-[44px] font-extrabold tracking-[-0.04em] text-white">{m.kind === 'placeholder' ? m.title : 'DevUnNull'}</span>
    </div>
  );
}

export function PostThumb({ post, showCaption = false, from }: { post: Post; showCaption?: boolean; from?: string }) {
  const { t, l } = useT();
  const location = useLocation();
  const src = postThumb(post);
  const project = projectOf(post);
  const [loaded, setLoaded] = useState(false);
  const label = project?.title ?? l(post.caption);

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Link
        to={postPath(post.id)}
        state={{ from: from ?? location.pathname + location.search }}
        className="group block"
        aria-label={label}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-surface">
          {src ? (
            <>
              {!loaded && <div className="skeleton absolute inset-0" />}
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </>
          ) : (
            <TextTile post={post} />
          )}
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
          <div className="scrim-bottom absolute inset-x-0 bottom-0 flex items-center gap-1 px-2 pb-1.5 pt-8 text-[12px] font-semibold text-white on-video">
            <KindIcon post={post} />
            <span className="truncate">{t(`type.${post.type}` as MessageKey)}</span>
          </div>
          {project && (
            <p className="on-video absolute left-2 right-2 top-2 truncate text-[13px] font-bold text-white opacity-0 transition group-hover:opacity-100">{project.title}</p>
          )}
        </div>
        {showCaption && (
          <div className="pt-2">
            <p className="line-clamp-2 text-[14px] leading-snug text-fg">{l(post.caption)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-fg-2">
              <img src={profile.avatar} alt="" className="h-5 w-5 rounded-full" />
              devunnull
            </p>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export function VideoGrid({ posts, showCaption = false, from }: { posts: Post[]; showCaption?: boolean; from?: string }) {
  return (
    <div className={`grid ${showCaption ? 'grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-3 gap-1 sm:gap-2 lg:grid-cols-4 xl:grid-cols-5'}`}>
      {posts.map((p) => (
        <PostThumb key={p.id} post={p} showCaption={showCaption} from={from} />
      ))}
    </div>
  );
}
