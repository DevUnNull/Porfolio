import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { ProjectDetails, ProjectLinks } from '../components/projects/ProjectDetails';
import { TechnicalBreakdown } from '../components/projects/TechnicalBreakdown';
import { VideoGrid } from '../components/profile/VideoGrid';
import { LogoMark } from '../components/shared/Brand';
import { projects, projectById } from '../data/projects';
import { postsForProject } from '../data/posts';
import type { Project } from '../data/types';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { metaLine } from '../services/projectMeta';

function Cover({ project, className = '' }: { project: Project; className?: string }) {
  return project.thumbnail ? (
    <img src={project.thumbnail} alt={`${project.title} cover`} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`grid h-full w-full place-items-center bg-surface ${className}`}>
      <span className="flex items-center gap-2 text-[28px] font-extrabold tracking-[-0.03em] text-white">
        <LogoMark size={28} /> {project.title}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, l } = useT();
  return (
    <article className="group">
      <Link to={`/projects/${project.slug}`} className="block overflow-hidden rounded-lg bg-surface">
        <div className="aspect-video overflow-hidden">
          <Cover project={project} className="transition duration-300 group-hover:scale-[1.03]" />
        </div>
      </Link>
      <div className="pt-3">
        <h3 className="text-[18px] font-bold leading-tight text-fg">
          <Link to={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-0.5 text-[14px] text-fg-2">
          {l(project.genre)} · {metaLine(project, t)}
        </p>
        <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-fg">{l(project.description)}</p>
        <div className="mt-3">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useT();
  useDocumentTitle(t('projects.title'));
  const credited = (p: Project) => p.team.kind !== 'team' || p.contributions !== null || p.id === 'call-out-my-cell';
  const games = projects.filter((p) => p.categories.includes('games') && p.status !== 'tool' && credited(p));
  const tools = projects.filter((p) => p.status === 'tool');
  const studio = projects.filter((p) => p.categories.includes('games') && !credited(p));

  return (
    <Page title={t('projects.title')} wide>
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-fg md:text-[32px]">{t('projects.title')}</h1>
      <p className="mt-1 text-[15px] text-fg-2">{t('projects.intro')}</p>

      <section className="mt-8">
        <h2 className="mb-4 text-[20px] font-bold text-fg">{t('projects.games')}</h2>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {games.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-[20px] font-bold text-fg">{t('projects.tools')}</h2>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {studio.length > 0 && (
        <section className="mt-14">
          <h2 className="text-[20px] font-bold text-fg">{t('projects.studio')}</h2>
          <p className="mb-4 mt-1 text-[14px] text-fg-2">{t('projects.studioNote')}</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {studio.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = projectById(slug);
  const { t } = useT();
  useDocumentTitle(project?.title ?? t('projects.notFound'));

  if (!project) {
    return (
      <Page title={t('projects.notFound')} back>
        <h1 className="text-[22px] font-bold">{t('projects.notFound')}</h1>
        <Link to="/projects" className="mt-3 inline-block font-semibold text-pink hover:underline">
          {t('projects.back')}
        </Link>
      </Page>
    );
  }

  const related = postsForProject(project.id);

  return (
    <Page title={project.title} back>
      <Link to="/projects" className="mb-4 hidden items-center gap-1.5 text-[14px] font-semibold text-fg-2 hover:text-fg md:inline-flex">
        <ArrowLeft size={16} /> {t('projects.back')}
      </Link>
      <div className="aspect-video overflow-hidden rounded-xl bg-surface">
        <Cover project={project} />
      </div>
      <h1 className="mt-5 text-[28px] font-bold leading-tight tracking-[-0.02em] text-fg md:text-[34px]">{project.title}</h1>
      <p className="mb-5 mt-1 text-[15px] text-fg-2">{metaLine(project, t)}</p>
      <ProjectDetails project={project} />

      {project.breakdown && (
        <section className="mt-10">
          <TechnicalBreakdown breakdown={project.breakdown} title={project.title} githubUrl={project.githubUrl} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-[18px] font-bold text-fg">{t('projects.posts')}</h2>
          <VideoGrid posts={related} />
        </section>
      )}
    </Page>
  );
}
