import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, ExternalLink, Copy, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const TransactionModal = ({ status, onClose, fromToken, toToken, amount }) => {
  const txHash = '0x712...93af';
  
  const Spinner = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.div className="absolute inset-0 rounded-full border-4 border-[#1a1a1d]" />
        <motion.div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#fcca3f] border-r-[#d4af37]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#fcca3f] animate-spin" />
        </div>
    </div>
  );

  const SuccessIcon = () => (
    <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        type="spring"
        className="w-24 h-24 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20"
    >
        <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
        </motion.div>
    </motion.div>
  );

  const getContent = () => {
    switch (status) {
      case 'approve':
        return {
          icon: <Spinner />,
          title: `Approving ${fromToken.symbol}`,
          description: `Please approve the use of ${amount} ${fromToken.symbol} in your wallet to continue.`,
          color: 'text-white'
        };
      case 'pending':
        return {
          icon: <Spinner />,
          title: 'Confirming Swap',
          description: `Swapping ${amount} ${fromToken.symbol} for ${toToken.symbol}. Waiting for confirmation...`,
          color: 'text-white'
        };
      case 'success':
        return {
          icon: <SuccessIcon />,
          title: 'Transaction Submitted',
          description: 'Your trade has been successfully submitted to Polygon network.',
          color: 'text-[#fcca3f]'
        };
      case 'failed':
        return {
            icon: <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />,
            title: 'Transaction Failed',
            description: 'The transaction failed. Please try again with higher slippage.',
            color: 'text-red-500'
        }
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#121214] border-[#fcca3f]/10 max-w-sm p-8 text-center rounded-3xl">
        <AnimatePresence mode='wait'>
            <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                {content.icon}
                
                <h2 className={`text-2xl font-bold mb-3 ${content.color}`}>
                    {content.title}
                </h2>
                
                <p className="text-slate-400 mb-8 leading-relaxed font-light">
                    {content.description}
                </p>

                {status === 'success' && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between bg-[#1a1a1d] rounded-xl p-4 border border-white/5">
                            <span className="text-sm text-slate-500">Hash</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-[#fcca3f]">{txHash}</span>
                                <button className="text-slate-500 hover:text-white transition-colors">
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                        <a
                            href={`https://polygonscan.com/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-[#fcca3f] transition-colors py-2"
                        >
                            View on Polygonscan <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Button
                            onClick={onClose}
                            className="w-full mt-2 bg-[#1a1a1d] hover:bg-[#252529] text-white font-bold py-6 rounded-xl border border-white/5"
                        >
                            Close
                        </Button>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;