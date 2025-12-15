import { Category, Tool } from './types';
import { 
  MessageSquare, Image as ImageIcon, Video, ShoppingBag, 
  Wand2, Music, Sparkles, LayoutGrid, Zap, Bot, BrainCircuit,
  Palette, Clapperboard, PenTool, Globe, Music4, Aperture, Film, Type, Code, AudioLines, MonitorPlay
} from 'lucide-react';

export const CATEGORY_ICONS: Record<Category, any> = {
  [Category.CHAT]: MessageSquare,
  [Category.IMAGE]: ImageIcon,
  [Category.VIDEO]: Video,
  [Category.ECOMMERCE]: ShoppingBag,
  [Category.EDITING]: Wand2,
  [Category.MUSIC]: Music,
  [Category.CREATIVE]: Zap,
  [Category.INSPIRATION]: LayoutGrid,
};

// --- Configuration for UI Elements (Backend Friendly) ---

export const USER_PROFILE = {
  name: '北方以南',
  role: '免费版',
  credits: '1,240',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix', // Placeholder avatar
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

export const INSPIRATION_GALLERY = [
  // Images
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1635322966219-b75ed3a90533?q=80&w=800&auto=format&fit=crop',
    prompt: 'Cyberpunk city street at night, neon lights, rain, reflection, 8k, unreal engine 5 render',
    model: 'Midjourney V6',
    user: 'Neo',
    likes: 1204
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop',
    prompt: 'Abstract fluid art, colorful waves, digital painting, 4k wallpaper',
    model: 'Flux.1 Pro',
    user: 'ArtistX',
    likes: 850
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    prompt: 'Neon sign saying "AI FUTURE" on a brick wall, cinematic lighting',
    model: 'Ideogram V2',
    user: 'TypeMaster',
    likes: 932
  },
  {
    id: 4,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=800&auto=format&fit=crop',
    prompt: 'Futuristic robot portrait, detailed mechanical parts, glowing eyes, sci-fi',
    model: 'Midjourney Niji 6',
    user: 'MechaFan',
    likes: 2100
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
    prompt: 'Serene landscape, mountains in mist, watercolor style, traditional chinese painting vibe',
    model: 'Jimeng Pro',
    user: 'ZenMode',
    likes: 560
  },
  {
    id: 6,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    prompt: 'Retro computer terminal, synthwave aesthetic, purple and pink grid',
    model: 'Recraft V3',
    user: 'RetroWave',
    likes: 1340
  },
  {
    id: 7,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop',
    prompt: 'A close up of a colorful flower with water droplets, macro photography',
    model: 'Midjourney V6',
    user: 'NatureLover',
    likes: 420
  },
  {
    id: 8,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=800&auto=format&fit=crop',
    prompt: 'Double exposure of a woman silhouette and a forest, artistic style',
    model: 'Flux.1 Dev',
    user: 'ArtSoul',
    likes: 890
  },
  
  // Videos (Simulated with Images + Play Icon)
  {
    id: 101,
    type: 'video',
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    prompt: 'Cinematic drone shot of a car driving through a coastal highway, sunset',
    model: 'Runway Gen-3',
    user: 'DroneMaster',
    likes: 3500
  },
  {
    id: 102,
    type: 'video',
    url: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=800&auto=format&fit=crop',
    prompt: 'Slow motion ocean waves crashing against rocks, 4k realistic',
    model: 'Kling 1.5',
    user: 'OceanBlue',
    likes: 2100
  },
  {
    id: 103,
    type: 'video',
    url: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop',
    prompt: 'A cyberpunk robot walking in rain, neon reflection, high fidelity',
    model: 'Veo 3.1',
    user: 'CyberKing',
    likes: 4500
  },
  {
    id: 104,
    type: 'video',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    prompt: 'Time lapse of camera lens aperture opening and closing',
    model: 'Luma 1.6',
    user: 'PhotoGeek',
    likes: 1200
  }
];

export const UPGRADE_PLAN = {
  title: '门道 AI 专业版',
  description: '解锁无限创意生产力',
  price: '¥29.9',
  period: '/月',
  features: [
    '解锁 MJ V6 & GPT-4o 模型',
    '极速生成通道 (Fast Mode)',
    '高清无水印下载',
    '专属客服支持'
  ],
  buttonText: '立即升级',
  gradient: 'from-amber-200 via-yellow-400 to-amber-500' // Gold gradient for Pro
};

// -------------------------------------------------------

