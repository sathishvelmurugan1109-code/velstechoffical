import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// ============================================================
// Shared animated counter — used by the hero and about sections so the
// number animation behaves (and is formatted) identically in both.
// Starts when scrolled into view; motion-free users see the final value.
// ============================================================

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

export default function CountUp({
  value,
  suffix = "",
  duration = 1300,
  className = "",
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const decimals = value % 1 ? 1 : 0;
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    const element = ref.current;
    if (!element) return undefined;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutCubic(progress);
          setDisplay(Number((value * eased).toFixed(decimals)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.55 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [decimals, duration, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
