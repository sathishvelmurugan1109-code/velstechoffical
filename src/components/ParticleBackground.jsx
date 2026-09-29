import { useEffect, useRef } from "react";

// ============================================================
// Fixed, full-viewport backdrop: gradient orbs + drifting grid + an
// interactive gold particle network on canvas.
//
// Performance contract (this part survived the audit):
//   • DPR capped at 2
//   • particle budget adapts to viewport size and hardwareConcurrency
//   • the loop pauses when the tab is hidden
//   • if frames get slow (delta > 34ms) the population shrinks
//   • touch devices skip the mouse-repulsion pass entirely
// ============================================================

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    let raf = 0;
    let particles = [];
    let active = true;
    let lastTime = 0;
    let lastBudgetCheck = 0;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;

    const getParticleTarget = () => {
      const area = width() * height();

      if (reducedMotion) return 10;
      if (window.matchMedia("(max-width: 767px)").matches) {
        return Math.min(16, Math.max(8, Math.floor(area / 52000)));
      }
      if (window.matchMedia("(max-width: 1024px)").matches) {
        return Math.min(32, Math.max(16, Math.floor(area / 30000)));
      }
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        return Math.min(54, Math.max(24, Math.floor(area / 22000)));
      }
      return Math.min(80, Math.max(38, Math.floor(area / 20000)));
    };

    const makeParticle = () => ({
      x: Math.random() * width(),
      y: Math.random() * height(),
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.26),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.26),
      r: Math.random() * 1.7 + 0.7,
    });

    const resize = () => {
      canvas.width = width() * DPR;
      canvas.height = height() * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      particles = Array.from({ length: getParticleTarget() }, () => makeParticle());
    };

    const updateVisibility = () => {
      active = document.visibilityState !== "hidden";
      if (!active) {
        cancelAnimationFrame(raf);
        return;
      }
      lastTime = 0;
      raf = requestAnimationFrame(step);
    };

    const step = (timestamp) => {
      if (!active) return;

      const delta = timestamp - lastTime || 16.7;
      lastTime = timestamp;

      if (timestamp - lastBudgetCheck > 900) {
        lastBudgetCheck = timestamp;
        const target = getParticleTarget();

        if (delta > 34 && particles.length > 10) {
          particles.length = Math.max(10, Math.round(particles.length * 0.9));
        } else if (delta < 18 && particles.length < target) {
          particles.push(makeParticle());
        }

        if (particles.length > target + 6) particles.length = target;
      }

      const w = width();
      const h = height();
      const linkDistance = reducedMotion ? 76 : 118;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointerFine) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          if (dx * dx + dy * dy < 120 * 120) {
            p.x += dx * 0.0035;
            p.y += dy * 0.0035;
          }
        }

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 208, 0, 0.34)";
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
              ctx.strokeStyle = `rgba(255, 208, 0, ${(1 - d / linkDistance) * 0.1})`;
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

      {/* Two wide gold orbs (was three 34rem blurs — cheaper, same mood) */}
      <div className="amb-orb amb-orb--gold -left-32 -top-24 h-[26rem] w-[26rem]" />
      <div className="amb-orb amb-orb--gold -right-32 top-1/3 h-[22rem] w-[22rem] opacity-40" />
      <div className="amb-orb amb-orb--soft bottom-0 left-1/4 h-[20rem] w-[20rem]" />

      {/* Drifting grid, masked to the middle for readability */}
      <div className="amb-grid amb-grid--drift" />

      {/* Interactive particle network.
          `h-full w-full` is required — `inset-0` alone does NOT stretch a
          replaced element like <canvas>, so on DPR>1 screens the canvas box
          resolved to its intrinsic size and rendered 2× too large. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />

      {/* Bottom fade keeps body copy readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </div>
  );
}

