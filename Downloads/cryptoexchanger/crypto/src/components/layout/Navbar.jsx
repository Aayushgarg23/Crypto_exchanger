import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { usePrices } from '@/context/PriceContext';
import WalletConnection from '@/components/web3/WalletConnection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { prices, priceChanges } = usePrices();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trade', path: '/trade' },
    { name: 'Earn', path: '/earn' },
    { name: 'NFT', path: '/nft' },
    { name: 'Contact', path: '/contact' },
  ];

  const PriceItem = ({ symbol }) => {
    const price = prices[symbol];
    const change = priceChanges[symbol] || 0;
    const isUp = change >= 0;
 if (price == null) {
    return (
      <span className="text-muted-foreground">
        --
      </span>
    )
  }
    return (
      <div className="hidden lg:flex items-center gap-2 text-xs font-medium bg-secondary/30 px-3 py-1.5 rounded-full border border-white/5">
        <span className="text-muted-foreground">{symbol}</span>
        <span className="text-foreground">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span className={`flex items-center ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
          {Math.abs(change)}%
        </span>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Network */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fcca3f] to-[#d4af37] flex items-center justify-center shadow-lg shadow-[#fcca3f]/20">
                <span className="text-black font-bold text-lg">P</span>
              </div>
              <span className="hidden sm:block text-xl font-bold tracking-tight">Prosperity</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Polygon</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Price Ticker */}
            <div className="flex items-center gap-2 mr-2">
               <PriceItem symbol="MATIC" />
               <PriceItem symbol="ETH" />
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hidden sm:flex">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <WalletConnection />

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-panel border-white/10">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <NavLink to={link.path} className="w-full cursor-pointer font-medium p-3">
                        {link.name}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;