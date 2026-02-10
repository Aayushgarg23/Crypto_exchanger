import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PoolCard = ({ pair, apy, tvl, multiplier, color }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="glass-panel rounded-3xl p-6 gold-border relative group"
    >
        <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
        </div>

        <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-3">
                <div className={`w-10 h-10 rounded-full ${color} border-2 border-background flex items-center justify-center text-xs font-bold`}>A</div>
                <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-background flex items-center justify-center text-xs font-bold">B</div>
            </div>
            <div>
                <h3 className="font-bold text-lg">Liquidity Pool</h3>
                <p className="text-xs text-muted-foreground">{pair}</p>
            </div>
        </div>

        <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-1">APY</div>
            <div className="text-4xl font-bold text-primary font-mono tracking-tight">{apy}%</div>
            <div className="inline-block mt-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                {multiplier} Multiplier
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
                <p className="text-muted-foreground">TVL</p>
                <p className="font-medium">{tvl}</p>
            </div>
            <div>
                <p className="text-muted-foreground">My Stake</p>
                <p className="font-medium">$0.00</p>
            </div>
        </div>

        <Button className="w-full gold-gradient text-black font-bold rounded-xl hover:opacity-90">
            Stake
        </Button>
    </motion.div>
);

const EarnPage = () => {
    return (
        <div className="py-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4">Staking/Earn</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Provide liquidity to earn yield on your assets. High APY pools are available for a limited time.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PoolCard pair="ETH - GOLD" apy="97.47" tvl="$12.4M" multiplier="20x" color="bg-blue-500" />
                <PoolCard pair="USDC - GOLD" apy="62.06" tvl="$45.2M" multiplier="10x" color="bg-green-500" />
                <PoolCard pair="WBTC - ETH" apy="101.68" tvl="$8.1M" multiplier="25x" color="bg-orange-500" />
                <PoolCard pair="LINK - ETH" apy="72.77" tvl="$3.4M" multiplier="15x" color="bg-purple-500" />
                <PoolCard pair="DAI - USDC" apy="89.81" tvl="$95.5M" multiplier="5x" color="bg-yellow-500" />
                <PoolCard pair="UNI - ETH" apy="113.96" tvl="$6.2M" multiplier="30x" color="bg-pink-500" />
            </div>
        </div>
    );
};

export default EarnPage;