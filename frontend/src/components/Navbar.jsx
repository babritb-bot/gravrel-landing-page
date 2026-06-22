import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Rocket } from "lucide-react";

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

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('gravrel-waitlist-anim')) return;
    const style = document.createElement('style');
    style.id = 'gravrel-waitlist-anim';
    style.textContent = `
      @keyframes gr-shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes gr-pulse-glow {
        0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.4), 0 0 20px rgba(16,185,129,0.15); }
        50% { box-shadow: 0 0 16px rgba(16,185,129,0.7), 0 0 40px rgba(16,185,129,0.3); }
      }
      @keyframes gr-bounce-soft {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      @keyframes gr-dot-blink {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.7); }
      }
      .gr-waitlist-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 0.3px;
        color: #ffffff;
        background: linear-gradient(135deg, #10b981, #1D9E75, #059669);
        background-size: 200% 200%;
        border: 1px solid rgba(16,185,129,0.5);
        cursor: pointer;
        text-decoration: none;
        overflow: hidden;
        transition: transform 0.2s, border-color 0.2s;
        animation: gr-pulse-glow 2s ease-in-out infinite, gr-bounce-soft 3s ease-in-out infinite;
      }
      .gr-waitlist-btn:hover {
        transform: translateY(-1px) scale(1.03);
        border-color: rgba(16,185,129,0.9);
      }
      .gr-waitlist-btn::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(
          110deg,
          transparent 20%,
          rgba(255,255,255,0.15) 40%,
          rgba(255,255,255,0.3) 50%,
          rgba(255,255,255,0.15) 60%,
          transparent 80%
        );
        background-size: 200% 100%;
        animation: gr-shimmer 2.5s ease-in-out infinite;
        border-radius: inherit;
        pointer-events: none;
      }
      .gr-waitlist-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #ffffff;
        animation: gr-dot-blink 1.5s ease-in-out infinite;
        flex-shrink: 0;
      }
      .gr-waitlist-btn-mobile {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 22px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 14px;
        color: #ffffff;
        background: linear-gradient(135deg, #10b981, #1D9E75, #059669);
        border: 1px solid rgba(16,185,129,0.5);
        cursor: pointer;
        text-decoration: none;
        overflow: hidden;
        animation: gr-pulse-glow 2s ease-in-out infinite;
      }
      .gr-waitlist-btn-mobile::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(
          110deg,
          transparent 20%,
          rgba(255,255,255,0.15) 40%,
          rgba(255,255,255,0.3) 50%,
          rgba(255,255,255,0.15) 60%,
          transparent 80%
        );
        background-size: 200% 100%;
        animation: gr-shimmer 2.5s ease-in-out infinite;
        border-radius: inherit;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
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

          {/* ★ Shiny Waitlist Button */}
          <a
            href="#waitlist"
            data-testid="nav-waitlist"
            className="gr-waitlist-btn ml-2"
          >
            <span className="gr-waitlist-dot" />
            <span style={{ position: 'relative', zIndex: 1 }}>Join Waitlist</span>
            <Rocket size={14} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
          </a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.gravrelaetherops.com"
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

            {/* ★ Mobile Waitlist Button */}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              data-testid="nav-waitlist-mobile"
              className="gr-waitlist-btn-mobile w-fit mt-3"
            >
              <span className="gr-waitlist-dot" />
              <span style={{ position: 'relative', zIndex: 1 }}>Join Waitlist</span>
              <Rocket size={14} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
            </a>

            <a
              href="https://www.gravrelaetherops.com"
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
