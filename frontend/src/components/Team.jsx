import React from "react";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Team = () => {
  return (
    <section id="team" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal text-center max-w-3xl mx-auto mb-14">
          <div className="section-eyebrow mb-4">Team</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05] mb-4">
            Meet Gravrel&apos;s{" "}
            <span className="text-[var(--gr-green-bright)]">visionary team.</span>
          </h2>
          <p className="text-lg text-[var(--gr-text-dim)] leading-relaxed">
            Led by Babrit Behera, we power eco-friendly data solutions with zero water
            and electricity waste — supporting small businesses and students alike.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Portrait */}
          <div className="lg:col-span-5 reveal">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-3 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25),transparent_70%)] pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1665919094872-2fc89eed9e13?auto=format&fit=crop&w=900&q=80"
                  alt="Babrit Behera — CEO & CTO of Gravrel"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,7,8,0.85)] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="gr-tag gr-tag-green mb-2">CEO &amp; CTO</div>
                  <div className="font-display text-2xl text-white font-bold">
                    Babrit Behera
                  </div>
                  <div className="text-sm text-[var(--gr-text-dim)] mt-0.5">
                    Founder · Gravrel
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio + facts */}
          <div className="lg:col-span-7 reveal">
            <blockquote className="relative pl-6 border-l-2 border-[var(--gr-green)] mb-8">
              <p className="font-display text-xl lg:text-2xl text-white leading-snug italic">
                &ldquo;The next billion developers shouldn&apos;t have to choose between
                shipping fast and shipping clean. Gravrel makes green compute the
                default — not the trade-off.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-[var(--gr-text-dim)]">
                — Babrit Behera, building from Bhubaneswar
              </footer>
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { k: "Based in", v: "Bhubaneswar, Odisha" },
                { k: "Stack", v: "Cloud · GPUs · Solar grids" },
                { k: "Mission", v: "Zero-waste compute" },
                { k: "Believes in", v: "Open infra · student access" },
              ].map((f) => (
                <div
                  key={f.k}
                  className="gr-card p-4"
                  data-testid={`team-fact-${f.k.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="text-[11px] uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold">
                    {f.k}
                  </div>
                  <div className="text-white font-medium mt-1">{f.v}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:support@gravrel.com"
                data-testid="team-contact-btn"
                className="btn-primary"
              >
                Get in touch <Mail size={15} strokeWidth={2.5} />
              </a>
              <a
                href="https://gravrelaetherops.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="team-launch-btn"
                className="btn-ghost"
              >
                See the console <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
