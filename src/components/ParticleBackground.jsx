import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport futuristic backdrop:
 * gradient-mesh blobs + neon grid + interactive particle network canvas.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;

    let raf = 0;
    let particles = [];
    let active = true;
    let lastTime = 0;
    let lastBudgetCheck = 0;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const getParticleTarget = () => {
      const area = width() * height();

      if (reducedMotion) return 12;
      if (window.matchMedia("(max-width: 767px)").matches) return Math.min(18, Math.max(10, Math.floor(area / 48000)));
      if (window.matchMedia("(max-width: 1024px)").matches) return Math.min(36, Math.max(18, Math.floor(area / 27000)));
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return Math.min(60, Math.max(28, Math.floor(area / 20000)));
      return Math.min(90, Math.max(42, Math.floor(area / 18000)));
    };

    const makeParticle = () => ({
      x: Math.random() * width(),
      y: Math.random() * height(),
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.3),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.3),
      r: Math.random() * 1.8 + 0.7,
    });

    const syncParticles = () => {
      const target = getParticleTarget();
      if (particles.length < target) {
        const addCount = target - particles.length;
        for (let i = 0; i < addCount; i += 1) particles.push(makeParticle());
      } else if (particles.length > target + 8) {
        particles.length = target;
      }
    };

    const init = () => {
      particles = Array.from({ length: getParticleTarget() }, () => makeParticle());
      syncParticles();
    };

    const resize = () => {
      canvas.width = width() * DPR;
      canvas.height = height() * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      init();
    };

    const updateVisibility = () => {
      active = document.visibilityState !== "hidden";
      if (!active) {
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const step = (timestamp) => {
      if (!active) return;

      const delta = timestamp - lastTime || 16.7;
      lastTime = timestamp;

      if (timestamp - lastBudgetCheck > 900) {
        lastBudgetCheck = timestamp;
        const target = getParticleTarget();

        if (delta > 34 && particles.length > 12) {
          particles.length = Math.max(12, Math.round(particles.length * 0.9));
        } else if (delta < 18 && particles.length < target) {
          particles.push(makeParticle());
        }

        if (particles.length > target + 6) particles.length = target;
      }

      const w = width();
      const h = height();
      const linkDistance = reducedMotion ? 80 : 120;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointerFine) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          if (dx * dx + dy * dy < 120 * 120) {
            p.x += dx * 0.004;
            p.y += dy * 0.004;
          }
        }

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 208, 0, 0.42)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < linkDistance) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(255, 208, 0, ${(1 - d / linkDistance) * 0.12})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    resize();
    raf = requestAnimationFrame(step);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return (
        <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-void" />

      {/* Gradient mesh blobs */}
      <div className="absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-gold/8 blur-[140px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[130px] animate-float" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-gold/5 blur-[120px]" />

      {/* Neon grid with radial mask */}
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Interactive particles */}
      {/* NOTE: `h-full w-full` is required — `inset-0` alone does NOT stretch a
          replaced element like <canvas>, so on DPR>1 screens the canvas box
          resolved to its intrinsic (attribute) size and rendered 2x too large. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* Bottom fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </div>
  );
}
