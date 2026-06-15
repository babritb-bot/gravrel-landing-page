import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed lg:top-7 top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,7,8,0.78)] backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#top"
          data-testid="logo-link"
          className="flex items-center gap-2.5 group"
        >
          <span className="relative inline-flex">
            <span className="w-8 h-8 rounded-full bg-[var(--gr-green)] flex items-center justify-center shadow-[0_0_24px_-2px_rgba(16,185,129,0.55)]">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
            </span>
          </span>
          <span className="font-display text-[1.15rem] font-semibold text-white tracking-tight">
            GravRel
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              data-testid={`nav-${it.label.toLowerCase()}`}
              className="nav-link"
            >
              {it.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://gravrelaetherops.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="launch-console-btn"
            className="btn-launch hidden sm:inline-flex"
            aria-label="Launch AetherOps Console"
          >
            <span className="btn-launch-dot" />
            <span className="relative z-10">Launch AetherOps</span>
            <ArrowUpRight size={15} strokeWidth={2.5} className="relative z-10" />
          </a>

          {/* Mobile menu toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden border-t border-white/5 bg-[rgba(5,7,8,0.95)] backdrop-blur-xl"
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {navItems.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[var(--gr-text-dim)] hover:text-white"
              >
                {it.label}
              </a>
            ))}
            <a
              href="https://gravrelaetherops.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="launch-console-btn-mobile"
              className="btn-launch w-fit mt-2"
            >
              <span className="btn-launch-dot" />
              <span className="relative z-10">Launch AetherOps</span>
              <ArrowUpRight size={15} strokeWidth={2.5} className="relative z-10" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
