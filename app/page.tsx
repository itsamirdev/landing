"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  ScanSearch,
  Sparkles,
  Camera,
  Brain,
  Layers3,
  ShieldCheck,
  Star,
  CheckCircle2,
  Menu,
  X,
  Droplets,
  Sun,
  Bell,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: ScanSearch,
    title: "Instant plant ID",
    text: "Point your camera at any plant and get a fast, accurate match with care info.",
  },
  {
    icon: Brain,
    title: "AI care assistant",
    text: "Ask questions about watering, light, soil, or pests and get simple guidance.",
  },
  {
    icon: Layers3,
    title: "AR plant preview",
    text: "See how a plant will look in your room before you buy or place it.",
  },
  {
    icon: ShieldCheck,
    title: "Healthy habit reminders",
    text: "Get timely reminders for watering, misting, repotting, and seasonal care.",
  },
];

const steps = [
  { title: "Scan", text: "Open the camera and identify a plant in seconds." },
  { title: "Learn", text: "See care tips, diagnosis hints, and growth details." },
  { title: "Grow", text: "Use AR and reminders to keep every plant thriving." },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Plant enthusiast",
    text: "I killed so many plants before Plantino. Now I actually know what each one needs.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Interior designer",
    text: "The AR preview is a game changer for staging rooms. I use it on every project.",
    rating: 5,
  },
  {
    name: "Priya N.",
    role: "Home gardener",
    text: "Identified a mystery plant in my garden in under three seconds. Absolutely love it.",
    rating: 5,
  },
];

