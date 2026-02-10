import React from 'react';
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/context/WalletContext';

const WalletConnection = () => {
  const { isConnected, address, getBalance, connectWallet, disconnectWallet, isLoading } = useWallet();
  const { toast } = useToast();
  const maticBalance = getBalance('MATIC');

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
        className: "bg-[#1a1a1d] border-white/10 text-white"
      });
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isLoading}
        className="relative group overflow-hidden gold-gradient text-black font-bold rounded-full px-6 transition-all hover:brightness-110 shadow-lg border-none"
      >
        <div className="relative flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
        </div>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
        {/* Balance Display */}
        <div className="hidden lg:flex items-center px-3 py-1.5 bg-[#1a1a1d] rounded-full border border-white/10 text-xs font-mono font-bold text-white">
            {parseFloat(maticBalance).toFixed(2)} MATIC
        </div>

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            variant="outline"
            className="border-[#fcca3f]/30 bg-[#fcca3f]/10 hover:bg-[#fcca3f]/20 text-white rounded-full pl-3 pr-4 h-10 gap-2 backdrop-blur-md"
            >
            <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcca3f] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
                </div>
                <span className="font-mono text-sm">{formatAddress(address)}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#fcca3f]" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#121214] border-white/10 rounded-xl w-64 p-2 shadow-2xl">
            <div className="px-3 py-3 mb-2 border-b border-white/5 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 font-medium mb-1">Connected Network</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm font-bold text-white">Polygon Mainnet</span>
                </div>
            </div>
            <DropdownMenuItem onClick={handleCopyAddress} className="rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer py-2.5">
                <Copy className="mr-2 h-4 w-4" />
                Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer py-2.5">
                <a href={`https://polygonscan.com/address/${address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Polygonscan
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet} className="rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer py-2.5 mt-1">
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default WalletConnection;
