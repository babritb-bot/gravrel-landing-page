import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Rocket, CheckCircle, Users, Zap, Shield, Sun, ArrowRight, Loader2 } from "lucide-react";

const API = "https://api.gravrelaetherops.com/api/v1/waitlist";

const Waitlist = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", role: "startup" });
  const [sending, setSending] = useState(false);
  const [joined, setJoined] = useState(false);
  const [position, setPosition] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${API}/count`)
      .then(r => r.json())
      .then(d => { if (d.ok) setCount(d.count); })
      .catch(() => {});
  }, []);

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setJoined(true);
        setPosition(data.position || count + 1);
        setCount(prev => prev + 1);
        toast.success(data.message || "You're on the list!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setSending(false);
  };

  const benefits = [
    { icon: Zap, title: "3 months free", desc: "Full cloud access — VMs, databases, storage" },
    { icon: Shield, title: "DPDP compliant", desc: "Your data stays in India, always" },
    { icon: Sun, title: "100% solar", desc: "Zero carbon cloud — green certificates included" },
    { icon: Users, title: "Priority access", desc: "First to get onboarded when we launch" },
  ];

  return (
    <section id="waitlist" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] mb-6">
            <Rocket size={14} className="text-[var(--gr-green-bright)]" />
            <span className="text-[var(--gr-green-bright)] text-sm font-semibold">Early Access — Limited Spots</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Be first on India's{" "}
            <span className="text-[var(--gr-green-bright)]">greenest cloud</span>
          </h2>
          <p className="text-[var(--gr-text-dim)] text-lg max-w-2xl mx-auto">
            Join the waitlist and get 3 months free when we launch.
            60% cheaper than AWS. 100% solar powered. Data never leaves India.
          </p>
          {count > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 text-[var(--gr-text-mute)] text-sm">
              <Users size={14} />
              <span><strong className="text-white">{count}</strong> people already waiting</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Benefits */}
          <div className="reveal">
            <h3 className="text-xl font-bold text-white mb-6">Early access members get:</h3>
            <div className="space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex items-start gap-4 gr-card p-5">
                    <span className="w-10 h-10 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center text-[var(--gr-green-bright)] flex-shrink-0">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <div className="text-white font-semibold">{b.title}</div>
                      <div className="text-[var(--gr-text-dim)] text-sm mt-1">{b.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.15)]">
              <p className="text-sm text-[var(--gr-text-dim)]">
                <strong className="text-[var(--gr-green-bright)]">Startup Odisha approved</strong> — We're backed by the Government of Odisha.
                Hardware arriving soon. Early access members will be the first to go live.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            {joined ? (
              <div className="gr-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[var(--gr-green-bright)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're in! 🎉</h3>
                <p className="text-[var(--gr-text-dim)] mb-4">
                  You're <strong className="text-[var(--gr-green-bright)]">#{position}</strong> on the waitlist.
                  Check your email for confirmation.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.15)]">
                  <p className="text-sm text-[var(--gr-text-dim)]">
                    When we launch, you'll get:
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-[var(--gr-green-bright)]">
                    <p>☀️ 3 months free cloud hosting</p>
                    <p>🛡️ DPDP-compliant infrastructure</p>
                    <p>💰 60% cheaper than AWS — forever</p>
                    <p>📞 Direct access to our CEO</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--gr-text-mute)] mt-6">
                  Share with your friends — help us build India's greenest cloud.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="gr-card p-6 lg:p-8 space-y-4" data-testid="waitlist-form">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket size={18} className="text-[var(--gr-green-bright)]" />
                  <span className="text-white font-bold text-lg">Join the waitlist</span>
                </div>

                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                    Full name *
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Babrit Behera"
                    className="gr-input mt-2"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                    Email *
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    className="gr-input mt-2"
                    required
                  />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                      Phone <span className="lowercase">(optional)</span>
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 ..."
                      className="gr-input mt-2"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                      Company <span className="lowercase">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Your company"
                      className="gr-input mt-2"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-[var(--gr-text-mute)] font-semibold">
                    I am a
                  </span>
                  <select
                    value={form.role}
                    onChange={update("role")}
                    className="gr-input mt-2"
                  >
                    <option value="startup">Startup founder</option>
                    <option value="developer">Developer</option>
                    <option value="student">Student</option>
                    <option value="enterprise">Enterprise / IT team</option>
                    <option value="researcher">Researcher / Academic</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center mt-2"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Early Access
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--gr-text-mute)] text-center mt-2">
                  No spam. No credit card. Just early access to India's greenest cloud.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
