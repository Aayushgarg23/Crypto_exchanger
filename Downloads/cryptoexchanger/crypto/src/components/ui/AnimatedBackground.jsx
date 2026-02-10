import React from 'react';
import { motion } from 'framer-motion';

const CoinShape = ({ delay, duration, x, scale, blur }) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ 
      y: ['0vh', '100vh'],
      opacity: [0, 0.4, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration: duration, 
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{ left: `${x}%`, filter: `blur(${blur}px)` }}
    className={`fixed rounded-full border border-[#fcca3f]/10 bg-gradient-to-br from-[#fcca3f]/5 to-transparent pointer-events-none z-0`}
  >
    <div style={{ width: `${scale}px`, height: `${scale}px` }} />
  </motion.div>
);

const AnimatedBackground = () => {
  const shapes = [
    { delay: 0, duration: 25, x: 10, scale: 60, blur: 2 },
    { delay: 5, duration: 30, x: 25, scale: 40, blur: 4 },
    { delay: 2, duration: 20, x: 40, scale: 80, blur: 3 },
    { delay: 8, duration: 35, x: 60, scale: 50, blur: 5 },
    { delay: 12, duration: 28, x: 80, scale: 70, blur: 2 },
    { delay: 15, duration: 32, x: 90, scale: 30, blur: 6 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <CoinShape key={i} {...shape} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/20 to-[#0a0a0c] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;