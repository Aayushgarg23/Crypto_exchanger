import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Placeholder Chart Component
const PerformanceChart = () => (
    <div className="relative h-64 w-full flex items-end gap-2 px-4 pb-4 mt-8">
        {/* Simple  bar visualizer using css */}
        {Array.from({ length: 20 }).map((_, i) => {
            const height = 30 + Math.random() * 60;
            return (
                <div key={i} className="flex-1 bg-gradient-to-t from-primary/10 to-primary/60 rounded-t-sm hover:from-primary/20 hover:to-primary/80 transition-all duration-300" style={{ height: `${height}%` }} />
            )
        })}
        {/* Line overlay approximation */}
         <div className="absolute inset-x-4 bottom-4 h-full pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,150 C50,150 50,100 100,100 C150,100 150,50 200,50 C250,50 250,120 300,120 C350,120 350,20 400,20 C450,20 450,80 500,80 C550,80 550,10 600,10" 
                      fill="none" 
                      stroke="#fcca3f" 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                      className="opacity-50"
                 />
                 <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fcca3f" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#fcca3f" stopOpacity="0"/>
                    </linearGradient>
                 </defs>
                 <path d="M0,150 C50,150 50,100 100,100 C150,100 150,50 200,50 C250,50 250,120 300,120 C350,120 350,20 400,20 C450,20 450,80 500,80 C550,80 550,10 600,10 V300 H0 Z" 
                      fill="url(#chartGradient)"
                      className="opacity-20"
                 />
            </svg>
        </div>
    </div>
);

const AssetRow = ({ icon, symbol, name, value, change }) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg">{icon}</div>
            <div>
                <div className="font-bold text-base">{symbol}</div>
                <div className="text-xs text-muted-foreground uppercase">{name}</div>
            </div>
        </div>
        <div className="text-right">
             <div className="font-bold font-mono">{value}</div>
             <div className={`text-xs font-medium flex items-center justify-end gap-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(change)}%
             </div>
        </div>
    </div>
);

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
      {/* Main Chart Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 glass-panel rounded-3xl p-6 gold-border relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-2">
            <div>
                <h2 className="text-muted-foreground text-sm font-medium mb-1">Total Portfolio Value</h2>
                <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-foreground">
                    $258,009.33
                </div>
                <div className="flex items-center gap-2 mt-2 text-green-500 font-medium">
                    <div className="bg-green-500/10 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +$862.90 (2.37%)
                    </div>
                    <span className="text-muted-foreground text-xs">vs last month</span>
                </div>
            </div>
            <div className="flex gap-2">
                 {['1D', '1W', '1M', '1Y', 'ALL'].map(period => (
                     <button key={period} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${period === '1M' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>
                         {period}
                     </button>
                 ))}
            </div>
        </div>

        <PerformanceChart />
      </motion.div>

      {/* Held Assets Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl p-6 gold-border"
      >
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Held Assets</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
            </Button>
        </div>

        <div className="space-y-1">
            <AssetRow icon="🔹" symbol="ETH" name="Ethereum" value="$42,675.30" change={5.2} />
            <AssetRow icon="🟡" symbol="GOLD" name="Gold Token" value="$2,239.50" change={-1.2} />
            <AssetRow icon="💠" symbol="LINK" name="Chainlink" value="$58.55" change={20.25} />
            <AssetRow icon="✖️" symbol="XRP" name="Ripple" value="$526.50" change={0.00} />
            <AssetRow icon="🦄" symbol="UNI" name="Uniswap" value="$1,006.85" change={-0.8} />
        </div>

        <Button variant="outline" className="w-full mt-6 rounded-xl border-dashed border-muted-foreground/30 hover:border-primary hover:text-primary">
            Show All Assets
        </Button>
      </motion.div>

      {/* Quick Actions / Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
         {[
             { label: 'Total Yield Earned', value: '$12,405.00', icon: DollarSign, color: 'text-green-500' },
             { label: 'NFT Valuation', value: '$45,200.00', icon: CreditCard, color: 'text-purple-500' },
             { label: 'Staked Balance', value: '$105,000.00', icon: Wallet, color: 'text-blue-500' },
         ].map((stat, i) => (
             <div key={i} className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300 cursor-default">
                 <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${stat.color}`}>
                     <stat.icon className="w-6 h-6" />
                 </div>
                 <div>
                     <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                     <div className="text-2xl font-bold font-mono">{stat.value}</div>
                 </div>
             </div>
         ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;