export const SYSTEM_PROMPTS: Record<string, string> = {
  'ecom-xhs': `你是一个精通小红书爆款逻辑的文案专家。请根据用户输入的主题或产品，撰写一篇极具吸引力的种草笔记。
  
  要求：
  1. 标题：采用“二极管”标题法，带情绪感，包含关键词和Emoji，吸引点击。
  2. 正文：口语化，像闺蜜分享，多用Emoji，分段清晰。包含痛点描述、产品体验、使用场景。
  3. 标签：文末添加5-8个相关热门标签。
  
  风格：真诚、热情、有感染力。`,

  'ecom-product-img': `You are an expert prompt engineer for AI image generation (Midjourney/Stable Diffusion). 
  Convert the user's product description or scene request into a high-quality, detailed English prompt.
  
  Focus on:
  - Product photography style (macro, studio lighting, bokeh).
  - High quality keywords (8k, photorealistic, cinematic, masterpiece).
  - Material and texture details.
  - Composition and background suited for commercial use.
  
  Output ONLY the English prompt.`,
};

export const TOOLS: Tool[] = [
  // ==========================================================
  // AI 视频 (Video)
  // ==========================================================
  {
    id: 'video-veo',
    name: 'Veo',
    category: Category.VIDEO,
    description: '谷歌最新视频生成模型，电影级画质。',
    icon: 'Video',
    provider: 'Google',
    modelId: 'veo-3.1-fast-generate-preview',
    tags: ['NEW'],
    bgGradient: 'from-green-500 to-emerald-600',
    variants: [
      { id: 'veo-3.1-fast', name: 'Veo 3.1 极速版', description: '首帧图生视频，速度快，适合快速验证创意。', badge: 'FAST', cost: '0.6' },
      { id: 'veo-3.1-pro', name: 'Veo 3.1 专业版', description: '最高支持4K分辨率，光影细节完美的电影级效果。', badge: 'PRO', cost: '2.8' },
    ],
    configs: [
      { label: '时长', options: ['5秒', '10秒'], default: '5秒', icon: 'Clock' },
      { label: '分辨率', options: ['720p', '1080p'], default: '1080p', icon: 'Maximize' },
      { label: '比例', options: ['16:9', '9:16'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-runway',
    name: 'Runway',
    category: Category.VIDEO,
    description: '老牌视频生成霸主，可控性极强。',
    icon: 'Clapperboard',
    provider: 'RunwayML',
    modelId: 'runway-gen3',
    tags: ['HOT'],
    bgGradient: 'from-pink-500 to-rose-600',
    variants: [
      { id: 'runway-gen3-turbo', name: 'Runway Gen-3 Turbo', description: '生成速度提升7倍，且保持Gen-3的质量。', badge: 'FAST', cost: '2.5' },
      { id: 'runway-gen3-alpha', name: 'Runway Gen-3 Alpha', description: '极其逼真的物理模拟和光影效果。', badge: 'SOTA', cost: '3.5' },
      { id: 'runway-gen2', name: 'Runway Gen-2', description: '经典的文生视频模型，风格化能力强。', badge: 'STD', cost: '1.2' },
    ],
    configs: [
      { label: '时长', options: ['5s', '10s'], default: '5s', icon: 'Clock' },
      { label: '比例', options: ['16:9', '21:9', '9:16'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-luma',
    name: 'Luma',
    category: Category.VIDEO,
    description: 'Dream Machine，擅长大幅度动作生成。',
    icon: 'Aperture',
    provider: 'Luma Labs',
    modelId: 'luma-1.6',
    tags: ['HOT'],
    bgGradient: 'from-blue-500 to-cyan-500',
    variants: [
      { id: 'luma-1.6', name: 'Dream Machine 1.6', description: '最新版本，动作连贯性大幅提升。', badge: 'NEW', cost: '1.5' },
      { id: 'luma-1.5', name: 'Dream Machine 1.5', description: '高性价比选择。', badge: 'STD', cost: '1.0' },
    ],
    configs: [
      { label: '循环', options: ['开启', '关闭'], default: '关闭', icon: 'Repeat' },
      { label: '比例', options: ['16:9', '9:16', '1:1'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-kling',
    name: '可灵 Kling',
    category: Category.VIDEO,
    description: '快手出品，支持超长5秒/10秒视频生成。',
    icon: 'Film',
    provider: 'Kuaishou',
    modelId: 'kling-1.5',
    tags: ['CN'],
    bgGradient: 'from-orange-500 to-red-500',
    variants: [
      { id: 'kling-1.5', name: '可灵 Kling 1.5', description: '1080P高清画质，物理规律遵循度极高。', badge: 'PRO', cost: '1.8' },
      { id: 'kling-1.0', name: '可灵 Kling 1.0', description: '高性价比选择，生成速度快。', badge: 'STD', cost: '0.8' },
    ],
    configs: [
      { label: '时长', options: ['5s', '10s'], default: '5s', icon: 'Clock' },
      { label: '运镜', options: ['自动', '推近', '拉远'], default: '自动', icon: 'Video' }
    ]
  },
  {
    id: 'video-pika',
    name: 'Pika',
    category: Category.VIDEO,
    description: 'Pika 1.5，物理特效与创意脑洞的结合。',
    icon: 'Zap',
    provider: 'Pika Art',
    modelId: 'pika-1.5',
    tags: ['NEW'],
    bgGradient: 'from-purple-500 to-indigo-500',
    variants: [
      { id: 'pika-1.5', name: 'Pika 1.5', description: '支持Pikaffects特效（压扁、融化等）。', badge: 'FUN', cost: '1.2' }
    ],
    configs: [
      { label: '特效', options: ['无', '融化', '膨胀', '破碎'], default: '无', icon: 'Sparkles' },
      { label: '比例', options: ['16:9', '1:1'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-mochi',
    name: 'Mochi 1',
    category: Category.VIDEO,
    description: 'Genmo出品，开源界目前最强的视频模型。',
    icon: 'Code',
    provider: 'Genmo',
    modelId: 'mochi-1',
    tags: ['OPEN'],
    bgGradient: 'from-emerald-500 to-teal-500',
    variants: [
      { id: 'mochi-1', name: 'Mochi 1 (Preview)', description: '极高的动作保真度，开源SOTA。', badge: 'BETA', cost: '0.5' }
    ],
    configs: [
      { label: '步数', options: ['30', '50'], default: '30', icon: 'Sliders' }
    ]
  },
  {
    id: 'video-hailuo',
    name: '海螺 Hailuo',
    category: Category.VIDEO,
    description: 'MiniMax出品，审美在线，人物美型。',
    icon: 'Sparkles',
    provider: 'MiniMax',
    modelId: 'hailuo-01',
    tags: ['CN'],
    bgGradient: 'from-indigo-500 to-purple-500',
    variants: [
      { id: 'hailuo-01', name: '海螺 Video-01', description: '优秀的色彩和构图审美，适合短片创作。', badge: 'NEW', cost: '1.2' },
    ],
    configs: [
       { label: '比例', options: ['16:9', '9:16'], default: '16:9', icon: 'Monitor' }
    ]
  },
  {
    id: 'video-vidu',
    name: 'Vidu',
    category: Category.VIDEO,
    description: '生数科技出品，一键生成连贯视频。',
    icon: 'MonitorPlay',
    provider: 'ShengShu',
    modelId: 'vidu-1.0',
    tags: [],
    bgGradient: 'from-yellow-500 to-amber-600',
    variants: [
       { id: 'vidu-1.0', name: 'Vidu 1.0', description: '极速生成，镜头语言丰富。', badge: 'FAST', cost: '1.0' }
    ],
    configs: [
      { label: '风格', options: ['写实', '动漫'], default: '写实', icon: 'Palette' }
    ]
  },

  // ==========================================================
  // AI 绘画 (Image)
  // ==========================================================
  {
    id: 'img-midjourney',
    name: 'Midjourney',
    category: Category.IMAGE,
    description: '全球公认最强AI绘图工具，艺术感与质感无敌。',
    icon: 'Palette',
    provider: 'Midjourney',
    modelId: 'mj-v6',
    tags: ['TOP', 'HOT'],
    bgGradient: 'from-indigo-600 to-violet-600',
    variants: [
      { id: 'mj-v6.1', name: 'Midjourney V6.1', description: '最新旗舰版本，画质、细节、人体结构全面提升。', badge: 'V6.1', cost: '0.5', isDefault: true },
      { id: 'mj-niji-6', name: 'Midjourney Niji 6', description: '二次元动漫专用模型，日漫风格表现力极佳。', badge: 'ANIME', cost: '0.5' },
    ],
    configs: [
       { label: '比例', options: ['1:1', '16:9', '9:16', '4:3', '3:4'], default: '1:1', icon: 'Maximize' },
       { label: '风格化', options: ['0', '100', '250', '750'], default: '100', icon: 'Wand2' },
       { label: '混沌', options: ['0', '20', '50'], default: '0', icon: 'Shuffle' }
    ]
  },
  {
    id: 'img-recraft',
    name: 'Recraft',
    category: Category.IMAGE,
    description: 'V3版本被誉为目前最强的文字排版与矢量生成模型。',
    icon: 'PenTool',
    provider: 'Recraft AI',
    modelId: 'recraft-v3',
    tags: ['NEW', 'SOTA'],
    bgGradient: 'from-red-500 to-orange-500',
    variants: [
      { id: 'recraft-v3', name: 'Recraft V3 (Red Panda)', description: '在此刻，它的文字渲染能力超越了Flux。', badge: 'TOP', cost: '0.4' },
      { id: 'recraft-vector', name: 'Recraft Vector', description: '生成可编辑的SVG矢量图。', badge: 'SVG', cost: '0.6' }
    ],
    configs: [
      { label: '类型', options: ['光栅图', '矢量图'], default: '光栅图', icon: 'Image' },
      { label: '比例', options: ['1:1', '16:9'], default: '1:1', icon: 'Maximize' }
    ]
  },
  {
    id: 'img-flux',
    name: 'Flux.1',
    category: Category.IMAGE,
    description: 'Black Forest Labs力作，写实感与文字生成能力超越MJ。',
    icon: 'Zap',
    provider: 'Black Forest',
    modelId: 'flux-pro',
    tags: ['HOT'],
    bgGradient: 'from-cyan-600 to-blue-600',
    variants: [
      { id: 'flux-1.1-pro', name: 'Flux 1.1 Pro', description: '最新发布的超强版本，速度快6倍，质量更好。', badge: 'NEW', cost: '0.4' },
      { id: 'flux-pro', name: 'Flux.1 Pro', description: '闭源顶配版本，细节和遵循度达到SOTA水平。', badge: 'PRO', cost: '0.3' },
      { id: 'flux-dev', name: 'Flux.1 Dev', description: '开源版本中的最强王者，适合各种通用场景。', badge: 'DEV', cost: '0.1' },
      { id: 'flux-schnell', name: 'Flux.1 Schnell', description: '极速生成，4步出图，质量依然惊人。', badge: 'FAST', cost: '0.05' },
    ],
    configs: [
      { label: '比例', options: ['1:1', '16:9', '9:16', '21:9'], default: '1:1', icon: 'Maximize' }
    ]
  },
  {
    id: 'img-ideogram',
    name: 'Ideogram',
    category: Category.IMAGE,
    description: '文字渲染能力极强，适合海报、Logo设计。',
    icon: 'Type',
    provider: 'Ideogram',
    modelId: 'ideogram-v2',
    tags: ['TEXT'],
    bgGradient: 'from-fuchsia-600 to-pink-600',
    variants: [
      { id: 'ideogram-v2', name: 'Ideogram V2.0', description: '目前文字排版能力最强的绘图模型。', badge: 'V2', cost: '0.25' }
    ],
    configs: [
       { label: '风格', options: ['通用', '设计', '3D', '动漫'], default: '通用', icon: 'Palette' }
    ]
  },
  {
    id: 'img-dalle',
    name: 'DALL·E 3',
    category: Category.IMAGE,
    description: 'OpenAI出品，语义理解能力极强，指哪打哪。',
    icon: 'Bot',
    provider: 'OpenAI',
    modelId: 'dalle-3',
    tags: [],
    bgGradient: 'from-green-500 to-emerald-500',
    variants: [
       { id: 'dalle-3', name: 'DALL·E 3', description: '精准还原复杂的提示词逻辑。', badge: 'STD', cost: '0.3' }
    ],
    configs: [
       { label: '画质', options: ['标准', '高清'], default: '标准', icon: 'Monitor' },
       { label: '比例', options: ['1:1', '16:9', '9:16'], default: '1:1', icon: 'Maximize' }
    ]
  },

  // ==========================================================
  // AI 对话 (Chat)
  // ==========================================================
  {
    id: 'chat-gpt',
    name: 'ChatGPT',
    category: Category.CHAT,
    description: 'OpenAI 旗舰模型系列，智能的代名词。',
    icon: 'Bot',
    provider: 'OpenAI',
    modelId: 'gpt-4o',
    tags: ['TOP'],
    bgGradient: 'from-emerald-600 to-teal-600',
    variants: [
      { id: 'gpt-4o', name: 'GPT-4o', description: '全能旗舰，多模态能力最强，速度快。', badge: 'OMNI', cost: '0.1' },
      { id: 'o1-preview', name: 'OpenAI o1-preview', description: '拥有强大的思维链，擅长复杂数理逻辑。', badge: 'REASON', cost: '0.5' },
      { id: 'gpt-4o-mini', name: 'GPT-4o mini', description: '性价比之选，适合日常对话。', badge: 'MINI', cost: '0.01' },
    ]
  },
  {
    id: 'chat-claude',
    name: 'Claude',
    category: Category.CHAT,
    description: 'Anthropic出品，代码能力和长文本阅读最强。',
    icon: 'BrainCircuit',
    provider: 'Anthropic',
    modelId: 'claude-3.5',
    tags: ['CODE'],
    bgGradient: 'from-orange-600 to-amber-600',
    variants: [
      { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: '目前编程和逻辑推理能力公认第一。', badge: 'SOTA', cost: '0.1' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', description: '之前的旗舰，擅长深度写作和创意。', badge: 'PRO', cost: '0.3' },
    ]
  },
  {
    id: 'chat-gemini',
    name: 'Gemini',
    category: Category.CHAT,
    description: 'Google 最强模型，原生多模态，超长上下文。',
    icon: 'Sparkles',
    provider: 'Google',
    modelId: 'gemini-1.5-pro',
    tags: [],
    bgGradient: 'from-blue-600 to-indigo-600',
    variants: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: '支持200万token超长上下文，大海捞针。', badge: 'PRO', cost: '0.1' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: '速度极快，延迟极低。', badge: 'FAST', cost: '0.01' },
    ]
  },
  {
    id: 'chat-deepseek',
    name: 'DeepSeek',
    category: Category.CHAT,
    description: '深度求索出品，国产开源之光，数学代码强劲。',
    icon: 'Code',
    provider: 'DeepSeek',
    modelId: 'deepseek-v2.5',
    tags: ['CN'],
    bgGradient: 'from-blue-500 to-cyan-500',
    variants: [
       { id: 'deepseek-v2.5', name: 'DeepSeek V2.5', description: '融合了Coder和Chat能力的最新版本。', badge: 'V2.5', cost: '0.01' }
    ]
  },

  // --- AI 音乐 (Music) ---
  {
    id: 'music-suno',
    name: 'Suno',
    category: Category.MUSIC,
    description: '输入歌词，生成广播级完整的歌曲。',
    icon: 'Music',
    provider: 'Suno',
    modelId: 'suno-v3.5',
    tags: ['HOT'],
    bgGradient: 'from-gray-800 to-gray-900',
    variants: [
        { id: 'suno-v3.5', name: 'Suno V3.5', description: '最新版本，支持更长歌曲，结构更完整。', badge: 'V3.5', cost: '0.5' }
    ],
    configs: [
      { label: '歌词', options: ['自动', '自定义', '纯音乐'], default: '自动', icon: 'Type' },
      { label: '风格', options: ['Pop', 'Rock', 'Jazz', 'Electronic'], default: 'Pop', icon: 'Music' }
    ]
  },
  {
    id: 'music-udio',
    name: 'Udio',
    category: Category.MUSIC,
    description: '音质最强，人声还原度极高的音乐模型。',
    icon: 'AudioLines',
    provider: 'Udio',
    modelId: 'udio-1.5',
    tags: ['TOP'],
    bgGradient: 'from-pink-600 to-red-600',
    variants: [
        { id: 'udio-1.5', name: 'Udio 1.5', description: '音质清晰度大幅提升，立体声效果更好。', badge: 'PRO', cost: '0.6' }
    ],
    configs: [
      { label: '时长', options: ['30s', '2min'], default: '30s', icon: 'Clock' },
      { label: '清晰度', options: ['标准', '超清'], default: '超清', icon: 'Sparkles' }
    ]
  },
  {
    id: 'music-stable',
    name: 'Stable Audio',
    category: Category.MUSIC,
    description: 'Stability AI出品，擅长背景音乐和音效生成。',
    icon: 'Radio',
    provider: 'Stability',
    modelId: 'stable-audio-2',
    tags: [],
    bgGradient: 'from-purple-600 to-blue-600',
    variants: [
        { id: 'stable-audio-2', name: 'Stable Audio 2.0', description: '支持长达3分钟的连贯音乐生成。', badge: 'V2.0', cost: '0.3' }
    ],
    configs: [
       { label: '时长', options: ['45s', '3min'], default: '45s', icon: 'Clock' }
    ]
  }
];