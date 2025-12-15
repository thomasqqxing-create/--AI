import React, { useState, useRef, useEffect } from 'react';
import { Tool, Message, Category, ToolVariant } from '../types';
import { TOOLS } from '../constants';
import { 
  Send, Upload, Sparkles, Loader2, Download, ArrowLeft, MoreHorizontal, 
  History, Settings, ChevronUp, ChevronDown, Check, Coins, Video, Image as ImageIcon, MessageSquare
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { generateText, generateImage, simulateGeneration } from '../services/geminiService';
import { SYSTEM_PROMPTS } from '../constants';

interface WorkspaceProps {
  tool: Tool;
  onBack: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ tool: initialTool, onBack }) => {
  // State for the currently selected tool (can be changed by user)
  const [currentTool, setCurrentTool] = useState<Tool>(initialTool);
  const [selectedVariant, setSelectedVariant] = useState<ToolVariant | null>(
    initialTool.variants?.find(v => v.isDefault) || initialTool.variants?.[0] || null
  );

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Model Menu State
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState<Category>(initialTool.category);
  const [activeConfigs, setActiveConfigs] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Configs when tool changes
  useEffect(() => {
    if (currentTool.configs) {
      const defaults: Record<string, string> = {};
      currentTool.configs.forEach(c => defaults[c.label] = c.default);
      setActiveConfigs(defaults);
    } else {
      setActiveConfigs({});
    }
  }, [currentTool]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Switching Models
  const handleSwitchModel = (tool: Tool, variant?: ToolVariant) => {
    setCurrentTool(tool);
    setSelectedVariant(variant || tool.variants?.[0] || null);
    setIsModelMenuOpen(false);
  };

  // Handle Send
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      type: 'text',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setIsModelMenuOpen(false);

    try {
      let responseContent = '';
      let responseType: 'text' | 'image' | 'video' = 'text';
      let imageUrl = undefined;

      // Construct prompt
      let prompt = userMsg.content;
      if (Object.keys(activeConfigs).length > 0) {
        const configStr = Object.entries(activeConfigs).map(([k, v]) => `${k}:${v}`).join(', ');
        prompt = `${prompt} [Config: ${configStr}]`;
      }
      if (selectedVariant) {
        prompt = `${prompt} [Model: ${selectedVariant.name}]`;
      }

      // Use currentTool for generation logic
      if (currentTool.category === Category.IMAGE) {
         if (currentTool.provider === 'Google') {
            const base64Image = await generateImage(currentTool.modelId, prompt);
            if (base64Image) {
               responseType = 'image';
               imageUrl = base64Image;
               responseContent = `Generated with ${selectedVariant?.name || currentTool.name}`;
            } else {
               responseContent = "Generation failed.";
            }
         } else {
             responseContent = await simulateGeneration('video', prompt); 
             responseContent = `[模拟 ${currentTool.provider}] ${responseContent}`;
         }
      } else if (currentTool.category === Category.VIDEO) {
          responseContent = await simulateGeneration('video', prompt);
      } else if (currentTool.category === Category.MUSIC) {
          responseContent = await simulateGeneration('music', prompt);
      } else if (currentTool.category === Category.ECOMMERCE) {
          const systemPrompt = SYSTEM_PROMPTS[currentTool.id];
          responseContent = await generateText(currentTool.modelId, prompt, messages, systemPrompt);
      } else {
          // Default Chat
          responseContent = await generateText(currentTool.modelId, prompt, messages);
      }

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseContent,
        type: responseType,
        imageUrl: imageUrl,
        timestamp: Date.now(),
        modelUsed: selectedVariant?.name || currentTool.name
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Error during generation.",
        type: 'text',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderIcon = (iconName: string, size = 16) => {
    const Icon = (Icons as any)[iconName] || Icons.Box;
    return <Icon size={size} />;
  };

  // Helper to filter tools for the menu
  const getToolsByCategory = (cat: Category) => {
    return TOOLS.filter(t => t.category === cat);
  };

  return (
    <div className="flex flex-col h-screen bg-background relative z-10 font-sans">
      
      {/* 1. Transparent Header */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-6 pointer-events-none">
        <div className="pointer-events-auto">
           <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all">
              <ArrowLeft size={20} />
           </button>
        </div>
        <div className="pointer-events-auto flex gap-3">
             <button className="h-10 px-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 text-white/70 hover:text-white transition-all text-xs font-medium">
                <History size={14} />
                <span className="hidden sm:inline">历史记录</span>
             </button>
             <button className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all">
                <MoreHorizontal size={20} />
             </button>
        </div>
      </div>

      {/* 2. Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-20 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-10 min-h-[60vh] flex flex-col justify-end pb-10">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 mb-20">
                 <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${currentTool.bgGradient || 'from-gray-700 to-gray-900'} p-[1px] shadow-2xl shadow-primary-500/20 mb-6`}>
                    <div className="w-full h-full rounded-3xl bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                       {renderIcon(currentTool.icon, 36)} 
                    </div>
                 </div>
                 <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">{currentTool.name}</h1>
                 <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-8">
                   {selectedVariant ? selectedVariant.description : currentTool.description}
                 </p>
                 <div className="flex flex-wrap justify-center gap-2">
                    {['2024年 巴黎奥运会', '赛博朋克 霓虹灯', '雨夜 孤独的背影'].map(tag => (
                      <button key={tag} onClick={() => setInput(tag)} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                        {tag}
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-3xl p-6 ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white rounded-br-sm backdrop-blur-md' 
                    : 'bg-black/40 border border-white/5 text-gray-200 rounded-bl-sm backdrop-blur-md'
                }`}>
                  {msg.role === 'model' && msg.modelUsed && (
                    <div className="flex items-center gap-2 mb-3">
                       <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${currentTool.bgGradient || 'from-gray-700 to-gray-800'} flex items-center justify-center`}>
                          <Sparkles size={10} className="text-white" />
                       </div>
                       <span className="text-[10px] font-bold text-gray-400 tracking-wide uppercase">{msg.modelUsed}</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap leading-7 text-sm">{msg.content}</div>
                  
                  {msg.type === 'image' && msg.imageUrl && (
                    <div className="mt-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                      <img src={msg.imageUrl} alt="Generated" className="w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="flex justify-start">
                   <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-3xl rounded-bl-sm flex items-center gap-3 backdrop-blur-md">
                       <Loader2 size={16} className="animate-spin text-primary-400" />
                       <span className="text-sm text-gray-400">正在生成中...</span>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Floating Bottom Command Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-40 bg-gradient-to-t from-background via-background to-transparent pb-8">
        <div className="max-w-3xl mx-auto relative">
          
          {/* Enhanced Model Selection Popover */}
          {isModelMenuOpen && (
             <div className="absolute bottom-full left-0 mb-4 w-[360px] bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 z-50 flex flex-col">
                
                {/* Category Tabs */}
                <div className="flex items-center p-1 bg-black/20 border-b border-white/5">
                   {[
                     { id: Category.VIDEO, label: '视频', icon: Video },
                     { id: Category.IMAGE, label: '绘画', icon: ImageIcon },
                     { id: Category.CHAT, label: '对话', icon: MessageSquare },
                   ].map(tab => (
                     <button 
                       key={tab.id}
                       onClick={() => setActiveMenuCategory(tab.id)}
                       className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium rounded-xl transition-all ${
                         activeMenuCategory === tab.id 
                           ? 'bg-white/10 text-white shadow-sm' 
                           : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                       }`}
                     >
                        <tab.icon size={12} />
                        {tab.label}
                     </button>
                   ))}
                </div>

                {/* Header Info */}
                <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">选择模型版本</span>
                </div>

                {/* Model List */}
                <div className="max-h-[320px] overflow-y-auto p-1 space-y-1">
                   {getToolsByCategory(activeMenuCategory).map(t => {
                     // If tool has variants, list them. If not, list the tool itself.
                     const variantsToList = t.variants && t.variants.length > 0 ? t.variants : [null];

                     return variantsToList.map((variant, idx) => {
                       const isSelected = variant 
                          ? (selectedVariant?.id === variant.id && currentTool.id === t.id)
                          : (currentTool.id === t.id);

                       return (
                         <button 
                           key={variant ? variant.id : t.id}
                           onClick={() => handleSwitchModel(t, variant || undefined)}
                           className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                             isSelected
                               ? 'bg-primary-500/10 border border-primary-500/30' 
                               : 'hover:bg-white/5 border border-transparent'
                           }`}
                         >
                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-700 bg-gray-800'
                            }`}>
                                {isSelected && <Check size={10} className="text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 mb-0.5">
                                  <span className={`text-sm font-bold truncate ${isSelected ? 'text-primary-400' : 'text-gray-200'}`}>
                                    {variant ? variant.name : t.name}
                                  </span>
                                  {variant?.badge && (
                                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold text-gray-400 shrink-0">
                                      {variant.badge}
                                    </span>
                                  )}
                                  {!variant && (
                                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold text-gray-400 shrink-0">
                                      TOOL
                                    </span>
                                  )}
                               </div>
                               <p className="text-[10px] text-gray-500 leading-tight line-clamp-2">
                                 {variant ? variant.description : t.description}
                               </p>
                            </div>
                         </button>
                       );
                     });
                   })}
                   
                   {getToolsByCategory(activeMenuCategory).length === 0 && (
                     <div className="p-8 text-center text-gray-600 text-xs">
                       此分类下暂无可用模型
                     </div>
                   )}
                </div>
             </div>
          )}

          {/* Main Input Bar */}
          <div className="bg-[#18181b] border border-white/10 rounded-3xl p-2 shadow-2xl flex flex-col gap-2 relative ring-1 ring-white/5 focus-within:ring-primary-500/30 focus-within:border-primary-500/50 transition-all">
             
             <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={selectedVariant ? `使用 ${selectedVariant.name} 生成...` : `使用 ${currentTool.name} 生成...`}
                className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 outline-none resize-none min-h-[48px] max-h-[120px] text-sm"
                rows={1}
                style={{ height: 'auto' }}
             />

             {/* Bottom Controls Row */}
             <div className="flex items-center justify-between px-2 pb-1">
                 
                 {/* Left: Model & Config Triggers */}
                 <div className="flex items-center gap-2">
                    {/* Model Trigger Button */}
                    <button 
                      onClick={() => {
                        setIsModelMenuOpen(!isModelMenuOpen);
                        setActiveMenuCategory(currentTool.category); // Reset tab to current tool's cat
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isModelMenuOpen 
                          ? 'bg-primary-500 text-white border-primary-500' 
                          : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                       <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${currentTool.bgGradient || 'from-gray-700 to-gray-800'} flex items-center justify-center`}>
                           {renderIcon(currentTool.icon, 8)}
                       </div>
                       <span className="truncate max-w-[100px]">{selectedVariant?.name || currentTool.name}</span>
                       {isModelMenuOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                    </button>

                    {/* Config Toggles */}
                    {currentTool.configs?.map(config => (
                      <div key={config.label} className="relative group hidden sm:block">
                         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-gray-200 text-xs hover:bg-white/10 transition-colors">
                            {renderIcon(config.icon, 12)}
                            <span>{activeConfigs[config.label] || config.default}</span>
                         </button>
                         {/* Hover Dropdown */}
                         <div className="absolute bottom-full left-0 mb-2 w-24 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block animate-in fade-in zoom-in-95 z-50">
                             {config.options.map(opt => (
                               <button 
                                 key={opt}
                                 onClick={() => setActiveConfigs(prev => ({ ...prev, [config.label]: opt }))}
                                 className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/10 hover:text-white"
                               >
                                 {opt}
                               </button>
                             ))}
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Right: Action Buttons */}
                 <div className="flex items-center gap-2">
                    <div className="text-[10px] text-gray-600 font-mono hidden sm:block">
                        {input.length}/2000
                    </div>
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                         isLoading || !input.trim()
                           ? 'bg-white/5 text-gray-600'
                           : 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:scale-105 hover:bg-primary-500'
                      }`}
                    >
                       {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Icons.ArrowUp size={18} />}
                    </button>
                 </div>
             </div>
          </div>
          
          <div className="flex justify-center mt-3 gap-6 opacity-60">
             <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <Coins size={10} />
                <span>预计消耗: {selectedVariant?.cost || '0.00'} 算力</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;