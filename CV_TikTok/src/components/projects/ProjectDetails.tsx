import { Link } from 'react-router-dom';
import { Download, ExternalLink, Gamepad2, Github } from 'lucide-react';
import type { Project } from '../../data/types';
import { useT } from '../../i18n/useT';
import type { MessageKey } from '../../i18n/en';
import { playAction } from '../../services/projectMeta';

export function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-1.5 text-[14px]">
      <dt className="w-28 shrink-0 text-fg-2">{label}</dt>
      <dd className="min-w-0 font-medium text-fg">{children}</dd>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-[16px] font-bold text-fg">{children}</h3>;
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((x) => (
        <span key={x} className="rounded bg-chip px-2 py-1 text-[13px] font-medium text-fg">
          {x}
        </span>
      ))}
    </div>
  );
}

/** Play / download / visit / source buttons, matching what really exists. */
export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { t } = useT();
  const play = playAction(project);
  const btn = `inline-flex h-10 items-center gap-2 rounded-md px-4 text-[15px] font-semibold transition active:scale-[0.98]`;
  return (
    <div className="flex flex-wrap gap-2">
      {play?.kind === 'web' && (
        <Link to={play.to} className={`${btn} bg-pink text-white hover:brightness-110`}>
          <Gamepad2 size={18} /> {t('action.play')}
        </Link>
      )}
      {play?.kind === 'download' && project.download && (
        <a href={play.href} target="_blank" rel="noreferrer" className={`${btn} bg-pink text-white hover:brightness-110`}>
          <Download size={18} /> {compact ? t('play.download') : t('player.downloadOn', { file: project.download.file, size: project.download.size })}
        </a>
      )}
      {project.itchUrl && play?.kind !== 'download' && (
        <a href={project.itchUrl} target="_blank" rel="noreferrer" className={`${btn} bg-chip text-fg hover:bg-chip-hover`}>
          <ExternalLink size={18} /> itch.io
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={`${btn} bg-chip text-fg hover:bg-chip-hover`}>
          <Github size={18} /> GitHub
        </a>
      )}
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const { t, l } = useT();
  return (
    <div>
      <p className="text-[15px] leading-relaxed text-fg">{l(project.description)}</p>
      <dl className="mt-4">
        <Fact label={t('panel.genre')}>{l(project.genre)}</Fact>
        <Fact label={t('panel.engine')}>{project.engine === 'Unknown' ? <Missing /> : project.engine}</Fact>
        <Fact label={t('panel.status')}>{t(`status.${project.status}` as MessageKey)}</Fact>
        {project.period && <Fact label={t('panel.period')}>{project.period}</Fact>}
        <Fact label={t('panel.team')}>
          {project.team.kind === 'solo' ? t('team.solo') : project.team.kind === 'unknown' ? <Missing /> : [t('team.team'), project.team.name, project.team.size && t('team.members', { n: project.team.size })].filter(Boolean).join(' · ')}
        </Fact>
        {project.team.kind === 'team' && project.team.credits && <Fact label={t('panel.credits')}>{project.team.credits}</Fact>}
      </dl>

      {project.technologies.length > 0 && (
        <>
          <SectionTitle>{t('panel.stack')}</SectionTitle>
          <Chips items={project.technologies} />
        </>
      )}

      {project.features.length > 0 && (
        <>
          <SectionTitle>{t('panel.features')}</SectionTitle>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-fg marker:text-fg-2">
            {project.features.map((f) => (
              <li key={f.en}>{l(f)}</li>
            ))}
          </ul>
        </>
      )}

      <SectionTitle>{t('panel.contributions')}</SectionTitle>
      {project.contributions ? (
        <ul className="list-disc space-y-1 pl-5 text-[14px] text-fg marker:text-fg-2">
          {project.contributions.map((c) => (
            <li key={c.en}>{l(c)}</li>
          ))}
        </ul>
      ) : (
        <p className="text-[14px] text-fg-2">{t('panel.noContributions')}</p>
      )}

      <SectionTitle>{t('panel.links')}</SectionTitle>
      <ProjectLinks project={project} />
    </div>
  );
}

export function Missing() {
  const { t } = useT();
  return <span className="text-fg-2">{t('panel.missing')}</span>;
}
