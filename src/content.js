// ============================================================================
//  这里是整站「内容」文件 —— 你只需要改这里的文字，完全不用懂代码。
//
//  怎么改：
//    · 每个项目后面括号里那句中文就是说明，告诉你这一行是干什么的，别动它。
//    · 要改的文字放在引号 " " 里面，例如 "CB-BiliAgent" 改成你自己的标题。
//    · 每项都有 中文(zh) 和 英文(en) 两个版本，改哪个页面切换语言时就会显示哪个。
//    · 改完保存，回到浏览器刷新就能看到效果。
//
//  怎么换图片：
//    · 打开 public/content 文件夹，把图片放进去，文件名保持和下面 image 一样。
//    · 例如 bili-tool.png 你想换成自己的，就用你的图，但文件名仍叫 bili-tool.png。
//
//  改坏了也别怕：git 里存着上一版，或者你把问题告诉我，我一分钟帮你修好。
// ============================================================================

// ---------- 通用文字（导航、按钮、区块标题） ----------
export const CONTENT = {
  brand: { zh: '赵天翔', en: 'Zhao Tianxiang' }, // 网站左上角和 HERO 的名字
  roleLine: { zh: '内容 · 产品 · AI · 游戏', en: 'Content · Product · AI · Game' }, // 名字下面的行业标签
  statement: {
    zh: '以内容运营为起点，用产品和 AI 把每件事做成长线积累的资产。',
    en: 'Starting from content operations, using product and AI to turn every initiative into a compounding asset.',
  }, // HERO 里的一句话自我介绍
  navWork: { zh: '作品', en: 'Work' },
  navAbout: { zh: '关于', en: 'About' },
  navContact: { zh: '联系', en: 'Contact' },
  langLabel: { zh: 'EN', en: '中文' }, // 右上角语言切换按钮上的字（不显示对应语言时）
  selectedWork: { zh: '精选作品', en: 'Selected Work' },
  viewCase: { zh: '查看案例 →', en: 'View case →' },
  back: { zh: '← 返回作品', en: '← Back to work' },
  core: { zh: '核心洞察', en: 'Core insights' },
  role: { zh: '我的角色', en: 'My role' },
  outcome: { zh: '成果', en: 'Outcome' },
  experienceTitle: { zh: '经历', en: 'Experience' },
  aboutTitle: { zh: 'About', en: 'About' },
  intent: { zh: '求职意向', en: 'Looking for' },
}

