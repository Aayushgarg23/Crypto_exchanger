import React from 'react';
import { Twitter, Github, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold gold-gradient-text">
              DexSwap
            </span>
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              The premium standard for decentralized trading. 
              Secure, efficient, and built for wealth.
            </p>
          </div>

          <div>
            <span className="text-white font-medium mb-6 block uppercase tracking-wider text-xs">Product</span>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Swap Interface</li>
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Liquidity Pools</li>
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Pro Analytics</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-medium mb-6 block uppercase tracking-wider text-xs">Protocol</span>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Governance</li>
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Developers</li>
              <li className="hover:text-[#fcca3f] transition-colors cursor-pointer">Security Audits</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-medium mb-6 block uppercase tracking-wider text-xs">Connect</span>
            <div className="flex gap-4">
              {[Twitter, Github, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#151518] hover:bg-[#1f1f22] border border-white/5 hover:border-[#fcca3f]/30 flex items-center justify-center transition-all group">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#fcca3f]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 DexSwap Protocol. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span className="hover:text-[#fcca3f] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#fcca3f] transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;