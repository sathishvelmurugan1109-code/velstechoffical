import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import {
  COMPANY,
  NAV_LINKS,
  SERVICES,
  buildWhatsAppLink,
  DEFAULT_WA_MESSAGE,
} from "../data/site";
import logo from "../assets/profile.png";

/** Inline WhatsApp brand glyph (lucide has no brand icon). */
function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}


export default function Footer() {
  const year = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="footer-hub relative overflow-hidden">
      <div className="footer-watermark" aria-hidden="true">VT</div>
      <div className="footer-trace footer-trace-one" aria-hidden="true" />
      <div className="footer-trace footer-trace-two" aria-hidden="true" />
      <div className="footer-architecture" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-8 lg:px-8 lg:pt-12">
        <section className="footer-cta">
          <div>
            <p className="footer-eyebrow">A new digital chapter starts here</p>
            <h2>Let’s Build Something Great Together</h2>
            <p className="footer-cta-copy">
              Have an idea or project in mind? Let’s turn it into a powerful digital solution.
            </p>
          </div>
          <a href="#contact" className="footer-cta-button">
            Get Free Consultation <ArrowUpRight size={18} />
          </a>
        </section>

        <div className="footer-grid">
          <section className="footer-brand-column">
            <a href="#home" className="footer-logo-link" aria-label="Vels Tech home">
              <img src={logo} alt="Vels Tech logo" width={220} height={220} loading="lazy" />
            </a>
            <p className="footer-kicker">TECH <i /> PEOPLE <i /> POSSIBILITY</p>
            <p className="footer-description">
              Premium technology services — websites, mobile apps, digital marketing &amp; SEO that help your business dominate online.
            </p>
            <div className="footer-socials" aria-label="Social links">
              <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Vels Tech on Facebook"><Facebook size={17} /></a>
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Vels Tech on Instagram"><Instagram size={17} /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Vels Tech on LinkedIn"><Linkedin size={17} /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Vels Tech on YouTube"><Youtube size={17} /></a>
            </div>
            <div className="footer-circuit" aria-hidden="true"><span /><span /><span /></div>
          </section>

          <nav aria-label="Footer quick links">
            <p className="footer-column-label">Explore</p>
            <h3>Quick Links</h3>
            <ul className="footer-link-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}><a href={link.href}><span>↗</span>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <p className="footer-column-label">What we do</p>
            <h3>Services</h3>
            <ul className="footer-link-list">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}><a href="#services"><span>↗</span>{service.title}</a></li>
              ))}
            </ul>
          </nav>

          <section>
            <p className="footer-column-label">Start a conversation</p>
            <h3>CONTACT US</h3>
            <div className="footer-contact-list">
              <a href={`tel:${COMPANY.phoneTel}`} className="footer-contact-card"><Phone size={17} /><span><strong>Mobile</strong><small>95977 68607</small></span></a>
              <a href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="footer-contact-card"><WhatsAppIcon className="h-[17px] w-[17px]" /><span><strong>Chat on WhatsApp</strong><small>We usually reply quickly</small></span></a>
              <a href={`mailto:${COMPANY.email}`} className="footer-contact-card"><Mail size={17} /><span><strong>{COMPANY.email}</strong><small>Send us your brief</small></span></a>
              <div className="footer-hours"><span />{COMPANY.hours}</div>
            </div>
          </section>

          <section className="footer-newsletter">
            <div><p className="footer-column-label">The signal</p><h3>Stay Updated</h3><p>Get the latest updates, insights and tech tips from Vels Tech.</p></div>
            <form onSubmit={handleSubscribe} className="footer-subscribe-form">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input id="footer-email" type="email" required placeholder="Enter your email" aria-label="Enter your email" />
              <button type="submit" aria-label={isSubscribed ? "Subscribed" : "Subscribe to updates"}>{isSubscribed ? <Check size={19} /> : <Send size={19} />}</button>
            </form>
            <p className="footer-privacy">{isSubscribed ? "You’re on the list. Welcome to the signal." : "No spam. Only valuable content."}</p>
          </section>
        </div>
      </div>

      <div className="footer-bottom relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs lg:flex-row lg:px-8">
          <p>© {year} <span>{COMPANY.name}</span>. All rights reserved.</p>
          <p>Designed &amp; Developed with <b>⚡</b> by Vels Tech</p>
          <a href="#home">Back to Top <span>↑</span></a>
        </div>
      </div>
    </footer>
  );
}
