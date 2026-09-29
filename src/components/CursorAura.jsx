import { useEffect, useRef } from "react";

/**
 * Soft gold light that trails the pointer on large screens.
 *
 * Cost control: fine-pointer + ≥1024px only, transform-only, and the lerp
 * loop cancels itself as soon as it settles — an idle page costs nothing.
 * Skipped entirely for reduced-motion users.
 */
export default function CursorAura() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return undefined;
    }
    if (window.innerWidth < 1024) return undefined;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.35;
    let targetX = x;
    let targetY = y;

    const loop = () => {
      frame = 0;
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.setProperty("--ax", `${x.toFixed(1)}px`);
      el.style.setProperty("--ay", `${y.toFixed(1)}px`);

      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        frame = requestAnimationFrame(loop);
      }
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!el.classList.contains("is-active")) el.classList.add("is-active");
      if (!frame) frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="aura" aria-hidden="true" />;
}
