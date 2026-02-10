import React, { useState } from 'react';
import { Search, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TOKENS } from '@/lib/constants';
import { useWallet } from '@/context/WalletContext';

const TokenSelectorModal = ({ open, onClose, onSelectToken }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getBalance } = useWallet();

  const filteredTokens = TOKENS.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#121214] border-[#fcca3f]/10 max-w-md p-0 overflow-hidden shadow-2xl rounded-3xl gap-0">
        <div className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-white text-xl font-bold">Select Asset</DialogTitle>
                <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
                type="text"
                placeholder="Search name or paste address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1d] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#fcca3f]/30 transition-all"
                autoFocus
            />
            </div>

            {/* Popular Tokens Chips */}
            <div className="flex gap-2 flex-wrap mb-4">
                {TOKENS.slice(0, 4).map(token => (
                    <motion.button
                        key={token.symbol}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            onSelectToken(token);
                            setSearchQuery('');
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1d] border border-white/5 hover:border-[#fcca3f]/30 rounded-full transition-colors"
                    >
                        <div className={`w-4 h-4 rounded-full ${token.color}`} />
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">{token.symbol}</span>
                    </motion.button>
                ))}
            </div>
        </div>

        <div className="h-[1px] bg-white/5 w-full" />

        {/* Token List */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredTokens.length > 0 ? (
            <div className="space-y-1">
                {filteredTokens.map((token, index) => {
                    const balance = getBalance(token.symbol);
                    return (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={token.symbol}
                            onClick={() => {
                                onSelectToken(token);
                                setSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between p-3 hover:bg-[#1a1a1d] rounded-2xl transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full ${token.color} flex items-center justify-center text-white font-bold text-sm shadow-lg opacity-90`}>
                                    {token.symbol[0]}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white text-base group-hover:text-[#fcca3f] transition-colors">{token.symbol}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{token.name}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-white">{balance > 0 ? balance : '0.00'}</div>
                                {balance > 0 && <div className="text-[10px] text-slate-500">Balance</div>}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">No tokens found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelectorModal;