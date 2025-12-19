import React, { useState, useMemo } from 'react';
import { INSPIRATION_GALLERY } from '../constants';
import { Heart, Copy, User, Play, RefreshCw, Image as ImageIcon, Video, Sparkles } from 'lucide-react';

const InspirationGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [shuffleTrigger, setShuffleTrigger] = useState(0);

  const displayedItems = useMemo(() => {
    const filtered = INSPIRATION_GALLERY.filter(item => item.type === activeTab);
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [activeTab, shuffleTrigger]);

  const handleRefresh = () => {
    setShuffleTrigger(prev => prev + 1);
  };

  return (
    <div className="h-full overflow-y-auto p-6 scroll-smooth bg-background">
       <div className="max-w-7xl mx-auto pb-20">
           <div className="flex flex-col items-center justify-center py-10 text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-bold mb-4">
                   <Sparkles size={14} />
                   社区精选
               </div>
               <h1 className="text-4xl font-bold text-white mb-4">灵感广场</h1>
               <p className="text-gray-400 max-w-2xl mb-10">
                   发现社区分享的惊艳作品，探索最地道的提示词门道。
                   <br/>
                   <span className="text-xs text-gray-600 mt-2 block italic">实时更新 • 全球精选 • 4K超清</span>
               </p>

               <div className="flex items-center gap-4 mb-12">
                  <div className="flex bg-surface border border-white/10 rounded-xl p-1">
                      <button 
                        onClick={() => setActiveTab('image')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'image' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                         <ImageIcon size={16} />
                         图片专区
                      </button>
                      <button 
                        onClick={() => setActiveTab('video')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'video' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                         <Video size={16} />
                         视频专区
                      </button>
                  </div>
                  <button 
                    onClick={handleRefresh}
                    className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="换一批"
                  >
                     <RefreshCw size={18} className={shuffleTrigger > 0 ? 'animate-spin' : ''} style={{animationIterationCount: 1, animationDuration: '0.5s'}} />
                  </button>
               </div>
           </div>

           <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
               {displayedItems.map((item) => (
                   <div key={item.id} className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-primary-500/30 transition-all duration-300 shadow-xl shadow-black/20">
                       <div className="relative">
                          <img 
                            src={item.url} 
                            alt={item.prompt} 
                            loading="lazy"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 min-h-[160px]"
                          />
                          {item.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                                      <Play size={20} className="text-white fill-white ml-0.5" />
                                  </div>
                              </div>
                          )}
                       </div>
                       
                       <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                           <div className="flex items-center gap-2 mb-3">
                               <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center overflow-hidden text-[8px]">
                                   {item.user[0]}
                               </div>
                               <span className="text-xs font-bold text-white truncate">{item.user}</span>
                               <span className="text-[9px] text-gray-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-auto uppercase font-bold">
                                   {item.model}
                               </span>
                           </div>

                           <p className="text-[11px] text-gray-300 line-clamp-4 mb-4 leading-relaxed font-mono bg-black/40 p-2.5 rounded-lg backdrop-blur-sm border border-white/5">
                               {item.prompt}
                           </p>
                           
                           <div className="flex items-center gap-2">
                               <button className="flex-1 py-2 bg-white text-black text-[11px] font-bold rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors">
                                   <Copy size={12} />
                                   复制提示词
                               </button>
                               <button className="w-9 h-9 bg-white/10 text-white rounded-lg flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-500 transition-colors border border-white/10 gap-1 text-[10px] font-bold">
                                   <Heart size={14} />
                                   {item.likes}
                               </button>
                           </div>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

export default InspirationGallery;