import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";

// ============================================================
// Single section-header component — used by Services, About and Contact so
// every section speaks the same typographic language.
//
// The visible words are split for the reveal animation, so the heading
// carries an explicit `aria-label` while its animated fragments stay
// aria-hidden: assistive tech reads one clean sentence.
// ============================================================

export default function SectionHeading({
  id,
  tag,
  title,
  highlight,
  description,
  align = "left",
  className = "",
}) {
  const centred = align === "center";
  const accessibleName = [title, highlight].filter(Boolean).join(" ");

  return (
    <header
      className={`flex flex-col gap-4 ${centred ? "items-center text-center" : "items-start"} ${className}`}
    >
      {tag && (
        <Reveal y={14}>
          <span className="kicker">{tag}</span>
        </Reveal>
      )}

      <h2
        id={id}
        aria-label={accessibleName}
        className={`display-2 ${centred ? "mx-auto max-w-[46rem]" : "max-w-[38rem]"}`}
      >
        <AnimatedText
          aria-hidden="true"
          text={title}
          as="span"
          mode="words"
          className="block"
          delay={0.06}
        />
        {highlight && (
          <AnimatedText
            aria-hidden="true"
            text={highlight}
            as="span"
            mode="words"
            className="gold-text block"
            delay={0.14}
          />
        )}
      </h2>

      {description && (
        <Reveal delay={0.12} y={18}>
          <p className={`lead ${centred ? "mx-auto max-w-[54ch]" : "max-w-[56ch]"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}
