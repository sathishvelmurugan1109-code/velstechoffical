import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport futuristic backdrop:
 * gradient-mesh blobs + neon grid + interactive particle network canvas.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DIST = 130;

    const init = () => {
      const count = Math.min(
        90,
        Math.floor((window.innerWidth * window.innerHeight) / 22000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      init();
    };

    const step = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle repel from the cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        if (dx * dx + dy * dy < 120 * 120) {
          p.x += dx * 0.004;
          p.y += dy * 0.004;
        }

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 208, 0, 0.4)";
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 208, 0, ${(1 - d / LINK_DIST) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0 bg-void" />

      {/* Gradient mesh blobs */}
      <div className="absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-gold/8 blur-[140px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[130px] animate-float" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-gold/5 blur-[120px]" />

      {/* Neon grid with radial mask */}
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Interactive particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Bottom fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </div>
  );
}
