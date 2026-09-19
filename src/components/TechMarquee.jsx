import { TECH_STACK } from "../data/site";

/** Infinite scrolling tech-stack ticker (pauses on hover). */
export default function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK]; // duplicated for seamless loop

  return (
    <div
      id="portfolio"
      aria-hidden="true"
      className="scroll-mt-28 overflow-hidden border-y border-white/5 bg-carbon/60 py-4 backdrop-blur-sm"
    >
      <div className="marquee-track flex w-max animate-marquee gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(255,208,0,0.8)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
