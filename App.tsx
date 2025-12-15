import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import Workspace from './components/Workspace';
import InspirationGallery from './components/InspirationGallery';
import SettingsModal from './components/SettingsModal';
import { Category, Tool } from './types';
import { TOOLS, USER_PROFILE } from './constants';
import { Search, Bell, Sparkles, Command, ChevronDown, Coins, User, LogOut, Settings, CreditCard } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'DASHBOARD'>('DASHBOARD');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Dropdown & Settings State
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [initialSettingsTab, setInitialSettingsTab] = useState<'profile' | 'billing' | 'apikey'>('profile');
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter tools
  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'DASHBOARD' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryTitle = () => {
      if (selectedCategory === 'DASHBOARD') return '探索模型';
      return selectedCategory;
  };

  const handleStartNow = () => {
      // Find the featured tool (Veo or Gemini)
      const featured = TOOLS.find(t => t.id === 'video-veo') || TOOLS[0];
      setActiveTool(featured);
  };
  
  const openSettings = (tab: 'profile' | 'billing' | 'apikey') => {
      setInitialSettingsTab(tab);
      setShowSettingsModal(true);
      setIsUserMenuOpen(false);
  };

  const renderDashboard = () => (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-background relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-900/10 to-transparent pointer-events-none"></div>

      {/* Top Navigation */}
      <div className="h-20 px-8 flex items-center justify-between z-10 bg-background/50 backdrop-blur-sm sticky top-0">
         {/* Search Bar */}
         <div className="flex-1 max-w-xl">
            {selectedCategory !== Category.INSPIRATION && (
              <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="搜索 AI 模型、工具..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-gray-500">
                          <Command size={10} />
                          <span>K</span>
                      </div>
                  </div>
              </div>
            )}
         </div>

         {/* Right Side: User Interface */}
         <div className="flex items-center gap-4 ml-6">
            
            {/* Credits Balance */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface border border-white/5 rounded-full">
                <div className="w-5 h-5 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Coins size={12} className="text-yellow-500" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[10px] text-gray-500 font-medium">算力余额</span>
                    <span className="text-xs font-bold text-white">{USER_PROFILE.credits}</span>
                </div>
                <button className="ml-1 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                    <span className="text-[14px] leading-none mb-0.5">+</span>
                </button>
            </div>

            <div className="h-6 w-[1px] bg-white/10"></div>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
               <Bell size={18} />
               <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-background"></span>
            </button>

            {/* User Dropdown Trigger */}
            <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-3 pl-1 pr-2 py-1 hover:bg-white/5 rounded-full transition-colors group ${isUserMenuOpen ? 'bg-white/5' : ''}`}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 p-[1px]">
                       <img src={USER_PROFILE.avatar} alt="User" className="w-full h-full rounded-full bg-surface object-cover" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-white group-hover:text-primary-400 transition-colors">{USER_PROFILE.name}</span>
                        <span className="text-[9px] text-gray-500 bg-white/5 px-1.5 py-[1px] rounded flex items-center gap-1">
                            {USER_PROFILE.role} <ChevronDown size={8} />
                        </span>
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-top-2 fade-in duration-200 z-50">
                      <div className="p-3 border-b border-white/5 mb-1">
                          <p className="text-sm font-bold text-white">{USER_PROFILE.name}</p>
                          <p className="text-xs text-gray-500">{USER_PROFILE.email}</p>
                      </div>
                      
                      <button 
                         onClick={() => openSettings('profile')}
                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                          <User size={16} />
                          <span>个人设置</span>
                      </button>
                      <button 
                         onClick={() => openSettings('billing')}
                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                          <CreditCard size={16} />
                          <span>账单与订阅</span>
                      </button>
                      <button 
                         onClick={() => openSettings('apikey')}
                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                          <Settings size={16} />
                          <span>API Key 管理</span>
                      </button>
                      
                      <div className="h-[1px] bg-white/5 my-1"></div>
                      
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut size={16} />
                          <span>退出登录</span>
                      </button>
                  </div>
                )}
            </div>
         </div>
      </div>

      {/* Content Scroll Area */}
      {selectedCategory === Category.INSPIRATION ? (
          <InspirationGallery />
      ) : (
          <div className="flex-1 overflow-y-auto p-8 pt-2 scroll-smooth">
             
             {/* Hero Section (only on Dashboard) */}
             {selectedCategory === 'DASHBOARD' && !searchQuery && (
               <div className="mb-10 animate-in slide-in-from-bottom-5 duration-500">
                   <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-surface h-[320px]">
                      {/* Hero Content */}
                      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-center max-w-2xl">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 w-fit mb-6 backdrop-blur-md">
                              <Sparkles size={14} className="text-yellow-400" />
                              <span className="text-xs font-medium text-white">门道 AI 3.0 正式上线</span>
                          </div>
                          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                              释放无限 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">创意潜能</span>
                          </h1>
                          <p className="text-lg text-gray-400 mb-8 max-w-lg">
                              一站式接入全球顶尖模型。Midjourney V6 绘图、Gemini Pro 推理、Veo 视频生成，尽在掌握。
                          </p>
                          <div className="flex gap-4">
                              <button 
                                 onClick={handleStartNow}
                                 className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 flex items-center gap-2"
                              >
                                  立即开始
                              </button>
                              <button className="px-6 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md">
                                  查看教程
                              </button>
                          </div>
                      </div>
    
                      {/* Hero Visuals */}
                      <div className="absolute top-0 right-0 w-1/2 h-full">
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background z-10"></div>
                          {/* Decorative elements simulating AI generation */}
                          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                      </div>
                   </div>
               </div>
             )}
    
             {/* Section Header */}
             <div className="flex items-end justify-between mb-6">
                 <div className="flex items-center gap-3">
                     <h2 className="text-2xl font-bold text-white">{getCategoryTitle()}</h2>
                     <span className="text-sm text-gray-500 bg-surface px-2 py-0.5 rounded border border-white/5">
                         {filteredTools.length} 个模型
                     </span>
                 </div>
                 {selectedCategory === 'DASHBOARD' && (
                    <div className="flex gap-2">
                        {['全部', '热门', '最新', '免费'].map(filter => (
                            <button key={filter} className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-surface border border-white/5 rounded-lg hover:border-white/20 transition-all">
                                {filter}
                            </button>
                        ))}
                    </div>
                 )}
             </div>
    
             {/* Tool Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {filteredTools.map(tool => (
                   <ToolCard key={tool.id} tool={tool} onClick={setActiveTool} />
                ))}
                {filteredTools.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">
                        <Sparkles size={32} className="mb-4 opacity-50" />
                        <p>没有找到相关工具</p>
                    </div>
                )}
             </div>
          </div>
      )}
      
      {showSettingsModal && (
        <SettingsModal 
           initialTab={initialSettingsTab} 
           onClose={() => setShowSettingsModal(false)} 
        />
      )}
    </div>
  );
};

export default App;