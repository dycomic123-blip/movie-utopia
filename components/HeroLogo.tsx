import React, { useState, useEffect } from 'react';

export const HeroLogo: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative z-50 flex flex-col items-center mix-blend-difference">
      
      {/* Small Technical Label */}
      <div className="mb-4 overflow-hidden">
        <span className="block font-['Oswald'] text-[10px] tracking-[0.6em] text-neutral-400 uppercase animate-slide-up">
            Architects of the Invisible
        </span>
      </div>

      {/* Main Typography */}
      <div className="relative group cursor-default">
        {/* MOVIE - Bold, Condensed, Modern */}
        <h1 
            className="text-[6rem] md:text-[10rem] leading-[0.85] font-['Oswald'] font-bold tracking-tighter text-white mix-blend-difference transition-transform duration-100 ease-linear select-none"
            style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)` }}
        >
          MOVIE
        </h1>

        {/* UTOPIA - Serif, Italic, Elegant, Overlapping */}
        <h2 
            className="absolute top-[50%] left-[10%] md:left-[20%] text-[4rem] md:text-[7rem] leading-none font-['Playfair_Display'] italic font-thin tracking-wide text-neutral-500 mix-blend-exclusion select-none whitespace-nowrap transition-transform duration-200 ease-linear"
            style={{ transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)` }}
        >
          Utopia
        </h2>
      </div>

      {/* Vertical Line Decoration */}
      <div className="mt-12 w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20"></div>

      <style>{`
        @keyframes slide-up {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
            animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};