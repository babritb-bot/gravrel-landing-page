import React from "react";
import { Leaf, GraduationCap, Briefcase, Sun, ArrowUpRight } from "lucide-react";

const projects = [
  {
    icon: Leaf,
    title: "Green Hosting",
    body: "Energy-efficient servers with zero water waste.",
    img: "https://images.unsplash.com/photo-1625477844779-42561bf64b92?auto=format&fit=crop&w=900&q=80",
    accent: "rgba(16,185,129,0.35)",
  },
  {
    icon: GraduationCap,
    title: "Student Support",
    body: "Affordable access to sustainable data services.",
    img: "https://images.unsplash.com/photo-1681184025442-1517cb9319c1?auto=format&fit=crop&w=900&q=80",
    accent: "rgba(59,130,246,0.35)",
  },
  {
    icon: Briefcase,
    title: "Small Business",
    body: "Custom solutions that save energy and costs.",
    img: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&w=900&q=80",
    accent: "rgba(168,85,247,0.35)",
  },
  {
    icon: Sun,
    title: "Sustainability",
    body: "Commitment to zero electricity and water waste.",
    img: "https://images.unsplash.com/photo-1691918514567-84ffe4f2c97b?auto=format&fit=crop&w=900&q=80",
    accent: "rgba(234,179,8,0.35)",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-4">Our Projects</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
              Building eco-friendly datacenters{" "}
              <span className="text-[var(--gr-green-bright)]">for all.</span>
            </h2>
          </div>
          <p className="text-[var(--gr-text-dim)] max-w-md lg:text-right">
            Four pillars. One mission — make sustainable compute the default.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => (
            <article
              key={p.title}
              className="gr-card overflow-hidden group reveal"
              data-testid={`project-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--gr-panel)] via-[rgba(15,20,25,0.3)] to-transparent" />
                <span
                  className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md bg-[rgba(5,7,8,0.45)]"
                  style={{ border: `1px solid ${p.accent}` }}
                >
                  <p.icon
                    size={17}
                    strokeWidth={2.2}
                    className="text-[var(--gr-green-bright)]"
                  />
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--gr-text-mute)] group-hover:text-[var(--gr-green-bright)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                  />
                </div>
                <p className="text-sm text-[var(--gr-text-dim)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
