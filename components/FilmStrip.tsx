import React, { useRef, useEffect } from 'react';

const MOVIE_TERMS = [
  "LUMINOUS ECHO", "TEMPORAL FLUX", "DREAM LOGIC", "SPATIAL EMOTION", "THE INVISIBLE EYE",
  "LONG FORM NARRATIVE", "VISUAL MEMORY", "CINEMATIC SOUL", "ETHEREAL ECONOMY", "PURE IMAGINATION",
  "LATENT SPACE", "NEURAL RADIANCE", "GENERATIVE ADVERSARIAL", "DIFFUSION MODEL", "TRANSFORMER", 
  "SEMANTIC SEGMENTATION", "STYLE TRANSFER", "TEXT-TO-VIDEO", "PROMPT ENGINEERING", "DEEP FAKE",
  "SYNTHETIC MEDIA", "GPU CLUSTER", "COMPUTATIONAL CINEMA", "VIRTUAL PRODUCTION", "UNREAL ENGINE",
  "ALGORITHM", "TRAINING DATA", "INFERENCE", "ZERO-SHOT", "IMAGE SYNTHESIS", "NOUVELLE VAGUE", 
  "MONTAGE", "MISE-EN-SCENE", "KUBRICK", "HITCHCOCK", "TARKOVSKY", "METROPOLIS", "BLADE RUNNER",
  "THE MATRIX", "EX_MACHINA", "HER", "2001: SPACE ODYSSEY", "GHOST IN THE SHELL", "AKIRA",
  "FADE IN", "EXECUTE", "COMPILE", "RENDER", "OUTPUT", "BUFFERING", "STREAMING"
];

export const FilmStrip: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const drawFilmStrips = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Film Base Layer (Dark, Semi-transparent)
      // Reduced opacity slightly to let more ProjectorBeam light through (0.92 -> 0.88)
      ctx.fillStyle = 'rgba(5, 5, 8, 0.88)'; 
      ctx.fillRect(0, 0, width, height);

      const stripWidth = 300; 
      const numStrips = Math.ceil(width / stripWidth) + 1;
      const textSpacing = 16; // Dense text

      // 2. Draw Dense Movie Terms (BEFORE punching holes)
      ctx.font = '10px "Oswald"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Text Color: Faint White (Watermark style)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';

      for (let i = 0; i < numStrips; i++) {
        const xBase = i * stripWidth;
        const centerX = xBase + stripWidth / 2;
        
        // Animated vertical scroll for text
        const scrollY = (time * 0.5) % textSpacing;

        // Draw multiple columns of text
        for (let y = -textSpacing; y < height + textSpacing; y += textSpacing) {
           const actualY = y + scrollY;
           const rowIndex = Math.floor((actualY - scrollY) / textSpacing);
           
           // Column 1: Left
           const term1 = MOVIE_TERMS[Math.abs((rowIndex + i * 50) % MOVIE_TERMS.length)];
           ctx.fillText(term1, centerX - 80, actualY);

           // Column 2: Right
           const term2 = MOVIE_TERMS[Math.abs((rowIndex + i * 50 + 25) % MOVIE_TERMS.length)];
           ctx.fillText(term2, centerX + 80, actualY);

           // Column 3: Center Technical Data (Simulated timecode/frame count)
           const frameNum = (rowIndex * 100 + Math.floor(time * 10)) % 99999;
           const code = frameNum.toString().padStart(5, '0');
           ctx.fillText(code, centerX, actualY);
        }
      }

      // 3. Punch Sprocket Holes (Destination-Out)
      ctx.globalCompositeOperation = 'destination-out';

      for (let i = 0; i < numStrips; i++) {
        const xBase = i * stripWidth;
        const sprocketWidth = 12;
        const sprocketHeight = 18;
        const gap = 30; 
        const scrollOffset = (time * 0.5) % gap;

        for (let y = -gap; y < height + gap; y += gap) {
            const yPos = y + scrollOffset;
            roundedRect(ctx, xBase + 10, yPos, sprocketWidth, sprocketHeight, 2);
            roundedRect(ctx, xBase + stripWidth - 22, yPos, sprocketWidth, sprocketHeight, 2);
        }
        
        // Vertical Separator Line
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(xBase + stripWidth - 1, 0, 2, height);
      }

      // 4. Scratches & Overlay Text (Source-Over)
      ctx.globalCompositeOperation = 'source-over';
      
      // Dynamic Scratches
      if (Math.random() > 0.8) {
          const x = Math.random() * width;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + (Math.random() - 0.5) * 5, height);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
      }

      // Edge Markings (Brighter)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px "Oswald"';
      for (let i = 0; i < numStrips; i++) {
           const xBase = i * stripWidth;
           ctx.save();
           ctx.translate(xBase + 6, height / 2);
           ctx.rotate(-Math.PI / 2);
           ctx.fillText(`NEURAL CINE 800T  •  ${2045 + i}  •  GEN-1`, 0, 0);
           ctx.restore();
      }

      time += 0.5;
      requestAnimationFrame(drawFilmStrips);
    };

    const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
    };

    const animId = requestAnimationFrame(drawFilmStrips);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};