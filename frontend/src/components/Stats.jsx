import React from "react";

const stats = [
  { value: "150+", label: "Workloads hosted", sub: "and growing weekly" },
  { value: "15", label: "Avg. kWh / day", sub: "from on-site solar" },
  { value: "100+", label: "Clients trusting us", sub: "globally" },
  { value: "0", label: "Litres of water", sub: "used for cooling" },
];

const Stats = () => {
  return (
    <section className="relative py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="gr-card p-6 lg:p-7"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {s.value}
              </div>
              <div className="mt-3 text-sm font-semibold text-[var(--gr-green-bright)] uppercase tracking-wider">
                {s.label}
              </div>
              <div className="mt-1 text-sm text-[var(--gr-text-dim)]">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="reveal mt-6 text-center text-sm text-[var(--gr-text-mute)]">
          Trusted globally · From students in Bhubaneswar to teams in 12+ countries.
        </div>
      </div>
    </section>
  );
};

export default Stats;
