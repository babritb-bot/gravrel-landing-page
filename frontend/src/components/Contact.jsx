import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Send, MapPin, ArrowUpRight } from "lucide-react";

const RECIPIENT = "support@gravrel.com";
const initial = { name: "", email: "", phone: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initial);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  // Pure static: open the user's mail client with a prefilled email.
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    const subject = encodeURIComponent(`New Gravrel lead — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail app — just hit send!");
    setForm(initial);
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    const subject = encodeURIComponent("Newsletter signup — gravrel.com");
    const body = encodeURIComponent(`Please add this email to the newsletter:\n\n${newsletterEmail}`);
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail app — just hit send!");
    setNewsletterEmail("");
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Join Gravrel band */}
        <div className="reveal gr-card p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_60%)] pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="section-eyebrow mb-3">Newsletter</div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                Join Gravrel today.
              </h3>
              <p className="text-[var(--gr-text-dim)] max-w-md">
                Stay updated on eco-friendly data solutions, new regions, and student credits.
              </p>
            </div>
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                data-testid="newsletter-email-input"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@domain.com"
                className="gr-input flex-1"
              />
              <button
                data-testid="newsletter-subscribe-btn"
                type="submit"
                className="btn-primary justify-center"
              >
                Subscribe
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left info */}
          <div className="lg:col-span-5 reveal">
            <div className="section-eyebrow mb-4">Contact</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.05] mb-6">
              Reach out for{" "}
              <span className="text-[var(--gr-green-bright)]">eco-friendly</span> data
              solutions.
            </h2>
            <p className="text-[var(--gr-text-dim)] leading-relaxed mb-10">
              Whether you&apos;re a student deploying your first project or a team migrating
              workloads — we&apos;d love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${RECIPIENT}`}
                data-testid="contact-email-link"
                className="flex items-center gap-4 group"
              >
                <span className="w-12 h-12 rounded-2xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)] group-hover:bg-[rgba(16,185,129,0.18)] transition">
                  <Mail size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold">
                    Email
                  </div>
                  <div className="text-white font-medium group-hover:text-[var(--gr-green-bright)] transition">
                    support@gravrel.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+917377985775"
                data-testid="contact-phone-link"
                className="flex items-center gap-4 group"
              >
                <span className="w-12 h-12 rounded-2xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)] group-hover:bg-[rgba(16,185,129,0.18)] transition">
                  <Phone size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold">
                    Phone
                  </div>
                  <div className="text-white font-medium group-hover:text-[var(--gr-green-bright)] transition">
                    +91 73779 85775
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)]">
                  <MapPin size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--gr-text-mute)] font-semibold">
                    Datacenter
                  </div>
                  <div className="text-white font-medium">Bhubaneswar, Odisha · India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 reveal">
            <form
              onSubmit={submit}
              className="gr-card p-6 lg:p-8 space-y-4"
              data-testid="contact-form"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                    Your full name
                  </span>
                  <input
                    data-testid="contact-name-input"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ada Lovelace"
                    className="gr-input mt-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                    Email
                  </span>
                  <input
                    data-testid="contact-email-input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="ada@domain.com"
                    className="gr-input mt-2"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                  Phone <span className="lowercase text-[var(--gr-text-mute)]">(optional)</span>
                </span>
                <input
                  data-testid="contact-phone-input"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+91 …"
                  className="gr-input mt-2"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                  Message
                </span>
                <textarea
                  data-testid="contact-message-input"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us what you're building…"
                  className="gr-input mt-2 resize-none"
                  required
                />
              </label>

              <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                <p className="text-xs text-[var(--gr-text-mute)] max-w-sm">
                  Submitting opens your mail app with the message pre-filled — just hit send.
                </p>
                <button
                  data-testid="contact-submit-btn"
                  type="submit"
                  className="btn-primary"
                >
                  Send Message
                  <Send size={15} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
