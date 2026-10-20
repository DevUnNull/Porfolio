import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, MotionConfig } from 'motion/react';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { DetailsPanel } from '../projects/DetailsPanel';
import { ShareSheet, Toast } from '../shared/Overlays';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';

export const isFeedPath = (p: string) => p === '/' || p.startsWith('/@devunnull/video') || p === '/development' || p === '/skills';

export function AppLayout() {
  const { pathname } = useLocation();
  const onFeed = isFeedPath(pathname);
  const theme = useStore((s) => s.theme);
  const panelOpen = useStore((s) => Boolean(s.panel));
  const { t, lang } = useT();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The details panel belongs to the feed; leaving the feed closes it.
  useEffect(() => {
    if (!onFeed) useStore.getState().closePanel();
  }, [onFeed]);

  const sectionKey = onFeed ? (pathname.startsWith('/@devunnull/video') ? '/' : pathname) : pathname.split('/')[1] || '/';

  return (
    <MotionConfig reducedMotion="user">
      <div className="h-screen-safe overflow-hidden bg-bg text-fg">
        <a href="#main" className="sr-only z-[70] rounded bg-pink px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          {t('common.skip')}
        </a>
        <Sidebar />
        <main
          id="main"
          className={`h-full pb-[calc(var(--nav-h)+env(safe-area-inset-bottom))] transition-[padding] duration-300 md:pb-0 md:pl-[72px] lg:pl-[var(--sidebar-w)] ${
            onFeed && panelOpen ? 'md:pr-[min(440px,40vw)]' : ''
          } ${onFeed ? 'bg-black md:bg-bg' : ''}`}
        >
          <motion.div key={sectionKey} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
            <Outlet />
          </motion.div>
        </main>
        <MobileNavigation onFeed={onFeed} />
        <DetailsPanel />
        <ShareSheet />
        <Toast />
      </div>
    </MotionConfig>
  );
}
