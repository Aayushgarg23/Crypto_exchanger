import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NFTCard = ({ image, name, price, creator }) => (
    <motion.div 
        whileHover={{ scale: 1.02 }}
        className="glass-panel rounded-2xl overflow-hidden gold-border group cursor-pointer"
    >
        <div className="aspect-square bg-secondary relative overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                Top Pick
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-lg truncate">{name}</h3>
                    <p className="text-xs text-muted-foreground">{creator}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div>
                    <p className="text-xs text-muted-foreground">Current Price</p>
                    <p className="font-bold text-primary">{price} GOLD</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-lg hover:bg-primary hover:text-black hover:border-primary">
                    Buy
                </Button>
            </div>
        </div>
    </motion.div>
);

const NFTPage = () => {
    const filters = ['All', 'Rare', 'Unique', 'Adventure', 'Soldier', 'Founder'];
    const [activeFilter, setActiveFilter] = useState('All');

    // Using generic placeholder images from Unsplash
    const nfts = [
        { name: "Digital Feats #124", creator: "@artist_one", price: "5.4 ETH", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60" },
        { name: "Grancin Portrait", creator: "@classic_remix", price: "1.22 GOLD", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&auto=format&fit=crop&q=60" },
        { name: "Moroath King", creator: "@royal_collection", price: "11.33 GOLD", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60" },
        { name: "Digital Simian", creator: "@modern_apes", price: "0.82 ETH", image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=500&auto=format&fit=crop&q=60" },
        { name: "Cyber Punk #44", creator: "@future_labs", price: "45.00 GOLD", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" },
        { name: "Golden Abstract", creator: "@gold_member", price: "100.00 GOLD", image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=500&auto=format&fit=crop&q=60" },
        { name: "Space Walker", creator: "@nasa_fan", price: "2.5 ETH", image: "https://images.unsplash.com/photo-1614728853913-1e221a65d648?w=500&auto=format&fit=crop&q=60" },
        { name: "Lost Relic", creator: "@indiana_b", price: "8.88 GOLD", image: "https://images.unsplash.com/photo-1605142859619-22919d6515c0?w=500&auto=format&fit=crop&q=60" },
    ];

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">NFT Marketplace</h1>
                    <p className="text-muted-foreground text-sm">Discover exclusive digital assets</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-2 border border-border w-full md:w-auto">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Search collection..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                            activeFilter === filter 
                            ? 'bg-primary text-black border-primary' 
                            : 'bg-transparent text-muted-foreground border-border hover:border-primary/50'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {nfts.map((nft, index) => (
                    <NFTCard key={index} {...nft} />
                ))}
            </div>
        </div>
    );
};

export default NFTPage;