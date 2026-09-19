import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function AnimatedText({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  mode = "letters",
  glow = true,
  hover = true,
  perWord = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();

  if (!text && text !== "") return null;

  if (reduceMotion) {
    return (
      <Component className={className} {...props}>
        {text}
      </Component>
    );
  }

  const words = text.split(/\s+/);
  const renderWord = (word, wordIndex) => {
    const letters = Array.from(word);

    return (
      <motion.span
        key={`${word}-${wordIndex}`}
        className="inline-block align-top"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.72,
          delay: delay + wordIndex * 0.11,
          ease: EASE,
        }}
      >
        {letters.map((char, letterIndex) => (
          <motion.span
            key={`${wordIndex}-${letterIndex}`}
            className={`animated-text-char ${glow ? "text-gold-glow" : ""} ${
              hover ? "text-magnetic" : ""
            }`}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + wordIndex * 0.11 + letterIndex * 0.05,
              ease: EASE,
            }}
            whileHover={
              hover
                ? {
                    y: -4,
                    x: 0,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }
                : undefined
            }
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  if (mode === "words") {
    return (
      <Component className={className} {...props}>
        {words.map((word, index) => (
          <span key={`word-${index}`} className="inline-block align-top">
            {index > 0 && <span className="inline-block w-[0.35em]" aria-hidden="true" />}
            {renderWord(word, index)}
          </span>
        ))}
      </Component>
    );
  }

  const chars = Array.from(text);

  return (
    <Component className={className} {...props}>
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className={`animated-text-char ${glow ? "text-gold-glow" : ""} ${
            hover ? "text-magnetic" : ""
          }`}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.045,
            ease: EASE,
          }}
          whileHover={
            hover
              ? {
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }
              : undefined
          }
          style={{ display: char === " " ? "inline-block" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Component>
  );
}
