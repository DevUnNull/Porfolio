import type { Post, FeedId } from './types';
import { projectById } from './projects';
import { skills, skillById } from './skills';
import { asset } from '../services/asset';

// Feed entries in For You order. Media priority: the developer's own gameplay
// video, then real screenshots/covers, then a code card from public source.

const sample = (projectId: string, i = 0) => projectById(projectId)!.breakdown!.samples[i];
const yt = (id: string) => asset(`assets/thumbnails/yt-${id}.jpg`);

const basePosts: Post[] = [
  {
    id: 'intro',
    type: 'intro',
    media: { kind: 'intro' },
    caption: {
      en: "Hi, I'm UnNull — Unity game developer from Vietnam. Scroll to discover my work.",
      vi: 'Xin chào, mình là UnNull — lập trình viên game Unity đến từ Việt Nam. Lướt để xem các dự án.',
    },
    tags: ['Unity', 'CSharp', 'GameDev'],
    categories: ['unity', 'csharp'],
    feeds: ['for-you'],
  },
  {
    id: 'hero-defense',
    type: 'gameplay',
    projectId: 'hero-defense',
    media: { kind: 'youtube', id: 'Rm03AIO-GHY', poster: yt('Rm03AIO-GHY'), aspect: 16 / 9 },
    caption: {
      en: 'Building a tower defense game with Unity and C#. Explore how gameplay systems come together.',
      vi: 'Làm game tower defense bằng Unity và C#. Xem các hệ thống gameplay kết hợp với nhau thế nào.',
    },
    tags: ['TowerDefense', 'Unity', 'CSharp', 'WaveSystem'],
    categories: ['games', 'unity', 'gameplay', 'systems'],
    feeds: ['for-you'],
  },
  {
    id: 'call-out-my-cell',
    type: 'poster',
    projectId: 'call-out-my-cell',
    media: {
      kind: 'gallery',
      items: [
        { src: asset('assets/games/call-out-my-cell/cover.jpg'), aspect: 2842 / 1588, alt: { en: 'Call Out My Cell cover art', vi: 'Ảnh bìa Call Out My Cell' } },
        { src: asset('assets/games/call-out-my-cell/shot-1.jpg'), aspect: 794 / 442, alt: { en: 'Call Out My Cell screenshot 1', vi: 'Ảnh chụp Call Out My Cell 1' } },
        { src: asset('assets/games/call-out-my-cell/shot-2.jpg'), aspect: 794 / 442, alt: { en: 'Call Out My Cell screenshot 2', vi: 'Ảnh chụp Call Out My Cell 2' } },
        { src: asset('assets/games/call-out-my-cell/shot-3.jpg'), aspect: 794 / 419, alt: { en: 'Call Out My Cell screenshot 3', vi: 'Ảnh chụp Call Out My Cell 3' } },
      ],
    },
    caption: {
      en: "Your daily choices affect your body's ability to fight infection. Five lanes, immune cells, enemy waves.",
      vi: 'Lựa chọn hằng ngày quyết định khả năng chống nhiễm trùng của cơ thể. 5 lane, tế bào miễn dịch, wave mầm bệnh.',
    },
    tags: ['TowerDefense', 'TeamProject', 'InDevelopment'],
    categories: ['games', 'gameplay', 'development'],
    feeds: ['for-you'],
  },
  {
    id: 'lost-in-the-jungle',
    type: 'gameplay',
    projectId: 'lost-in-the-jungle',
    media: { kind: 'youtube', id: '3jibVCOz_Oc', poster: yt('3jibVCOz_Oc'), aspect: 16 / 9 },
    caption: {
      en: 'Dash, double jump, survive, and upgrade your abilities in a mysterious jungle.',
      vi: 'Dash, nhảy đôi, sinh tồn và nâng cấp kỹ năng trong khu rừng bí ẩn.',
    },
    tags: ['Platformer', 'Unity2D', 'CSharp', 'Roguelite'],
    categories: ['games', 'unity', 'gameplay'],
    feeds: ['for-you'],
  },
  {
    id: 'jungle-upgrade-system',
    type: 'breakdown',
    projectId: 'lost-in-the-jungle',
    media: { kind: 'code', sample: sample('lost-in-the-jungle', 0), poster: asset('assets/games/lost-in-the-jungle/itch-cover.jpg') },
    caption: {
      en: 'How the level-up screen picks 3 random upgrades: data → factory → one IUpgrade interface. Real code from the repo.',
      vi: 'Màn lên cấp chọn 3 nâng cấp ngẫu nhiên thế nào: data → factory → một interface IUpgrade. Code thật từ repo.',
    },
    tags: ['FactoryPattern', 'StrategyPattern', 'CSharp'],
    categories: ['csharp', 'systems', 'unity'],
    feeds: ['for-you', 'skills'],
  },
  {
    id: 'behind-the-mask',
    type: 'team',
    projectId: 'behind-the-mask',
    media: { kind: 'youtube', id: 'GHNWE27c4rQ', poster: asset('assets/games/other-projects/behind-the-mask.webp'), aspect: 16 / 9 },
    caption: {
      en: 'Global Game Jam 2026, 36 hours, team of five. Mask on: bright but narrow. Mask off: the truth, and the anxiety.',
      vi: 'Global Game Jam 2026, 36 giờ, đội 5 người. Đeo mặt nạ: sáng nhưng hẹp. Tháo ra: sự thật và nỗi lo âu.',
    },
    tags: ['GameJam', 'GGJ2026', 'Horror', 'TeamProject'],
    categories: ['games', 'unity', 'development'],
    feeds: ['for-you', 'development'],
  },
  {
    id: 'object-pooling',
    type: 'breakdown',
    projectId: 'object-pool',
    media: { kind: 'code', sample: sample('object-pool', 0) },
    caption: {
      en: 'Stop calling Instantiate in Update. A small object pool I reuse for bullets, enemies and effects.',
      vi: 'Đừng gọi Instantiate trong Update nữa. Object pool nhỏ mình dùng lại cho đạn, quái và hiệu ứng.',
    },
    tags: ['ObjectPooling', 'Performance', 'CSharp'],
    categories: ['csharp', 'systems', 'unity'],
    feeds: ['for-you', 'skills'],
  },
  {
    id: 'brainrot-runner',
    type: 'team',
    projectId: 'brainrot-runner',
    media: {
      kind: 'image',
      src: asset('assets/games/other-projects/brainrot-runner.webp'),
      aspect: 1142 / 2048,
      alt: { en: 'Brain Rot Runner key art', vi: 'Ảnh chính Brain Rot Runner' },
    },
    caption: {
      en: 'Team project. I worked on runner movement, pooled gate spawning and boss behaviour with the State pattern.',
      vi: 'Dự án nhóm. Mình làm di chuyển runner, sinh cổng bằng pooling và hành vi boss với State pattern.',
    },
    tags: ['EndlessRunner', 'StatePattern', 'TeamProject'],
    categories: ['games', 'unity', 'gameplay', 'systems'],
    feeds: ['for-you'],
  },
  {
    id: 'wave-enemy-tool',
    type: 'devlog',
    media: { kind: 'youtube', id: 'HVYx18PSEIQ', start: 67, poster: yt('HVYx18PSEIQ'), aspect: 16 / 9 },
    caption: {
      en: 'Walkthrough of my WaveEnemy setup in the Unity Editor (Vietnamese narration).',
      vi: 'Hướng dẫn sử dụng WaveEnemy trong Unity Editor.',
    },
    tags: ['UnityEditor', 'WaveSystem', 'Tooling'],
    categories: ['unity', 'systems', 'development'],
    feeds: ['for-you', 'development'],
  },
  {
    id: 'global-game-jam-2026',
    type: 'devlog',
    projectId: 'behind-the-mask',
    media: {
      kind: 'gallery',
      items: [
        { src: asset('assets/games/other-projects/game-jam.webp'), aspect: 1920 / 1440, alt: { en: 'Team AbsoluteSingleton with their Global Game Jam 2026 badges', vi: 'Đội AbsoluteSingleton với thẻ Global Game Jam 2026' } },
        { src: asset('assets/games/other-projects/behind-the-mask-2.webp'), aspect: 1920 / 2560, alt: { en: 'Jam badges around the laptop during the jam', vi: 'Thẻ jam quanh laptop trong lúc làm game' } },
        { src: asset('assets/games/other-projects/behind-the-mask-3.webp'), aspect: 1125 / 2436, alt: { en: 'Behind the Mask during the jam', vi: 'Behind the Mask trong lúc jam' } },
      ],
    },
    caption: {
      en: 'Behind the scenes of Global Game Jam 2026. Lesson: a small, finished game beats a big, unfinished one.',
      vi: 'Hậu trường Global Game Jam 2026. Bài học: game nhỏ mà hoàn chỉnh hơn game lớn mà dang dở.',
    },
    tags: ['BehindTheScenes', 'GameJam', 'Teamwork'],
    categories: ['development'],
    feeds: ['for-you', 'development'],
  },
  {
    id: 'state-machine',
    type: 'skill',
    media: { kind: 'code', sample: skillById('state-machine')!.sample! },
    caption: {
      en: 'The smallest useful state machine: Enter, LogicUpdate, Exit. From my EchoArea prototype.',
      vi: 'State machine nhỏ nhất mà hữu ích: Enter, LogicUpdate, Exit. Từ prototype EchoArea.',
    },
    tags: ['StateMachine', 'CSharp', 'Architecture'],
    categories: ['csharp', 'systems'],
    feeds: ['for-you', 'skills'],
  },
  {
    id: 'chien-binh-xanh-nhi',
    type: 'team',
    projectId: 'chien-binh-xanh-nhi',
    media: { kind: 'youtube', id: 'hGJtJTHICOM', poster: yt('hGJtJTHICOM'), aspect: 16 / 9 },
    caption: {
      en: 'SSS Studio playtest build: a kids’ game about sorting trash and cleaning up the city.',
      vi: 'Bản playtest của SSS Studio: game cho trẻ em về phân loại rác và làm sạch thành phố.',
    },
    tags: ['SSSStudio', 'Educational', 'Unity2D'],
    categories: ['games', 'development'],
    feeds: ['for-you', 'development'],
  },
  {
    id: 'lj',
    type: 'poster',
    projectId: 'lj',
    media: { kind: 'placeholder', title: 'LJ' },
    caption: {
      en: 'LJ — a downloadable build on itch.io. Description coming soon.',
      vi: 'LJ — bản tải về trên itch.io. Mô tả sẽ được cập nhật.',
    },
    tags: ['itchio', 'Download'],
    categories: ['games'],
    feeds: ['for-you'],
  },
];

