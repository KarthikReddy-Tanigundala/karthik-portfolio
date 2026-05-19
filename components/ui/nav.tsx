"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#background", label: "Background" },
  { href: "#currently", label: "Currently" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-stripe",
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      )}
      aria-label="Primary navigation"
    >
      <div className="container-page flex items-center justify-between px-6 md:px-10 lg:px-16 h-14">
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
                className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone-dim hover:text-bone transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Karthik-Reddy-Resume.pdf"
          download
          className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone hover:text-signal-blue transition-colors duration-200"
          aria-label="Download resume PDF"
        >
          Resume ↓
        </a>
      </div>
    </nav>
  );
}