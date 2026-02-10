import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '@/context/WalletContext';

const TokenInput = ({
  label,
  token,
  amount,
  onAmountChange,
  onSelectToken,
  isConnected,
  readOnly = false
}) => {
  const { getBalance } = useWallet();
  const balance = token ? getBalance(token.symbol) : '0.00';

  const handleMax = () => {
    if (balance && balance !== '0.00') {
      onAmountChange(balance);
    }
  };

  return (
    <div className="bg-[#1a1a1d] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors group focus-within:border-[#fcca3f]/30">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">{label}</span>
        {isConnected && token && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              Balance: <span className="text-[#fcca3f]">{balance}</span>
            </span>
            {!readOnly && (
              <button 
                onClick={handleMax}
                className="text-[10px] bg-[#fcca3f]/10 text-[#fcca3f] px-1.5 py-0.5 rounded hover:bg-[#fcca3f]/20 transition-colors font-bold uppercase"
              >
                Max
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectToken}
          className="flex items-center gap-2 bg-[#252529] hover:bg-[#2d2d32] text-white rounded-xl pl-2 pr-3 py-2 transition-all shadow-md border border-white/5 min-w-[140px]"
        >
          {token ? (
            <>
              <div className={`w-8 h-8 rounded-full ${token.color} flex items-center justify-center text-xs font-bold text-white shadow-inner`}>
                {token.symbol[0]}
              </div>
              <span className="font-bold text-lg">{token.symbol}</span>
            </>
          ) : (
            <span className="font-semibold px-2 text-sm">Select Token</span>
          )}
          <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
        </motion.button>

        <input
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              onAmountChange(value);
            }
          }}
          placeholder="0.00"
          readOnly={readOnly}
          className="flex-1 bg-transparent text-right text-3xl font-bold text-white outline-none placeholder:text-slate-700 font-mono tracking-tight"
        />
      </div>
    </div>
  );
};

export default TokenInput;