// One skill post per skill for the Skills feed, opened by an overview card.
const skillPosts: Post[] = [
  {
    id: 'skills',
    type: 'skill',
    media: { kind: 'skills-overview' },
    caption: {
      en: 'What I use and what I am still learning — every skill links to the project that shows it.',
      vi: 'Những gì mình đã dùng và đang học — mỗi kỹ năng gắn với dự án chứng minh nó.',
    },
    tags: ['Skills', 'Unity', 'CSharp'],
    categories: ['unity', 'csharp', 'systems'],
    feeds: ['skills'],
  },
  ...skills.map<Post>((s) => ({
    id: `skill-${s.id}`,
    type: 'skill',
    projectId: s.projectIds[0],
    media: { kind: 'skill', skillId: s.id },
    caption: s.what,
    tags: [s.name.replace(/[^A-Za-z#]/g, ''), s.level === 'demonstrated' ? 'UsedInProjects' : 'Learning'],
    categories: s.group === 'networking' ? ['multiplayer', 'systems'] : s.group === 'tools' ? ['unity', 'csharp'] : ['systems', 'gameplay'],
    feeds: ['skills'],
  })),
];

// The skills overview opens the Skills feed; it is not part of For You.
export const posts: Post[] = [skillPosts[0], ...basePosts, ...skillPosts.slice(1)];

export const postById = (id?: string) => posts.find((p) => p.id === id);
export const feedPosts = (feed: FeedId) => posts.filter((p) => p.feeds.includes(feed));
export const postsForProject = (projectId: string) => posts.filter((p) => p.projectId === projectId);
