import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [slippage, setSlippage] = useState(0.5); // Default 0.5%
  const [deadline, setDeadline] = useState(20); // Default 20 mins
  const [expertMode, setExpertMode] = useState(false);

  const value = {
    slippage,
    setSlippage,
    deadline,
    setDeadline,
    expertMode,
    setExpertMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};