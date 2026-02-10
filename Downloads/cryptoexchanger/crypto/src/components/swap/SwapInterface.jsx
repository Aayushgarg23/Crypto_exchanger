import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, AlertCircle, Settings, Flame, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TokenInput from '@/components/swap/TokenInput';
import SwapDetails from '@/components/swap/SwapDetails';
import TokenSelectorModal from '@/components/swap/TokenSelectorModal';
import TransactionModal from '@/components/swap/TransactionModal';
import { useToast } from '@/components/ui/use-toast';
import { useSettings } from '@/context/SettingsContext';
import { useWallet } from '@/context/WalletContext';
import { usePrices } from '@/context/PriceContext';
import { TOKENS } from '@/lib/constants';

const SwapInterface = ({ openSettings }) => {
  const { toast } = useToast();
  const { expertMode, slippage } = useSettings();
  const { isConnected, connectWallet, getBalance } = useWallet();
  const { getPrice } = usePrices();
  
  const [fromToken, setFromToken] = useState(TOKENS[0]); // Default MATIC
  const [toToken, setToToken] = useState(TOKENS[1]);   // Default USDC
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [selectingToken, setSelectingToken] = useState(null);
  
  // Transaction Steps: 'approve' | 'pending' | 'success' | 'failed' | null
  const [txStatus, setTxStatus] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  // Calculate To Amount based on prices
  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const fromPrice = getPrice(fromToken.symbol);
      const toPrice = getPrice(toToken.symbol);
      if (fromPrice && toPrice) {
        const value = parseFloat(fromAmount) * fromPrice;
        const estimated = value / toPrice;
        setToAmount(estimated.toFixed(6));
      }
    } else if (!fromAmount) {
        setToAmount('');
    }
  }, [fromAmount, fromToken, toToken, getPrice]);

  const handleSwap = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    // Validation
    const balance = parseFloat(getBalance(fromToken.symbol));
    if (parseFloat(fromAmount) > balance) {
        toast({
            title: "Insufficient Balance",
            description: `You don't have enough ${fromToken.symbol}`,
            variant: "destructive",
            className: "bg-[#1a1a1d] border-red-900/50 text-white"
        });
        return;
    }

    // Start Flow
    setTxStatus('approve');
    
    // Simulate Approval
    setTimeout(() => {
        setTxStatus('pending');
        
        // Simulate Swap
        setTimeout(() => {
            setTxStatus('success');
            setFromAmount('');
            setToAmount('');
        }, 3000);
        
    }, 2000);
  };

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount); // Carry over value roughly
  };

  const handleTokenSelect = (token) => {
    if (selectingToken === 'from') {
      if (token.symbol === toToken.symbol) handleFlipTokens();
      else setFromToken(token);
    } else {
      if (token.symbol === fromToken.symbol) handleFlipTokens();
      else setToToken(token);
    }
    setSelectingToken(null);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-[#fcca3f]/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="glass-card relative rounded-3xl p-2 sm:p-5 shadow-2xl border border-[#fcca3f]/10 overflow-hidden bg-[#121214]/90">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-2 pt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Swap</h2>
              {expertMode && (
                 <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold tracking-wider border border-red-500/20">
                    <ShieldAlert className="w-3 h-3" />
                    EXPERT
                 </span>
              )}
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1d] border border-white/5 text-xs font-medium text-slate-400">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>$0.02</span>
                </div>
                <motion.button 
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    onClick={openSettings}
                    className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-[#fcca3f] transition-colors"
                >
                    <Settings className="w-5 h-5" />
                </motion.button>
            </div>
          </div>

          {/* Token Inputs */}
          <div className="space-y-1">
            <TokenInput
              label="You Pay"
              token={fromToken}
              amount={fromAmount}
              onAmountChange={setFromAmount}
              onSelectToken={() => setSelectingToken('from')}
              isConnected={isConnected}
            />

            {/* Flip Button */}
            <div className="relative h-4 z-10">
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleFlipTokens}
                        className="bg-[#1a1a1d] border-4 border-[#121214] rounded-xl p-2 text-[#fcca3f] hover:text-white transition-colors shadow-lg"
                    >
                        <ArrowDownUp className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            <TokenInput
              label="You Receive"
              token={toToken}
              amount={toAmount}
              onAmountChange={setToAmount}
              onSelectToken={() => setSelectingToken('to')}
              isConnected={isConnected}
              readOnly
            />
          </div>

          {/* Swap Details */}
          <AnimatePresence>
            {fromToken && toToken && fromAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <SwapDetails
                  fromToken={fromToken}
                  toToken={toToken}
                  fromAmount={fromAmount}
                  toAmount={toAmount}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connection Warning */}
          {!isConnected && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#fcca3f]/5 border border-[#fcca3f]/20 rounded-xl p-4 mt-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#fcca3f] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#fcca3f] font-bold text-sm">Wallet Not Connected</p>
                <p className="text-[#fcca3f]/70 text-xs mt-1">Connect your wallet to trade on Polygon.</p>
              </div>
            </motion.div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromToken || !toToken || (isConnected && !fromAmount)}
            className="w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#fcca3f] hover:brightness-110 text-black font-bold py-7 rounded-2xl text-lg disabled:from-[#1a1a1d] disabled:to-[#1a1a1d] disabled:text-slate-600 transition-all shadow-lg hover:shadow-[#fcca3f]/20 active:scale-[0.98] border border-transparent disabled:border-white/5"
          >
            {!isConnected
              ? 'Connect Wallet'
              : !fromAmount
              ? 'Enter Amount'
              : 'Swap Assets'}
          </Button>
        </div>
      </div>

      <TokenSelectorModal
        open={selectingToken !== null}
        onClose={() => setSelectingToken(null)}
        onSelectToken={handleTokenSelect}
      />

      {txStatus && (
        <TransactionModal
          status={txStatus}
          onClose={() => setTxStatus(null)}
          fromToken={fromToken}
          toToken={toToken}
          amount={fromAmount}
        />
      )}
    </>
  );
};

export default SwapInterface;