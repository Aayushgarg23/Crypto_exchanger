import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { usePrices } from '@/context/PriceContext';

const SwapDetails = ({ fromToken, toToken, fromAmount, toAmount }) => {
  const { slippage } = useSettings();
  const { getPrice } = usePrices();

  // Calculations
  const fromPrice = getPrice(fromToken?.symbol);
  const toPrice = getPrice(toToken?.symbol);
  
  const minimumReceived = toAmount ? (parseFloat(toAmount) * (1 - slippage/100)).toFixed(6) : '0.00';
  const priceImpact = fromAmount && toAmount 
    ? ((1 - (parseFloat(toAmount) * toPrice) / (parseFloat(fromAmount) * fromPrice)) * 100).toFixed(2)
    : '0.00';
    
  const gasFee = '0.02'; // Mock gas in MATIC
  const gasFeeUsd = (parseFloat(gasFee) * getPrice('MATIC')).toFixed(2);
  const rate = fromAmount && toAmount ? (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6) : '0.00';

  const DetailRow = ({ label, value, valueColor = "text-white" }) => (
    <div className="flex items-center justify-between text-sm py-1">
      <div className="flex items-center gap-1.5 cursor-help group">
        <span className="text-slate-500 text-xs font-medium">{label}</span>
      </div>
      <span className={`font-medium font-mono text-xs ${valueColor}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="p-4 bg-[#1a1a1d] rounded-2xl border border-white/5 space-y-2">
      <div className="flex items-center justify-between text-sm pb-3 border-b border-white/5 mb-2">
        <span className="text-slate-500 text-xs font-medium">Rate</span>
        <button className="flex items-center gap-1 text-xs font-medium text-[#fcca3f] hover:text-white transition-colors">
            1 {fromToken?.symbol} ≈ {rate} {toToken?.symbol}
            <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <DetailRow 
        label="Price Impact" 
        value={`${priceImpact}%`} 
        valueColor={parseFloat(priceImpact) > 1 ? 'text-amber-500' : 'text-emerald-500'} 
      />
      <DetailRow 
        label="Min. Received" 
        value={`${minimumReceived} ${toToken?.symbol}`} 
      />
      <DetailRow 
        label="Network Cost" 
        value={`~${gasFee} MATIC ($${gasFeeUsd})`} 
      />
    </div>
  );
};

export default SwapDetails;