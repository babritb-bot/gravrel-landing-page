import React from "react";
import { Droplet, Zap, Server, Database, Boxes, Cpu } from "lucide-react";

const services = [
  {
    icon: Droplet,
    color: "blue",
    title: "Water-Free Hosting",
    body: "Run your projects without any water waste. Our closed-loop cooling supports full sustainability — perfect for AI training, learning labs, and side-projects.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=436,fit=crop/LGKzknxiwRfDAFI3/markus-spiske-sfydxgrt5oa-unsplash-QndvS99uAetb9hTf.jpg",
  },
  {
    icon: Zap,
    color: "green",
    title: "Energy Efficient",
    body: "Our datacenter minimises electricity use to reduce your carbon footprint. Solar panels surrounding the facility power every VM, database, and bucket you spin up.",
    img: "https://images.unsplash.com/photo-1592833159057-6faf163494a9?auto=format&fit=crop&w=900&q=80",
  },
];

const products = [
  { icon: Server, label: "Cloud VMs", desc: "Ubuntu · Debian · CentOS" },
  { icon: Database, label: "Managed DBs", desc: "Postgres · MySQL · Redis · Mongo" },
  { icon: Boxes, label: "Object Storage", desc: "S3-compatible buckets" },
  { icon: Cpu, label: "ML / GPU", desc: "On-demand training compute" },
];

const colorMap = {
  blue: "rgba(59,130,246,0.18)",
  green: "rgba(16,185,129,0.18)",
};
const borderMap = {
  blue: "rgba(59,130,246,0.35)",
  green: "rgba(16,185,129,0.35)",
};

const Services = () => {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal max-w-3xl mb-14">
          <div className="section-eyebrow mb-4">Our Services</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
            Eco-friendly datacenter solutions —{" "}
            <span className="text-[var(--gr-green-bright)]">built for builders.</span>
          </h2>
        </div>

        {/* feature service cards */}
        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          {services.map((s) => (
            <article
              key={s.title}
              className="gr-card overflow-hidden reveal group"
              data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--gr-panel)] via-transparent to-transparent" />
                <span
                  className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md"
                  style={{
                    background: colorMap[s.color],
                    border: `1px solid ${borderMap[s.color]}`,
                  }}
                >
                  <s.icon
                    size={20}
                    strokeWidth={2.2}
                    color={s.color === "blue" ? "#60a5fa" : "#14d399"}
                  />
                </span>
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-[var(--gr-text-dim)] leading-relaxed">{s.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* product strip */}
        <div className="reveal">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--gr-text-mute)] mb-4">
            Everything you need · One console
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((p) => (
              <div
                key={p.label}
                className="gr-card p-5 flex items-center gap-3"
                data-testid={`product-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)] flex-shrink-0">
                  <p.icon size={19} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="font-display font-semibold text-white">{p.label}</div>
                  <div className="text-xs text-[var(--gr-text-dim)] mt-0.5">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
