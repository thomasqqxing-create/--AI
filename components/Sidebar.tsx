import React, { useState } from 'react';
import { CATEGORY_ICONS, UPGRADE_PLAN } from '../constants';
import { Category } from '../types';
import { Hexagon, Zap, Check, Sparkles } from 'lucide-react';
import UpgradeModal from './UpgradeModal';

interface SidebarProps {
  selectedCategory: Category | 'DASHBOARD';
  onSelectCategory: (cat: Category | 'DASHBOARD') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = Object.values(Category);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <>
    <div className="w-[260px] h-screen bg-background border-r border-border flex flex-col shrink-0 z-20">
      {/* Logo Area */}
      <div 
        className="flex flex-col pt-6 pb-2 px-6 cursor-pointer"
        onClick={() => onSelectCategory('DASHBOARD')}
      >
        <div className="flex items-center gap-3 mb-1">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-xl blur opacity-60"></div>
                <div className="relative w-full h-full bg-surfaceHighlight/50 rounded-xl border border-white/10 flex items-center justify-center text-white">
                    <Hexagon size={20} fill="currentColor" className="text-white" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-none">
                门道 AI
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Premium Hub</span>
            </div>
        </div>
        {/* Slogan */}
        <div className="pl-12">
            <span className="text-[10px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 italic">
               "只有内行，才懂门道。"
            </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        
        <button
          onClick={() => onSelectCategory('DASHBOARD')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
            selectedCategory === 'DASHBOARD'
              ? 'bg-gradient-to-r from-primary-600/10 to-transparent text-white border-l-2 border-primary-500'
              : 'text-gray-400 hover:bg-surface hover:text-gray-200'
          }`}
        >
          <Zap size={18} className={selectedCategory === 'DASHBOARD' ? 'text-primary-500' : 'text-gray-500 group-hover:text-gray-300'} />
          <span>控制台</span>
        </button>

        <div className="mt-6 mb-2 px-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
          应用分类
        </div>

        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isSelected
                  ? 'bg-surface text-white shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:bg-surface/50 hover:text-gray-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-primary-500 text-white' : 'bg-surfaceHighlight text-gray-500 group-hover:text-gray-300'}`}>
                 <Icon size={14} />
              </div>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Upgrade Plan (Data-Driven Design) */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors">
            {/* Header / Gradient */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${UPGRADE_PLAN.gradient}`}></div>
            
            <div className="p-4">
               <div className="flex justify-between items-start mb-3">
                   <div>
                       <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                           {UPGRADE_PLAN.title}
                           <Sparkles size={12} className="text-yellow-400" fill="currentColor" />
                       </h4>
                       <p className="text-[10px] text-gray-500 mt-0.5">{UPGRADE_PLAN.description}</p>
                   </div>
               </div>

               {/* Price */}
               <div className="flex items-baseline gap-1 mb-3">
                   <span className="text-xl font-bold text-white">{UPGRADE_PLAN.price}</span>
                   <span className="text-xs text-gray-500">{UPGRADE_PLAN.period}</span>
               </div>

               {/* Features List */}
               <div className="space-y-1.5 mb-4">
                   {UPGRADE_PLAN.features.slice(0, 3).map((feat, idx) => (
                       <div key={idx} className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                               <Check size={8} className="text-green-400" />
                           </div>
                           <span className="text-[10px] text-gray-400">{feat}</span>
                       </div>
                   ))}
               </div>

               {/* Action */}
               <button 
                   onClick={() => setShowUpgradeModal(true)}
                   className={`w-full py-2 text-xs font-bold text-black rounded-lg bg-gradient-to-r ${UPGRADE_PLAN.gradient} hover:opacity-90 transition-opacity shadow-lg shadow-yellow-500/10`}
               >
                   {UPGRADE_PLAN.buttonText}
               </button>
            </div>
        </div>
      </div>
    </div>
    
    {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </>
  );
};

export default Sidebar;