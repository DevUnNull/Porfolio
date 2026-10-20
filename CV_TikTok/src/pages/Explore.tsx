import { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, UserCheck, X } from 'lucide-react';
import { posts } from '../data/posts';
import type { Category } from '../data/types';
import { Page } from '../components/layout/Page';
import { VideoGrid } from '../components/profile/VideoGrid';
import { useT } from '../i18n/useT';
import { useDocumentTitle, useIsDesktop } from '../hooks/useMisc';
import { matches, postDate, projectOf } from '../services/content';
import type { MessageKey } from '../i18n/en';

export const categories: ('all' | Category)[] = ['all', 'games', 'unity', 'csharp', 'gameplay', 'multiplayer', 'systems', 'development'];
type Sort = 'featured' | 'newest' | 'az';

export function Explore() {
  const { t, l } = useT();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const cat = (params.get('cat') as Category | null) ?? 'all';
  const sort = (params.get('sort') as Sort | null) ?? 'featured';
  const input = useRef<HTMLInputElement>(null);
  const desktop = useIsDesktop();
  useDocumentTitle(q ? `${t('explore.title')}: ${q}` : t('explore.title'));

  useEffect(() => {
    if (desktop && !q) input.current?.focus();
    // Focus only when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all' && !(key === 'sort' && value === 'featured')) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const list = posts.filter((p) => p.id !== 'skills' && (cat === 'all' || p.categories.includes(cat)) && matches(p, q));
    if (sort === 'newest') return [...list].sort((a, b) => postDate(b).localeCompare(postDate(a)));
    if (sort === 'az') {
      const name = (p: (typeof list)[number]) => projectOf(p)?.title ?? l(p.caption);
      return [...list].sort((a, b) => name(a).localeCompare(name(b)));
    }
    return list;
  }, [cat, q, sort, l]);

  return (
    <Page title={t('explore.title')} wide>
      <h1 className="sr-only">{t('explore.title')}</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="sticky top-12 z-10 -mx-4 bg-bg px-4 pb-2 pt-1 md:static md:mx-0 md:px-0">
        <label className="flex h-11 items-center gap-2 rounded-lg bg-chip px-3 text-fg-2 focus-within:ring-1 focus-within:ring-fg-2/50">
          <Search size={20} className="shrink-0" />
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => set('q', e.target.value)}
            placeholder={t('explore.placeholder')}
            aria-label={t('nav.search')}
            className="w-full bg-transparent text-[16px] text-fg placeholder:text-fg-2 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <button type="button" onClick={() => set('q', null)} aria-label={t('explore.clear')} className="grid h-7 w-7 place-items-center rounded-full bg-chip-hover text-fg">
              <X size={14} />
            </button>
          )}
        </label>
      </form>

      <div className="mt-3 flex items-center gap-3">
        <div className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              onClick={() => set('cat', c)}
              className={`h-8 shrink-0 rounded-md px-3 text-[14px] font-semibold transition-colors ${cat === c ? 'bg-fg text-bg' : 'bg-chip text-fg hover:bg-chip-hover'}`}
            >
              {t(`explore.cat.${c}` as MessageKey)}
            </button>
          ))}
        </div>
        <Link to="/following" aria-label={t('nav.following')} className="flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-chip px-3 text-[14px] font-semibold text-fg hover:bg-chip-hover">
          <UserCheck size={16} /> <span className="hidden sm:inline">{t('nav.following')}</span>
        </Link>
      </div>

      <div className="mb-4 mt-4 flex items-center justify-between">
        <p className="text-[14px] text-fg-2" aria-live="polite">
          {t('explore.results', { n: results.length })}
        </p>
        <label className="flex items-center gap-2 text-[14px] text-fg-2">
          {t('explore.sort')}
          <select
            value={sort}
            onChange={(e) => set('sort', e.target.value)}
            className="h-8 rounded-md bg-chip px-2 text-[14px] font-semibold text-fg focus:outline-none [&>option]:bg-panel"
          >
            <option value="featured">{t('explore.sort.featured')}</option>
            <option value="newest">{t('explore.sort.newest')}</option>
            <option value="az">{t('explore.sort.az')}</option>
          </select>
        </label>
      </div>

      {results.length ? (
        <VideoGrid posts={results} showCaption />
      ) : (
        <div className="py-16 text-center">
          <p className="text-[16px] font-semibold text-fg">{t('explore.none', { q })}</p>
          <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 rounded-md bg-chip px-4 py-2 text-[14px] font-semibold text-fg hover:bg-chip-hover">
            {t('explore.clear')}
          </button>
        </div>
      )}
    </Page>
  );
}
