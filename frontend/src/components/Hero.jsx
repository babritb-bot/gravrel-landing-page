import React from "react";
import { ArrowRight, Leaf, Zap, Droplet, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative pt-36 pb-24 lg:pt-48 lg:pb-36 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/LGKzknxiwRfDAFI3/technology-concept-with-futuristic-element-PNEVprkkByCEx1Ap.jpg"
          alt="Futuristic technology"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,7,8,0.8)] via-[rgba(5,7,8,0.92)] to-[var(--gr-bg)]" />
        <div className="absolute inset-0 gr-grid-bg opacity-30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22),transparent_60%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.07)] mb-7 reveal">
            <span className="live-dot" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gr-green-bright)]">
              Solar · Bhubaneswar DC · Live
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-white mb-6 reveal">
            Where{" "}
            <span className="bg-gradient-to-r from-[var(--gr-green-bright)] via-emerald-300 to-[var(--gr-green-bright)] bg-clip-text text-transparent">
              gravity
            </span>{" "}
            meets{" "}
            <span className="bg-gradient-to-r from-[var(--gr-green-bright)] via-emerald-300 to-[var(--gr-green-bright)] bg-clip-text text-transparent">
              relativity
            </span>
            <br />
            in green data infrastructure.
          </h1>

          <p className="text-lg md:text-xl text-[var(--gr-text-dim)] max-w-2xl mx-auto mb-9 leading-relaxed reveal">
            An eco-conscious datacenter built for growth, innovation, and reliability —
            purpose-built for small businesses and students with{" "}
            <span className="text-white font-semibold">zero water waste</span> and{" "}
            <span className="text-white font-semibold">solar-first energy</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 reveal">
            <a href="#contact" data-testid="hero-cta-get-started" className="btn-primary">
              Get Started <ArrowRight size={17} strokeWidth={2.5} />
            </a>
            <a href="#about" data-testid="hero-cta-learn-more" className="btn-ghost">
              Learn More
            </a>
          </div>

          {/* Feature chips */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 reveal">
            {[
              { icon: Droplet, label: "Zero water cooling" },
              { icon: Zap, label: "Solar-first power" },
              { icon: Leaf, label: "Carbon-aware" },
              { icon: Sparkles, label: "Sub-5s VM provisioning" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[rgba(15,20,25,0.55)] backdrop-blur text-sm text-[var(--gr-text)]"
              >
                <Icon size={14} strokeWidth={2.4} className="text-[var(--gr-green-bright)]" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