// ---------- 项目（精选作品） ----------
// image 里写的是 public/content 文件夹里的图片文件名；没有图片就写 null
// points 是案例页里的「核心洞察」逐条要点
export const PROJECTS = [
  {
    slug: 'cb-biliagent', // 网址里的标识，一般不用改
    no: '01',
    category: { zh: 'AI 内容生产', en: 'AI Content Production' },
    title: { zh: 'CB-BiliAgent', en: 'CB-BiliAgent' },
    brief: {
      zh: '为 B 站 UP 主打造的内容生产流水线 Agent，一站式完成视频下载、转写、歌词对齐与文案生成。',
      en: 'A content production pipeline agent for Bilibili creators — download, transcription, alignment and copywriting in one flow.',
    },
    roleShort: { zh: '需求定义 / 产品验收', en: 'Requirements / Acceptance' },
    roleFull: {
      zh: '从创作者真实留言中抽象业务诉求，定义产品边界与验收标准，驱动方案落地。',
      en: 'Extracted real creator needs from their feedback, defined the product scope and acceptance criteria, and drove the delivery.',
    },
    outcome: {
      value: '103min',
      caption: { zh: '单条长视频 → 按时间段下载、转写', en: 'One long video → time-ranged download & transcription' },
    },
    points: [
      { zh: '从真实创作痛点出发，锁定转写与文案的高频需求', en: 'Started from real creator pain points around transcription & copy' },
      { zh: '103 分钟长视频 → 时间段精准下载', en: '103-min video → precise time-range downloading' },
      { zh: '现场版歌词 → 双策略对齐算法', en: 'Live lyrics → dual-strategy alignment' },
      { zh: '适配 B 站平台规则，规避内容风险', en: 'Compliant with Bilibili platform rules' },
      { zh: '自动化流程 + 手动兜底，确保稳定', en: 'Automation with a manual fallback for reliability' },
      { zh: '打通完整内容生产流水线', en: 'End-to-end content production pipeline' },
      { zh: '以 Bug 验收标准推动迭代', en: 'Iteration driven by bug-acceptance standards' },
    ],
    image: null,
    image2: null,
  },
  {
    slug: 'bili-sentiment',
    no: '02',
    category: { zh: 'AI 产品', en: 'AI Product' },
    title: { zh: 'B 站评论舆情分析工具', en: 'Bilibili Comment Sentiment Tool' },
    brief: {
      zh: '针对 B 站海量评论难以快速提炼观点的问题，独立设计与落地的舆情分析工具，把评论转化为结构化用户洞察。',
      en: 'Built from scratch to turn Bilibili’s flood of comments into structured user insight for operations and product decisions.',
    },
    roleShort: { zh: '产品负责人', en: 'Product Lead' },
    roleFull: {
      zh: '负责需求分析、产品决策与 UX 把关；由 Claude Code 全程协作完成工程落地与代码生成，最终交付可运行的桌面产品。',
      en: 'Owned requirements, product decisions and UX; Claude Code handled engineering end-to-end, shipping a running desktop product.',
    },
    outcome: {
      value: '0→1',
      caption: { zh: '从产品构想到可运行的桌面级产品', en: 'From idea to a running desktop product' },
    },
    points: [
      { zh: '评论信息过载，人工翻阅成本高难辨风向', en: 'Comment overload — costly to grasp the tone manually' },
      { zh: 'AI 观点 / 情绪 / 争议焦点多维度分析', en: 'Multi-dimensional AI analysis of views, sentiment, controversies' },
      { zh: 'CLI → Web → Desktop 三阶段持续迭代', en: 'Iterated across CLI → Web → Desktop' },
      { zh: '0-1 独立完成产品设计与落地', en: '0-1 product design and delivery' },
      { zh: 'Claude Code 全程协作开发', en: 'Developed end-to-end with Claude Code' },
    ],
    image: 'bili-tool.png',
    image2: 'bili-tool-ui.png',
  },
  {
    slug: 'game-live-ops',
    no: '03',
    category: { zh: '游戏运营', en: 'Game Operations' },
    title: { zh: '游戏直播赛事策划与全链路运营', en: 'Game Live Event & Full-loop Ops' },
    brief: {
      zh: '从赛制 0-1 设计到常态化活动执行 SOP 搭建，主导 KOC 直播活动，驱动参与 KOC 的 ACU 与场观数据提升。',
      en: 'From 0-1 tournament design to a repeatable ops SOP — drove engagement and watch metrics for KOC streamers.',
    },
    roleShort: { zh: '媒介运营 / 主导策划', en: 'Media Ops / Lead' },
    roleFull: {
      zh: '主导“团体积分对抗赛”等活动：方案推进、主播沟通、执行跟进与效果复盘，并沉淀常态化活动运营 SOP。',
      en: 'Led team-points tournaments: proposals, streamer comms, execution and review — then codified the recurring ops SOP.',
    },
    outcome: {
      value: '1×+',
      caption: { zh: '参与 KOC 的 ACU 与场观数据翻倍提升', en: 'ACU & viewers roughly doubled for participating KOCs' },
    },
    points: [
      { zh: '赛制 0-1 设计（团体积分对抗赛）', en: '0-1 tournament design (team points battle)' },
      { zh: '赏金机制：制造对抗与“造梗”', en: 'Bounty rule: manufactured rivalry and meme moments' },
      { zh: '积分机制：咬紧比分，把悬念留到最后', en: 'Scoring system: kept the scoreline, suspense to the end' },
      { zh: '高频轮换：把观众转化为“精神股东”', en: 'Frequent rotation: viewers became invested “stakeholders”' },
      { zh: '数据复盘与高光时刻（22:23 惜败）', en: 'Data review & highlight moments (a 22:23 near-win)' },
      { zh: '赛制迭代：1v1 → 1v7，引入卧底机制', en: 'Iteration: 1v1 → 1v7 with an imposter twist' },
      { zh: '沉淀常态化活动执行 SOP', en: 'Codified a recurring event-run SOP' },
    ],
    image: 'live-event.png',
    image2: 'live-event-data.png',
  },
  {
    slug: 'minecraft-ecosystem',
    no: '04',
    category: { zh: '游戏生态', en: 'Game Ecosystem' },
    title: { zh: '《我的世界》运营生态拆解', en: 'Minecraft Ecosystem Teardown' },
    brief: {
      zh: '对《我的世界》运营生态的系统拆解：玩家分层、UGC 自治、跨版本运营与多平台传播。',
      en: 'A structured teardown of Minecraft’s ecosystem: player tiers, UGC autonomy, version ops and cross-platform reach.',
    },
    roleShort: { zh: '生态分析', en: 'Ecosystem Analysis' },
    roleFull: {
      zh: '以用户分层持续追踪多个产品生态，提炼“官方搭台、玩家唱戏”的运营逻辑与可平移的方法论。',
      en: 'Tracked ecosystems via ongoing player segmentation, distilling the “platform sets the stage, players perform” logic.',
    },
    outcome: {
      value: '4',
      caption: { zh: '观察维度：玩家 / UGC / 版本 / 传播', en: 'Four lenses: players / UGC / versions / reach' },
    },
    points: [
      { zh: '玩家分层与驱动力（创造 / 探索 / 生存 / 社交）', en: 'Player tiers & motives (creative / explore / survival / social)' },
      { zh: 'UGC 生态与玩家自治：官方搭台，玩家唱戏', en: 'UGC autonomy — the platform sets the stage, players perform' },
      { zh: '跨版本运营与内容迭代（1.16 → 1.21）', en: 'Cross-version ops (1.16 → 1.21)' },
      { zh: '多平台生态与社交传播', en: 'Multi-platform reach & social spread' },
    ],
    image: null,
    image2: null,
  },
  {
    slug: 'starrail-koc',
    no: '05',
    category: { zh: '策略模拟', en: 'Strategy Simulation' },
    title: {
      zh: '《崩坏：星穹铁道》KOC 达人矩阵运营方案',
      en: 'Honkai: Star Rail KOC Creator Matrix Plan',
    },
    brief: {
      zh: '面向真实业务的 KOC 达人矩阵运营方案模拟：筛选、内容选题矩阵、宣发节奏、激励体系与数据评估。',
      en: 'A grounded KOC creator-matrix plan: screening, content matrix, release cadence, incentives and measurement.',
    },
    roleShort: { zh: '策略模拟', en: 'Strategy Simulation' },
    roleFull: {
      zh: '在给定约束下完成一套可落地的 KOC 运营闭环：从指标筛选到分赛道选题、分阶段宣发与效果评估。',
      en: 'Delivered an actionable KOC loop under constraints — from screening metrics to per-track content and phased rollout.',
    },
    outcome: {
      value: '5k–5w',
      caption: { zh: '核心 KOC 粉丝量级筛选区间', en: 'Core KOC follower band' },
    },
    points: [
      { zh: 'KOC 筛选指标：内容垂直度 / 平台影响力 / 粉丝画像匹配', en: 'KOC screening: verticality / influence / audience fit' },
      { zh: '内容选题矩阵：硬核攻略 / 剧情考据 / 娱乐二创', en: 'Content matrix: hardcore guides / lore / entertainment' },
      { zh: '宣发节奏：预热 40% · 爆发 40% · 沉淀 20%', en: 'Cadence: warm-up 40% · peak 40% · settle 20%' },
      { zh: '金字塔式分层激励体系', en: 'Tiered pyramid incentive system' },
      { zh: '数据复盘：传播广度 / 互动深度 / 转化效果', en: 'Measurement: reach / engagement / conversion' },
    ],
    image: null,
    image2: null,
  },
]

