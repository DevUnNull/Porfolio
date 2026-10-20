import { Copy, ExternalLink, Github, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Page } from '../components/layout/Page';
import { ItchIcon } from '../components/shared/Brand';
import { profile, social } from '../data/profile';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { useDocumentTitle } from '../hooks/useMisc';
import { copyText } from '../services/share';

export function Contact() {
  const { t, l } = useT();
  useDocumentTitle(t('contact.title'));
  const mailto = `mailto:${social.email}?subject=${encodeURIComponent(t('contact.subject'))}`;

  const links = [
    { href: social.github, label: 'GitHub', sub: 'github.com/DevUnNull', icon: <Github size={22} /> },
    { href: social.itch, label: 'itch.io', sub: 'devunnull.itch.io', icon: <ItchIcon size={22} /> },
    { href: social.portfolio, label: t('contact.oldPortfolio'), sub: 'devunnull.github.io/Online_Portfolio', icon: <Globe size={22} /> },
  ];

  return (
    <Page title={t('contact.title')}>
      <div className="flex items-center gap-4">
        <img src={profile.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-fg">{t('contact.title')}</h1>
          <p className="text-[15px] text-fg-2">
            {profile.realName} · {l(profile.location)}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-fg">{l(profile.seeking)}</p>

      <section className="mt-6 rounded-xl bg-surface p-5">
        <h2 className="text-[14px] font-semibold text-white/70">{t('contact.email')}</h2>
        <p className="mt-1 break-all text-[22px] font-bold text-white md:text-[26px]">{social.email}</p>
        <p className="mt-1 text-[14px] text-white/70">{t('contact.intro')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={mailto} className="inline-flex h-11 items-center gap-2 rounded-md bg-pink px-5 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98]">
            <Mail size={18} /> {t('contact.write')}
          </a>
          <button
            type="button"
            onClick={async () => useStore.getState().showToast((await copyText(social.email)) ? t('panel.copied') : t('share.failed'))}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-white/10 px-5 text-[15px] font-semibold text-white hover:bg-white/20"
          >
            <Copy size={18} /> {t('contact.copyEmail')}
          </button>
        </div>
      </section>

      <h2 className="mb-3 mt-10 text-[18px] font-bold text-fg">{t('contact.elsewhere')}</h2>
      <ul className="grid gap-2 sm:grid-cols-3">
        {links.map((x) => (
          <li key={x.href}>
            <a href={x.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-lg bg-chip p-4 transition hover:bg-chip-hover">
              <span className="text-fg">{x.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-fg">{x.label}</span>
                <span className="block truncate text-[13px] text-fg-2">{x.sub}</span>
              </span>
              <ExternalLink size={15} className="text-fg-2" />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[14px] text-fg-2">
        “{l(profile.quote)}” — <Link to="/@devunnull" className="font-semibold text-fg hover:underline">@devunnull</Link>
      </p>
    </Page>
  );
}

export function NotFound() {
  const { t } = useT();
  useDocumentTitle(t('notFound.title'));
  return (
    <Page title={t('notFound.title')}>
      <div className="py-20 text-center">
        <p className="text-[64px] font-extrabold tracking-[-0.04em] text-fg">404</p>
        <h1 className="mt-1 text-[22px] font-bold text-fg">{t('notFound.title')}</h1>
        <Link to="/" className="mt-5 inline-flex h-11 items-center rounded-md bg-pink px-5 font-semibold text-white hover:brightness-110">
          {t('notFound.back')}
        </Link>
      </div>
    </Page>
  );
}
