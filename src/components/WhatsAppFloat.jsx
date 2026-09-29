import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from "../data/site";
import WhatsAppMark from "./WhatsAppMark";

/** Floating "Chat on WhatsApp" action — same deep link as before. */
export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vels Tech on WhatsApp"
      className="wa-float"
    >
      <span className="wa-float__btn">
        <span className="wa-float__ring" aria-hidden="true" />
        <WhatsAppMark size={26} />
      </span>
      <span className="wa-float__label" aria-hidden="true">
        Chat with Vels Tech
      </span>
    </a>
  );
}
