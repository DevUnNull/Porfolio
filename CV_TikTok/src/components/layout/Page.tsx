import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollMemory } from '../../hooks/useMisc';
import { useT } from '../../i18n/useT';

/** Scrollable page shell with a sticky phone header; remembers its scroll position. */
export function Page({
  title,
  back = false,
  children,
  wide = false,
  scrollKey,
}: {
  title: string;
  back?: boolean;
  children: React.ReactNode;
  wide?: boolean;
  scrollKey?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { t } = useT();
  useScrollMemory(ref, scrollKey ?? pathname + search);
  return (
    <div ref={ref} className="h-full overflow-y-auto">
      <header className="sticky top-0 z-20 flex h-12 items-center gap-2 bg-bg px-2 md:hidden">
        {back && (
          <button type="button" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))} aria-label={t('player.back')} className="grid h-10 w-10 place-items-center rounded-full text-fg hover:bg-hover">
            <ArrowLeft size={22} />
          </button>
        )}
        <p className={`flex-1 truncate text-[17px] font-bold text-fg ${back ? '' : 'pl-2'}`}>{title}</p>
      </header>
      <div className={`mx-auto w-full px-4 pb-16 pt-2 md:px-8 md:pt-8 ${wide ? 'max-w-[1240px]' : 'max-w-[920px]'}`}>{children}</div>
    </div>
  );
}
