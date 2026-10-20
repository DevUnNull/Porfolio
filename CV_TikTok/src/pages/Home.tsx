import { useCallback, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import type { FeedId, Post } from '../data/types';
import { feedPosts, postById } from '../data/posts';
import { VideoFeed } from '../components/feed/VideoFeed';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { projectOf } from '../services/content';
import { postPath } from '../services/share';
import type { MessageKey } from '../i18n/en';

const tabs: { to: string; key: MessageKey }[] = [
  { to: '/skills', key: 'nav.skills' },
  { to: '/development', key: 'nav.development' },
  { to: '/', key: 'nav.forYou' },
];

const feedTitle: Record<FeedId, MessageKey> = { 'for-you': 'nav.forYou', development: 'nav.development', skills: 'nav.skills' };

/** Feeds: For You, Development, Skills, and direct post links. */
export function FeedPage({ feed }: { feed: FeedId }) {
  const { postId } = useParams();
  const { t, l } = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const fromGrid = Boolean((location.state as { from?: string } | null)?.from);
  const isPostRoute = Boolean(postId);

  // A direct link opens the feed that contains the post.
  const requested = postId ? postById(postId) : undefined;
  const effectiveFeed: FeedId = requested && !requested.feeds.includes(feed) ? requested.feeds[0] : feed;
  const posts = useMemo(() => feedPosts(effectiveFeed), [effectiveFeed]);

  const activeTitle = requested ? (projectOf(requested)?.title ?? l(requested.caption).slice(0, 48)) : t(feedTitle[feed]);
  useDocumentTitle(isPostRoute ? activeTitle : feed === 'for-you' ? '' : t(feedTitle[feed]));

  // Keep the address bar on the visible post, without re-rendering the router.
  const onActiveChange = useCallback(
    (post: Post) => {
      if (!isPostRoute) return;
      const url = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${postPath(post.id)}`;
      if (window.location.pathname !== url) window.history.replaceState(window.history.state, '', url);
      const p = projectOf(post);
      document.title = `${p?.title ?? 'DevUnNull'} · UnNull Feed`;
    },
    [isPostRoute],
  );

  if (postId && !requested) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <h1 className="text-[22px] font-bold">{t('notFound.title')}</h1>
          <Link to="/" className="mt-3 inline-block rounded-md bg-pink px-4 py-2 font-semibold text-white">
            {t('notFound.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full [--nav-h:0px]">
      <h1 className="sr-only">
        UnNull Feed — {t(feedTitle[effectiveFeed])}
      </h1>

      {/* Phone top bar over the video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between px-2 pt-[env(safe-area-inset-top)] md:hidden">
        <div className="pointer-events-auto w-10">
          {fromGrid && (
            <button type="button" onClick={() => navigate(-1)} aria-label={t('feed.close')} className="icon-on-video grid h-10 w-10 place-items-center text-white">
              <X size={26} />
            </button>
          )}
        </div>
        <nav className="no-scrollbar pointer-events-auto flex gap-4 overflow-x-auto px-1" aria-label="Feeds">
          {tabs.map((tb) => (
            <NavLink
              key={tb.to}
              to={tb.to}
              end
              className={({ isActive }) =>
                `on-video relative whitespace-nowrap py-2 text-[16px] font-bold transition-colors ${
                  isActive || (tb.to === '/' && isPostRoute && effectiveFeed === 'for-you') ? 'text-white after:absolute after:inset-x-1/4 after:bottom-0.5 after:h-[3px] after:rounded-full after:bg-white' : 'text-white/65'
                }`
              }
            >
              {t(tb.key)}
            </NavLink>
          ))}
        </nav>
        <Link to="/explore" aria-label={t('nav.search')} className="icon-on-video pointer-events-auto grid h-10 w-10 place-items-center text-white">
          <Search size={24} />
        </Link>
      </div>

      {/* Desktop close button when the feed was opened from a grid */}
      {fromGrid && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={t('feed.close')}
          className="absolute left-5 top-5 z-20 hidden h-10 w-10 place-items-center rounded-full bg-chip text-fg transition hover:bg-chip-hover md:grid"
        >
          <X size={22} />
        </button>
      )}

      <VideoFeed posts={posts} initialId={requested?.id} onActiveChange={onActiveChange} />
    </div>
  );
}
