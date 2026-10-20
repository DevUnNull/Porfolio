import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Github, Images, ImageIcon, FileCode2, Gamepad2, Cpu } from 'lucide-react';
import type { CodeSample, Post } from '../../data/types';
import { useT } from '../../i18n/useT';
import { profile, social } from '../../data/profile';
import { skillById, skills, skillGroups } from '../../data/skills';
import { projectById } from '../../data/projects';
import { asset } from '../../services/asset';
import { Backdrop, NativePlayer, YouTubePlayer, type PlayerProps } from './VideoPlayer';
import { CodeView } from '../shared/CodeView';
import { LogoMark } from '../shared/Brand';

export interface MediaProps extends Omit<PlayerProps, 'poster' | 'aspect' | 'title'> {
  post: Post;
  title: string;
  onNext: () => void;
  goTo: (id: string) => void;
}

/** Small label in the top-left corner that says what kind of post this is. */
function Kind({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="on-video pointer-events-none absolute left-3 top-14 z-[2] flex items-center gap-1 rounded bg-black/40 px-1.5 py-1 text-[12px] font-semibold text-white md:left-4 md:top-4">
      {icon}
      {children}
    </span>
  );
}

export function PostMedia(props: MediaProps) {
  const { post } = props;
  const m = post.media;
  const { t } = useT();
  switch (m.kind) {
    case 'youtube':
      return <YouTubePlayer {...props} id={m.id} start={m.start} poster={m.poster} aspect={m.aspect} />;
    case 'video':
      return <NativePlayer {...props} src={m.src} poster={m.poster} aspect={m.aspect} />;
    case 'image':
      return (
        <div className="absolute inset-0">
          <Backdrop src={m.src} />
          <img src={m.src} alt={props.title} className="absolute inset-0 h-full w-full object-contain" decoding="async" loading={props.preload || props.active ? 'eager' : 'lazy'} />
          <Kind icon={<ImageIcon size={14} />}>{t('feed.poster')}</Kind>
        </div>
      );
    case 'gallery':
      return <Gallery {...props} items={m.items} />;
    case 'code':
      return <CodeMedia sample={m.sample} poster={m.poster} />;
    case 'intro':
      return <IntroMedia onNext={props.onNext} />;
    case 'skill':
      return <SkillMedia skillId={m.skillId} />;
    case 'skills-overview':
      return <SkillsOverview goTo={props.goTo} />;
    case 'placeholder':
      return <PlaceholderMedia title={m.title} />;
  }
}

/* ---------------------------------------------------------------- Gallery */

