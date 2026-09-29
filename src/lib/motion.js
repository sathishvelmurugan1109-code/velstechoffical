// ============================================================
// VELS TECH — shared motion layer
// ------------------------------------------------------------
// ONE source of truth for easing, scroll-reveal variants and the
// pointer-interaction hooks (magnetic / spotlight / tilt).
//
// Performance rules followed here:
//  • only transform + opacity are animated
//  • pointer effects are skipped entirely for touch and for users who
//    asked for reduced motion
//  • values are written to CSS custom properties, so the browser can
//    composite the result on the GPU without a React re-render
// ============================================================

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Signature easing used across the whole site. */
export const EASE = [0.16, 1, 0.3, 1];

/** Default scroll-reveal viewport (fires once, a quarter into view). */
export const VIEWPORT = { once: true, amount: 0.25 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay, ease: EASE },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export const slideIn = (from = "left") => ({
  hidden: { opacity: 0, x: from === "left" ? -26 : 26 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.66, delay, ease: EASE },
  }),
});

/** Parent variant that staggers its children. */
export const stagger = (each = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

const pointerFine = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
};

/**
 * Magnetic pull for buttons and small controls.
 * Writes `--mag-x` / `--mag-y`, consumed by `.btn`.
 */
export function useMagnetic(strength = 0.28, max = 8) {
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (event) => {
      if (reduce || !pointerFine()) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      const limit = (value) => Math.max(-max, Math.min(max, value));
      event.currentTarget.style.setProperty("--mag-x", `${limit(dx * strength * max * 2).toFixed(2)}px`);
      event.currentTarget.style.setProperty("--mag-y", `${limit(dy * strength * max * 2).toFixed(2)}px`);
    },
    [max, reduce, strength]
  );

  const onPointerLeave = useCallback((event) => {
    const el = event.currentTarget;
    el.style.setProperty("--mag-x", "0px");
    el.style.setProperty("--mag-y", "0px");
  }, []);

  return { onPointerMove, onPointerLeave };
}

/** Cursor-following gold spotlight for cards (writes `--mx` / `--my`). */
export function useSpotlight() {
  const reduce = useReducedMotion();

  return useCallback(
    (event) => {
      if (reduce || !pointerFine()) return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [reduce]
  );
}

/**
 * Very subtle 3D tilt (max ~3°). Deliberately restrained — the brief asks
 * for polish, not a funhouse mirror.
 */
export function useTilt(deg = 3) {
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (event) => {
      if (reduce || !pointerFine()) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * deg).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * deg).toFixed(2)}deg`);
    },
    [deg, reduce]
  );

  const onPointerLeave = useCallback((event) => {
    const el = event.currentTarget;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }, []);

  return { onPointerMove, onPointerLeave };
}

/**
 * Combined motion source for the hero stage.
 *
 * Publishes three custom properties on ONE element from a single rAF
 * scheduler, so the whole scene shares one layout read and one frame budget:
 *   --px / --py   pointer parallax, -1…1  (fine pointers only)
 *   --scrolly     signed scroll offset in px, only while on screen
 *
 * Everything is transform-only downstream, and the hook opts out completely
 * for reduced-motion users and small screens — where it returns a plain ref
 * and the CSS layers simply stay put.
 */
export function useStageMotion(range = 220) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return undefined;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const desktop = window.innerWidth >= 1024;
    if (!fine && !desktop) return undefined;

    let frame = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const render = () => {
      frame = 0;

      if (fine) {
        pointer.x += (pointer.tx - pointer.x) * 0.18;
        pointer.y += (pointer.ty - pointer.y) * 0.18;
        el.style.setProperty("--px", pointer.x.toFixed(3));
        el.style.setProperty("--py", pointer.y.toFixed(3));
      }

      if (desktop) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(
          Math.max((vh - rect.top) / (vh + rect.height), 0),
          1
        );
        el.style.setProperty("--scrolly", ((progress - 0.5) * range).toFixed(1));
      }

      const settling =
        fine &&
        (Math.abs(pointer.tx - pointer.x) > 0.01 ||
          Math.abs(pointer.ty - pointer.y) > 0.01);

      if (settling) frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event) => {
      const rect = el.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      schedule();
    };

    const onScroll = () => {
      if (visible) schedule();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "160px" }
    );
    observer.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    if (fine) {
      el.addEventListener("pointermove", onPointerMove, { passive: true });
      el.addEventListener("pointerleave", onPointerLeave);
    }
    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
      el.style.removeProperty("--scrolly");
    };
  }, [range, reduce]);

  return ref;
}

/**
 * Global scroll progress. Publishes two numbers on <html>:
 *   --progress 0…1  → the top progress spine (scaleX)
 *   --page-y   pixels → the drifting page light
 * One listener for the whole site, rAF-throttled.
 */
export function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? Math.min(Math.max(root.scrollTop / max, 0), 1) : 0;
      root.style.setProperty("--progress", ratio.toFixed(4));
      root.style.setProperty("--page-y", (ratio * 820).toFixed(1));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--progress");
      root.style.removeProperty("--page-y");
    };
  }, []);
}
