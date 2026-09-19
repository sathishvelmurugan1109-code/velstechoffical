import { TECH_STACK } from "../data/site";

/** Infinite scrolling tech-stack ticker (pauses on hover).
 *
 *  Two identical groups are rendered side by side and the track slides -50%,
 *  i.e. exactly one group width, so the loop restarts with no visible jump.
 *  (`pr-10` supplies the trailing gap that the flex `gap-10` cannot add
 *  between the two groups, keeping the spacing uniform across the seam.)
 *
 *  This strip is also the `#portfolio` navigation target, so it is a real
 *  landmark (with a screen-reader heading) instead of an aria-hidden blob.
 *  The duplicated marquee track is decorative and stays aria-hidden.
 */
export default function TechMarquee() {
  const renderGroup = (groupKey) => (
    <div key={groupKey} className="flex shrink-0 items-center gap-10 pr-10">
      {TECH_STACK.map((item) => (
        <span
          key={`${groupKey}-${item}`}
          className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
        >
          {item}
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(255,208,0,0.8)]" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-28 overflow-hidden border-y border-white/5 bg-carbon/60 py-4 backdrop-blur-sm"
    >
      <h2 id="portfolio-heading" className="sr-only">
        Our work — the technologies and platforms we build with
      </h2>
      <div className="marquee-track flex w-max animate-marquee" aria-hidden="true">
        {renderGroup("group-a")}
        {renderGroup("group-b")}
      </div>
    </section>
  );
}