// ---------- 经历 ----------
export const EXPERIENCE = [
  {
    no: '01',
    org: { zh: '杭州猛犸互动网络科技有限公司', en: 'Hangzhou Mammoth Interactive' },
    role: { zh: '媒介运营 · 内容与 KOC 运营', en: 'Media Ops · Content & KOC' },
    period: { zh: '2025.10 – 2026.01', en: 'Oct 2025 – Jan 2026' },
    highlights: [
      { zh: '对接 50+ 位创作者，建立创作者运营流程', en: 'Owned 50+ creator relationships and a creator ops flow' },
      { zh: '主导“团体积分对抗赛”等达人合作活动', en: 'Led KOC campaigns such as the team-points tournament' },
      { zh: '日均输出《每周创作方向建议》赋能 KOC 选题', en: 'Weekly content-direction briefs that powered KOC topics' },
      { zh: '推动赛制 1v1 → 1v7，运营数据普遍翻倍', en: 'Evolved the format 1v1 → 1v7; metrics broadly doubled' },
    ],
  },
  {
    no: '02',
    org: { zh: '新源县融媒体中心', en: 'Xinyuan Media Center' },
    role: { zh: '新闻制作 · 短视频运营', en: 'News Production · Short Video' },
    period: { zh: '2025.08 – 2025.10', en: 'Aug 2025 – Oct 2025' },
    highlights: [
      { zh: '参与短视频全流程：热点、选题、脚本、制作', en: 'End-to-end short video: trends, topics, scripts, editing' },
      { zh: '累计发布视频 60+ 条，产出 10+ 条原创内容', en: 'Published 60+ videos, 10+ original pieces' },
      { zh: '负责抖音、视频号多平台发布与维护', en: 'Managed Douyin & WeChat Channels distribution' },
      { zh: '从热门视频总结爆款经验并反哺选题', en: 'Fed viral-pattern learnings back into topic selection' },
    ],
  },
]

