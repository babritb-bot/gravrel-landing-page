import React from "react";
import { Shield, Leaf, FileCheck } from "lucide-react";

const certs = [
  {
    icon: Shield,
    title: "DPDP Compliant",
    body: "India's Digital Personal Data Protection Act — your data stays in Odisha.",
    img: "https://images.unsplash.com/photo-1518893228544-d6c4eee24344?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Leaf,
    title: "Carbon-Aware",
    body: "Live CO₂ telemetry on every workload — see your footprint shrink.",
    img: "https://images.unsplash.com/photo-1514855591006-d4e23c81ef1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: FileCheck,
    title: "ISO-aligned Ops",
    body: "Auditable infrastructure-as-code with full change history.",
    img: "https://images.unsplash.com/photo-1534415378365-701353a65fed?auto=format&fit=crop&w=800&q=80",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-4">Certifications</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
              You didn&apos;t come this far{" "}
              <span className="text-[var(--gr-green-bright)]">to stop.</span>
            </h2>
          </div>
          <p className="text-[var(--gr-text-dim)] max-w-md lg:text-right">
            Compliance and transparency are baked into the platform — not bolted on.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((c) => (
            <article
              key={c.title}
              className="gr-card overflow-hidden reveal group"
              data-testid={`cert-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--gr-panel)] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)]">
                    <c.icon size={16} strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--gr-text-dim)] leading-relaxed">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