const checklistItems = [
  "No 3D model files needed",
  "Pure Tailwind CSS — no extra UI libs",
  "Framer Motion animations",
  "Fully responsive",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── App Mockup ───────────────────────────────────────────────────────────────

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 via-lime-300/20 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-3 shadow-2xl backdrop-blur"
      >
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-14 rounded-full bg-white/10" />
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1220]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-slate-400">
            <span className="font-medium text-white">Plantino</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>AI active</span>
            </div>
          </div>

          <div className="space-y-3 p-3">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-lime-400 to-emerald-300 p-5 text-slate-950">
              <motion.div
                animate={{ y: ["0%", "1800%", "0%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-px bg-slate-950/25"
              />
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI scan complete
              </div>
              <h3 className="mt-2 text-xl font-semibold leading-tight">Monstera Deliciosa</h3>
              <p className="mt-1 text-sm opacity-70">Tropical · easy care · 94% match</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-medium">
                <span className="flex items-center gap-1 rounded-full bg-slate-950/15 px-2.5 py-1">
                  <CheckCircle2 className="h-3 w-3" /> Healthy
                </span>
                <span className="rounded-full bg-slate-950/15 px-2.5 py-1">Low light ok</span>
                <span className="rounded-full bg-slate-950/15 px-2.5 py-1">Water in 2 days</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Droplets, label: "Water", value: "2 days", color: "text-blue-300" },
                { icon: Sun, label: "Light", value: "Indirect", color: "text-yellow-300" },
                { icon: Bell, label: "Next care", value: "Today", color: "text-emerald-300" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <s.icon className={`mx-auto h-4 w-4 ${s.color}`} />
                  <p className="mt-1.5 text-[10px] text-slate-400">{s.label}</p>
                  <p className="text-xs font-medium text-white">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <Camera className="h-4 w-4 text-emerald-300" />
                <p className="mt-2 text-xs font-medium text-white">Quick scan</p>
                <p className="text-[11px] text-slate-400">Identify from camera</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <Layers3 className="h-4 w-4 text-lime-300" />
                <p className="mt-2 text-xs font-medium text-white">AR preview</p>
                <p className="text-[11px] text-slate-400">Place in your room</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="absolute -right-4 top-14 rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-2.5 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2 text-xs">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20">
            <Leaf className="h-3.5 w-3.5 text-emerald-300" />
          </div>
          <div>
            <p className="font-medium text-white">Time to water!</p>
            <p className="text-slate-400">Pothos needs a drink</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.15 }}
        className="absolute -left-4 bottom-24 rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-2.5 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2 text-xs">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-lime-400/20">
            <ScanSearch className="h-3.5 w-3.5 text-lime-300" />
          </div>
          <div>
            <p className="font-medium text-white">94% match</p>
            <p className="text-slate-400">Monstera identified</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlantinoLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(132,204,22,0.10),transparent_25%)]" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">Plantino</div>
              <div className="text-xs text-slate-400">AI plant care companion</div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 md:flex">
            <button onClick={() => scrollTo("features")} className="text-sm text-slate-300 transition hover:text-white">
              Features
            </button>
            <button onClick={() => scrollTo("how")} className="text-sm text-slate-300 transition hover:text-white">
              How it works
            </button>
            <button onClick={() => scrollTo("testimonials")} className="text-sm text-slate-300 transition hover:text-white">
              Reviews
            </button>
            <button
              onClick={() => scrollTo("waitlist")}
              className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
            >
              Join waitlist
            </button>
          </nav>

          <button
            className="rounded-xl p-2 text-slate-300 hover:bg-white/5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/5 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              <button onClick={() => scrollTo("features")} className="text-left hover:text-white">Features</button>
              <button onClick={() => scrollTo("how")} className="text-left hover:text-white">How it works</button>
              <button onClick={() => scrollTo("testimonials")} className="text-left hover:text-white">Reviews</button>
              <button
                onClick={() => scrollTo("waitlist")}
                className="w-fit rounded-full bg-emerald-400 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300"
              >
                Join waitlist
              </button>
            </div>
          </motion.div>
        )}
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">

        {/* ── Hero ── */}
        <section className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Now in early access
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Give every plant a voice.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
            >
              Plantino helps you identify plants, preview them in AR, and get smart
              care guidance — all in one beautiful experience.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo("waitlist")}
                className="inline-flex items-center rounded-full bg-emerald-400 px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-emerald-300"
              >
                Get early access <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo("how")}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
              >
                See how it works
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["#78f0a4", "#59d984", "#94ffbf", "#4caf82"].map((c, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-[#050816]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-400">
                <span className="font-medium text-white">2,400+</span> plant lovers on the waitlist
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.36 }}
              className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8 text-center"
            >
              {[
                { value: "50k+", label: "Plants identified" },
                { value: "AR", label: "Room preview" },
                { value: "4.9★", label: "Beta rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold text-white">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:justify-self-end">
            <AppMockup />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything your plants need, in one app.
            </h2>
            <p className="mt-4 text-slate-300">
              AI identification, smart care reminders, and AR preview — built for beginners and plant nerds alike.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-emerald-400/20 hover:bg-white/[0.07]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="mt-32 grid gap-8 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">How it works</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Three steps to thriving plants.
            </h2>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-emerald-400/20"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/15 to-white/5 p-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Launch ready
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">Ready for your launch.</h3>
              <p className="mt-4 text-slate-300">
                Swap copy, colors, and mockups, then plug in your waitlist form. Goes live in minutes.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
                {checklistItems.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("waitlist")}
                className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
              >
                Get started
              </button>
              <button className="rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5">
                View pricing
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">Reviews</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Plant lovers already love it.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{t.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-semibold text-emerald-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Waitlist ── */}
        <section id="waitlist" className="mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 via-white/5 to-transparent p-10 text-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">Waitlist</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Be first when we launch.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Join 2,400+ plant lovers already on the list. We'll send you early access and a special discount.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-4 text-emerald-200"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>You're on the list! We'll be in touch soon.</span>
              </motion.div>
            ) : (
              <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && email && setSubmitted(true)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                />
                <button
                  onClick={() => { if (email) setSubmitted(true); }}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
                >
                  Join waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">No spam, ever. Unsubscribe anytime.</p>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
              <Leaf className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium text-slate-300">Plantino</span>
          </div>
          <p>© {new Date().getFullYear()} Plantino. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
