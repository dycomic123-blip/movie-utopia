import React, { useState, useEffect, useRef } from 'react';
import { ProjectorBeam } from './components/ProjectorBeam';
import { ParticleSystem } from './components/ParticleSystem';
import { HeroLogo } from './components/HeroLogo';
import { Navigation } from './components/Navigation';
import { FilmStrip } from './components/FilmStrip';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        cursorRef.current.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 400, fill: 'forwards' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-[#e5e5e5] overflow-x-hidden selection:bg-white selection:text-black cursor-none">
      
      {/* --- Custom Cursor --- */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white/80 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference blur-[1px]"
      />
      <div 
        className="fixed top-0 left-0 w-32 h-32 border border-white/10 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* --- Layer 1: The Light Source (Behind everything) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ProjectorBeam />
      </div>

      {/* --- Layer 2: The Semi-Transparent Film (Overlays the light) --- */}
      {/* The light shines THROUGH this layer */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <FilmStrip />
      </div>

      {/* --- Layer 3: Atmospheric Particles (Floating in the space between user and film) --- */}
      <div className="fixed inset-0 z-20 pointer-events-none mix-blend-screen">
        <ParticleSystem />
      </div>

      {/* --- Layer 4: Grain & Noise Texture --- */}
      <div className="fixed inset-0 pointer-events-none z-[25] opacity-[0.08] mix-blend-overlay">
        <svg className='w-full h-full'>
            <filter id='noiseFilter'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
        </svg>
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 py-8 px-8 md:px-12 flex justify-between items-start mix-blend-difference">
        <div className="flex flex-col">
           <span className="font-['Oswald'] text-xs tracking-[0.3em] uppercase opacity-70">CINE-UTOPIA</span>
           <span className="font-['Oswald'] text-[10px] tracking-[0.3em] uppercase opacity-50 mt-1">Ver 0.9.2 (Beta)</span>
        </div>
        <Navigation />
      </nav>

      {/* --- Main Content --- */}
      <main className="relative z-40 w-full min-h-screen flex flex-col items-center justify-center px-6">
        
        <HeroLogo />

        <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end mix-blend-exclusion">
            <div className="hidden md:block w-32 h-[1px] bg-white/40"></div>
            <p className="font-['Playfair_Display'] italic text-white/60 text-sm tracking-widest text-shadow-glow text-center md:text-left">
                Where the mechanical lens ends, the infinite eye begins.
            </p>
            <div className="hidden md:block w-32 h-[1px] bg-white/40"></div>
        </div>
      </main>

      {/* --- The Engine Section --- */}
      <section id="engine" className="relative z-40 w-full min-h-screen flex flex-col justify-center items-center py-40 border-t border-white/10 bg-black/80 backdrop-blur-sm overflow-hidden">
        
        {/* Background Giant Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
             <span className="text-[15vw] leading-none font-['Oswald'] font-bold tracking-tighter uppercase whitespace-nowrap">
                CONTINUUM
             </span>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-12">
            
            {/* Status Indicator */}
            <div className="flex flex-col items-center gap-3">
                 <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/50"></div>
                 <span className="font-['Oswald'] text-xs tracking-[0.4em] text-neutral-400 uppercase border border-white/10 px-6 py-2 bg-black/50 backdrop-blur-md">
                    Status: Ingesting A Century of Light
                 </span>
            </div>

            {/* Main Title */}
            <div className="mix-blend-difference">
                <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] italic font-thin text-white mb-4">
                    The Archive of Visual Memory
                </h2>
                <h3 className="text-lg md:text-xl font-['Oswald'] text-neutral-500 tracking-[0.4em] uppercase">
                    A Renaissance of the Image
                </h3>
            </div>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-neutral-400 font-['Oswald'] font-light tracking-wide text-sm leading-relaxed">
                We invite you to a place where the constraints of physics yield to the fluidity of thought. 
                Utopia is not an alternative to cinema, but its evolution—distilling a hundred years of aesthetic wisdom into a tool that understands the silence between frames.
                We are returning time to the creator.
            </p>

            {/* Newsletter / Notification Form */}
            <div className="w-full max-w-md mt-4 group">
                <div className="relative flex items-center border-b border-white/20 group-hover:border-white/60 transition-colors duration-500">
                    <input 
                        type="email" 
                        placeholder="REQUEST ENTRY" 
                        className="w-full bg-transparent py-4 text-center md:text-left font-['Oswald'] text-sm tracking-widest focus:outline-none text-white uppercase placeholder:text-neutral-700"
                    />
                    <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-['Oswald'] font-bold tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors">
                        Initiate
                    </button>
                </div>
            </div>

            {/* Footer decoration */}
            <div className="mt-20 flex items-center gap-6 opacity-40">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]"></span>
                    <span className="font-['Oswald'] text-[9px] tracking-widest">ARCHIVING TIME</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="font-['Oswald'] text-[9px] tracking-widest">EST. 2025</span>
            </div>

        </div>
      </section>

      <footer className="relative z-40 bg-black py-12 border-t border-white/5">
          <div className="container mx-auto px-6 flex justify-between items-center text-white/20">
              <span className="font-['Oswald'] text-[10px] tracking-widest">© MOVIE UTOPIA</span>
              <span className="font-['Oswald'] text-[10px] tracking-widest">ARCHITECTS OF THE INVISIBLE</span>
          </div>
      </footer>
    </div>
  );
}