import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import Workspace from './components/Workspace';
import InspirationGallery from './components/InspirationGallery';
import ProgramSquare from './components/ProgramSquare';
import SettingsModal from './components/SettingsModal';
import { Category, Tool } from './types';
import { TOOLS, USER_PROFILE } from './constants';
import { Search, Bell, Sparkles, Command, ChevronDown, Coins, User, LogOut, Settings, CreditCard } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'DASHBOARD'>('DASHBOARD');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [initialSettingsTab, setInitialSettingsTab] = useState<'profile' | 'billing' | 'apikey'>('profile');
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'DASHBOARD' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryTitle = () => {
      if (selectedCategory === 'DASHBOARD') return '探索聚合模型';
      return selectedCategory;
  };

  const handleStartNow = () => {
      const featured = TOOLS.find(t => t.id === 'video-veo') || TOOLS[0];
      setActiveTool(featured);
  };
  
  const openSettings = (tab: 'profile' | 'billing' | 'apikey') => {
      setInitialSettingsTab(tab);
      setShowSettingsModal(true);
      setIsUserMenuOpen(false);
  };

  const renderContent = () => {
    if (selectedCategory === Category.INSPIRATION) return <InspirationGallery />;
    if (selectedCategory === Category.PROGRAM) return <ProgramSquare />;

    return (
      <div className="flex-1 overflow-y-auto p-8 pt-2 scroll-smooth">
         {selectedCategory === 'DASHBOARD' && !searchQuery && (
           <div className="mb-10 animate-in slide-in-from-bottom-5 duration-500">
               <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-surface h-[320px]">
                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-center max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 w-fit mb-6 backdrop-blur-md">
                          <Sparkles size={14} className="text-yellow-400" />
                          <span className="text-xs font-medium text-white">门道 AI 3.0 全球模型聚合站</span>
                      </div>
                      <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                          释放无限 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">创意潜能</span>
                      </h1>
                      <p className="text-lg text-gray-400 mb-8 max-w-lg">
                          Midjourney V6, Sora, Kling, GPT-4o, Claude 3.5... 顶尖模型一站通达。
                      </p>
                      <div className="flex gap-4">
                          <button onClick={handleStartNow} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors">立即体验</button>
                          <button className="px-6 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors">查看广场</button>
                      </div>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background z-10"></div>
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000')] bg-cover bg-center opacity-60"></div>
                  </div>
               </div>
           </div>
         )}

         <div className="flex items-end justify-between mb-6">
             <div className="flex items-center gap-3">
                 <h2 className="text-2xl font-bold text-white">{getCategoryTitle()}</h2>
                 <span className="text-sm text-gray-500 bg-surface px-2 py-0.5 rounded border border-white/5">
                     {filteredTools.length} 个主流模型
                 </span>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {filteredTools.map(tool => (
               <ToolCard key={tool.id} tool={tool} onClick={setActiveTool} />
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-background text-white font-sans selection:bg-primary-500/30">
      <Sidebar selectedCategory={selectedCategory} onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTool(null);
      }} />
      
      <div className="flex-1 h-screen overflow-hidden flex flex-col bg-background relative">
          <div className="h-20 px-8 flex items-center justify-between z-10 bg-background/50 backdrop-blur-sm sticky top-0">
             <div className="flex-1 max-w-xl">
                {![Category.INSPIRATION, Category.PROGRAM].includes(selectedCategory as any) && (
                  <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="搜索 AI 模型 (如 MJ, Claude, Sora...)" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500/50"
                      />
                  </div>
                )}
             </div>

             <div className="flex items-center gap-4 ml-6">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface border border-white/5 rounded-full">
                    <Coins size={12} className="text-yellow-500" />
                    <span className="text-xs font-bold text-white">{USER_PROFILE.credits} 算力</span>
                </div>
                <div className="relative" ref={userMenuRef}>
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 pl-1 pr-2 py-1 hover:bg-white/5 rounded-full transition-colors group"
                    >
                        <img src={USER_PROFILE.avatar} alt="User" className="w-8 h-8 rounded-full bg-surface object-cover" />
                        <div className="flex flex-col items-start">
                            <span className="text-xs font-bold text-white group-hover:text-primary-400 transition-colors">{USER_PROFILE.name}</span>
                            <span className="text-[9px] text-gray-500 flex items-center gap-1">{USER_PROFILE.role} <ChevronDown size={8} /></span>
                        </div>
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                          <button onClick={() => openSettings('profile')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                              <User size={16} /><span>个人设置</span>
                          </button>
                          <button onClick={() => openSettings('billing')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                              <CreditCard size={16} /><span>账单与订阅</span>
                          </button>
                          <button onClick={() => openSettings('apikey')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                              <Settings size={16} /><span>API Key 管理</span>
                          </button>
                          <div className="h-[1px] bg-white/5 my-1"></div>
                          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                              <LogOut size={16} /><span>退出登录</span>
                          </button>
                      </div>
                    )}
                </div>
             </div>
          </div>

          {activeTool ? (
             <Workspace tool={activeTool} onBack={() => setActiveTool(null)} />
          ) : (
             renderContent()
          )}
      </div>
      
      {showSettingsModal && (
        <SettingsModal initialTab={initialSettingsTab} onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
};

export default App;