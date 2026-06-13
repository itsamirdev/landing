"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
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
  Zap,
} from "lucide-react";

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-emerald-400 to-lime-400"
    />
  );
}

// ─── Back to top button ───────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const marqueeItems = [
  "AI Plant Identification",
  "AR Room Preview",
  "Smart Care Reminders",
  "Disease Detection",
  "Watering Schedules",
  "Growth Tracking",
  "Soil Analysis",
  "Light Optimization",
];

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/5 bg-white/[0.02] py-3.5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-slate-400">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => {
    return spring.on("change", (v) => {
      const n = Math.round(v);
      setDisplay(n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: ScanSearch,
    title: "Instant plant ID",
    text: "Point your camera at any plant and get a fast, accurate match with care info.",
    gradient: "from-emerald-400/20 to-emerald-400/5",
    iconClass: "text-emerald-300",
  },
  {
    icon: Brain,
    title: "AI care assistant",
    text: "Ask questions about watering, light, soil, or pests and get simple guidance.",
    gradient: "from-lime-400/20 to-lime-400/5",
    iconClass: "text-lime-300",
  },
  {
    icon: Layers3,
    title: "AR plant preview",
    text: "See how a plant will look in your room before you buy or place it.",
    gradient: "from-sky-400/20 to-sky-400/5",
    iconClass: "text-sky-300",
  },
  {
    icon: ShieldCheck,
    title: "Habit reminders",
    text: "Get timely reminders for watering, misting, repotting, and seasonal care.",
    gradient: "from-violet-400/20 to-violet-400/5",
    iconClass: "text-violet-300",
  },
];

const steps = [
  { title: "Scan", text: "Open the camera and identify a plant in seconds.", emoji: "📷" },
  { title: "Learn", text: "See care tips, diagnosis hints, and growth details.", emoji: "🌿" },
  { title: "Grow", text: "Use AR and reminders to keep every plant thriving.", emoji: "✨" },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Plant enthusiast",
    text: "I killed so many plants before Plantino. Now I actually know what each one needs.",
    rating: 5,
    avatarBg: "#78f0a4",
  },
  {
    name: "Marcus T.",
    role: "Interior designer",
    text: "The AR preview is a game changer for staging rooms. I use it on every project.",
    rating: 5,
    avatarBg: "#59d984",
  },
  {
    name: "Priya N.",
    role: "Home gardener",
    text: "Identified a mystery plant in my garden in under three seconds. Absolutely love it.",
    rating: 5,
    avatarBg: "#94ffbf",
  },
];

// ─── Animation presets ────────────────────────────────────────────────────────

