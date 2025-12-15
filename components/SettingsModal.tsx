import React, { useState } from 'react';
import { X, User, CreditCard, Settings as SettingsIcon, Save, Key } from 'lucide-react';
import { USER_PROFILE } from '../constants';

interface SettingsModalProps {
  initialTab?: 'profile' | 'billing' | 'apikey';
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ initialTab = 'profile', onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [apiKey, setApiKey] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
            <h3 className="text-lg font-bold text-white mb-4">个人资料</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-surface border border-white/10 p-1">
                <img src={USER_PROFILE.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <button className="px-3 py-1.5 bg-white/10 text-xs font-medium text-white rounded-lg hover:bg-white/20 transition-colors">
                  更换头像
                </button>
                <p className="text-[10px] text-gray-500 mt-2">支持 JPG, PNG 格式，最大 2MB</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">昵称</label>
                <input 
                  type="text" 
                  defaultValue={USER_PROFILE.name} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">邮箱地址</label>
                <input 
                  type="email" 
                  defaultValue={USER_PROFILE.email} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                  disabled
                />
                <p className="text-[10px] text-gray-500 mt-1">邮箱暂不支持修改</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex justify-end">
               <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-500 transition-colors">
                  <Save size={16} />
                  保存修改
               </button>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
             <h3 className="text-lg font-bold text-white mb-4">账单与订阅</h3>
             
             <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-900/20 to-surface border border-primary-500/20 flex justify-between items-center">
                <div>
                   <p className="text-xs text-primary-300 font-bold uppercase tracking-wider mb-1">当前套餐</p>
                   <h4 className="text-2xl font-bold text-white mb-1">免费版 Free</h4>
                   <p className="text-xs text-gray-400">算力余额: {USER_PROFILE.credits}</p>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-500 transition-colors">
                   升级套餐
                </button>
             </div>

             <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">充值记录</h4>
                <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                   <div className="p-8 text-center text-gray-500 text-xs">
                      暂无充值记录
                   </div>
                </div>
             </div>
          </div>
        );
      case 'apikey':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
            <h3 className="text-lg font-bold text-white mb-4">API Key 管理</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              如果您有自己的 API Key (OpenAI, Gemini 等)，可以在此绑定以使用您自己的配额。
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Provider</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors">
                   <option>Google Gemini</option>
                   <option>OpenAI</option>
                   <option>Midjourney</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">API Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="sk-..." 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <Key size={16} className="absolute left-3.5 top-3 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
               <button className="px-6 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/20 transition-colors">
                  绑定 Key
               </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Window */}
      <div className="relative bg-[#18181b] border border-white/10 rounded-3xl w-full max-w-4xl h-[600px] shadow-2xl flex overflow-hidden animate-in zoom-in-95 fade-in duration-300">
         
         {/* Sidebar */}
         <div className="w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-8 px-2">设置</h2>
            <div className="space-y-1">
               <button 
                 onClick={() => setActiveTab('profile')}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
               >
                  <User size={18} />
                  个人设置
               </button>
               <button 
                 onClick={() => setActiveTab('billing')}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'billing' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
               >
                  <CreditCard size={18} />
                  账单与订阅
               </button>
               <button 
                 onClick={() => setActiveTab('apikey')}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'apikey' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
               >
                  <SettingsIcon size={18} />
                  API Key 管理
               </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 flex flex-col relative">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
               <X size={18} />
            </button>

            <div className="flex-1 p-10 overflow-y-auto">
               {renderTabContent()}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsModal;