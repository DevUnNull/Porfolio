import { ExternalLink, Github } from 'lucide-react';
import type { CodeSample, TechnicalBreakdown as TB } from '../../data/types';
import { useT } from '../../i18n/useT';
import { CodeView } from '../shared/CodeView';
import { Chips, Fact, SectionTitle } from './ProjectDetails';

export function SampleBlock({ sample }: { sample: CodeSample }) {
  const { t, l } = useT();
  return (
    <figure className="mt-3">
      <figcaption className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[14px] font-semibold text-fg">{l(sample.title)}</span>
        <span className={`text-[12px] font-semibold ${sample.verified ? 'text-[#16a34a] dark:text-[#4ade80]' : 'text-fg-2'}`}>
          {sample.verified ? t('panel.verified') : t('panel.conceptual')}
        </span>
      </figcaption>
      <CodeView code={sample.code} file={sample.file} />
      {sample.url && (
        <a href={sample.url} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-fg-2 hover:text-fg hover:underline">
          <ExternalLink size={13} /> {t('panel.viewFile')}
        </a>
      )}
    </figure>
  );
}

export function TechnicalBreakdown({ breakdown, title, githubUrl }: { breakdown: TB; title: string; githubUrl?: string }) {
  const { t, l } = useT();
  return (
    <div>
      <h3 className="text-[18px] font-bold text-fg">
        {title} — {t('type.breakdown')}
      </h3>
      <dl className="mt-3">
        <Fact label={t('panel.system')}>{l(breakdown.system)}</Fact>
        <Fact label={t('nav.language')}>C#</Fact>
        <Fact label={t('panel.engine')}>Unity</Fact>
      </dl>
      <SectionTitle>{t('panel.concepts')}</SectionTitle>
      <Chips items={breakdown.concepts} />
      <SectionTitle>{t('panel.architecture')}</SectionTitle>
      <p className="text-[14px] leading-relaxed text-fg">{l(breakdown.architecture)}</p>
      <SectionTitle>{t('panel.challenges')}</SectionTitle>
      <div className="space-y-3">
        {breakdown.challenges.map((c) => (
          <div key={c.problem.en} className="rounded-lg bg-chip p-3 text-[14px]">
            <p>
              <span className="font-semibold text-fg">{t('panel.problem')}: </span>
              <span className="text-fg">{l(c.problem)}</span>
            </p>
            <p className="mt-1">
              <span className="font-semibold text-fg">{t('panel.solution')}: </span>
              <span className="text-fg">{l(c.solution)}</span>
            </p>
          </div>
        ))}
      </div>
      <SectionTitle>{t('panel.samples')}</SectionTitle>
      {breakdown.samples.map((s) => (
        <SampleBlock key={s.file + s.title.en} sample={s} />
      ))}
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-chip px-4 text-[15px] font-semibold text-fg hover:bg-chip-hover">
          <Github size={18} /> {t('panel.repo')}
        </a>
      )}
    </div>
  );
}
