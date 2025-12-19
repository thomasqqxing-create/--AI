export enum Category {
  CHAT = 'AI 对话',
  IMAGE = 'AI 绘画',
  VIDEO = 'AI 视频',
  PROGRAM = '程序广场',
  ECOMMERCE = 'AI 电商',
  EDITING = 'AI 修图',
  MUSIC = 'AI 音乐',
  CREATIVE = '创意特效',
  INSPIRATION = '灵感广场',
}

export interface ToolVariant {
  id: string;
  name: string;
  description: string;
  badge?: string; // e.g. 'Fast', 'Pro'
  cost?: string;
  isDefault?: boolean;
}

export interface ToolConfig {
  label: string;
  options: string[];
  default: string;
  icon: string; // Lucide icon name
}

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon: string; // URL or Lucide icon name
  provider: string;
  modelId: string; // The underlying model ID to use (or simulate)
  tags?: string[]; // 'NEW', 'HOT', 'PRO', 'FREE'
  bgGradient?: string; // Optional custom background for the icon
  variants?: ToolVariant[];
  configs?: ToolConfig[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  type: 'text' | 'image' | 'video' | 'mixed';
  imageUrl?: string;
  videoUrl?: string;
  timestamp: number;
  modelUsed?: string;
}

export interface UserState {
  apiKey: string | null;
}