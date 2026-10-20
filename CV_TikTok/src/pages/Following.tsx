import { useMemo } from 'react';
import { Check, Plus } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { VideoGrid } from '../components/profile/VideoGrid';
import { posts } from '../data/posts';
import type { Category } from '../data/types';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { categories } from './Explore';
import type { MessageKey } from '../i18n/en';

/** Following = topics this visitor follows, stored locally. No fake accounts. */
export function Following() {
  const { t } = useT();
  const following = useStore((s) => s.following);
  useDocumentTitle(t('following.title'));
  const topics = categories.filter((c): c is Category => c !== 'all');
  const list = useMemo(() => posts.filter((p) => p.id !== 'skills' && p.categories.some((c) => following.includes(c))), [following]);

  const toggle = (c: Category) => {
    const name = t(`explore.cat.${c}` as MessageKey);
    const on = useStore.getState().toggleFollow(c);
    useStore.getState().showToast(on ? t('toast.followed', { name }) : t('toast.unfollowed', { name }));
  };

  return (
    <Page title={t('following.title')} wide>
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-fg">{t('following.title')}</h1>
      <p className="mt-1 text-[15px] text-fg-2">{t('following.intro')}</p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((c) => {
          const on = following.includes(c);
          const count = posts.filter((p) => p.categories.includes(c)).length;
          return (
            <li key={c} className="flex items-center justify-between gap-3 rounded-lg bg-chip p-3">
              <div>
                <p className="text-[15px] font-bold text-fg">#{t(`explore.cat.${c}` as MessageKey)}</p>
                <p className="text-[13px] text-fg-2">{count} posts</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(c)}
                aria-pressed={on}
                className={`inline-flex h-8 shrink-0 items-center gap-1 rounded-md px-3 text-[14px] font-semibold transition active:scale-95 ${on ? 'bg-chip-hover text-fg' : 'bg-pink text-white hover:brightness-110'}`}
              >
                {on ? <Check size={15} /> : <Plus size={15} />}
                {on ? t('following.following') : t('following.follow')}
              </button>
            </li>
          );
        })}
      </ul>

      <h2 className="mb-3 mt-10 text-[18px] font-bold text-fg">{t('following.feed')}</h2>
      {list.length ? <VideoGrid posts={list} showCaption /> : <p className="py-10 text-center text-[15px] text-fg-2">{t('following.empty')}</p>}
    </Page>
  );
}
