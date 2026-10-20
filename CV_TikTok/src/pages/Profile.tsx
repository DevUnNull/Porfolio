import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bookmark, Clapperboard, Code2, ExternalLink, Gamepad2, Github, Link2, Lock, Share2 } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { VideoGrid } from '../components/profile/VideoGrid';
import { ItchIcon } from '../components/shared/Brand';
import { profile, social } from '../data/profile';
import { posts, postById } from '../data/posts';
import { projects } from '../data/projects';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { canNativeShare, copyText, siteUrl } from '../services/share';
import type { Post } from '../data/types';

type Tab = 'games' | 'code' | 'development' | 'saved';

/** Selected public repositories, checked against the GitHub API on 2026-10-20. */
const repos = [
  { name: 'Jungle', lang: 'C#', note: { en: 'Source of Lost in the Jungle', vi: 'Mã nguồn Lost in the Jungle' } },
  { name: 'Object-Pool_Unity', lang: 'C#', note: { en: 'Reusable object pool package', vi: 'Package object pool tái sử dụng' } },
  { name: 'EchoArea', lang: 'C#', note: { en: 'Voice-controlled MOBA prototype with a state machine', vi: 'Prototype MOBA điều khiển bằng giọng nói, có state machine' } },
  { name: 'Mallow', lang: 'C#', note: { en: 'Runner with pets, skins, shop and rewards', vi: 'Runner có pet, skin, cửa hàng và phần thưởng' } },
  { name: 'Last-Day-Survivor', lang: 'C#', note: { en: 'Survivor-like with spells, EXP and level-up UI', vi: 'Survivor-like với phép thuật, EXP và UI lên cấp' } },
  { name: 'HOME-RUSH', lang: 'C#', note: { en: 'Unity project set up with Photon Fusion', vi: 'Dự án Unity cài Photon Fusion' } },
  { name: 'LIARS-CARD-', lang: 'C#', note: { en: 'Card game: ASP.NET server + LiteNetLib client', vi: 'Game bài: server ASP.NET + client LiteNetLib' } },
];

export function Profile() {
  const { t, l } = useT();
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab | null) ?? 'games';
  const saves = useStore((s) => s.saves);
  useDocumentTitle('DevUnNull (@devunnull)');

  const games = projects.filter((p) => p.categories.includes('games'));
  // Released games DevUnNull is credited on (studio titles with no documented role are left out).
  const released = games.filter((p) => p.status === 'released' && (p.team.kind !== 'team' || p.contributions)).length;
  const playable = projects.filter((p) => p.web).length;

  const gamePosts = posts.filter((p) => ['gameplay', 'poster', 'team'].includes(p.type) && p.projectId);
  const codePosts = posts.filter((p) => p.media.kind === 'code' || p.type === 'breakdown');
  const devPosts = posts.filter((p) => p.feeds.includes('development'));
  const savedPosts = saves.map((id) => postById(id)).filter(Boolean) as Post[];

  const tabs: { id: Tab; label: string; icon: typeof Gamepad2 }[] = [
    { id: 'games', label: t('profile.games'), icon: Gamepad2 },
    { id: 'code', label: t('profile.code'), icon: Code2 },
    { id: 'development', label: t('profile.development'), icon: Clapperboard },
    { id: 'saved', label: t('profile.saved'), icon: Bookmark },
  ];

  const shareProfile = async () => {
    const url = siteUrl('/@devunnull');
    if (canNativeShare()) {
      try {
        await navigator.share({ title: 'DevUnNull', url });
        return;
      } catch {
        /* dismissed: fall back to copy */
      }
    }
    useStore.getState().showToast((await copyText(url)) ? t('share.copied') : t('share.failed'));
  };

  return (
    <Page title="DevUnNull" wide scrollKey="profile">
      <section className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-7 md:text-left">
        <img src={profile.avatar} alt="DevUnNull" className="h-24 w-24 shrink-0 rounded-full object-cover md:h-[116px] md:w-[116px]" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:gap-3">
            <h1 className="text-[24px] font-bold leading-tight text-fg md:text-[28px]">{profile.displayName}</h1>
            <p className="text-[16px] font-semibold text-fg-2">@{profile.handle}</p>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            <Link to="/contact" className="inline-flex h-9 items-center rounded-md bg-pink px-6 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98]">
              {t('profile.contact')}
            </Link>
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-md bg-chip text-fg hover:bg-chip-hover">
              <Github size={18} />
            </a>
            <a href={social.itch} target="_blank" rel="noreferrer" aria-label="itch.io" className="grid h-9 w-9 place-items-center rounded-md bg-chip text-fg hover:bg-chip-hover">
              <ItchIcon size={18} />
            </a>
            <button type="button" onClick={shareProfile} aria-label={t('profile.share')} className="grid h-9 w-9 place-items-center rounded-md bg-chip text-fg hover:bg-chip-hover">
              <Share2 size={18} />
            </button>
          </div>

          {/* Real portfolio figures in place of follower counts. */}
          <dl className="mt-4 flex justify-center gap-6 md:justify-start md:gap-5">
            {[
              [released, t('profile.statGames')],
              [playable, t('profile.statPlayable')],
              [profile.publicRepos, t('profile.statRepos')],
            ].map(([n, label]) => (
              <div key={String(label)} className="flex flex-col items-center md:flex-row md:items-baseline md:gap-1.5">
                <dt className="sr-only">{label}</dt>
                <dd className="text-[18px] font-bold text-fg">{n}</dd>
                <span className="text-[13px] text-fg-2 md:text-[15px]">{label}</span>
              </div>
            ))}
          </dl>

          <div className="mt-3 space-y-0.5 text-[15px] text-fg">
            {profile.bio.map((b) => (
              <p key={b.en}>{l(b)}</p>
            ))}
            <p className="text-fg-2">“{l(profile.profileTagline)}”</p>
            <p className="pt-1 text-[14px] text-fg-2">
              {t('profile.studio')}: {profile.studio.name} — {l(profile.studio.role)}
            </p>
          </div>
          <a href={social.portfolio} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-fg hover:underline">
            <Link2 size={15} /> devunnull.github.io/Online_Portfolio
          </a>
        </div>
      </section>

      <div className="sticky top-12 z-10 -mx-4 mt-6 bg-bg md:top-0 md:mx-0" role="tablist">
        <div className="flex">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                const next = new URLSearchParams(params);
                if (id === 'games') next.delete('tab');
                else next.set('tab', id);
                setParams(next, { replace: true });
              }}
              className={`relative flex h-11 flex-1 items-center justify-center gap-1.5 text-[16px] font-semibold transition-colors md:w-[160px] md:flex-none ${tab === id ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
            >
              {id === 'saved' ? <Lock size={14} /> : <Icon size={16} className="hidden md:block" />}
              {label}
              {tab === id && <motion.span layoutId="profile-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-fg" />}
            </button>
          ))}
        </div>
        <div className="h-px bg-divider" />
      </div>

      <div className="mt-3">
        {tab === 'games' && <VideoGrid posts={gamePosts} from="/@devunnull" />}
        {tab === 'code' && (
          <>
            <VideoGrid posts={codePosts} from="/@devunnull?tab=code" />
            <h2 className="mt-8 text-[18px] font-bold text-fg">{t('profile.repos')}</h2>
            <p className="mt-1 text-[13px] text-fg-2">{t('profile.reposNote', { date: profile.publicReposAsOf })}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {repos.map((r) => (
                <li key={r.name}>
                  <a
                    href={`${social.github}/${r.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-lg bg-chip p-3 transition hover:bg-chip-hover"
                  >
                    <Github size={18} className="mt-0.5 shrink-0 text-fg-2" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold text-fg">{r.name}</span>
                      <span className="block text-[13px] text-fg-2">{l(r.note)}</span>
                    </span>
                    <span className="shrink-0 text-[12px] font-semibold text-fg-2">{r.lang}</span>
                    <ExternalLink size={14} className="mt-1 shrink-0 text-fg-2 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        {tab === 'development' && <VideoGrid posts={devPosts} from="/@devunnull?tab=development" />}
        {tab === 'saved' &&
          (savedPosts.length ? (
            <VideoGrid posts={savedPosts} from="/@devunnull?tab=saved" />
          ) : (
            <div className="py-16 text-center">
              <Bookmark size={40} className="mx-auto text-fg-2" />
              <p className="mt-3 text-[15px] text-fg-2">{t('profile.savedEmpty')}</p>
            </div>
          ))}
      </div>
    </Page>
  );
}
