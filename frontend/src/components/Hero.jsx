import React from "react";
import { ArrowRight, Leaf, Zap, Droplet } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 gr-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.07)] mb-7">
              <span className="live-dot" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gr-green-bright)]">
                Solar · Bhubaneswar DC
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-white mb-6">
              Where{" "}
              <span className="text-[var(--gr-green-bright)]">gravity</span>{" "}
              meets{" "}
              <span className="text-[var(--gr-green-bright)]">relativity</span>
              <br />
              in green data infrastructure.
            </h1>

            <p className="text-lg md:text-xl text-[var(--gr-text-dim)] max-w-2xl mb-9 leading-relaxed">
              An eco-conscious datacenter built for growth, innovation, and reliability —
              purpose-built for small businesses and students with{" "}
              <span className="text-white font-semibold">zero water waste</span> and{" "}
              <span className="text-white font-semibold">solar-first energy</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                data-testid="hero-cta-get-started"
                className="btn-primary"
              >
                Get Started
                <ArrowRight size={17} strokeWidth={2.5} />
              </a>
              <a
                href="#services"
                data-testid="hero-cta-learn-more"
                className="btn-ghost"
              >
                Learn More
              </a>
            </div>

            {/* Mini feature row */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { icon: Droplet, label: "Water-free" },
                { icon: Zap, label: "Solar-powered" },
                { icon: Leaf, label: "Carbon-aware" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-[var(--gr-text-dim)]"
                >
                  <span className="w-8 h-8 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)]">
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="font-medium text-white/85">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: console preview mock */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_70%)] pointer-events-none" />
              <div className="gr-card relative p-5 lg:p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                {/* fake window chrome */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[var(--gr-green)] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span className="font-display text-sm font-semibold text-white">
                      GravRel <span className="text-[var(--gr-text-dim)] font-normal ml-1">Console</span>
                    </span>
                  </div>
                  <span className="gr-tag gr-tag-green">Live</span>
                </div>

                {/* stat grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Running VMs", val: "3", sub: "of 3 total" },
                    { label: "Solar output", val: "4200W", sub: "12.5 kWh today" },
                    { label: "CO₂ saved", val: "10.3kg", sub: "vs coal grid" },
                    { label: "This month", val: "₹3,777", sub: "incl. 18% GST" },
                  ].map((s) => (
                    <div key={s.label} className="gr-stat-card">
                      <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1.5 font-semibold">
                        {s.label}
                      </div>
                      <div className="font-display text-2xl font-bold text-neutral-900">
                        {s.val}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 px-3 py-2.5 rounded-xl bg-[var(--gr-panel-2)] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="live-dot" />
                    <span className="text-xs text-[var(--gr-text-dim)]">DPDP Compliant · Odisha, India</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--gr-green-bright)]">AETHEROPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
