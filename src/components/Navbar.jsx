import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Menu, MessageCircle, X, Youtube } from "lucide-react";
import { COMPANY, NAV_LINKS, SOCIALS, buildWhatsAppLink, DEFAULT_WA_MESSAGE } from "../data/site";
import logo from "../assets/profile.png";

// ============================================================
// Fixed premium navbar.
//   • transparent at rest → glass + blur + gold hairline once scrolled
//   • active section tracked with an IntersectionObserver
//   • reliable anchor navigation (explicit scroll, so clicking "Home"
//     while already on #home still works)
//   • mobile drawer: Escape / outside-click / resize close, 52px rows,
//     and it closes *before* the smooth scroll so the target never shifts
// ============================================================

const MOBILE_MENU_ID = "mobile-menu";

/** Social icon per configured platform id (see SOCIALS in data/site.js). */
const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const closeTimerRef = useRef(null);

  /**
   * Native `#hash` links do nothing when the hash is unchanged (e.g. click
   * Home while the URL is already `#home`), so users perceive the button as
   * broken. Handle the scroll explicitly instead.
   */
  const handleNavClick = (event, href) => {
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return; // let the browser handle it (shouldn't happen)

    event.preventDefault();
    setOpen(false);

    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : "smooth";

    closeTimerRef.current = window.setTimeout(
      () => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior });
        } else {
          target.scrollIntoView({ block: "start", behavior });
        }
        try {
          window.history.pushState(null, "", href);
        } catch {
          /* ignore — the hash update is cosmetic */
        }
        setActive(id);
      },
      open ? 60 : 0
    );
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /**
   * Drawer controls: Escape (returning focus to the toggle), any tap outside
   * the header, and when the viewport grows back to the desktop breakpoint.
   * Nothing here locks body scroll, so the page can never be left locked.
   */
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
      className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <div className="shell">
        <nav className="nav__inner" aria-label="Main navigation">
          {/* Brand — exact asset, no visual modification */}
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="brand"
            aria-label="Vels Tech — back to home"
          >
            <img
              src={logo}
              alt="Vels Tech logo"
              width={46}
              height={46}
              draggable={false}
              decoding="async"
            />
          </a>

          {/* Desktop links */}
          <ul className="nav__links">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="nav__actions">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.id];
              return Icon ? (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social"
                  aria-label={`Vels Tech on ${social.label}`}
                >
                  <Icon size={16} />
                </a>
              ) : null;
            })}
            <a
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold btn--sm"
              aria-label={`Chat with Vels Tech on WhatsApp at ${COMPANY.phoneDisplay}`}
            >
              <MessageCircle size={16} />
              {COMPANY.phoneDisplay}
              <ArrowUpRight size={15} className="btn__arrow--up" />
            </a>
          </div>

          {/* Mobile trigger — 46px touch target */}
          <button
            ref={toggleRef}
            type="button"
            className="nav-burger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={MOBILE_MENU_ID}
            className="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="shell">
              <ul className="drawer__list">
                {NAV_LINKS.map((link, index) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32, delay: index * 0.045 }}
                    >
                      <a
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        aria-current={isActive ? "page" : undefined}
                        className="drawer__link"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </motion.li>
                  );
                })}

                <li className="pt-3">
                  <a
                    href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--block"
                  >
                    <MessageCircle size={16} />
                    {COMPANY.phoneDisplay}
                  </a>
                </li>

                <li className="flex justify-center gap-3 pt-4">
                  {SOCIALS.map((social) => {
                    const Icon = SOCIAL_ICONS[social.id];
                    return Icon ? (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-social"
                        aria-label={`Vels Tech on ${social.label}`}
                      >
                        <Icon size={16} />
                      </a>
                    ) : null;
                  })}
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

