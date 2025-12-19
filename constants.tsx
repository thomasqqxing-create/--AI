
import { Category, Tool } from './types';
import { 
  MessageSquare, Image as ImageIcon, Video, ShoppingBag, 
  Wand2, Music, Sparkles, LayoutGrid, Zap, Bot, BrainCircuit,
  Palette, Clapperboard, PenTool, Globe, Music4, Aperture, Film, Type, Code, AudioLines, MonitorPlay,
  Terminal, Package, Search, Cpu, Radio, Sliders, Shuffle, Clock, Maximize, Repeat, Monitor
} from 'lucide-react';

export const CATEGORY_ICONS: Record<Category, any> = {
  [Category.CHAT]: MessageSquare,
  [Category.IMAGE]: ImageIcon,
  [Category.VIDEO]: Video,
  [Category.PROGRAM]: Terminal,
  [Category.ECOMMERCE]: ShoppingBag,
  [Category.EDITING]: Wand2,
  [Category.MUSIC]: Music,
  [Category.CREATIVE]: Zap,
  [Category.INSPIRATION]: LayoutGrid,
};

export const USER_PROFILE = {
  name: '北方以南',
  role: '尊贵专业版',
  credits: '12,240',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix',
  email: 'north_south@mendao.ai'
};

export const PRICING_PLANS = [
  {
    id: 'week',
    name: '体验周卡',
    price: '9.9',
    period: '/周',
    features: ['基础模型访问', '300 算力/周', '标准生成速度', '社区技术支持'],
    recommend: false,
    gradient: 'from-gray-700 to-gray-600',
    button: '尝鲜体验'
  },
  {
    id: 'month',
    name: '专业月卡',
    price: '29.9',
    period: '/月',
    features: ['解锁 MJ V6 & GPT-4o', '2000 算力/月', '极速 Fast 模式', '高清无水印下载', '专属客服支持'],
    recommend: true,
    gradient: 'from-amber-400 to-orange-500',
    button: '立即升级'
  },
  {
    id: 'life',
    name: '终身会员',
    price: '299',
    period: '/永久',
    features: ['全模型无限畅享', '无限算力 (FUP)', '专属独享节点', '优先体验新功能', '1对1 技术专家支持'],
    recommend: false,
    gradient: 'from-blue-600 to-indigo-600',
    button: '尊贵独享'
  }
];

export const PROGRAM_TOOLS = [
  { id: 'p-1', name: '爆款文章生成器', description: '深度学习小红书、公众号爆款逻辑，一键生成高点击率推文。', author: '门道官方', icon: 'PenTool', users: '12.4k', tags: ['官方', '文案'], verified: true },
  { id: 'p-2', name: '电商详情页专家', description: '输入产品参数，自动生成符合各大平台的专业商详页排版与文案。', author: '门道官方', icon: 'ShoppingBag', users: '8.1k', tags: ['官方', '电商'], verified: true },
  { id: 'p-3', name: '万能翻译官 Pro', description: '支持100+语种，结合上下文理解，提供最地道的翻译。', author: '社区贡献', icon: 'Globe', users: '23k', tags: ['实用', '翻译'], verified: false },
  { id: 'p-4', name: '代码审计专家', description: '基于 Claude 3.5 内核，深度扫描您的代码逻辑漏洞与优化建议。', author: '社区贡献', icon: 'Code', users: '5.2k', tags: ['技术', '编程'], verified: false },
  { id: 'p-5', name: 'SEO 关键词提取器', description: '分析竞品网页，智能提取核心SEO关键词与流量入口。', author: '门道官方', icon: 'Search', users: '3.4k', tags: ['官方', '工具'], verified: true },
  { id: 'p-6', name: 'AI 流程图生成', description: '输入逻辑描述，自动绘制Mermaid或SVG流程图。', author: '社区贡献', icon: 'LayoutGrid', users: '1.9k', tags: ['提效'], verified: false }
];

// Fix: Add SYSTEM_PROMPTS export for Workspace.tsx
export const SYSTEM_PROMPTS: Record<string, string> = {
  'p-1': '你是一个爆款文章生成专家，擅长模仿小红书、公众号的语言风格和排版逻辑。',
  'p-2': '你是一个资深电商专家，擅长撰写高转化率的产品详情页文案。',
  'chat-gpt': 'You are a highly capable AI assistant powered by Gemini 3 Pro, ready to help with reasoning, coding, and creative tasks.',
  'chat-claude': 'You are a creative and efficient assistant powered by Gemini 3 Flash.',
  'chat-deepseek': 'You are a logical assistant focused on providing concise and accurate information.',
};

