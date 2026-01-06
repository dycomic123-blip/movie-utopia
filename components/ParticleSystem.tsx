import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  energy: number; // For jitter intensity
}

export const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 200; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
    };

    const createParticle = (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
      energy: Math.random() // Unique jitter characteristic
    });

    window.addEventListener('resize', resize);
    resize();

    // Track mouse velocity for wind
    let mouseVelocity = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - prevMouseRef.current.x;
        const dy = e.clientY - prevMouseRef.current.y;
        mouseVelocity = { x: dx, y: dy };
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Decay mouse velocity
      mouseVelocity.x *= 0.9;
      mouseVelocity.y *= 0.9;

      particles.forEach(p => {
        // 1. Ionic Jitter (High frequency noise)
        // Simulates dust caught in a high-energy beam
        const jitterX = (Math.random() - 0.5) * p.energy * 2;
        const jitterY = (Math.random() - 0.5) * p.energy * 2;
        
        // 2. Apply Turbulence from Mouse Wind
        const dx = p.x - prevMouseRef.current.x;
        const dy = p.y - prevMouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Influence range
        if (dist < 250) {
            const force = (250 - dist) / 250;
            // Stronger push + swirl
            p.vx += mouseVelocity.x * force * 0.08;
            p.vy += mouseVelocity.y * force * 0.08;
            
            // "Excited" state when near mouse
            p.life += 2; 
        }

        // 3. Physics Update
        p.x += p.vx + jitterX;
        p.y += p.vy + jitterY;

        // Friction
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Natural drift
        p.y -= 0.15; // Heat rises
        p.x += Math.sin(p.life * 0.05) * 0.1;

        // Screen wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Life cycle (flicker)
        p.life++;
        // Rapid flicker for ionic feel
        const flicker = Math.random() > 0.8 ? 0.8 : 0.4;
        const opacity = (Math.sin(p.life * 0.1) + 1) / 2 * flicker;

        // Draw
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        
        // Slightly blueish tint for "ionic" feel
        grad.addColorStop(0, `rgba(200, 220, 255, ${opacity})`);
        grad.addColorStop(1, `rgba(200, 220, 255, 0)`);
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core center (hotspot)
        if (opacity > 0.3) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
        }
      });

      requestAnimationFrame(update);
    };

    const animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};