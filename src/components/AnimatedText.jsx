import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

// ============================================================
// Text reveal system — four modes, one API.
//   mode="chars"  per-character blur → sharp (default)
//   mode="words"  per-word stagger
//   mode="lines"  newline-separated lines sliding out of a mask
//   mode="mask"   single line revealed from a clipped mask
//
// Accessibility: when the text is split, the full string is rendered once
// in an `.sr-only` node and the animated fragments are `aria-hidden`, so
// screen readers read "Website Development" — never "W e b s i t e".
// Passing `aria-hidden="true"` (as the callers do inside a labelled
// heading) hides the whole thing instead, with no duplication.
//
// !! MASKED REVEALS — READ BEFORE EDITING !!
// The `mask` and `lines` modes slide a span up out of an `overflow: hidden`
// wrapper. The `whileInView` observer therefore MUST sit on the *mask*, never
// on the span inside it: an IntersectionObserver clips a target's rect against
// every ancestor's overflow, so a span parked at `y: 108%` below its own mask
// reports a zero intersection rect and `isIntersecting` never becomes true.
// Observing it there is a deadlock — the text can only be revealed once
// visible, but it is never *seen* to become visible, so it stays clipped
// forever. The mask is therefore a `motion.span` carrying `whileInView`, and
// the inner span inherits the resulting variant label from it. Do not "tidy"
// the mask back into a plain `<span>`.
// ============================================================

/* Orchestrator: observes visibility, animates nothing itself. The inner
   span inherits its label via variant propagation. */
const ORCHESTRATOR = { hidden: {}, show: {} };


export default function AnimatedText({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  mode = "chars",
  glow = false,
  hover = false,
  stagger = 0.028,
  ...props
}) {
  const reduce = useReducedMotion();
  const value = text == null ? "" : String(text);

  if (!value) return null;

  // Motion-free path: identical markup, no transforms, no transitions.
  if (reduce) {
    return (
      <Component className={className} {...props}>
        {value}
      </Component>
    );
  }

  const hidden = props["aria-hidden"] === "true" || props["aria-hidden"] === true;
  const wrapperStyle = glow ? { textShadow: "0 0 32px rgba(255, 208, 0, 0.32)" } : undefined;

  const screenReaderCopy = hidden ? null : <span className="sr-only">{value}</span>;

  /* ---------------- mask: whole block sweeps up out of a clip ---------------- */
  if (mode === "mask") {
    return (
      <Component className={className} style={wrapperStyle} {...props}>
        {screenReaderCopy}
        <motion.span
          aria-hidden="true"
          className="block overflow-hidden"
          variants={ORCHESTRATOR}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "112%", opacity: 0.2 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.85, delay, ease: EASE },
              },
            }}
          >
            {value}
          </motion.span>
        </motion.span>
      </Component>
    );
  }

  /* ---------------- lines ---------------- */
  if (mode === "lines") {
    const lines = value.split(/\n/);
    return (
      <Component className={className} style={wrapperStyle} {...props}>
        {screenReaderCopy}
        <span aria-hidden="true">
          {lines.map((line, index) => (
            <motion.span
              key={`line-${index}`}
              className="block overflow-hidden"
              variants={ORCHESTRATOR}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "108%", filter: "blur(6px)" },
                  show: {
                    y: "0%",
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.8,
                      delay: delay + index * 0.09,
                      ease: EASE,
                    },
                  },
                }}
              >
                {line}
              </motion.span>
            </motion.span>
          ))}
        </span>
      </Component>
    );
  }

  /* ---------------- words ---------------- */
  if (mode === "words") {
    const words = value.split(/\s+/).filter(Boolean);
    return (
      <Component className={className} style={wrapperStyle} {...props}>
        {screenReaderCopy}
        <span aria-hidden="true">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block align-top"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.68, delay: delay + index * 0.075, ease: EASE }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </span>
      </Component>
    );
  }

  /* ---------------- chars (default) ---------------- */
  const chars = Array.from(value);

  return (
    <Component className={className} style={wrapperStyle} {...props}>
      {screenReaderCopy}
      <span aria-hidden="true">
        {chars.map((char, index) =>
          char === " " ? (
            <span key={`space-${index}`}>{char}</span>
          ) : (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ opacity: 0, y: 14, filter: "blur(7px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: delay + index * stagger, ease: EASE }}
              whileHover={
                hover
                  ? { y: -4, scale: 1.04, transition: { duration: 0.2, ease: "easeOut" } }
                  : undefined
              }
            >
              {char}
            </motion.span>
          )
        )}
      </span>
    </Component>
  );
}
