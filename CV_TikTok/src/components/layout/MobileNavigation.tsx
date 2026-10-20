import { NavLink, useLocation } from 'react-router-dom';
import { Compass, Gamepad2, House, Mail } from 'lucide-react';
import { useT } from '../../i18n/useT';
import { profile } from '../../data/profile';

/** TikTok-style bottom bar: Home, Explore, the centre button, Contact, Profile. */
export function MobileNavigation({ onFeed }: { onFeed: boolean }) {
  const { t } = useT();
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname.startsWith('/@devunnull/video') || pathname === '/development' || pathname === '/skills';
  const tab = 'flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold';
  const dark = onFeed;
  const idle = dark ? 'text-white/70' : 'text-fg-2';
  const on = dark ? 'text-white' : 'text-fg';

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 flex pb-[env(safe-area-inset-bottom)] md:hidden ${dark ? 'bg-black' : 'border-t border-divider bg-bg'}`}
      aria-label="Main"
    >
      <div className="flex h-[var(--nav-h)] w-full items-stretch">
        <NavLink to="/" className={`${tab} ${isHome ? on : idle}`}>
          <House size={26} strokeWidth={isHome ? 2.6 : 2} className={isHome ? 'fill-current' : ''} />
          {t('nav.home')}
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => `${tab} ${isActive ? on : idle}`}>
          <Compass size={26} strokeWidth={2} />
          {t('nav.explore')}
        </NavLink>
        <NavLink to="/projects" aria-label={t('nav.projects')} className="flex flex-1 items-center justify-center">
          <span className="relative block h-8 w-12">
            <span className="absolute inset-y-0 left-0 w-11 rounded-lg bg-cyan" />
            <span className="absolute inset-y-0 right-0 w-11 rounded-lg bg-pink" />
            <span className={`absolute inset-y-0 left-1/2 grid w-10 -translate-x-1/2 place-items-center rounded-lg ${dark ? 'bg-white text-black' : 'bg-fg text-bg'}`}>
              <Gamepad2 size={20} strokeWidth={2.6} />
            </span>
          </span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `${tab} ${isActive ? on : idle}`}>
          <Mail size={26} strokeWidth={2} />
          {t('nav.contact')}
        </NavLink>
        <NavLink to="/@devunnull" end className={({ isActive }) => `${tab} ${isActive ? on : idle}`}>
          {({ isActive }) => (
            <>
              <img src={profile.avatar} alt="" className={`h-[26px] w-[26px] rounded-full object-cover ${isActive ? 'ring-2 ring-current' : ''}`} />
              {t('nav.profile')}
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
