import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, BarChart3, Globe2, Layers } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'Trade directly from your wallet. Your keys, your crypto, your control.'
  },
  {
    icon: Lock,
    title: 'Audited Security',
    description: 'Battle-tested smart contracts audited by top security firms.'
  },
  {
    icon: Zap,
    title: 'Flash Swaps',
    description: 'Execute complex arbitrage strategies in a single transaction.'
  },
  {
    icon: BarChart3,
    title: 'Pro Analytics',
    description: 'Real-time charts, depth views, and historical data for every pair.'
  },
  {
    icon: Globe2,
    title: 'Cross-Chain',
    description: 'Bridge and swap assets across 15+ networks seamlessly.'
  },
  {
    icon: Layers,
    title: 'Deep Liquidity',
    description: 'Aggregated liquidity sources ensure the best rates with zero slippage.'
  }
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Institutional Grade <span className="gold-gradient-text">DeFi</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Powerful tools for traders, developers, and liquidity providers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full border border-white/5 group-hover:border-[#fcca3f]/30 transition-all duration-300 hover:shadow-[0_0_20px_-10px_rgba(252,202,63,0.1)] bg-[#0f0f11]">
                <div className={`w-12 h-12 bg-[#1a1a1d] rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#fcca3f]/30 transition-colors`}>
                  <feature.icon className={`w-6 h-6 text-[#fcca3f]`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm font-light">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;