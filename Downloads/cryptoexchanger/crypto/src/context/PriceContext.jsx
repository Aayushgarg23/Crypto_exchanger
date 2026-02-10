import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRICES } from '@/lib/constants';

const PriceContext = createContext();

export const usePrices = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [priceChanges, setPriceChanges] = useState({
    MATIC: 2.5,
    USDC: 0.01,
    WETH: -1.2,
    WBTC: 0.5,
  });

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        ...prev,
        MATIC: prev.MATIC * (1 + (Math.random() * 0.02 - 0.01)),
        WETH: prev.WETH * (1 + (Math.random() * 0.01 - 0.005)),
        WBTC: prev.WBTC * (1 + (Math.random() * 0.01 - 0.005)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPrice = (symbol) => prices[symbol] || 0;

  return (
    <PriceContext.Provider value={{ prices, priceChanges, getPrice }}>
      {children}
    </PriceContext.Provider>
  );
};