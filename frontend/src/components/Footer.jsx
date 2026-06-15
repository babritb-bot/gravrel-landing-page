import React from "react";
import { Facebook, Instagram, Twitter, ArrowUpRight } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/" },
  {
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.41a8.16 8.16 0 0 0 4.77 1.52V7.49a4.85 4.85 0 0 1-1.84-.8z" />
      </svg>
    ),
    label: "TikTok",
    href: "https://tiktok.com/",
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-[var(--gr-bg-2)] mt-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[var(--gr-green)] flex items-center justify-center shadow-[0_0_24px_-2px_rgba(16,185,129,0.55)]">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </span>
              <span className="font-display text-lg font-semibold text-white">GravRel</span>
            </a>
            <p className="text-[var(--gr-text-dim)] mt-4 max-w-md leading-relaxed">
              Where gravity meets relativity — an eco-conscious datacenter built for growth,
              innovation, and reliability.
            </p>
            <a
              href="https://gravrelaetherops.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-launch-console"
              className="btn-launch mt-6"
            >
              <span className="btn-launch-dot" />
              <span className="relative z-10">Launch AetherOps Console</span>
              <ArrowUpRight size={15} strokeWidth={2.5} className="relative z-10" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold mb-4">
              Explore
            </div>
            <ul className="space-y-2.5">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Certifications", "#certifications"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-[var(--gr-text-dim)] hover:text-white transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold mb-4">
              Follow
            </div>
            <div className="flex items-center gap-2.5 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--gr-text-dim)] hover:text-[var(--gr-green-bright)] hover:border-[rgba(16,185,129,0.4)] transition"
                >
                  {typeof s.icon === "function" ? <s.icon /> : <s.icon size={16} />}
                </a>
              ))}
            </div>
            <div className="text-sm text-[var(--gr-text-dim)] space-y-1">
              <div>
                <span className="text-[var(--gr-text-mute)]">Email · </span>
                <a href="mailto:support@gravrel.com" className="text-white hover:text-[var(--gr-green-bright)]">
                  support@gravrel.com
                </a>
              </div>
              <div>
                <span className="text-[var(--gr-text-mute)]">Phone · </span>
                <a href="tel:+917377985775" className="text-white hover:text-[var(--gr-green-bright)]">
                  +91 73779 85775
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--gr-text-mute)]">
          <div>© {new Date().getFullYear()} Gravrel. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="live-dot" />
            <span className="font-mono text-xs">Solar · Bhubaneswar DC · Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
