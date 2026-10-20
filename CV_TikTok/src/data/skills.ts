import type { Skill } from './types';

// "demonstrated" only where a public build, repository or the developer's own
// project write-up shows the skill in use. Everything else is "learning".

const repo = (name: string) => ({ name, url: `https://github.com/DevUnNull/${name}` });

export const skillGroups = [
  { id: 'gameplay', name: { en: 'Unity gameplay programming', vi: 'Lập trình gameplay Unity' } },
  { id: 'architecture', name: { en: 'Software architecture', vi: 'Kiến trúc phần mềm' } },
  { id: 'networking', name: { en: 'Networking', vi: 'Lập trình mạng' } },
  { id: 'tools', name: { en: 'Development tools', vi: 'Công cụ phát triển' } },
] as const;

export const skills: Skill[] = [
  {
    id: 'player-controllers',
    name: 'Player Controllers',
    group: 'gameplay',
    level: 'demonstrated',
    what: { en: 'Code that turns input into movement: running, jumping, dashing.', vi: 'Code biến input thành chuyển động: chạy, nhảy, dash.' },
    why: { en: 'Movement is the first thing a player feels; it has to respond instantly.', vi: 'Di chuyển là thứ người chơi cảm nhận đầu tiên, phải phản hồi tức thì.' },
    where: { en: 'Lost in the Jungle: run, double jump and dash with a ghost trail.', vi: 'Lost in the Jungle: chạy, nhảy đôi và dash có hiệu ứng bóng.' },
    problem: { en: 'Makes platforming precise and readable.', vi: 'Giúp platforming chính xác, dễ đọc.' },
    projectIds: ['lost-in-the-jungle', 'brainrot-runner'],
    repos: [repo('Jungle'), repo('Mallow')],
  },
  {
    id: 'combat-systems',
    name: 'Combat Systems',
    group: 'gameplay',
    level: 'demonstrated',
    what: { en: 'Shooting, damage, health, skills with cooldowns and enemy reactions.', vi: 'Bắn, sát thương, máu, skill có hồi chiêu và phản ứng của địch.' },
    why: { en: 'Combat is the core loop of action and defense games.', vi: 'Combat là vòng lặp chính của game hành động và thủ thành.' },
    where: { en: 'Lost in the Jungle (shooting, cooldown skills) and Hero Defense (towers vs waves).', vi: 'Lost in the Jungle (bắn, skill hồi chiêu) và Hero Defense (tháp vs wave).' },
    problem: { en: 'Gives the player meaningful choices under pressure.', vi: 'Cho người chơi lựa chọn có ý nghĩa khi bị áp lực.' },
    projectIds: ['lost-in-the-jungle', 'hero-defense'],
  },
  {
    id: 'physics',
    name: 'Collision & Physics',
    group: 'gameplay',
    level: 'demonstrated',
    what: { en: 'Rigidbody movement, collision and hit detection.', vi: 'Di chuyển Rigidbody, va chạm và phát hiện trúng đòn.' },
    why: { en: 'Jumps, bullets and enemies all depend on reliable collisions.', vi: 'Nhảy, đạn và quái đều cần va chạm đáng tin cậy.' },
    where: { en: 'Jump mechanics and collision logic in Lost in the Jungle and Mallow; hit detection in Hero Defense.', vi: 'Cơ chế nhảy và va chạm trong Lost in the Jungle, Mallow; hit detection trong Hero Defense.' },
    problem: { en: 'Prevents missed hits and floaty jumps.', vi: 'Tránh trượt đòn và nhảy bồng bềnh.' },
    projectIds: ['lost-in-the-jungle', 'hero-defense'],
    repos: [repo('Mallow')],
  },
  {
    id: 'ui-systems',
    name: 'Game UI Systems',
    group: 'gameplay',
    level: 'demonstrated',
    what: { en: 'HUDs, level-up choices, pause menus and health bars built on Unity UI.', vi: 'HUD, bảng chọn nâng cấp, menu tạm dừng, thanh máu với Unity UI.' },
    why: { en: 'Players need clear, immediate feedback on what just happened.', vi: 'Người chơi cần phản hồi rõ ràng, tức thì.' },
    where: { en: 'Upgrade UI and score UI in Lost in the Jungle; Canvas UI in Brain Rot Runner.', vi: 'UI nâng cấp và điểm trong Lost in the Jungle; Canvas UI trong Brain Rot Runner.' },
    problem: { en: 'Turns game state into something the player can read at a glance.', vi: 'Biến trạng thái game thành thứ đọc được trong nháy mắt.' },
    projectIds: ['lost-in-the-jungle', 'brainrot-runner', 'hero-defense'],
  },
  {
    id: 'animation',
    name: 'Animation',
    group: 'gameplay',
    level: 'demonstrated',
    what: { en: 'Animator state handling and animation events.', vi: 'Quản lý Animator state và animation event.' },
    why: { en: 'Animation ties logic to what the player sees.', vi: 'Animation gắn logic với hình ảnh người chơi thấy.' },
    where: { en: 'Animator in Hero Defense; animation events in Lost in the Jungle.', vi: 'Animator trong Hero Defense; animation event trong Lost in the Jungle.' },
    problem: { en: 'Keeps hits, effects and sounds in sync with motion.', vi: 'Đồng bộ đòn đánh, hiệu ứng, âm thanh với chuyển động.' },
    projectIds: ['hero-defense', 'lost-in-the-jungle'],
  },
  {
    id: 'inventory',
    name: 'Inventory Systems',
    group: 'gameplay',
    level: 'learning',
    what: { en: 'Storing, displaying and using collected items.', vi: 'Lưu, hiển thị và sử dụng vật phẩm đã nhặt.' },
    why: { en: 'Common in adventure, survival and puzzle games.', vi: 'Phổ biến trong game phiêu lưu, sinh tồn, giải đố.' },
    where: { en: 'No public project of DevUnNull shows an inventory yet.', vi: 'Chưa có dự án công khai nào của DevUnNull có inventory.' },
    problem: { en: 'Lets players carry progress between rooms and puzzles.', vi: 'Cho người chơi mang tiến trình qua các phòng và câu đố.' },
    projectIds: [],
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'Interfaces, classes and polymorphism to model game rules.', vi: 'Interface, class và đa hình để mô hình hoá luật game.' },
    why: { en: 'Keeps systems separate so they can change without breaking each other.', vi: 'Giữ các hệ thống tách biệt để sửa không ảnh hưởng nhau.' },
    where: { en: 'IUpgrade and its six implementations in Lost in the Jungle; IPoolable in the Object Pool package.', vi: 'IUpgrade và 6 lớp cài đặt trong Lost in the Jungle; IPoolable trong Object Pool.' },
    problem: { en: 'Adding content without rewriting existing code.', vi: 'Thêm nội dung mà không viết lại code cũ.' },
    projectIds: ['lost-in-the-jungle', 'object-pool'],
  },
  {
    id: 'state-machine',
    name: 'State Machine',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'An object is in exactly one state (idle, walk, run, attack) and each state owns its Enter, Update and Exit logic.', vi: 'Đối tượng luôn ở đúng một trạng thái (đứng, đi, chạy, tấn công), mỗi trạng thái tự quản Enter, Update, Exit.' },
    why: { en: 'Replaces long if/else chains in player and AI code.', vi: 'Thay chuỗi if/else dài trong code player và AI.' },
    where: { en: 'Player movement states in the EchoArea repo; boss and enemy behaviour in Brain Rot Runner; Hero Defense.', vi: 'Trạng thái di chuyển trong repo EchoArea; hành vi boss và địch trong Brain Rot Runner; Hero Defense.' },
    problem: { en: 'Behaviour that is easy to extend and debug.', vi: 'Hành vi dễ mở rộng và dễ debug.' },
    projectIds: ['brainrot-runner', 'hero-defense'],
    repos: [repo('EchoArea')],
    sample: {
      title: { en: 'PlayerStateMachine.cs + IState.cs (comments translated)', vi: 'PlayerStateMachine.cs + IState.cs (đã dịch comment)' },
      file: 'Echo_Area/Assets/Scrip/PlayerMove/PlayerStateMachine.cs',
      url: 'https://github.com/DevUnNull/EchoArea/blob/main/Echo_Area/Assets/Scrip/PlayerMove/PlayerStateMachine.cs',
      verified: true,
      code: String.raw`public interface IState
{
    void Enter();         // when the state starts
    void LogicUpdate();   // called every frame
    void Exit();          // when leaving the state
}

public class PlayerStateMachine : MonoBehaviour
{
    private IState currentState;

    public void ChangeState(IState newState)
    {
        currentState?.Exit();
        currentState = newState;
        currentState.Enter();
    }

    private void Update()
    {
        currentState?.LogicUpdate();
    }
}`,
    },
  },
  {
    id: 'factory',
    name: 'Factory Pattern',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'One place that decides which concrete class to create from data.', vi: 'Một nơi duy nhất quyết định tạo lớp cụ thể nào từ dữ liệu.' },
    why: { en: 'Designers change data; code that creates objects stays in one spot.', vi: 'Designer đổi data, còn code tạo đối tượng nằm một chỗ.' },
    where: { en: 'UpgradeFactory in Lost in the Jungle.', vi: 'UpgradeFactory trong Lost in the Jungle.' },
    problem: { en: 'New upgrade types without touching the UI or the player.', vi: 'Thêm loại nâng cấp mà không sửa UI hay player.' },
    projectIds: ['lost-in-the-jungle'],
    repos: [repo('Jungle'), repo('Factory_Unity')],
  },
  {
    id: 'strategy',
    name: 'Strategy Pattern',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'Interchangeable behaviours behind one interface.', vi: 'Các hành vi hoán đổi được sau cùng một interface.' },
    why: { en: 'Swap what an upgrade or tower does without branching code.', vi: 'Đổi hành vi của nâng cấp hay tháp mà không rẽ nhánh code.' },
    where: { en: 'Upgrade behaviours in Lost in the Jungle; Hero Defense tower logic.', vi: 'Hành vi nâng cấp trong Lost in the Jungle; logic tháp trong Hero Defense.' },
    problem: { en: 'Each behaviour lives in its own small class.', vi: 'Mỗi hành vi nằm trong một lớp nhỏ riêng.' },
    projectIds: ['lost-in-the-jungle', 'hero-defense'],
  },
  {
    id: 'object-pooling',
    name: 'Object Pooling',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'Reuse inactive objects instead of creating and destroying them.', vi: 'Tái sử dụng đối tượng thay vì tạo và huỷ liên tục.' },
    why: { en: 'Instantiate and Destroy allocate memory and cause GC spikes.', vi: 'Instantiate và Destroy cấp phát bộ nhớ, gây giật GC.' },
    where: { en: 'Published Object Pool package; Hero Defense; Brain Rot Runner gate spawning.', vi: 'Package Object Pool công khai; Hero Defense; sinh cổng trong Brain Rot Runner.' },
    problem: { en: 'Stable frame times with many bullets and enemies.', vi: 'Khung hình ổn định khi có nhiều đạn và quái.' },
    projectIds: ['object-pool', 'hero-defense', 'brainrot-runner'],
    repos: [repo('Object-Pool_Unity')],
  },
  {
    id: 'singleton',
    name: 'Singleton',
    group: 'architecture',
    level: 'demonstrated',
    what: { en: 'One globally reachable instance of a manager.', vi: 'Một instance quản lý truy cập toàn cục.' },
    why: { en: 'Useful for services that must exist once, such as audio.', vi: 'Hữu ích cho dịch vụ chỉ có một, như âm thanh.' },
    where: { en: 'Scene audio manager in Lost in the Jungle; Hero Defense.', vi: 'Audio manager trong Lost in the Jungle; Hero Defense.' },
    problem: { en: 'Avoids duplicate managers across scenes.', vi: 'Tránh trùng manager giữa các scene.' },
    projectIds: ['lost-in-the-jungle', 'hero-defense'],
  },
  {
    id: 'client-server',
    name: 'Client-Server',
    group: 'networking',
    level: 'learning',
    what: { en: 'A server owns the game state; clients send input and receive updates.', vi: 'Server nắm trạng thái game; client gửi input và nhận cập nhật.' },
    why: { en: 'Prevents cheating and keeps players in agreement.', vi: 'Chống gian lận và giữ người chơi đồng bộ.' },
    where: { en: 'LIARS-CARD- repository: an ASP.NET back end with a LiteNetLib Unity client (work in progress).', vi: 'Repo LIARS-CARD-: back end ASP.NET với client Unity dùng LiteNetLib (đang làm).' },
    problem: { en: 'One source of truth for multiplayer matches.', vi: 'Một nguồn sự thật duy nhất cho trận multiplayer.' },
    projectIds: [],
    repos: [repo('LIARS-CARD-')],
  },
  {
    id: 'photon-fusion',
    name: 'Photon Fusion',
    group: 'networking',
    level: 'learning',
    what: { en: 'A Unity networking SDK for state synchronisation and client-server or shared modes.', vi: 'SDK mạng cho Unity để đồng bộ trạng thái, chế độ client-server hoặc shared.' },
    why: { en: 'Handles prediction, rollback and sync so the team can focus on gameplay.', vi: 'Lo phần dự đoán, rollback và đồng bộ để đội tập trung vào gameplay.' },
    where: { en: 'Set up with ParrelSync in the HOME-RUSH repository. No public multiplayer build yet.', vi: 'Được cài cùng ParrelSync trong repo HOME-RUSH. Chưa có bản multiplayer công khai.' },
    problem: { en: 'Deterministic multiplayer logic and state sync.', vi: 'Logic multiplayer tất định và đồng bộ trạng thái.' },
    projectIds: [],
    repos: [repo('HOME-RUSH')],
  },
  {
    id: 'state-sync',
    name: 'State Synchronization',
    group: 'networking',
    level: 'learning',
    what: { en: 'Keeping every client’s copy of the world consistent.', vi: 'Giữ bản sao thế giới của mọi client nhất quán.' },
    why: { en: 'Without it players see different games.', vi: 'Thiếu nó, mỗi người chơi thấy một game khác.' },
    where: { en: 'Current learning focus alongside Photon Fusion.', vi: 'Đang học cùng Photon Fusion.' },
    problem: { en: 'Fair, consistent multiplayer.', vi: 'Multiplayer công bằng, nhất quán.' },
    projectIds: [],
  },
  {
    id: 'unity',
    name: 'Unity',
    group: 'tools',
    level: 'demonstrated',
    what: { en: 'The engine behind every project here, 2D and 3D.', vi: 'Engine của mọi dự án ở đây, cả 2D lẫn 3D.' },
    why: { en: 'Cross-platform builds, including the WebGL builds playable on this site.', vi: 'Build đa nền tảng, kể cả bản WebGL chơi được trên trang này.' },
    where: { en: 'Hero Defense, Lost in the Jungle, Brain Rot Runner, Call Out My Cell, Behind the Mask.', vi: 'Hero Defense, Lost in the Jungle, Brain Rot Runner, Call Out My Cell, Behind the Mask.' },
    problem: { en: 'Ship games to web, desktop and Android.', vi: 'Phát hành game lên web, desktop và Android.' },
    projectIds: ['hero-defense', 'lost-in-the-jungle', 'brainrot-runner', 'call-out-my-cell', 'behind-the-mask'],
  },
  {
    id: 'csharp',
    name: 'C#',
    group: 'tools',
    level: 'demonstrated',
    what: { en: 'The language of all gameplay code in these projects.', vi: 'Ngôn ngữ của toàn bộ code gameplay trong các dự án.' },
    why: { en: 'Unity’s scripting language.', vi: 'Ngôn ngữ scripting của Unity.' },
    where: { en: 'Every public Unity repository.', vi: 'Mọi repo Unity công khai.' },
    problem: { en: 'Expresses game rules as testable code.', vi: 'Biểu diễn luật game thành code.' },
    projectIds: ['lost-in-the-jungle', 'object-pool'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    group: 'tools',
    level: 'demonstrated',
    what: { en: 'Version control and public hosting of source code.', vi: 'Quản lý phiên bản và lưu trữ mã nguồn công khai.' },
    why: { en: 'Safe teamwork and history, especially under jam deadlines.', vi: 'Làm việc nhóm an toàn, có lịch sử, nhất là khi chạy deadline jam.' },
    where: { en: '35 public repositories on github.com/DevUnNull (October 2026).', vi: '35 repo công khai trên github.com/DevUnNull (tháng 10/2026).' },
    problem: { en: 'No lost progress; reviewable changes.', vi: 'Không mất tiến độ; thay đổi có thể review.' },
    projectIds: ['behind-the-mask'],
  },
  {
    id: 'ides',
    name: 'Visual Studio / VS Code',
    group: 'tools',
    level: 'demonstrated',
    what: { en: 'Editors used for C# and web work.', vi: 'Trình soạn thảo cho C# và web.' },
    why: { en: 'Debugging and refactoring Unity scripts.', vi: 'Debug và refactor script Unity.' },
    where: { en: 'Listed in the developer’s GitHub profile toolset.', vi: 'Có trong bộ công cụ trên GitHub của developer.' },
    problem: { en: 'Faster iteration.', vi: 'Lặp nhanh hơn.' },
    projectIds: [],
  },
];

export const skillById = (id: string) => skills.find((s) => s.id === id);
