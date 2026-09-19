import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../data/site";
import logo from "../assets/profile.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-gold/30 bg-void/80/backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo — exact brand asset, no visual modification */}
        <a href="#home" className="flex items-center">
          <img
            src={logo}
            alt="Vels Tech logo"
            width={44}
            height={44}
            draggable={false}
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop links — gold underline with subtle glow on active item */}
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative pb-1.5 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gold transition-all duration-300 ${
                      isActive
                        ? "opacity-100 shadow-[0_0_10px_rgba(255,208,0,0.9)]"
                        : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA — gold outlined with premium glow */}
        <div className="hidden lg:block">
          <a href="#contact" className="btn-gold-outline">
            Get Free Consultation
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gold/30 bg-void/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg border-l-2 px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "border-gold bg-void/80 text-gold"
                          : "border-transparent text-zinc-200 hover:bg-white/5 hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-gold-outline w-full"
                >
                  Get Free Consultation
                  <ArrowRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}