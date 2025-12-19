import React, { useState } from 'react';
import { PRICING_PLANS } from '../constants';
import { X, Check, Crown } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('month');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#18181b] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#18181b]/95 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
             <div className="p-2 rounded-xl bg-gradient-to-tr from-yellow-400 to-orange-500 text-black">
                <Crown size={20} fill="currentColor" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">升级专业版</h2>
                <p className="text-sm text-gray-500">解锁全站所有高级模型，释放无限创造力</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            {PRICING_PLANS.map((plan) => {
               const isSelected = selectedPlanId === plan.id;
               return (
                 <div 
                   key={plan.id} 
                   onClick={() => setSelectedPlanId(plan.id)}
                   className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                     isSelected 
                       ? 'bg-white/5 border-yellow-500/50 shadow-xl shadow-yellow-500/10 scale-105 z-10' 
                       : 'bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5'
                   }`}
                 >
                     {plan.recommend && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Most Popular
                        </div>
                     )}

                     <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{plan.name}</h3>
                     <div className="flex items-baseline gap-1 mb-6">
                         <span className="text-sm text-gray-400">¥</span>
                         <span className={`text-4xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-gray-200'}`}>{plan.price}</span>
                         <span className="text-sm text-gray-500">{plan.period}</span>
                     </div>

                     <button className={`w-full py-3 rounded-xl text-sm font-bold mb-6 transition-all ${
                         isSelected
                           ? `bg-gradient-to-r ${plan.gradient} text-black hover:opacity-90 shadow-lg shadow-orange-500/20`
                           : 'bg-white/10 text-gray-300 hover:bg-white/20'
                     }`}>
                         {plan.button}
                     </button>

                     <div className="space-y-3 flex-1">
                         {plan.features.map((feature, idx) => (
                             <div key={idx} className="flex items-start gap-3">
                                 <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-yellow-500/20' : 'bg-white/10'}`}>
                                     <Check size={10} className={isSelected ? 'text-yellow-500' : 'text-gray-400'} />
                                 </div>
                                 <span className="text-sm text-gray-400">{feature}</span>
                             </div>
                         ))}
                     </div>
                 </div>
               );
            })}
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5 flex flex-col items-center gap-4">
             <p className="text-xs text-gray-500">支持的支付方式</p>
             <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
                 <div className="h-8 w-24 bg-blue-500/10 rounded border border-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold cursor-pointer hover:bg-blue-500/20">
                    Alipay 支付宝
                 </div>
                 <div className="h-8 w-24 bg-green-500/10 rounded border border-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold cursor-pointer hover:bg-green-500/20">
                    WeChat 微信
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;