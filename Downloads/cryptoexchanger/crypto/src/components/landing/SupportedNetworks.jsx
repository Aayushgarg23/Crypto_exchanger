import React from 'react';
import { motion } from 'framer-motion';

const networks = [
  { name: 'Ethereum', letters: 'ETH' },
  { name: 'Polygon', letters: 'MATIC' },
  { name: 'BNB Chain', letters: 'BNB' },
  { name: 'Arbitrum', letters: 'ARB' },
  { name: 'Optimism', letters: 'OP' },
  { name: 'Avalanche', letters: 'AVAX' },
  { name: 'Base', letters: 'BASE' },
  { name: 'Solana', letters: 'SOL' }
];

const SupportedNetworks = () => {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0d0d0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">
            Available Across 8+ Networks
          </h2>
          <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">One interface. Every major chain.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {networks.map((network, index) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group cursor-default"
            >
              <div className="bg-[#151518] border border-white/5 rounded-full pl-2 pr-5 py-2 flex items-center gap-3 hover:border-[#fcca3f]/40 hover:bg-[#fcca3f]/5 transition-all duration-300 shadow-sm">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[10px] font-bold text-[#fcca3f] shadow-inner border border-white/5`}>
                    {network.letters.slice(0,1)}
                </div>
                <span className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors">{network.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedNetworks;