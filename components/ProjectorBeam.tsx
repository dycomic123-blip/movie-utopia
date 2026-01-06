import React, { useRef, useEffect } from 'react';

export const ProjectorBeam: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.5; // Increased time speed for faster flicker
      
      // Smooth follow logic (Lag)
      const ease = 0.08; 
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

      const { x, y } = currentRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // --- PROJECTOR FLICKER LOGIC ---
      
      // 1. Base Flicker (High frequency random noise - Bulb voltage)
      // Generates a value between 0.85 and 1.05
      const baseFlicker = 0.85 + Math.random() * 0.2;

      // 2. Shutter Effect (Rhythmic dip - 24fps simulation)
      // Occasional dip in brightness
      const shutter = Math.sin(time * 0.8) > 0.8 ? 0.7 : 1.0;

      // Combined Intensity
      const intensity = baseFlicker * shutter;

      // 3. Radius Jitter (Physical film gate vibration)
      const vibration = Math.sin(time * 2.5) * 4; 
      const radius = Math.max(0, width * 0.5 + vibration);

      // --- DRAW LIGHT ---

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      
      // Core: Bright warm/white. Intensity affects opacity.
      // We clamp opacity to max 0.95 to ensure some transparency
      const coreOpacity = Math.min(0.95, 0.9 * intensity);
      gradient.addColorStop(0, `rgba(255, 252, 240, ${coreOpacity})`); 
      
      // Mid: Cool cinema blue falloff
      const midOpacity = Math.min(0.6, 0.5 * intensity);
      gradient.addColorStop(0.15, `rgba(200, 230, 255, ${midOpacity})`); 
      
      // Outer: Deep atmosphere
      const outerOpacity = Math.min(0.3, 0.2 * intensity);
      gradient.addColorStop(0.4, `rgba(50, 80, 120, ${outerOpacity})`);
      
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      // Use 'screen' or 'lighter' to make the light feel additive and harsh like a real bulb
      ctx.globalCompositeOperation = 'screen'; 
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over'; // Reset

      // --- LENS FLARE / STREAK ---
      
      // Reacts to movement intensity (simulating lens glass)
      const dx = (targetRef.current.x - currentRef.current.x);
      // Flare also flickers with the bulb
      const flareOpacity = Math.min(0.5, (Math.abs(dx) * 0.01 + 0.1) * intensity);
      
      const flareGrad = ctx.createLinearGradient(0, y, width, y);
      flareGrad.addColorStop(0, `rgba(100, 150, 255, 0)`);
      flareGrad.addColorStop(0.5, `rgba(180, 220, 255, ${flareOpacity})`);
      flareGrad.addColorStop(1, `rgba(100, 150, 255, 0)`);
      
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, y - 2, width, 4);

      // --- CHROMATIC ABERRATION / DUST ARTIFACTS ---
      // Occasional red/blue flashes near center
      if (Math.random() > 0.92) {
          const artifactSize = Math.random() * 50;
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 50, 50, 0.08)' : 'rgba(50, 50, 255, 0.08)';
          ctx.fillRect(x - artifactSize/2, y - artifactSize/2, artifactSize, artifactSize);
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};