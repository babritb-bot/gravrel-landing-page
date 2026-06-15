import React from "react";

const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative rounded-3xl overflow-hidden border border-white/5">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=656,fit=crop/LGKzknxiwRfDAFI3/img2grav-PQ0pbSis5iEFJvQv.jpg"
                alt="Gravrel green datacenter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(5,7,8,0.55)] via-transparent to-[rgba(16,185,129,0.15)] mix-blend-multiply" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--gr-green-bright)] font-semibold mb-1">
                    Datacenter · Live
                  </div>
                  <div className="font-display text-lg text-white font-semibold">
                    Solar · Bhubaneswar DC
                  </div>
                </div>
                <span className="gr-tag gr-tag-green">Operational</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="section-eyebrow mb-4">About Gravrel</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.05]">
              Eco-friendly data solutions —{" "}
              <span className="text-[var(--gr-green-bright)]">
                saving water &amp; energy
              </span>{" "}
              every step.
            </h2>
            <p className="text-lg text-[var(--gr-text-dim)] leading-relaxed mb-8">
              Gravrel was built for the new generation of builders — small businesses,
              founders, and students who care about where their data lives and how it&apos;s
              powered. Our infrastructure runs on solar-first energy with zero-water
              cooling, so your projects grow without costing the planet.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Built in Odisha",
                  body: "DPDP-compliant data residency — your data never leaves India.",
                },
                {
                  title: "Student-friendly pricing",
                  body: "From ₹0/mo tiers for learners, scaling with you as you grow.",
                },
                {
                  title: "Sub-5s VM provisioning",
                  body: "Ubuntu, Debian, CentOS — live in your console in seconds.",
                },
                {
                  title: "Solar telemetry",
                  body: "See live solar output &amp; CO₂ saved on every dashboard.",
                },
              ].map((it) => (
                <div
                  key={it.title}
                  className="gr-card p-4 flex flex-col gap-1.5"
                  data-testid={`about-card-${it.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="font-display text-base font-semibold text-white">
                    {it.title}
                  </div>
                  <div
                    className="text-sm text-[var(--gr-text-dim)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: it.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
