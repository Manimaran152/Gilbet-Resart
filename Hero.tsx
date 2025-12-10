import React, { useEffect, useState } from 'react';
import { generateDailySpecial } from '../services/gemini';

const Hero: React.FC = () => {
  const [specialDesc, setSpecialDesc] = useState<string>("Loading our daily special...");

  useEffect(() => {
    let mounted = true;
    generateDailySpecial().then(desc => {
      if (mounted) setSpecialDesc(desc);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-[85vh] bg-tamil-earth overflow-hidden flex items-center justify-center text-center px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
      
      {/* Authentic Spice/Dark Mood Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop)',
          animation: 'pulse 20s infinite alternate' 
        }}
      ></div>

      <div className="relative z-20 max-w-5xl text-white">
        <h2 className="text-xl md:text-2xl font-sans font-light tracking-[0.3em] mb-4 text-tamil-saffron uppercase drop-shadow-md">
          Vanakkam & Welcome to
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 text-tamil-gold drop-shadow-xl tracking-tight">
          Gillbet Resart
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-tamil-saffron to-transparent mx-auto mb-8"></div>
        <p className="text-xl md:text-2xl font-light italic text-gray-100 max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          "{specialDesc}"
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#menu" className="px-10 py-4 bg-tamil-saffron text-white font-bold rounded-sm hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg uppercase tracking-widest text-sm border border-tamil-saffron">
            View Menu
          </a>
          <a href="#vision" className="px-10 py-4 bg-transparent border border-white/50 text-white font-bold rounded-sm hover:bg-white hover:text-tamil-earth transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
            Chef's Vision AI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;