import { Link, useParams } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { GamePlayer } from '../components/projects/GamePlayer';
import { projectById } from '../data/projects';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { metaLine } from '../services/projectMeta';

export function Play() {
  const { slug } = useParams();
  const project = projectById(slug);
  const { t, l } = useT();
  useDocumentTitle(project ? t('player.title', { title: project.title }) : t('projects.notFound'));

  if (!project) {
    return (
      <Page title={t('projects.notFound')} back>
        <h1 className="text-[22px] font-bold">{t('projects.notFound')}</h1>
      </Page>
    );
  }

  return (
    <Page title={project.title} back wide>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-[24px] font-bold leading-tight text-fg md:text-[28px]">{t('player.title', { title: project.title })}</h1>
          <p className="text-[14px] text-fg-2">{metaLine(project, t)}</p>
        </div>
        <Link to={`/projects/${project.slug}`} className="text-[14px] font-semibold text-fg-2 hover:text-fg hover:underline">
          {t('panel.openProject')} →
        </Link>
      </div>

      {project.web ? (
        <GamePlayer project={project} />
      ) : (
        <div className="rounded-xl bg-surface p-6 text-center md:p-10">
          {project.thumbnail && <img src={project.thumbnail} alt="" className="mx-auto mb-5 aspect-video w-full max-w-[560px] rounded-lg object-cover" />}
          <p className="text-[17px] font-semibold text-white">{project.status === 'in-development' ? t('player.unreleased') : t('player.notWeb')}</p>
          <p className="mx-auto mt-2 max-w-[56ch] text-[14px] text-white/75">{l(project.description)}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {project.download && project.itchUrl && (
              <a href={project.itchUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md bg-pink px-5 text-[15px] font-semibold text-white hover:brightness-110">
                <Download size={18} /> {t('player.downloadOn', { file: project.download.file, size: project.download.size })}
              </a>
            )}
            {!project.download && project.itchUrl && (
              <a href={project.itchUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md bg-pink px-5 text-[15px] font-semibold text-white hover:brightness-110">
                <ExternalLink size={18} /> {t('player.openItch')}
              </a>
            )}
          </div>
        </div>
      )}
    </Page>
  );
}
