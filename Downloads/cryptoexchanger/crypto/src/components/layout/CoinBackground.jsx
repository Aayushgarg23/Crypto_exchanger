import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useTheme } from '@/context/ThemeContext';

const CoinBackground = () => {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const bgColor = theme === 'dark' ? '#1a1a1a' : '#fdfbf7';
  const particleColor = '#fcca3f'; // Gold

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: bgColor,
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            enable: false,
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 20,
          },
          opacity: {
            value: 0.7,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
            }
          },
          shape: {
            type: "circle", // Using simple circle to represent coin glint/shine
          },
          size: {
            value: { min: 3, max: 8 },
            random: true,
          },
          rotate: {
             value: 0,
             random: true,
             direction: "clockwise",
             animation: {
                enable: true,
                speed: 5,
                sync: false
             }
          }
        },
        detectRetina: true,
        zLayers: 1, 
        zIndex: -1
      }}
      className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-500"
    />
  );
};

export default CoinBackground;