function Gallery({ items, active, paused, onProgress, onPlaying }: MediaProps & { items: { src: string; alt: { en: string; vi: string } }[] }) {
  const { t, l } = useT();
  const [i, setI] = useState(0);
  const elapsed = useRef(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const n = items.length;
  const SLIDE_MS = 4000;

  const go = (d: number) => {
    elapsed.current = 0;
    setI((v) => (v + d + n) % n);
  };

  useEffect(() => {
    if (!active) {
      setI(0);
      elapsed.current = 0;
      onProgress(0);
    }
  }, [active, onProgress]);

  useEffect(() => {
    onPlaying(active && !paused);
    if (!active || paused) return;
    const tick = 100;
    const id = setInterval(() => {
      elapsed.current += tick;
      if (elapsed.current >= SLIDE_MS) {
        elapsed.current = 0;
        setI((v) => (v + 1) % n);
      }
    }, tick);
    return () => clearInterval(id);
  }, [active, paused, n, onPlaying]);

  useEffect(() => {
    onProgress((i + 1) / n);
  }, [i, n, onProgress]);

  return (
    <div
      className="absolute inset-0 touch-pan-y select-none"
      onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const dx = e.clientX - s.x;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
          swiped.current = true;
          go(dx < 0 ? 1 : -1);
        }
      }}
      onClickCapture={(e) => {
        if (swiped.current) {
          swiped.current = false;
          e.stopPropagation();
        }
      }}
    >
      <Backdrop src={items[i].src} />
      {items.map((it, k) => (
        <img
          key={it.src}
          src={it.src}
          alt={l(it.alt)}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${k === i ? 'opacity-100' : 'opacity-0'}`}
          loading={k === 0 || active ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      <Kind icon={<Images size={14} />}>
        {t('feed.photos')} · {i + 1}/{n}
      </Kind>
      <div className="pointer-events-none absolute left-0 right-0 top-[62px] z-[2] flex justify-center gap-1.5 md:top-6">
        {items.map((_, k) => (
          <span key={k} className={`h-1.5 rounded-full transition-[width,background-color] ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        className="absolute left-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 md:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        className="absolute right-2 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 md:grid"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- Code */

function CodeMedia({ sample, poster }: { sample: CodeSample; poster?: string }) {
  const { t, l } = useT();
  return (
    <div className="absolute inset-0 bg-[#0b0c11]">
      {poster && <Backdrop src={poster} />}
      <Kind icon={<FileCode2 size={14} />}>{t('feed.code')}</Kind>
      <div className="absolute left-3 right-[68px] bottom-[calc(var(--nav-h)+170px)] top-24 flex flex-col justify-center md:inset-x-4 md:bottom-36 md:top-14">
        <p className="mb-2 text-[13px] font-semibold text-white/90">
          {l(sample.title)}
          <span className={`ml-2 font-normal ${sample.verified ? 'text-cyan' : 'text-white/60'}`}>
            {sample.verified ? t('panel.verified') : t('panel.conceptual')}
          </span>
        </p>
        <CodeView code={sample.code} file={sample.file} size="sm" copyable={false} className="max-h-full min-h-0" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Intro */

const introTiles = [
  'assets/games/hero-defense/cover.webp',
  'assets/games/lost-in-the-jungle/itch-cover.jpg',
  'assets/games/call-out-my-cell/cover.jpg',
  'assets/games/other-projects/brainrot-runner.webp',
  'assets/games/other-projects/game-jam.webp',
  'assets/games/other-projects/chien-binh-xanh-nhi.webp',
];

function IntroMedia({ onNext }: { onNext: () => void }) {
  const { t, l } = useT();
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 grid-rows-3">
        {introTiles.map((src) => (
          <img key={src} src={asset(src)} alt="" className="h-full w-full object-cover blur-[2px]" decoding="async" />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-[calc(var(--nav-h)+40px)] text-center md:pb-10">
        <div className="relative mb-5">
          <img src={profile.avatar} alt="DevUnNull" className="h-24 w-24 rounded-full border-2 border-white object-cover" />
          <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-black">
            <LogoMark size={26} />
          </span>
        </div>
        <p className="mb-1 text-[15px] font-semibold text-white/80">@DevUnNull</p>
        <h2 className="text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-[40px]">{t('intro.hi')}</h2>
        <p className="mt-2 text-[15px] font-bold tracking-[0.02em] text-cyan">{t('intro.role')}</p>
        <p className="mt-4 max-w-[30ch] text-[18px] font-semibold leading-snug text-white">“{l(profile.tagline)}”</p>
        <div className="mt-6 flex w-full max-w-[300px] flex-col gap-2" onClick={stop}>
          <Link to="/projects" className="flex h-11 items-center justify-center gap-2 rounded-md bg-pink text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98]">
            <Gamepad2 size={18} /> {t('intro.games')}
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <a href={social.github} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-md bg-white/15 text-[15px] font-semibold text-white transition hover:bg-white/25 active:scale-[0.98]">
              <Github size={18} /> {t('intro.github')}
            </a>
            <Link to="/skills" className="flex h-11 items-center justify-center gap-2 rounded-md bg-white/15 text-[15px] font-semibold text-white transition hover:bg-white/25 active:scale-[0.98]">
              <Cpu size={18} /> {t('intro.skills')}
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            stop(e);
            onNext();
          }}
          className="mt-8 flex flex-col items-center gap-1 text-[14px] font-semibold text-white/85 hover:text-white"
        >
          {t('feed.scrollHint')}
          <ChevronDown size={22} className="hint-bounce" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Skills */

function LevelBadge({ level }: { level: 'demonstrated' | 'learning' }) {
  const { t } = useT();
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${level === 'demonstrated' ? 'text-[#4ade80]' : 'text-white/60'}`}>
      <span className={`h-2 w-2 rounded-full ${level === 'demonstrated' ? 'bg-[#4ade80]' : 'bg-white/40'}`} />
      {level === 'demonstrated' ? t('skills.demonstrated') : t('skills.learning')}
    </span>
  );
}

function SkillMedia({ skillId }: { skillId: string }) {
  const s = skillById(skillId)!;
  const { t, l } = useT();
  const rows: [string, string][] = [
    [t('skills.what'), l(s.what)],
    [t('skills.why'), l(s.why)],
    [t('skills.where'), l(s.where)],
    [t('skills.problem'), l(s.problem)],
  ];
  const projs = s.projectIds.map((id) => projectById(id)).filter(Boolean);
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <div
        className="absolute inset-x-0 bottom-[calc(var(--nav-h)+150px)] top-12 overflow-y-auto pl-5 pr-[72px] md:bottom-32 md:top-6 md:px-6"
        data-scrollable
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-full flex-col justify-center py-4">
          <LevelBadge level={s.level} />
          <h2 className="mt-1 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">{s.name}</h2>
          <dl className="mt-4 space-y-3">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] font-semibold text-white/60">{k}</dt>
                <dd className="text-[15px] leading-snug text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {(projs.length > 0 || s.repos?.length) && (
            <div className="mt-4">
              <p className="mb-2 text-[13px] font-semibold text-white/60">{t('skills.projects')}</p>
              <div className="flex flex-wrap gap-2">
                {projs.map((p) => (
                  <Link key={p!.id} to={`/projects/${p!.slug}`} className="flex items-center gap-2 rounded-md bg-white/10 py-1 pl-1 pr-2.5 text-[13px] font-semibold text-white hover:bg-white/20">
                    {p!.thumbnail ? <img src={p!.thumbnail} alt="" className="h-6 w-6 rounded object-cover" /> : <span className="h-6 w-6 rounded bg-white/15" />}
                    {p!.title}
                  </Link>
                ))}
                {s.repos?.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[13px] font-semibold text-white hover:bg-white/20">
                    <Github size={14} /> {r.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillsOverview({ goTo }: { goTo: (id: string) => void }) {
  const { t, l } = useT();
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <div
        className="absolute inset-x-0 bottom-[calc(var(--nav-h)+150px)] top-12 overflow-y-auto pl-5 pr-[72px] md:bottom-32 md:top-6 md:px-6"
        data-scrollable
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-full flex-col justify-center py-4">
          <h2 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">{t('skills.overview')}</h2>
          <p className="mt-1 text-[13px] text-white/70">{t('skills.legend')}</p>
          {skillGroups.map((g) => (
            <section key={g.id} className="mt-4">
              <h3 className="mb-2 text-[15px] font-bold text-white">{l(g.name)}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills
                  .filter((s) => s.group === g.id)
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(`skill-${s.id}`)}
                      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition hover:brightness-125 active:scale-95 ${s.level === 'demonstrated' ? 'bg-[#4ade80]/15 text-[#86efac]' : 'bg-white/10 text-white/70'}`}
                    >
                      {s.name}
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Placeholder */

function PlaceholderMedia({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-surface">
      <div className="relative select-none text-[120px] font-extrabold leading-none tracking-[-0.05em]">
        <span className="absolute left-[-4px] top-[-3px] text-cyan" aria-hidden="true">
          {title}
        </span>
        <span className="absolute left-[4px] top-[3px] text-pink" aria-hidden="true">
          {title}
        </span>
        <span className="relative text-white">{title}</span>
      </div>
    </div>
  );
}

