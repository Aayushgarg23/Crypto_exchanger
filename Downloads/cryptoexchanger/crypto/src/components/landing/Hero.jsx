import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } }
};

const Hero = ({ onLaunchApp }) => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-48 sm:pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fcca3f]/10 border border-[#fcca3f]/30 mb-10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcca3f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            <span className="text-xs font-bold text-[#fcca3f] tracking-widest uppercase">V3 Protocol Live</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={item} className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="block text-white">Future of</span>
            <span className="gold-gradient-text drop-shadow-lg">Decentralized</span>
            <span className="block text-white">Trading</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={item} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Lightning-fast swaps, deep liquidity, and zero-custody risk. 
            The premium standard for digital asset exchange.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              onClick={onLaunchApp}
              className="group relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-[#d4af37] to-[#fcca3f] text-black hover:brightness-110 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(252,202,63,0.3)] border-none"
            >
              Launch App
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-7 text-lg border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-full backdrop-blur-sm transition-all hover:border-[#fcca3f]/30"
            >
              View Documentation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;