// ---------- 关于 ----------
export const ABOUT = {
  heading: {
    zh: '在内容与产品之间，把运营做成可复用的方法论。',
    en: 'Between content and product, turning operations into a reusable method.',
  },
  body: {
    zh: '内容运营出身，长期深耕游戏内容生态，熟悉 KOC / 达人合作、活动策划与数据复盘；同时具备 AI 产品落地能力，能从 0 到 1 把想法做成可运行的工具。关注玩家分层、UGC 与创作者体系，习惯用数据和复盘驱动每次迭代。',
    en: 'Started in content operations and long centered on game content ecosystems — close to KOC/creator partnerships, campaign design and data review; also able to ship AI products from 0 to 1 into running tools. Keen on player segmentation, UGC and creator systems, and always driving iteration with data.',
  },
  education: {
    zh: '中国计量大学 · 应用物理学 · 本科',
    en: 'China Jiliang University · Applied Physics · BSc',
  },
  period: { zh: '2022 – 2026', en: '2022 – 2026' },
  games: {
    zh: '长期耕耘：崩坏：星穹铁道 / 我的世界 / 哈利波特：魔法觉醒',
    en: 'Long-term focus: Honkai: Star Rail / Minecraft / HP: Magic Awakened',
  },
  skills: [
    { zh: '运营能力', en: 'Operations' },
    { zh: '数据复盘 · Excel 高级函数 / SQL', en: 'Data review · Excel / SQL' },
    { zh: '内容制作 · 剪映 / PS / EDIUS', en: 'Content · CapCut / PS / EDIUS' },
    { zh: 'AIGC 应用 · 大模型 / 数字人 / AI 音乐', en: 'AIGC · LLMs / digital human / AI music' },
    { zh: '英语 · CET-6', en: 'English · CET-6' },
  ],
}

// ---------- 联系 ----------
export const CONTACT = {
  heading: { zh: '一起做点好的。', en: "Let's build something good." },
  email: '389510966@qq.com',
  phone: '13364719901',
  intent: { zh: '内容运营', en: 'Content Operations' },
}

// ---------- 页脚 ----------
export const FOOTER = {
  note: { zh: '内容 · 产品 · AI · 游戏', en: 'Content · Product · AI · Game' },
  top: { zh: '回到顶部 ↑', en: 'Back to top ↑' },
}
