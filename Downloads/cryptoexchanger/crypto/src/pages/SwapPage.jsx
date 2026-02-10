import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/web3/WalletConnection';
import SwapInterface from '@/components/swap/SwapInterface';
import SettingsModal from '@/components/swap/SettingsModal';
import { useToast } from '@/components/ui/use-toast';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const SwapPage = ({ onBack }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = () => {
    setIsConnected(true);
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to Ethereum Mainnet",
      className: "bg-[#1a1a1d] border-[#fcca3f]/20 text-white"
    });
  };

  return (
    <>
      <Helmet>
        <title>Swap - DexSwap Pro</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0a0a0c] relative overflow-hidden flex flex-col">
        <AnimatedBackground />
        
        {/* Header */}
        <nav className="border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                    <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="hover:bg-white/5 text-slate-400 hover:text-[#fcca3f] rounded-full"
                    >
                    <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Hexagon className="w-8 h-8 text-[#fcca3f] fill-[#fcca3f]/10" strokeWidth={1.5} />
                        <span className="text-xl font-bold text-white tracking-tight">DexSwap</span>
                    </div>
                </div>
                
                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {['Swap', 'Limit', 'Pools', 'Vote'].map((item) => (
                        <button key={item} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${item === 'Swap' ? 'bg-[#fcca3f]/10 text-[#fcca3f] border border-[#fcca3f]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                            {item}
                        </button>
                    ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <WalletConnection
                  isConnected={isConnected}
                  address={walletAddress}
                  onConnect={handleConnect}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSettingsOpen(true)}
                  className="hover:bg-white/5 text-slate-400 hover:text-white rounded-full ml-2"
                >
                   {/* Settings Icon triggered via prop in interface, but accessible here if needed */}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[480px]"
          >
            <SwapInterface isConnected={isConnected} openSettings={() => setSettingsOpen(true)} />
          </motion.div>
        </div>

        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </>
  );
};

export default SwapPage;