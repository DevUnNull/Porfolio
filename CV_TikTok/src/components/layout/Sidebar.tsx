import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Clapperboard, Compass, Cpu, Gamepad2, Github, House, Languages, Mail, Moon, Search, Sun, UserCheck } from 'lucide-react';
import { useT } from '../../i18n/useT';
import { useStore } from '../../store/useStore';
import { profile, social } from '../../data/profile';
import { ItchIcon, Wordmark } from '../shared/Brand';
import type { MessageKey } from '../../i18n/en';

const items: { to: string; key: MessageKey; icon: typeof House; end?: boolean }[] = [
  { to: '/', key: 'nav.forYou', icon: House, end: true },
  { to: '/explore', key: 'nav.explore', icon: Compass },
  { to: '/following', key: 'nav.following', icon: UserCheck },
  { to: '/projects', key: 'nav.projects', icon: Gamepad2 },
  { to: '/development', key: 'nav.development', icon: Clapperboard },
  { to: '/skills', key: 'nav.skills', icon: Cpu },
];

/** Fixed left navigation. Full width from 1024px, icon rail from 768px. */
export function Sidebar() {
  const { t, lang } = useT();
  const theme = useStore((s) => s.theme);
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const onPost = useLocation().pathname.startsWith('/@devunnull/video');

  const row =
    'flex h-12 items-center gap-3 rounded-md px-2 text-[18px] font-bold transition-colors hover:bg-hover lg:px-2 justify-center lg:justify-start';

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[72px] flex-col bg-bg md:flex lg:w-[var(--sidebar-w)]">
      <div className="flex h-[72px] shrink-0 items-center justify-center px-4 lg:justify-start lg:px-6">
        <Link to="/" aria-label="UnNull Feed — For You" className="lg:hidden">
          <Wordmark compact />
        </Link>
        <Link to="/" aria-label="UnNull Feed — For You" className="hidden lg:block">
          <Wordmark />
        </Link>
      </div>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-2 lg:px-4">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/explore${q ? `?q=${encodeURIComponent(q)}` : ''}`);
          }}
          className="mb-2 hidden lg:block"
        >
          <label className="flex h-10 items-center gap-2 rounded-full bg-chip px-4 text-fg-2 focus-within:ring-1 focus-within:ring-fg-2/40">
            <Search size={18} className="shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('nav.searchPlaceholder')}
              aria-label={t('nav.search')}
              className="w-full bg-transparent text-[15px] text-fg placeholder:text-fg-2 focus:outline-none"
            />
          </label>
        </form>
        <Link to="/explore" aria-label={t('nav.search')} className={`${row} mb-1 lg:hidden`}>
          <Search size={26} />
        </Link>

        <nav className="flex flex-col">
          {items.map(({ to, key, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={t(key)}
              className={({ isActive }) => `${row} ${isActive || (to === '/' && onPost) ? 'text-pink' : 'text-fg'}`}
            >
              <Icon size={26} strokeWidth={2.2} className="shrink-0" />
              <span className="hidden truncate lg:inline">{t(key)}</span>
            </NavLink>
          ))}
          <NavLink to="/@devunnull" end title={t('nav.profile')} className={({ isActive }) => `${row} ${isActive ? 'text-pink' : 'text-fg'}`}>
            {({ isActive }) => (
              <>
                <img src={profile.avatar} alt="" className={`h-[26px] w-[26px] shrink-0 rounded-full object-cover ${isActive ? 'ring-2 ring-pink' : ''}`} />
                <span className="hidden lg:inline">{t('nav.profile')}</span>
              </>
            )}
          </NavLink>
        </nav>

        <div className="mt-auto pb-4 pt-6">
          <div className="mx-2 mb-3 hidden h-px bg-divider lg:block" />
          <div className="flex flex-col gap-0.5 text-fg">
            <a href={social.github} target="_blank" rel="noreferrer" className={`${row} !text-[15px] !font-semibold !h-10`} title="GitHub">
              <Github size={20} className="shrink-0" /> <span className="hidden lg:inline">GitHub</span>
            </a>
            <a href={social.itch} target="_blank" rel="noreferrer" className={`${row} !text-[15px] !font-semibold !h-10`} title="itch.io">
              <ItchIcon size={20} className="shrink-0" /> <span className="hidden lg:inline">itch.io</span>
            </a>
            <NavLink to="/contact" className={({ isActive }) => `${row} !text-[15px] !font-semibold !h-10 ${isActive ? 'text-pink' : ''}`} title={t('nav.contact')}>
              <Mail size={20} className="shrink-0" /> <span className="hidden lg:inline">{t('nav.contact')}</span>
            </NavLink>
            <button
              type="button"
              onClick={() => useStore.getState().setLang(lang === 'en' ? 'vi' : 'en')}
              className={`${row} !text-[15px] !font-semibold !h-10`}
              title={t('nav.language')}
            >
              <Languages size={20} className="shrink-0" />
              <span className="hidden flex-1 text-left lg:inline">{t('nav.language')}</span>
              <span className="hidden rounded bg-chip px-1.5 py-0.5 text-[12px] font-bold lg:inline">{lang === 'en' ? 'EN' : 'VI'}</span>
            </button>
            <button type="button" onClick={() => useStore.getState().toggleTheme()} className={`${row} !text-[15px] !font-semibold !h-10`} title={t('nav.theme')}>
              {theme === 'dark' ? <Moon size={20} className="shrink-0" /> : <Sun size={20} className="shrink-0" />}
              <span className="hidden flex-1 text-left lg:inline">{t('nav.theme')}</span>
              <span className="hidden text-[13px] font-semibold text-fg-2 lg:inline">{theme === 'dark' ? t('nav.themeDark') : t('nav.themeLight')}</span>
            </button>
          </div>
          <p className="mt-4 hidden px-2 text-[12px] leading-snug text-fg-2 lg:block">
            © 2026 DevUnNull
            <br />
            {t('nav.footer')}
          </p>
        </div>
      </div>
    </aside>
  );
}
