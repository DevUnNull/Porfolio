import type { L } from './types';
import { asset } from '../services/asset';

// Facts below come from github.com/DevUnNull, devunnull.itch.io and the
// existing portfolio (devunnull.github.io/Online_Portfolio). See ASSET_SOURCES.md.
export const profile = {
  displayName: 'DevUnNull',
  handle: 'devunnull',
  realName: 'Nguyễn Mai Ngọc Hải',
  avatar: asset('assets/profile/avatar.png'),
  tagline: {
    en: "I don't just write code. I build worlds.",
    vi: 'Tôi không chỉ viết code. Tôi xây dựng thế giới.',
  } satisfies L,
  profileTagline: {
    en: 'Building worlds, one line of code at a time.',
    vi: 'Xây dựng thế giới, từng dòng code một.',
  } satisfies L,
  bio: [
    { en: 'Unity Game Developer', vi: 'Lập trình viên game Unity' },
    { en: 'Gameplay Programmer', vi: 'Lập trình viên gameplay' },
    { en: 'C# • Unity • Game Systems', vi: 'C# • Unity • Game Systems' },
  ] satisfies L[],
  studio: {
    name: 'SSS (Super Startup Simulator)',
    role: { en: 'CEO & Co-Founder', vi: 'CEO & Đồng sáng lập' },
    about: {
      en: 'Independent game studio and technology team based in Vietnam: creative simulation, psychological horror, interactive entertainment and game outsourcing.',
      vi: 'Studio game độc lập và đội công nghệ tại Việt Nam: mô phỏng sáng tạo, kinh dị tâm lý, giải trí tương tác và gia công game.',
    } satisfies L,
    logo: asset('assets/profile/sss-logo.webp'),
  },
  education: { en: 'FPT University', vi: 'Đại học FPT' } satisfies L,
  internship: {
    en: 'Unity Developer Intern, DXLab at FPT University (01/2026 – 04/2026)',
    vi: 'Thực tập sinh Unity Developer, DXLab – Đại học FPT (01/2026 – 04/2026)',
  } satisfies L,
  quote: {
    en: 'The best gameplay systems are invisible — players feel them without seeing them.',
    vi: 'Hệ thống gameplay tốt nhất là vô hình — người chơi cảm nhận được mà không nhìn thấy.',
  } satisfies L,
  seeking: {
    en: 'Open to game development internships, indie game jam teams and gameplay programming collaborations.',
    vi: 'Đang tìm cơ hội thực tập phát triển game, đội game jam indie và hợp tác lập trình gameplay.',
  } satisfies L,
  location: { en: 'Vietnam', vi: 'Việt Nam' } satisfies L,
  /** Snapshot from the GitHub API; update when the profile changes. */
  publicRepos: 35,
  publicReposAsOf: '2026-10-20',
};

export const social = {
  email: 'hai23092003@gmail.com',
  github: 'https://github.com/DevUnNull',
  itch: 'https://devunnull.itch.io/',
  portfolio: 'https://devunnull.github.io/Online_Portfolio/',
};
