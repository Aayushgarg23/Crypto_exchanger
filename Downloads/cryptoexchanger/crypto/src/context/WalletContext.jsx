import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_WALLET_ASSETS } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsLoading(true);
    // Simulate Web3 connection delay
    setTimeout(() => {
      setIsConnected(true);
      setAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      setChainId(137); // Polygon Mainnet
      setAssets(MOCK_WALLET_ASSETS);
      setIsLoading(false);
      
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Polygon Mainnet",
        className: "bg-green-500/10 border-green-500/50 text-white"
      });
    }, 1500);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
    setAssets([]);
    toast({
        title: "Wallet Disconnected",
        description: "Session ended",
    });
  };

  const getBalance = (symbol) => {
    const asset = assets.find(a => a.symbol === symbol);
    return asset ? asset.balance : '0.00';
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      address, 
      chainId, 
      assets, 
      connectWallet, 
      disconnectWallet,
      getBalance,
      isLoading
    }}>
      {children}
    </WalletContext.Provider>
  );
};