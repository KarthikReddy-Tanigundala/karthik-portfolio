"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#experience", label: "Experience" },
  { href: "#ask", label: "Ask AI" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 300) setActiveId("");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-stripe",
        scrolled || open
          ? "bg-ink/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      )}
      aria-label="Primary navigation"
    >
      <div className="container-page flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 h-14">
        <a
          href="#top"
          className="font-serif text-lg text-bone hover:text-signal-blue transition-colors"
          aria-label="Back to top"
        >
          Karthik Reddy
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeId === link.href.slice(1) ? "true" : undefined}
                className={cn(
                  "font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-200",
                  activeId === link.href.slice(1)
                    ? "text-signal-blue"
                    : "text-bone-dim hover:text-bone"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/Karthik-Reddy-Resume.pdf"
            target="_blank"
            rel="noopener"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone hover:text-signal-blue transition-colors duration-200"
            aria-label="Open resume PDF"
          >
            Resume ↓
          </a>
          <button
            type="button"
            className="md:hidden p-1.5 -mr-1.5 text-bone-dim hover:text-bone"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <ul className="md:hidden px-4 sm:px-6 pb-4 space-y-1 border-t border-hairline">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-mono text-[13px] uppercase tracking-[0.14em] text-bone-dim hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
