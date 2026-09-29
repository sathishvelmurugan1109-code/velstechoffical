import { SERVICES, TECH_STACK } from "../data/site";
import { serviceAnchorId } from "../lib/interactions";

// ============================================================
// #portfolio — the technologies and platforms we build with.
//
// Two identical groups are rendered side by side and the track slides -50%
// (exactly one group width), so the loop restarts with no visible jump.
// `pr` on the group supplies the gap the flex `gap` can't add across the
// seam. The duplicated track is decorative and stays aria-hidden, while the
// section itself is a real landmark with a screen-reader heading.
//
// The capability row below links to the live service cards, so the
// "Portfolio" nav item leads somewhere genuinely useful — no invented
// case studies, clients or projects.
// ============================================================

function TrackGroup({ groupKey }) {
  return (
    <ul className="band__group">
      {TECH_STACK.map((item) => (
        <li key={`${groupKey}-${item}`} className="band__item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TechMarquee() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="band">
      <h2 id="portfolio-heading" className="sr-only">
        Our work — the technologies and platforms we build with
      </h2>

      <div className="band__track" aria-hidden="true">
        <TrackGroup groupKey="group-a" />
        <TrackGroup groupKey="group-b" />
      </div>

      <div className="band__caps">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            href={`#${serviceAnchorId(service.title)}`}
            className="band__cap"
          >
            {service.title}
          </a>
        ))}
      </div>
    </section>
  );
}
