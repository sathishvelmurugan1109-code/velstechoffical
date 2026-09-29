import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

/**
 * Reusable scroll-reveal wrapper.
 *
 *   <Reveal delay={0.1}>…</Reveal>
 *   <Reveal as="li" y={18}>…</Reveal>
 *
 * Reduced-motion users get the content immediately, with no transform and
 * no transition — the markup and layout stay identical.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
  blur = false,
  amount = 0.25,
  once = true,
  className = "",
  ...rest
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reduce) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(8px)" : undefined }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: blur ? "blur(0px)" : undefined,
      }}
      viewport={{ once, amount }}
      transition={{ duration: 0.62, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}
