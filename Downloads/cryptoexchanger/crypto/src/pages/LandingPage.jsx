import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import SupportedNetworks from '@/components/landing/SupportedNetworks';
import Footer from '@/components/landing/Footer';
import SwapPage from '@/pages/SwapPage';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const LandingPage = () => {
  const [showSwap, setShowSwap] = useState(false);

  if (showSwap) {
    return <SwapPage onBack={() => setShowSwap(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0c]">
      <AnimatedBackground />

      <div className="relative z-10">
        <Hero onLaunchApp={() => setShowSwap(true)} />
        <SupportedNetworks />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;