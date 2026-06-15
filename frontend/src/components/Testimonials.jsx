import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Gravrel's eco-friendly datacenter helped my startup cut costs and reduce our carbon footprint. Truly impressive service!",
    name: "Anita Roy",
    role: "Founder",
    location: "Mumbai",
    photo:
      "https://images.unsplash.com/photo-1669756682317-d43b97aaef71?auto=format&fit=crop&w=200&h=200",
  },
  {
    quote:
      "As a student, I appreciate Gravrel's commitment to sustainability and affordable access to reliable data services.",
    name: "Ravi Kumar",
    role: "CS Student",
    location: "Delhi",
    photo:
      "https://images.unsplash.com/photo-1694175271713-a6e2cc378980?auto=format&fit=crop&w=200&h=200",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal max-w-3xl mb-14">
          <div className="section-eyebrow mb-4">Feedback</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05]">
            What our clients say{" "}
            <span className="text-[var(--gr-green-bright)]">about Gravrel.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="gr-card p-7 lg:p-8 relative reveal"
              data-testid={`testimonial-${i}`}
            >
              <Quote
                size={40}
                strokeWidth={1.5}
                className="absolute top-6 right-6 text-[rgba(16,185,129,0.18)]"
              />
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={15}
                    fill="currentColor"
                    className="text-[var(--gr-green-bright)]"
                  />
                ))}
              </div>

              <p className="font-display text-lg lg:text-xl text-white leading-relaxed mb-7">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[rgba(16,185,129,0.3)]"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-[var(--gr-text-dim)]">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
