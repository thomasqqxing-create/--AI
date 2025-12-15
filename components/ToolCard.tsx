import React from 'react';
import { Tool } from '../types';
import * as Icons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  // Dynamic icon rendering with fallback
  const IconComponent = (Icons as any)[tool.icon] || Icons.Box;

  // Default gradient if none provided
  const bgGradient = tool.bgGradient || 'from-gray-700 to-gray-900';

  return (
    <div 
      onClick={() => onClick(tool)}
      className="group relative bg-surface border border-white/5 hover:border-primary-500/30 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary-500/10 overflow-hidden"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
          <div className="flex justify-between items-start mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bgGradient} p-[1px] shadow-lg`}>
              <div className="w-full h-full rounded-2xl bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
                 <IconComponent size={28} className="text-white drop-shadow-md" />
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              {tool.tags?.map(tag => (
                  <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      tag === 'HOT' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      tag === 'NEW' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      tag === 'PRO' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-gray-700 text-gray-300 border-gray-600'
                  }`}>
                    {tag}
                  </span>
              ))}
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4 h-9">
            {tool.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                {tool.provider}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                <Icons.ArrowRight size={14} className="text-primary-400" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ToolCard;