import type { Project } from './types';
import { asset } from '../services/asset';

// Every project here was checked against its public page. Contributions are
// only listed where the developer documented them; otherwise `contributions`
// is null and the UI says so. See ASSET_SOURCES.md for media sources.

const gh = (repo: string, path: string, branch = 'main') =>
  `https://github.com/DevUnNull/${repo}/blob/${branch}/${path}`;

export const projects: Project[] = [
  {
    id: 'hero-defense',
    slug: 'hero-defense',
    title: 'Hero Defense',
    genre: { en: 'Tower Defense', vi: 'Thủ thành (Tower Defense)' },
    engine: 'Unity',
    technologies: ['Unity 2D', 'C#', 'Animator', 'Audio Mixer', 'Object Pooling', 'Singleton', 'State', 'Observer', 'Strategy'],
    status: 'released',
    period: '10/2025 – 11/2025',
    team: { kind: 'solo' },
    description: {
      en: 'A 2D tower defense game about strategic placement, tower upgrade paths and wave balancing. Players build a defense, level up their units and hold off waves of different enemy types. Also listed as “Heroic Defense” in the developer’s portfolio.',
      vi: 'Game tower defense 2D tập trung vào đặt tháp chiến thuật, nhánh nâng cấp tháp và cân bằng wave quái. Người chơi xây tuyến phòng thủ, nâng cấp đơn vị và chống lại nhiều đợt quái khác nhau. Trong portfolio còn có tên “Heroic Defense”.',
    },
    features: [
      { en: 'Dynamic wave spawner', vi: 'Hệ thống sinh wave linh hoạt' },
      { en: 'Energy and resource management', vi: 'Quản lý năng lượng và tài nguyên' },
      { en: 'Branching tower upgrades', vi: 'Nâng cấp tháp theo nhánh' },
      { en: 'Enemy AI and multi-lane routing', vi: 'AI quái và tìm đường nhiều lane' },
    ],
    contributions: [
      { en: 'Built the whole engineering scope as a solo project: gameplay, enemy AI, upgrade progression, audio and UI/UX.', vi: 'Tự đảm nhận toàn bộ phần kỹ thuật: gameplay, AI quái, hệ thống nâng cấp, âm thanh và UI/UX.' },
      { en: 'Modular architecture so new towers and skills can be added without touching the core loop.', vi: 'Kiến trúc modular để thêm tháp và skill mới mà không đụng vào vòng lặp chính.' },
      { en: 'Object pooling, animation state handling and audio mixing across stages.', vi: 'Object pooling, quản lý animation state và mix âm thanh qua các màn.' },
    ],
    thumbnail: asset('assets/games/hero-defense/cover.webp'),
    screenshots: [asset('assets/games/hero-defense/cover.webp'), asset('assets/thumbnails/yt-Rm03AIO-GHY.jpg')],
    youtubeId: 'Rm03AIO-GHY',
    itchUrl: 'https://devunnull.itch.io/hero-defense',
    web: { uploadId: 15528948, width: 1920, height: 1080 },
    breakdown: {
      system: { en: 'Wave management', vi: 'Quản lý wave' },
      concepts: ['State Machines', 'Enemy Spawning', 'Object Pooling', 'Difficulty Scaling', 'Strategy Pattern', 'Observer Pattern'],
      architecture: {
        en: 'Towers and skills are separate modules that plug into a shared core loop. Waves come from a spawner that pulls enemies from object pools instead of instantiating them, and game events (enemy killed, wave cleared, energy changed) are broadcast to the UI and audio through observers.',
        vi: 'Tháp và skill là các module riêng gắn vào một vòng lặp chung. Wave được sinh từ spawner lấy quái trong object pool thay vì Instantiate, và các sự kiện (quái chết, hết wave, năng lượng thay đổi) được phát tới UI và âm thanh qua observer.',
      },
      challenges: [
        {
          problem: { en: 'Spawning many enemies and projectiles caused garbage-collection stutter.', vi: 'Sinh nhiều quái và đạn gây giật do garbage collection.' },
          solution: { en: 'Object pooling for entities and projectiles.', vi: 'Dùng object pooling cho quái và đạn.' },
        },
        {
          problem: { en: 'New towers and skills kept requiring edits to core logic.', vi: 'Thêm tháp/skill mới phải sửa logic lõi.' },
          solution: { en: 'A modular design using Strategy and State so behaviour is swapped, not rewritten.', vi: 'Thiết kế modular với Strategy và State để thay hành vi thay vì viết lại.' },
        },
      ],
      samples: [
        {
          title: { en: 'Wave spawner (conceptual example)', vi: 'Wave spawner (ví dụ minh hoạ)' },
          file: 'WaveSpawner.cs',
          verified: false,
          code: String.raw`// Conceptual example: the Hero Defense source is not public.
// It shows the shape of a pooled, data-driven wave spawner.
[System.Serializable]
public class Wave
{
    public Enemy prefab;
    public int count;
    public float interval;
}

public class WaveSpawner : MonoBehaviour
{
    [SerializeField] private Wave[] waves;
    [SerializeField] private Transform[] lanes;
    public event System.Action<int> WaveCleared;

    private IEnumerator Run()
    {
        for (int w = 0; w < waves.Length; w++)
        {
            var wave = waves[w];
            for (int i = 0; i < wave.count; i++)
            {
                var lane = lanes[Random.Range(0, lanes.Length)];
                PoolManager.Spawn(wave.prefab, lane.position, Quaternion.identity);
                yield return new WaitForSeconds(wave.interval);
            }
            yield return new WaitUntil(() => Enemy.Alive == 0);
            WaveCleared?.Invoke(w);
        }
    }
}`,
        },
      ],
    },
    categories: ['games', 'unity', 'csharp', 'gameplay', 'systems'],
    featured: true,
    date: '2025-11-30',
  },
  {
    id: 'call-out-my-cell',
    slug: 'call-out-my-cell',
    title: 'Call Out My Cell',
    genre: { en: 'Tower Defense / Lifestyle Choices', vi: 'Thủ thành / Lựa chọn lối sống' },
    engine: 'Unity',
    technologies: ['Unity', 'C#', '2D', 'Tower Defense'],
    status: 'in-development',
    team: {
      kind: 'team',
      size: 5,
      name: 'EXE_GD1911-AD — Group 4, FPT University',
      credits: 'Nguyễn Mai Ngọc Hải, Đào Sơn Anh, Phạm Quốc Trung, Nguyễn Xuân Nam, Nguyễn Ngọc Anh',
    },
    description: {
      en: 'Your daily choices decide how well your body fights infection. Follow Linh’s day — sleep or stay up, eat breakfast or skip it, drink water, exercise — then command immune cells against viruses and bacteria across five lanes.',
      vi: 'Lựa chọn hằng ngày quyết định sức chống chọi của cơ thể. Theo dõi một ngày của Linh — ngủ đủ hay thức khuya, ăn sáng hay bỏ bữa, uống nước, tập thể dục — rồi chỉ huy tế bào miễn dịch chống virus và vi khuẩn trên 5 lane.',
    },
    features: [
      { en: 'Lifestyle decisions before each battle', vi: 'Quyết định lối sống trước mỗi trận' },
      { en: 'Body stats: Immunity, Energy, Recovery, Toxicity, Hydration', vi: 'Chỉ số cơ thể: Miễn dịch, Năng lượng, Hồi phục, Độc tố, Nước' },
      { en: 'Five-lane defensive combat', vi: 'Phòng thủ trên 5 lane' },
      { en: 'Immune cells with attack, defense, support and resource roles', vi: 'Tế bào miễn dịch với vai trò tấn công, phòng thủ, hỗ trợ, tạo tài nguyên' },
      { en: 'Enemy waves with their own speed, health and attacks', vi: 'Wave quái với tốc độ, máu và kiểu tấn công riêng' },
      { en: 'Battles in the lungs, heart, stomach, brain and skin', vi: 'Chiến trường: phổi, tim, dạ dày, não, da' },
    ],
    contributions: null,
    thumbnail: asset('assets/games/call-out-my-cell/cover.jpg'),
    screenshots: [
      asset('assets/games/call-out-my-cell/cover.jpg'),
      asset('assets/games/call-out-my-cell/shot-1.jpg'),
      asset('assets/games/call-out-my-cell/shot-2.jpg'),
      asset('assets/games/call-out-my-cell/shot-3.jpg'),
    ],
    itchUrl: 'https://devunnull.itch.io/call-out-my-cell',
    download: { file: 'CallOutMyCell.zip', size: '218 MB' },
    missing: ['Gameplay video', 'Individual contribution of DevUnNull within the team'],
    categories: ['games', 'unity', 'gameplay', 'development'],
    featured: true,
    date: '2026-10-06',
  },
  {
    id: 'lost-in-the-jungle',
    slug: 'lost-in-the-jungle',
    title: 'Lost in the Jungle',
    genre: { en: 'Action Platformer', vi: 'Hành động platformer' },
    engine: 'Unity',
    technologies: ['Unity 2D', 'C#', 'Factory Pattern', 'Strategy Pattern', 'PlayerPrefs', 'Animation Events', 'TextMesh Pro'],
    status: 'released',
    period: '06/2024 – 07/2024',
    team: { kind: 'solo' },
    description: {
      en: 'You wake up in a cursed forest. Dash, double jump and shoot your way through enemies that hunt you down, collect EXP, level up and pick one of three random upgrades. Also called “Jungle Survivor” in the developer’s portfolio.',
      vi: 'Bạn tỉnh dậy trong một khu rừng bị nguyền. Dash, nhảy đôi và bắn hạ kẻ địch truy đuổi, thu EXP, lên cấp và chọn 1 trong 3 nâng cấp ngẫu nhiên. Trong portfolio còn có tên “Jungle Survivor”.',
    },
    features: [
      { en: 'Double jump', vi: 'Nhảy đôi' },
      { en: 'Dash with ghost trail', vi: 'Dash có hiệu ứng bóng' },
      { en: 'Shooting and skills with cooldowns', vi: 'Bắn súng và skill có hồi chiêu' },
      { en: 'Enemies that chase the player', vi: 'Kẻ địch tự truy đuổi người chơi' },
      { en: 'EXP and leveling', vi: 'EXP và lên cấp' },
      { en: 'Pick 1 of 3 random upgrades', vi: 'Chọn 1 trong 3 nâng cấp ngẫu nhiên' },
    ],
    contributions: [
      { en: 'Solo project: gameplay, combat, upgrade system and UI.', vi: 'Dự án cá nhân: gameplay, combat, hệ thống nâng cấp và UI.' },
      { en: 'Upgrades built with Factory + Strategy so new buffs do not change core logic.', vi: 'Nâng cấp dùng Factory + Strategy để thêm buff mà không sửa logic chính.' },
      { en: 'Player state saved with PlayerPrefs; event-driven animations.', vi: 'Lưu trạng thái người chơi bằng PlayerPrefs; animation theo sự kiện.' },
    ],
    thumbnail: asset('assets/games/lost-in-the-jungle/itch-cover.jpg'),
    screenshots: [asset('assets/games/lost-in-the-jungle/itch-cover.jpg'), asset('assets/games/lost-in-the-jungle/cover.webp'), asset('assets/thumbnails/yt-3jibVCOz_Oc.jpg')],
    youtubeId: '3jibVCOz_Oc',
    itchUrl: 'https://devunnull.itch.io/junglesuvivor',
    githubUrl: 'https://github.com/DevUnNull/Jungle',
    web: { uploadId: 15526706, width: 1920, height: 1080 },
    breakdown: {
      system: { en: 'Random upgrade selection', vi: 'Chọn nâng cấp ngẫu nhiên' },
      concepts: ['Factory Pattern', 'Strategy Pattern', 'Interfaces', 'Data-driven upgrades', 'LINQ'],
      architecture: {
        en: 'Each upgrade is described by an UpgradeData asset. On level-up, UpgradeManager shuffles the data, takes three entries and asks UpgradeFactory to turn each into an IUpgrade object. Every upgrade type (health, speed, damage, attack speed, critical chance, shield) implements the same Apply(player) method, so the level-up UI never needs to know which one it shows.',
        vi: 'Mỗi nâng cấp được mô tả bằng một UpgradeData. Khi lên cấp, UpgradeManager xáo dữ liệu, lấy 3 mục và nhờ UpgradeFactory tạo đối tượng IUpgrade. Mọi loại nâng cấp (máu, tốc độ, sát thương, tốc độ bắn, chí mạng, khiên) đều có cùng hàm Apply(player), nên UI lên cấp không cần biết đang hiển thị loại nào.',
      },
      challenges: [
        {
          problem: { en: 'Adding a new buff meant editing the player and the UI.', vi: 'Thêm buff mới phải sửa cả player lẫn UI.' },
          solution: { en: 'One IUpgrade interface and a factory keyed by upgrade type.', vi: 'Một interface IUpgrade và một factory theo loại nâng cấp.' },
        },
        {
          problem: { en: 'Percent values from data had to become multipliers.', vi: 'Giá trị phần trăm trong data cần đổi thành hệ số nhân.' },
          solution: { en: 'The factory converts them once (5 → ×1.05), so upgrade classes stay simple.', vi: 'Factory chuyển đổi một lần (5 → ×1.05), giữ các lớp nâng cấp đơn giản.' },
        },
      ],
      samples: [
        {
          title: { en: 'UpgradeFactory.cs (comments translated)', vi: 'UpgradeFactory.cs (đã dịch comment)' },
          file: 'Exam_1/Assets/_MyGame/Scrip/UpDrade/UpgradeFactory.cs',
          url: gh('Jungle', 'Exam_1/Assets/_MyGame/Scrip/UpDrade/UpgradeFactory.cs'),
          verified: true,
          code: String.raw`public static class UpgradeFactory
{
    public static IUpgrade Create(UpgradeData data)
    {
        switch (data.upgradeType)
        {
            case "Health":
                return new HealthUpgrade(data.upgradeName, data.description, data.value, data.icon);
            case "Speed":
                // value = 5 → multiplier = 1.05 (+5% move speed)
                float speedMultiplier = 1f + (data.value / 100f);
                return new SpeedUpgrade(data.upgradeName, data.description, speedMultiplier, data.icon);
            case "Damage":
                return new DamageUpgrade(data.upgradeName, data.description, data.value, data.icon);
            case "AttackSpeed":
                float attackSpeedMultiplier = 1f + (data.value / 100f);
                return new AttackSpeedUpgrade(data.upgradeName, data.description, attackSpeedMultiplier, data.icon);
            case "CriticalChance":
                return new CriticalChanceUpgrade(data.upgradeName, data.description, data.value, data.icon);
            case "Shield":
                return new ShieldUpgrade(data.upgradeName, data.description, data.value, data.icon);
            default:
                Debug.LogWarning($"Unknown upgrade type: {data.upgradeType}");
                return null;
        }
    }
}`,
        },
        {
          title: { en: 'UpgradeManager.cs', vi: 'UpgradeManager.cs' },
          file: 'Exam_1/Assets/_MyGame/Scrip/UpDrade/UpgradeManager.cs',
          url: gh('Jungle', 'Exam_1/Assets/_MyGame/Scrip/UpDrade/UpgradeManager.cs'),
          verified: true,
          code: String.raw`public class UpgradeManager : MonoBehaviour
{
    [SerializeField] private List<UpgradeData> allUpgradeData;

    public List<IUpgrade> GetRandomUpgrades(int count)
    {
        var chosen = allUpgradeData
            .OrderBy(x => Random.value)
            .Take(count)
            .Select(data => UpgradeFactory.Create(data))
            .Where(u => u != null)
            .ToList();

        return chosen;
    }

    public void ApplyUpgrade(IUpgrade upgrade, InformationPlayer player)
    {
        upgrade.Apply(player);
        Debug.Log($"Applied upgrade: {upgrade.Name}");
    }
}`,
        },
        {
          title: { en: 'IUpgrade.cs (excerpt)', vi: 'IUpgrade.cs (trích)' },
          file: 'Exam_1/Assets/_MyGame/Scrip/UpDrade/IUpgrade.cs',
          url: gh('Jungle', 'Exam_1/Assets/_MyGame/Scrip/UpDrade/IUpgrade.cs'),
          verified: true,
          code: String.raw`public interface IUpgrade
{
    string Name { get; }
    string Description { get; }
    Sprite Icon { get; }
    void Apply(InformationPlayer player);
}

public class SpeedUpgrade : IUpgrade
{
    public string Name { get; }
    public string Description { get; }
    public Sprite Icon { get; }
    private float multiplier;

    public SpeedUpgrade(string name, string desc, float multiplier, Sprite icon)
    {
        Name = name;
        Description = desc;
        this.multiplier = multiplier;
        Icon = icon;
    }

    public void Apply(InformationPlayer player)
    {
        player.moveSpeed *= multiplier;
    }
}`,
        },
      ],
    },
    categories: ['games', 'unity', 'csharp', 'gameplay', 'systems'],
    featured: true,
    date: '2024-07-31',
  },
  {
    id: 'brainrot-runner',
    slug: 'brainrot-runner',
    title: 'Brain Rot Runner',
    genre: { en: 'Endless runner', vi: 'Endless runner' },
    engine: 'Unity',
    technologies: ['Unity 3D', 'C#', 'Object Pooling', 'State Pattern', 'Unity Canvas UI'],
    status: 'released',
    team: { kind: 'team', credits: 'Monomee, UnNull, P1MAN, Khaznh' },
    description: {
      en: 'A fast runner in the Brainrot universe: pick a character, run through math gates to multiply your squad, dodge obstacles and face a boss at the finish line. Published by Monomee as a demo still in active development.',
      vi: 'Game chạy tốc độ cao trong vũ trụ Brainrot: chọn nhân vật, chạy qua các cổng toán học để nhân đội quân, né chướng ngại vật và đánh boss ở vạch đích. Monomee phát hành dưới dạng bản demo, vẫn đang phát triển.',
    },
    features: [
      { en: 'Gates that add to or multiply the squad', vi: 'Cổng cộng hoặc nhân đội quân' },
      { en: 'Procedurally generated gates and obstacles', vi: 'Sinh cổng và chướng ngại vật ngẫu nhiên' },
      { en: 'Boss fights at the finish line', vi: 'Đánh boss ở vạch đích' },
      { en: 'Web (portrait) and Android builds', vi: 'Bản Web (dọc) và Android' },
    ],
    contributions: [
      { en: 'Core runner movement and procedural gate generation, using object pooling to keep memory and frame time stable.', vi: 'Cơ chế di chuyển runner và sinh cổng ngẫu nhiên, dùng object pooling để ổn định bộ nhớ và hiệu năng.' },
      { en: 'Boss evolution system and enemy attack/movement behaviour with the State pattern in C#.', vi: 'Hệ thống tiến hoá boss và hành vi tấn công/di chuyển của địch bằng State pattern trong C#.' },
      { en: 'Responsive in-game UI with Unity’s Canvas system.', vi: 'UI trong game phản hồi nhanh với hệ thống Canvas của Unity.' },
    ],
    thumbnail: asset('assets/games/other-projects/brainrot-runner.webp'),
    screenshots: [asset('assets/games/other-projects/brainrot-runner.webp'), asset('assets/games/other-projects/brainrot-runner-cover.jpg')],
    itchUrl: 'https://monomee.itch.io/brain-rot-runner',
    web: { uploadId: 17082548, width: 1080, height: 1920 },
    download: { file: 'Brainrot Runner.apk', size: '274 MB' },
    missing: ['Gameplay video'],
    categories: ['games', 'unity', 'csharp', 'gameplay', 'systems'],
    featured: true,
    date: '2025-12-15',
  },
  {
    id: 'behind-the-mask',
    slug: 'behind-the-mask',
    title: 'Behind the Mask',
    genre: { en: 'First-person psychological horror / puzzle', vi: 'Kinh dị tâm lý / giải đố góc nhìn thứ nhất' },
    engine: 'Unity',
    technologies: ['Unity', 'C#', 'Game Jam'],
    status: 'jam',
    period: '30/01/2026 – 01/02/2026 (36h)',
    team: {
      kind: 'team',
      size: 5,
      name: 'AbsoluteSingleton — Global Game Jam 2026',
      credits: 'Nguyễn Mai Ngọc Hải (Dev), Phạm Nam Khánh, Đào Nhất Nam, Nguyễn Việt Hoàng, Dương Quý Nhân',
    },
    description: {
      en: 'A 36-hour Global Game Jam 2026 entry. Putting the mask on gives a bright world seen through narrow eye holes; taking it off shows the whole, darker world and starts an anxiety meter that, at its peak, sends shadows after you.',
      vi: 'Sản phẩm Global Game Jam 2026 trong 36 giờ. Đeo mặt nạ: thế giới sáng nhưng tầm nhìn hẹp qua lỗ mắt; tháo ra: nhìn rõ thế giới u tối và thanh lo âu bắt đầu tăng, chạm ngưỡng thì bóng đen truy đuổi.',
    },
    features: [
      { en: 'Mask on / mask off vision mechanic', vi: 'Cơ chế đeo / tháo mặt nạ thay đổi tầm nhìn' },
      { en: 'Anxiety meter that triggers chasing enemies', vi: 'Thanh lo âu kích hoạt kẻ địch truy đuổi' },
      { en: 'Collect drawing fragments for a Normal or True ending', vi: 'Thu thập mảnh tranh để mở Normal hoặc True ending' },
    ],
    contributions: [
      { en: 'Core gameplay logic in C#.', vi: 'Logic gameplay cốt lõi bằng C#.' },
      { en: 'Rapid prototyping, scope control and frequent Git commits under a 36-hour deadline.', vi: 'Prototype nhanh, kiểm soát scope và commit Git thường xuyên trong 36 giờ.' },
    ],
    thumbnail: asset('assets/games/other-projects/behind-the-mask.webp'),
    screenshots: [asset('assets/games/other-projects/behind-the-mask.webp'), asset('assets/games/other-projects/game-jam.webp'), asset('assets/games/other-projects/behind-the-mask-2.webp')],
    youtubeId: 'GHNWE27c4rQ',
    categories: ['games', 'unity', 'csharp', 'gameplay', 'development'],
    featured: true,
    date: '2026-02-01',
  },
  {
    id: 'chien-binh-xanh-nhi',
    slug: 'chien-binh-xanh-nhi',
    title: 'Chiến Binh Xanh Nhí',
    genre: { en: '2D casual / educational', vi: '2D casual / giáo dục' },
    engine: 'Unity',
    technologies: ['Unity 2D', 'C#'],
    status: 'in-development',
    team: { kind: 'team', name: 'SSS Studio' },
    description: {
      en: 'A studio game for children: play a young warrior who collects and sorts trash, from a park to a green city. Correct sorting earns points; wrong sorting costs them. Currently a playtest build.',
      vi: 'Game của studio dành cho trẻ em: vào vai chiến binh nhỏ thu gom và phân loại rác, từ công viên tới thành phố xanh. Phân loại đúng được cộng điểm, sai bị trừ điểm. Hiện là bản playtest.',
    },
    features: [
      { en: 'Trash sorting with score rewards and penalties', vi: 'Phân loại rác có thưởng/phạt điểm' },
      { en: 'Levels from park to neighbourhood, school and green city', vi: 'Màn chơi từ công viên, khu phố, trường học tới thành phố xanh' },
    ],
    contributions: null,
    thumbnail: asset('assets/games/other-projects/chien-binh-xanh-nhi.webp'),
    screenshots: [asset('assets/games/other-projects/chien-binh-xanh-nhi.webp'), asset('assets/thumbnails/yt-hGJtJTHICOM.jpg')],
    youtubeId: 'hGJtJTHICOM',
    missing: ['Individual contribution of DevUnNull'],
    categories: ['games', 'unity', 'development'],
    featured: false,
    date: '2026-06-01',
  },
  {
    id: 'lj',
    slug: 'lj',
    title: 'LJ',
    genre: { en: 'Not stated', vi: 'Chưa ghi rõ' },
    engine: 'Unknown',
    technologies: [],
    status: 'released',
    team: { kind: 'unknown' },
    description: {
      en: 'A downloadable build published on itch.io (LJ.zip, 15 MB). The game page has no description yet.',
      vi: 'Bản tải về trên itch.io (LJ.zip, 15 MB). Trang game chưa có mô tả.',
    },
    features: [],
    contributions: null,
    thumbnail: '',
    screenshots: [],
    itchUrl: 'https://devunnull.itch.io/j',
    download: { file: 'LJ.zip', size: '15 MB' },
    missing: ['Description', 'Genre', 'Engine', 'Cover image', 'Screenshots', 'Gameplay video', 'Team/solo'],
    categories: ['games'],
    featured: false,
    date: '2026-10-18',
  },
  {
    id: 'object-pool',
    slug: 'object-pool',
    title: 'Object Pool for Unity',
    genre: { en: 'Unity package', vi: 'Unity package' },
    engine: 'Unity',
    technologies: ['C#', 'Object Pooling', 'Generics', 'Interfaces'],
    status: 'tool',
    team: { kind: 'solo' },
    description: {
      en: 'A small reusable pool: prefabs implement IPoolable, PoolManager.Spawn and PoolManager.Despawn replace Instantiate and Destroy for bullets, enemies and effects.',
      vi: 'Một pool nhỏ tái sử dụng được: prefab implement IPoolable, PoolManager.Spawn và PoolManager.Despawn thay cho Instantiate và Destroy với đạn, quái, hiệu ứng.',
    },
    features: [
      { en: 'Queue-based pool per prefab', vi: 'Pool dùng Queue cho từng prefab' },
      { en: 'OnSpawn / OnDespawn lifecycle hooks', vi: 'Hook vòng đời OnSpawn / OnDespawn' },
      { en: 'Grows on demand when empty', vi: 'Tự mở rộng khi hết đối tượng' },
    ],
    contributions: [{ en: 'Written and published by DevUnNull.', vi: 'Do DevUnNull viết và công khai.' }],
    thumbnail: '',
    screenshots: [],
    githubUrl: 'https://github.com/DevUnNull/Object-Pool_Unity',
    breakdown: {
      system: { en: 'Object pooling', vi: 'Object pooling' },
      concepts: ['Object Pooling', 'Queue<T>', 'Interfaces', 'Lifecycle hooks'],
      architecture: {
        en: 'Pool keeps a Queue of inactive instances for one prefab. Get() dequeues (or creates when empty), activates the object and calls OnSpawn; Return() calls OnDespawn, deactivates and re-queues it. Each instance carries a PoolIdentity that remembers its prefab, so Despawn can find the right pool.',
        vi: 'Pool giữ một Queue các instance chưa dùng của một prefab. Get() lấy ra (hoặc tạo mới khi rỗng), bật object và gọi OnSpawn; Return() gọi OnDespawn, tắt object và đưa lại vào hàng đợi. Mỗi instance có PoolIdentity nhớ prefab gốc để Despawn tìm đúng pool.',
      },
      challenges: [
        {
          problem: { en: 'Instantiate/Destroy in shooters and tower defense creates GC spikes.', vi: 'Instantiate/Destroy trong game bắn súng, thủ thành gây giật do GC.' },
          solution: { en: 'Pre-warm a pool and recycle instances.', vi: 'Tạo sẵn pool và tái sử dụng instance.' },
        },
      ],
      samples: [
        {
          title: { en: 'Pool.cs (excerpt)', vi: 'Pool.cs (trích)' },
          file: 'Pool.cs',
          url: gh('Object-Pool_Unity', 'Pool.cs'),
          verified: true,
          code: String.raw`public class Pool
{
    private Component prefab;
    private Queue<Component> objects = new Queue<Component>();
    private Transform parent;

    public Pool(Component prefab, int size, Transform parent)
    {
        this.prefab = prefab;
        this.parent = parent;

        for (int i = 0; i < size; i++)
        {
            var obj = Create();
            obj.gameObject.SetActive(false);
            objects.Enqueue(obj);
        }
    }

    public Component Get()
    {
        Component obj;

        if (objects.Count == 0)
        {
            obj = Create();
        }
        else
        {
            obj = objects.Dequeue();
        }

        obj.gameObject.SetActive(true);

        if (obj is IPoolable poolable)
            poolable.OnSpawn();

        return obj;
    }

    public void Return(Component obj)
    {
        if (obj is IPoolable poolable)
            poolable.OnDespawn();

        obj.gameObject.SetActive(false);
        obj.transform.SetParent(parent);
        objects.Enqueue(obj);
    }
}`,
        },
        {
          title: { en: 'Usage (from the README)', vi: 'Cách dùng (từ README)' },
          file: 'README.md',
          url: 'https://github.com/DevUnNull/Object-Pool_Unity#readme',
          verified: true,
          code: String.raw`public class Bullet : MonoBehaviour, IPoolable
{
    public void OnSpawn()   { /* reset state, e.g. HP = 100 */ }
    public void OnDespawn() { /* stop animations, effects */ }
}

Bullet bullet = PoolManager.Spawn(bulletPrefab, firePoint.position, Quaternion.identity);
PoolManager.Despawn(bullet);`,
        },
      ],
    },
    categories: ['unity', 'csharp', 'systems'],
    featured: false,
    date: '2026-03-23',
  },
  {
    id: 'the-reunion-707',
    slug: '707-the-reunion',
    title: '707: The Reunion',
    genre: { en: 'Psychological horror / puzzle', vi: 'Kinh dị tâm lý / giải đố' },
    engine: 'Unity',
    technologies: ['Unity'],
    status: 'released',
    team: { kind: 'team', name: 'P1MAN · SSS Studio' },
    description: {
      en: 'A short psychological horror game set in a Vietnamese apartment building, developed by P1MAN and listed as a flagship SSS Studio project.',
      vi: 'Game kinh dị tâm lý ngắn lấy bối cảnh chung cư Việt Nam, do P1MAN phát triển, là dự án tiêu biểu của SSS Studio.',
    },
    features: [],
    contributions: null,
    thumbnail: '',
    screenshots: [],
    itchUrl: 'https://peach1man.itch.io/707-reunion',
    missing: ['Individual contribution of DevUnNull'],
    categories: ['games', 'development'],
    featured: false,
    date: '2026-09-01',
  },
];

export const projectById = (id?: string) => projects.find((p) => p.id === id || p.slug === id);
