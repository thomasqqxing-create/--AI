import React, { useState } from 'react';
import { PROGRAM_TOOLS } from '../constants';
import { Play, Plus, Users, ArrowRight, Terminal, ShieldCheck, CloudUpload, Code, X } from 'lucide-react';
import * as Icons from 'lucide-react';

const ProgramSquare: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="h-full overflow-y-auto p-6 scroll-smooth bg-background">
      <div className="max-w-7xl mx-auto pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between py-10 gap-6 border-b border-white/5 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold mb-4">
               <Terminal size={14} />
               程序广场 V1.0
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">AI 程序实验室</h1>
            <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
              探索门道官方与社区共建的实用 AI 程序。您可以直接在此运行，或上传您的代码由我们托管部署。
            </p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-500 transition-all shadow-xl shadow-primary-500/20 shrink-0"
          >
             <CloudUpload size={18} />
             发布并部署程序
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROGRAM_TOOLS.map((prog) => {
            const IconComponent = (Icons as any)[prog.icon] || Icons.Box;
            return (
              <div key={prog.id} className="group relative bg-surface border border-white/5 hover:border-primary-500/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col h-full hover:shadow-2xl hover:shadow-primary-500/10">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
                       <IconComponent size={24} />
                    </div>
                    {prog.verified && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                            <ShieldCheck size={10} />
                            官方验证
                        </div>
                    )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{prog.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3 flex-1">{prog.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-600">开发者</span>
                      <span className="text-xs text-gray-400 font-medium">{prog.author}</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                      <Play size={14} fill="currentColor" />
                      <span className="text-[10px] font-bold">运行</span>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}></div>
                <div className="relative bg-[#18181b] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Code size={24} className="text-primary-400" />
                                发布并托管程序
                            </h2>
                            <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
                        </div>
                        <div className="space-y-6">
                            <div className="p-10 rounded-2xl bg-primary-500/5 border border-dashed border-primary-500/20 flex flex-col items-center justify-center text-center">
                                <CloudUpload size={48} className="text-primary-400 mb-4 opacity-50" />
                                <p className="text-sm text-gray-400">拖拽 ZIP 或源码文件夹到此处进行部署</p>
                                <button className="mt-4 px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl">选择文件</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="程序名称" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary-500" />
                                <select className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
                                    <option>Node.js 18</option>
                                    <option>Python 3.10</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20">开始部署到门道服务站</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProgramSquare;