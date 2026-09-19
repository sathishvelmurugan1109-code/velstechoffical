import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

/** Reusable animated section heading with neon tag + gradient highlight. */
export default function SectionHeading({ id, tag, title, highlight, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="inline-block rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon"
      >
        {tag}
      </motion.span>

      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
      >
        <AnimatedText text={title} as="span" className="inline-block" delay={0.12} />
        {highlight && (
          <>
            <span className="inline-block w-2" aria-hidden="true" />
            <AnimatedText
              text={highlight}
              as="span"
              className="text-gradient text-gold-intense inline-block"
              delay={0.22}
            />
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-zinc-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
