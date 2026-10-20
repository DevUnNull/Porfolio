import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useStore, type PanelTab } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { useIsDesktop } from '../../hooks/useMisc';
import { postById } from '../../data/posts';
import { skillById } from '../../data/skills';
import { profile } from '../../data/profile';
import { projectOf } from '../../services/content';
import { ProjectDetails, SectionTitle } from './ProjectDetails';
import { SampleBlock, TechnicalBreakdown } from './TechnicalBreakdown';
import type { Post } from '../../data/types';

/**
 * Sliding details panel. On desktop it docks to the right and leaves the feed
 * usable (it follows the active post); on phones it is a bottom sheet.
 */
export function DetailsPanel() {
  const panel = useStore((s) => s.panel);
  const desktop = useIsDesktop();
  const { t } = useT();
  const post = panel ? postById(panel.postId) : undefined;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && useStore.getState().closePanel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panel]);

  useEffect(() => {
    if (panel && !desktop) closeRef.current?.focus();
  }, [panel, desktop]);

  const tabs: { id: PanelTab; label: string }[] = [
    { id: 'details', label: t('panel.details') },
    { id: 'technical', label: t('panel.technical') },
    { id: 'notes', label: t('panel.notes') },
  ];

  return (
    <AnimatePresence>
      {panel && post && (
        <>
          {!desktop && (
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => useStore.getState().closePanel()}
            />
          )}
          <motion.aside
            key="panel"
            role={desktop ? 'complementary' : 'dialog'}
            aria-modal={desktop ? undefined : true}
            aria-label={t('panel.title')}
            className={
              desktop
                ? 'fixed bottom-0 right-0 top-0 z-30 flex w-[min(440px,40vw)] flex-col bg-panel'
                : 'fixed inset-x-0 bottom-0 z-50 flex h-[78dvh] flex-col rounded-t-xl bg-panel'
            }
            initial={desktop ? { x: '100%' } : { y: '100%' }}
            animate={desktop ? { x: 0 } : { y: 0 }}
            exit={desktop ? { x: '100%' } : { y: '100%' }}
            transition={{ type: 'tween', ease: [0.2, 0.8, 0.2, 1], duration: 0.28 }}
          >
            <header className="flex shrink-0 items-center gap-2 px-4 pb-0 pt-3">
              <div className="flex flex-1 gap-5" role="tablist">
                {tabs.map((tb) => (
                  <button
                    key={tb.id}
                    type="button"
                    role="tab"
                    aria-selected={panel.tab === tb.id}
                    onClick={() => useStore.getState().setPanelTab(tb.id)}
                    className={`relative pb-2.5 pt-1 text-[16px] font-semibold transition-colors ${panel.tab === tb.id ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
                  >
                    {tb.label}
                    {panel.tab === tb.id && <motion.span layoutId="panel-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-fg" />}
                  </button>
                ))}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => useStore.getState().closePanel()}
                aria-label={t('feed.close')}
                className="grid h-9 w-9 place-items-center rounded-full bg-chip text-fg hover:bg-chip-hover"
              >
                <X size={20} />
              </button>
            </header>
            <div className="h-px shrink-0 bg-divider" />
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4" data-scrollable>
              <PanelBody post={post} tab={panel.tab} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function PanelBody({ post, tab }: { post: Post; tab: PanelTab }) {
  const { t, l } = useT();
  const project = projectOf(post);
  const skill = post.media.kind === 'skill' ? skillById(post.media.skillId) : undefined;

  if (tab === 'details') {
    if (project) {
      return (
        <div>
          <h2 className="text-[22px] font-bold leading-tight text-fg">{project.title}</h2>
          <Link to={`/projects/${project.slug}`} className="mb-3 inline-block text-[14px] font-semibold text-fg-2 hover:text-fg hover:underline">
            {t('panel.openProject')} →
          </Link>
          <ProjectDetails project={project} />
        </div>
      );
    }
    return (
      <div>
        <h2 className="text-[22px] font-bold text-fg">{skill ? skill.name : 'DevUnNull'}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-fg">{l(post.caption)}</p>
        {!skill && (
          <>
            <SectionTitle>{t('nav.profile')}</SectionTitle>
            <ul className="space-y-1 text-[14px] text-fg">
              {profile.bio.map((b) => (
                <li key={b.en}>{l(b)}</li>
              ))}
              <li>
                {profile.studio.name} — {l(profile.studio.role)}
              </li>
              <li>{l(profile.internship)}</li>
            </ul>
          </>
        )}
      </div>
    );
  }

  if (tab === 'technical') {
    if (project?.breakdown) return <TechnicalBreakdown breakdown={project.breakdown} title={project.title} githubUrl={project.githubUrl} />;
    const sample = post.media.kind === 'code' ? post.media.sample : skill?.sample;
    if (sample) return <SampleBlock sample={sample} />;
    return <p className="text-[14px] text-fg-2">{t('panel.noBreakdown')}</p>;
  }

  return (
    <div>
      <p className="rounded-lg bg-chip p-3 text-[13px] text-fg-2">{t('panel.notesIntro')}</p>
      <div className="mt-4 flex gap-3">
        <img src={profile.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
        <div>
          <p className="text-[14px] font-bold text-fg">DevUnNull</p>
          <p className="mt-0.5 text-[15px] leading-relaxed text-fg">{l(post.caption)}</p>
          {skill && (
            <dl className="mt-3 space-y-2 text-[14px]">
              {(
                [
                  ['skills.why', skill.why],
                  ['skills.where', skill.where],
                  ['skills.problem', skill.problem],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold text-fg-2">{t(k)}</dt>
                  <dd className="text-fg">{l(v)}</dd>
                </div>
              ))}
            </dl>
          )}
          {project && project.contributions && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-fg marker:text-fg-2">
              {project.contributions.map((c) => (
                <li key={c.en}>{l(c)}</li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[13px] text-fg-2">“{l(profile.quote)}”</p>
        </div>
      </div>
    </div>
  );
}
