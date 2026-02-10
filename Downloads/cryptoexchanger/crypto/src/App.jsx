import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { WalletProvider } from '@/context/WalletContext';
import { PriceProvider } from '@/context/PriceContext';
import Navbar from '@/components/layout/Navbar';
import CoinBackground from '@/components/layout/CoinBackground';
import Dashboard from '@/pages/Dashboard';
import SwapPage from '@/pages/SwapPage';
import EarnPage from '@/pages/EarnPage';
import NFTPage from '@/pages/NFTPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <PriceProvider>
          <WalletProvider>
            <Router>
              <div className="min-h-screen relative font-sans">
                <CoinBackground />
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/trade" element={<SwapPage />} />
                    <Route path="/earn" element={<EarnPage />} />
                    <Route path="/nft" element={<NFTPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Toaster />
              </div>
            </Router>
          </WalletProvider>
        </PriceProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;