const spring = { ease: [0.22, 1, 0.36, 1] as const };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ...spring } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ...spring } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── App mockup ───────────────────────────────────────────────────────────────

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[370px]">
      {/* Ambient blob */}
      <div className="absolute inset-0 -z-10 scale-90 rounded-[2rem] bg-gradient-to-br from-emerald-400/35 via-lime-300/20 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ...spring }}
        className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur"
      >
        {/* Notch */}
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-14 rounded-full bg-white/10" />
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1220]">
          {/* Status bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px]">
            <span className="font-semibold text-white">Plantino</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              AI active
            </div>
          </div>

          <div className="space-y-3 p-3">
            {/* Scan result card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-lime-400 to-emerald-300 p-5 text-slate-950">
              <motion.div
                animate={{ y: ["0%", "2200%", "0%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-slate-950/20 to-transparent"
              />
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" /> AI scan complete
              </div>
              <h3 className="mt-2 text-xl font-bold leading-tight">Monstera Deliciosa</h3>
              <p className="mt-1 text-sm opacity-70">Tropical · easy care · 94% match</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
                <span className="flex items-center gap-1 rounded-full bg-slate-950/15 px-2.5 py-1">
                  <CheckCircle2 className="h-3 w-3" /> Healthy
                </span>
                <span className="rounded-full bg-slate-950/15 px-2.5 py-1">Low light ok</span>
                <span className="rounded-full bg-slate-950/15 px-2.5 py-1">Water in 2d</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Droplets, label: "Water", value: "2 days", iconBg: "bg-blue-400/10", iconColor: "text-blue-300" },
                { icon: Sun, label: "Light", value: "Indirect", iconBg: "bg-yellow-400/10", iconColor: "text-yellow-300" },
                { icon: Bell, label: "Care", value: "Today", iconBg: "bg-emerald-400/10", iconColor: "text-emerald-300" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                  <div className={`mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-xl ${s.iconBg}`}>
                    <s.icon className={`h-3.5 w-3.5 ${s.iconColor}`} />
                  </div>
                  <p className="text-[10px] text-slate-400">{s.label}</p>
                  <p className="text-[11px] font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Camera, label: "Quick scan", sub: "Identify from camera", iconBg: "bg-emerald-400/10", iconColor: "text-emerald-300" },
                { icon: Layers3, label: "AR preview", sub: "Place in your room", iconBg: "bg-lime-400/10", iconColor: "text-lime-300" },
              ].map((a) => (
                <div key={a.label} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${a.iconBg}`}>
                    <a.icon className={`h-4 w-4 ${a.iconColor}`} />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-white">{a.label}</p>
                  <p className="text-[11px] text-slate-400">{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 1.0, ...spring }}
        className="absolute -right-4 top-16 rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2 text-xs">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20">
            <Bell className="h-3.5 w-3.5 text-emerald-300" />
          </div>
          <div>
            <p className="font-semibold text-white">Time to water!</p>
            <p className="text-slate-400">Pothos needs a drink</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 1.2, ...spring }}
        className="absolute -left-4 bottom-28 rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2 text-xs">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-lime-400/20">
            <ScanSearch className="h-3.5 w-3.5 text-lime-300" />
          </div>
          <div>
            <p className="font-semibold text-white">94% match</p>
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
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <ScrollProgress />
      <BackToTop />

      {/* Fixed background glows */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.18),transparent),radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(132,204,22,0.12),transparent)]" />

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#050816]/90 shadow-sm shadow-black/30 backdrop-blur"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">Plantino</div>
              <div className="text-xs text-slate-400">AI plant care companion</div>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden items-center gap-6 md:flex"
          >
            {[
              { id: "features", label: "Features" },
              { id: "how", label: "How it works" },
              { id: "testimonials", label: "Reviews" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
            >
              Join waitlist
            </button>
          </motion.nav>

          <button
            className="rounded-xl p-2 text-slate-300 hover:bg-white/5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-5 text-sm">
                {[
                  { id: "features", label: "Features" },
                  { id: "how", label: "How it works" },
                  { id: "testimonials", label: "Reviews" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left text-slate-300 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="w-fit rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
                >
                  Join waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-24">
          <section className="grid items-center gap-14 pb-4 lg:grid-cols-2">
            {/* Left copy */}
            <motion.div style={{ opacity: heroTextOpacity }}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Now in early access
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.08 }}
                className="mt-6 max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              >
                Give every{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                  plant
                </span>{" "}
                a voice.
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
                className="mt-8 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="group inline-flex items-center rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
                >
                  Get early access
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo("how")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
                >
                  <Zap className="h-4 w-4 text-emerald-300" />
                  See how it works
                </button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {["#78f0a4", "#59d984", "#94ffbf", "#4caf82"].map((c, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-[#050816]" style={{ background: c }} />
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">2,400+</span> plant lovers waiting
                </p>
              </motion.div>

              {/* Animated stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.38 }}
                className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8 text-center"
              >
                <div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCount target={50} suffix="k+" />
                  </div>
                  <div className="mt-1 text-sm text-slate-400">Plants identified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="mt-1 text-sm text-slate-400">Beta rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCount target={2400} suffix="+" />
                  </div>
                  <div className="mt-1 text-sm text-slate-400">On waitlist</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — parallax mockup */}
            <motion.div style={{ y: mockupY }} className="lg:justify-self-end">
              <AppMockup />
            </motion.div>
          </section>
        </div>

        {/* ── Marquee ── */}
        <div className="mt-16">
          <Marquee />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">

          {/* ── Features ── */}
          <section id="features" className="mt-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Features</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything your plants need.
              </h2>
              <p className="mt-4 max-w-xl text-slate-400">
                AI identification, smart care reminders, and AR preview — built for
                beginners and plant nerds alike.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={scaleIn}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-white/20"
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} ${item.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* ── How it works ── */}
          <section id="how" className="mt-28 grid gap-8 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">How it works</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                Three steps to thriving plants.
              </h2>
              <div className="mt-7 space-y-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.12 }}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-emerald-400/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-bold text-slate-950">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                        {step.title} <span>{step.emoji}</span>
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
              className="flex flex-col justify-between rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 via-white/5 to-white/0 p-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Launch ready
                </div>
                <h3 className="mt-6 text-3xl font-bold tracking-tight text-white">
                  Ready for your launch.
                </h3>
                <p className="mt-4 text-slate-300">
                  Swap copy, colors, and mockups, then plug in your waitlist. Goes live in minutes.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "No 3D model files needed",
                    "Pure Tailwind — zero UI lib required",
                    "Framer Motion scroll animations",
                    "Fully responsive & accessible",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
                >
                  Get started
                </button>
                <button className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5">
                  View pricing
                </button>
              </div>
            </motion.div>
          </section>

          {/* ── Testimonials ── */}
          <section id="testimonials" className="mt-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Reviews</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Plant lovers already love it.
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-3"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{t.text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-slate-950"
                      style={{ background: t.avatarBg }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Waitlist ── */}
          <section id="waitlist" className="mt-28">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 via-white/5 to-transparent p-10 text-center md:p-16"
            >
              {/* Glow blob */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />

              <p className="relative text-sm font-semibold uppercase tracking-widest text-emerald-300">
                Waitlist
              </p>
              <h2 className="relative mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Be first when we launch.
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Join 2,400+ plant lovers already on the list. Early access and a special discount included.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-4 text-emerald-200"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span>You're on the list! We'll be in touch soon.</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && email && setSubmitted(true)}
                      placeholder="your@email.com"
                      className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                    />
                    <button
                      onClick={() => { if (email) setSubmitted(true); }}
                      className="group inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
                    >
                      Join waitlist
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="relative mt-4 text-xs text-slate-500">No spam, ever. Unsubscribe anytime.</p>
            </motion.div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
              <Leaf className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-slate-300">Plantino</span>
          </div>
          <p>© {new Date().getFullYear()} Plantino. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}