import React, { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/SettingsContext';

const SettingsModal = ({ open, onOpenChange }) => {
  const { slippage, setSlippage, deadline, setDeadline, expertMode, setExpertMode } = useSettings();
  const [customSlippage, setCustomSlippage] = useState('');
  const [showExpertConfirm, setShowExpertConfirm] = useState(false);

  const presetSlippages = [0.1, 0.5, 1.0];

  const handleCustomSlippage = (value) => {
    setCustomSlippage(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 50) {
      setSlippage(parsed);
    }
  };

  const toggleExpertMode = () => {
    if (!expertMode) {
      setShowExpertConfirm(true);
    } else {
      setExpertMode(false);
    }
  };

  const confirmExpertMode = () => {
    setExpertMode(true);
    setShowExpertConfirm(false);
  };

  if (showExpertConfirm) {
    return (
       <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#121214] border-red-900/50 max-w-sm">
            <div className="flex flex-col items-center text-center p-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Are you an Expert?</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.
                </p>
                <div className="flex gap-3 w-full">
                    <Button onClick={() => setShowExpertConfirm(false)} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">Cancel</Button>
                    <Button onClick={confirmExpertMode} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Enable</Button>
                </div>
            </div>
        </DialogContent>
       </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`bg-[#121214] max-w-md border ${expertMode ? 'border-red-900/30' : 'border-[#fcca3f]/20'}`}>
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">Transaction Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Slippage Tolerance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
                <Label className="text-slate-300">Slippage Tolerance</Label>
                <Info className="w-3 h-3 text-slate-500" />
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presetSlippages.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setSlippage(preset);
                    setCustomSlippage('');
                  }}
                  className={`py-2 rounded-xl font-bold text-sm transition-all border ${
                    slippage === preset && !customSlippage
                      ? 'bg-[#fcca3f] text-black border-[#fcca3f]'
                      : 'bg-[#1a1a1d] text-slate-400 border-white/5 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {preset}%
                </button>
              ))}
              <div className="relative">
                <input
                    type="text"
                    placeholder="Custom"
                    value={customSlippage}
                    onChange={(e) => handleCustomSlippage(e.target.value)}
                    className={`w-full h-full py-2 px-3 rounded-xl bg-[#1a1a1d] text-right text-white font-bold text-sm outline-none border transition-colors ${customSlippage ? 'border-[#fcca3f]' : 'border-white/5 focus:border-[#fcca3f]/50'}`}
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 text-xs">%</span>
              </div>
            </div>
            {slippage > 1 && (
                <p className="text-amber-500 text-xs mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    High slippage vulnerability
                </p>
            )}
          </div>

          {/* Transaction Deadline */}
          <div>
             <div className="flex items-center gap-2 mb-3">
                <Label className="text-slate-300">Transaction Deadline</Label>
                <Info className="w-3 h-3 text-slate-500" />
            </div>
            <div className="flex items-center gap-3">
               <div className="relative w-24">
                <input
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 rounded-xl bg-[#1a1a1d] text-white font-bold text-sm outline-none border border-white/5 focus:border-[#fcca3f]/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">min</span>
               </div>
            </div>
          </div>

          {/* Expert Mode Toggle */}
          <div className="pt-4 border-t border-white/5">
             <div className="flex items-center justify-between">
                 <div>
                    <div className="text-white font-bold mb-1">Expert Mode</div>
                    <div className="text-xs text-slate-500">Bypass confirmation modals and allow high slippage</div>
                 </div>
                 <button 
                    onClick={toggleExpertMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${expertMode ? 'bg-red-600' : 'bg-slate-700'}`}
                 >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${expertMode ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;