export const TOOLS: Tool[] = [
  // AI 视频 (Video)
  {
    id: 'video-veo',
    name: 'Veo',
    category: Category.VIDEO,
    description: '谷歌最新视频生成模型，电影级画质，光影细节完美。',
    icon: 'Video',
    provider: 'Google',
    modelId: 'veo-3.1-fast-generate-preview',
    tags: ['NEW', 'SOTA'],
    bgGradient: 'from-green-500 to-emerald-600',
    variants: [
      { id: 'veo-3.1-fast', name: 'Veo 3.1 极速版', description: '生成速度极快，适合快速验证。', badge: 'FAST', cost: '0.6' },
      { id: 'veo-3.1-pro', name: 'Veo 3.1 专业版', description: '最高画质支持，电影感十足。', badge: 'PRO', cost: '2.8' },
    ],
    configs: [
      { label: '时长', options: ['5s', '10s'], default: '5s', icon: 'Clock' },
      { label: '比例', options: ['16:9', '9:16'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-runway',
    name: 'Runway Gen-3',
    category: Category.VIDEO,
    description: '老牌视频霸主，物理模拟和可控性极佳。',
    icon: 'Clapperboard',
    provider: 'RunwayML',
    modelId: 'runway-gen3-alpha',
    tags: ['HOT'],
    bgGradient: 'from-pink-500 to-rose-600',
    variants: [
      { id: 'gen3-turbo', name: 'Gen-3 Turbo', description: '极速生成模式。', badge: 'FAST', cost: '1.5' },
      { id: 'gen3-alpha', name: 'Gen-3 Alpha', description: '极致物理保真度。', badge: 'PRO', cost: '3.5' },
    ],
    configs: [
      { label: '时长', options: ['5s', '10s'], default: '5s', icon: 'Clock' },
      { label: '比例', options: ['16:9', '21:9', '9:16'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-kling',
    name: '可灵 Kling',
    category: Category.VIDEO,
    description: '国产之光，支持超长视频生成，人物动作连贯。',
    icon: 'Film',
    provider: 'Kuaishou',
    modelId: 'kling-1.5',
    tags: ['CN', 'HOT'],
    bgGradient: 'from-orange-500 to-red-500',
    variants: [
      { id: 'kling-1.5', name: '可灵 1.5', description: '全高清 1080P 出图。', badge: 'V1.5', cost: '1.2' }
    ],
    configs: [
      { label: '时长', options: ['5s', '10s'], default: '5s', icon: 'Clock' },
      { label: '运镜', options: ['自动', '平移', '拉远'], default: '自动', icon: 'Video' }
    ]
  },
  {
    id: 'video-luma',
    name: 'Luma Dream Machine',
    category: Category.VIDEO,
    description: '擅长处理大幅度、极具张力的动作生成。',
    icon: 'Zap',
    provider: 'Luma Labs',
    modelId: 'luma-1.6',
    tags: ['HOT'],
    bgGradient: 'from-blue-500 to-cyan-500',
    variants: [
      { id: 'luma-1.6', name: 'Luma 1.6', description: '最新动态增强版本。', badge: 'NEW', cost: '1.0' }
    ],
    configs: [
      { label: '循环', options: ['开启', '关闭'], default: '关闭', icon: 'Repeat' }
    ]
  },

  // AI 绘画 (Image)
  {
    id: 'img-midjourney',
    name: 'Gemini Image Studio',
    category: Category.IMAGE,
    description: '基于 Gemini 2.5 Flash Image 驱动，支持极速、高质量图像生成与编辑。',
    icon: 'Palette',
    provider: 'Google',
    modelId: 'gemini-2.5-flash-image',
    tags: ['TOP', 'HOT'],
    bgGradient: 'from-indigo-600 to-violet-600',
    variants: [
      { id: 'gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image', description: '极致画质与写实感。', badge: 'V2.5', cost: '0.5' },
    ],
    configs: [
       { label: '比例', options: ['1:1', '16:9', '9:16', '4:3', '3:4'], default: '1:1', icon: 'Maximize' }
    ]
  },
  {
    id: 'img-flux',
    name: 'Flux.1',
    category: Category.IMAGE,
    description: '目前最强开源模型，写实感与文字生成能力一流。',
    icon: 'Zap',
    provider: 'Black Forest',
    modelId: 'flux-pro',
    tags: ['NEW', 'SOTA'],
    bgGradient: 'from-cyan-600 to-blue-600',
    variants: [
      { id: 'flux-1.1-pro', name: 'Flux 1.1 Pro', description: '极速且高质。', badge: 'PRO', cost: '0.4' },
      { id: 'flux-dev', name: 'Flux Dev', description: '平衡性最佳。', badge: 'DEV', cost: '0.1' }
    ]
  },
  {
    id: 'img-recraft',
    name: 'Recraft V3',
    category: Category.IMAGE,
    description: '设计师神器，文字排版与矢量生成能力冠绝。',
    icon: 'PenTool',
    provider: 'Recraft AI',
    modelId: 'recraft-v3',
    tags: ['DESIGN'],
    bgGradient: 'from-red-500 to-orange-500',
    variants: [
      { id: 'recraft-v3', name: 'Recraft V3', description: '全能平面设计。', badge: 'V3', cost: '0.3' }
    ]
  },

  // AI 对话 (Chat)
  {
    id: 'chat-gpt',
    name: 'Gemini 3 Pro',
    category: Category.CHAT,
    description: '谷歌旗舰级推理模型，具备极强的逻辑思考与多模态理解能力。',
    icon: 'Bot',
    provider: 'Google',
    modelId: 'gemini-3-pro-preview',
    tags: ['TOP'],
    bgGradient: 'from-emerald-600 to-teal-600',
    variants: [
      { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro', description: '旗舰多模态。', badge: 'PRO', cost: '0.1' },
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', description: '极速版旗舰。', badge: 'FLASH', cost: '0.01' },
    ]
  },
  {
    id: 'chat-claude',
    name: 'Gemini 3 Flash',
    category: Category.CHAT,
    description: '极速多模态助手，适合日常对话、总结与快速问答。',
    icon: 'BrainCircuit',
    provider: 'Google',
    modelId: 'gemini-3-flash-preview',
    tags: ['CODE', 'HOT'],
    bgGradient: 'from-orange-600 to-amber-600',
    variants: [
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', description: '平衡性能与速度。', badge: 'SOTA', cost: '0.1' }
    ]
  },
  {
    id: 'chat-deepseek',
    name: 'Gemini Flash-Lite',
    category: Category.CHAT,
    description: '轻量化高性能模型，极致性价比。',
    icon: 'Code',
    provider: 'Google',
    modelId: 'gemini-flash-lite-latest',
    tags: ['CN', 'VALUABLE'],
    bgGradient: 'from-blue-500 to-cyan-500',
    variants: [
       { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite', description: '高性价比对话大师。', badge: 'LITE', cost: '0.01' }
    ]
  },

  // AI 音乐 (Music)
  {
    id: 'music-suno',
    name: 'Suno V3.5',
    category: Category.MUSIC,
    description: '一键生成广播级完整的词曲唱音乐。',
    icon: 'Music',
    provider: 'Suno',
    modelId: 'suno-v3.5',
    tags: ['HOT'],
    bgGradient: 'from-gray-800 to-gray-900',
    variants: [
        { id: 'suno-v3.5', name: 'Suno V3.5', description: '完整歌曲生成。', badge: 'V3.5', cost: '0.5' }
    ]
  },
  {
    id: 'music-udio',
    name: 'Udio 1.5',
    category: Category.MUSIC,
    description: '音质天花板，人声还原极其逼真。',
    icon: 'AudioLines',
    provider: 'Udio',
    modelId: 'udio-1.5',
    tags: ['NEW'],
    bgGradient: 'from-pink-600 to-red-600',
    variants: [
        { id: 'udio-1.5', name: 'Udio 1.5', description: '高保真音频输出。', badge: 'PRO', cost: '0.6' }
    ]
  }
];

export const INSPIRATION_GALLERY = [
  // 图像数据 (扩展到20+以充满页面)
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1635322966219-b75ed3a90533?q=80&w=800', prompt: 'Cyberpunk city street at night, neon lights, rain, reflection, 8k, unreal engine 5 render', model: 'Midjourney V6', user: 'Neo', likes: 1204 },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800', prompt: 'Abstract fluid art, colorful waves, digital painting, 4k wallpaper', model: 'Flux.1 Pro', user: 'ArtistX', likes: 850 },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800', prompt: 'Neon sign saying "AI FUTURE" on a brick wall, cinematic lighting', model: 'Ideogram V2', user: 'TypeMaster', likes: 932 },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=800', prompt: 'Futuristic robot portrait, detailed mechanical parts, glowing eyes, sci-fi', model: 'Midjourney Niji 6', user: 'MechaFan', likes: 2100 },
  { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800', prompt: 'Serene landscape, mountains in mist, watercolor style', model: 'Jimeng Pro', user: 'ZenMode', likes: 560 },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', prompt: 'Retro computer terminal, synthwave aesthetic, purple and pink grid', model: 'Recraft V3', user: 'RetroWave', likes: 1340 },
  { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800', prompt: 'Colorful flower with water droplets, macro photography', model: 'Midjourney V6', user: 'NatureLover', likes: 420 },
  { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=800', prompt: 'Double exposure of a woman silhouette and a forest', model: 'Flux.1 Dev', user: 'ArtSoul', likes: 890 },
  { id: 9, type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800', prompt: 'Cyberpunk dreamscape, colorful geometry, infinite horizon', model: 'Midjourney V6', user: 'Abstracto', likes: 1540 },
  { id: 10, type: 'image', url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800', prompt: 'Sunset over a fantasy island, flying birds', model: 'DALL-E 3', user: 'FantasyWorld', likes: 3200 },
  { id: 11, type: 'image', url: 'https://images.unsplash.com/photo-1541450805268-4822a3a774ce?q=80&w=800', prompt: 'Mechanical heart, steampunk gears', model: 'Flux.1 Pro', user: 'GearsAndSteam', likes: 210 },
  { id: 12, type: 'image', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800', prompt: 'Volcanic eruption on purple planet', model: 'Midjourney V6', user: 'CosmicTraveler', likes: 1100 },
  { id: 13, type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800', prompt: 'Minimalist 3D floating sphere', model: 'Recraft V3', user: 'SimpleAI', likes: 450 },
  { id: 14, type: 'image', url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800', prompt: 'Steampunk owl, golden clockwork', model: 'Flux.1 Pro', user: 'Inventor', likes: 2300 },
  { id: 15, type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800', prompt: 'Floating mountains, waterfalls upwards', model: 'DALL-E 3', user: 'Dreamer', likes: 980 },
  { id: 16, type: 'image', url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800', prompt: 'A cozy coffee shop in a futuristic city', model: 'Midjourney V6', user: 'CafeFan', likes: 670 },
  { id: 17, type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800', prompt: 'Cyberpunk samurai in heavy rain', model: 'Niji 6', user: 'Ronin', likes: 4500 },

  // 视频数据
  { id: 101, type: 'video', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800', prompt: 'Cinematic drone shot of coastal highway', model: 'Runway Gen-3', user: 'DroneMaster', likes: 3500 },
  { id: 102, type: 'video', url: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=800', prompt: 'Slow motion ocean waves crashing', model: 'Kling 1.5', user: 'OceanBlue', likes: 2100 },
  { id: 103, type: 'video', url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800', prompt: 'Cyberpunk robot walking in rain', model: 'Veo 3.1', user: 'CyberKing', likes: 4500 },
  { id: 104, type: 'video', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', prompt: 'Camera lens aperture opening', model: 'Luma 1.6', user: 'PhotoGeek', likes: 1200 },
  { id: 105, type: 'video', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800', prompt: 'Abstract paint splashing in water', model: 'Runway Gen-3', user: 'ColorFlow', likes: 890 },
  { id: 106, type: 'video', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800', prompt: 'Cozy fireplace in wooden cabin', model: 'Sora Beta', user: 'CozyHome', likes: 5600 },
  { id: 107, type: 'video', url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800', prompt: 'Busy market in Venice canals', model: 'Kling 1.5', user: 'Traveler', likes: 1200 },
  { id: 108, type: 'video', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800', prompt: 'Sunlight filtering through forest canopy', model: 'Luma 1.6', user: 'NatureBoy', likes: 750 }
];

export const UPGRADE_PLAN = {
  title: '门道 AI 专业版',
  description: '解锁无限创意生产力',
  price: '¥29.9',
  period: '/月',
  features: ['解锁 MJ V6 & GPT-4o 模型', '极速生成通道 (Fast Mode)', '高清无水印下载', '专属客服支持'],
  buttonText: '立即升级',
  gradient: 'from-amber-200 via-yellow-400 to-amber-500'
};
