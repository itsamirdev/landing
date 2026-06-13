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
  Brain,
  Layers3,
  ShieldCheck,
  Star,
  CheckCircle2,
  Check,
  Minus,
  Menu,
  X,
  Droplets,
  Sun,
  Bell,
  Zap,
  ChevronDown,
  Sparkles,
  Camera,
} from "lucide-react";

// ─── Animation config ─────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};
const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "AI Plant Identification",
  "AR Room Preview",
  "Smart Care Reminders",
  "Disease Detection",
  "Watering Schedules",
  "Growth Tracking",
  "50,000+ Species",
  "Light Optimization",
];

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Instant plant ID",
    text: "Point your camera at any plant. Get an accurate match in under 2 seconds.",
    gradient: "from-emerald-400/20 to-emerald-400/5",
    iconColor: "text-emerald-300",
  },
  {
    icon: Brain,
    title: "AI care assistant",
    text: "Ask about watering, light, soil, or pests. Get simple, reliable guidance.",
    gradient: "from-lime-400/20 to-lime-400/5",
    iconColor: "text-lime-300",
  },
  {
    icon: Layers3,
    title: "AR plant preview",
    text: "See exactly how a plant looks in your room before placing or buying it.",
    gradient: "from-sky-400/20 to-sky-400/5",
    iconColor: "text-sky-300",
  },
  {
    icon: ShieldCheck,
    title: "Habit reminders",
    text: "Timely reminders for watering, misting, repotting, and seasonal care.",
    gradient: "from-violet-400/20 to-violet-400/5",
    iconColor: "text-violet-300",
  },
];

const STEPS = [
  {
    title: "Scan",
    text: "Open the camera and identify any plant in seconds.",
    emoji: "📷",
  },
  {
    title: "Learn",
    text: "Get care tips, diagnosis hints, and growth details instantly.",
    emoji: "🌿",
  },
  {
    title: "Grow",
    text: "Use AR previews and smart reminders to keep plants thriving.",
    emoji: "✨",
  },
];

const PLANS = [
  {
    name: "Seed",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started.",
    features: [
      { text: "10 plant scans / month", ok: true },
      { text: "Basic care tips", ok: true },
      { text: "Plant diary & notes", ok: true },
      { text: "AI care assistant", ok: false },
      { text: "AR room preview", ok: false },
      { text: "Smart reminders", ok: false },
    ],
    cta: "Start for free",
    highlight: false,
    badge: null,
  },
  {
    name: "Bloom",
    price: { monthly: 9, annual: 7 },
    description: "Everything for thriving plants.",
    features: [
      { text: "Unlimited scans", ok: true },
      { text: "AI care assistant", ok: true },
      { text: "AR room preview", ok: true },
      { text: "Smart care reminders", ok: true },
      { text: "Disease detection", ok: true },
      { text: "Priority support", ok: false },
    ],
    cta: "Start 14-day free trial",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Garden",
    price: { monthly: 19, annual: 15 },
    description: "For plant-loving households.",
    features: [
      { text: "Everything in Bloom", ok: true },
      { text: "Up to 5 profiles", ok: true },
      { text: "Shared plant library", ok: true },
      { text: "Priority support", ok: true },
      { text: "Early feature access", ok: true },
      { text: "Custom care programs", ok: true },
    ],
    cta: "Start 14-day free trial",
    highlight: false,
    badge: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Plant enthusiast",
    text: "I killed so many plants before NeroPlant. Now I actually know what each one needs. My monstera has never looked better.",
    rating: 5,
    avatarBg: "#78f0a4",
  },
  {
    name: "Marcus T.",
    role: "Interior designer",
    text: "The AR preview is a game changer for staging rooms. I show clients exactly how a plant fits their space before they commit.",
    rating: 5,
    avatarBg: "#59d984",
  },
  {
    name: "Priya N.",
    role: "Home gardener",
    text: "Identified a mystery plant in my garden in under three seconds. The care advice was spot on. Absolutely love this app.",
    rating: 5,
    avatarBg: "#94ffbf",
  },
];

const FAQS = [
  {
    q: "How accurate is the plant identification?",
    a: "NeroPlant achieves over 95% accuracy on common houseplants and garden plants, drawing from a database of 50,000+ species. For rare species it returns the closest matches with confidence scores.",
  },
  {
    q: "Does the app work offline?",
    a: "Basic plant scans work offline for the 500 most common species. Full AI features, disease detection, and AR preview require an internet connection.",
  },
  {
    q: "How does AR plant preview work?",
    a: "Point your camera at any flat surface. NeroPlant places a 3D model of the plant in your space at true scale. Walk around it, resize it, and see exactly how it fits before buying.",
  },
  {
    q: "Is my plant and location data private?",
    a: "Completely. Scan images are processed on-device or deleted immediately from servers. We never sell or share your data. Your plant library lives on your device.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, cancel from settings with one tap. You keep full access until the end of your billing period with zero extra charges.",
  },
  {
    q: "What platforms does NeroPlant support?",
    a: "NeroPlant is available on iOS and Android. A web companion app for managing your plant library from a desktop is coming soon.",
  },
];

// ─── Utility components ───────────────────────────────────────────────────────

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

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/5 bg-white/[0.015] py-4">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-12"
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-sm text-slate-500"
          >
            <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function AnimatedCount({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const springMv = useSpring(mv, { stiffness: 50, damping: 18 });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);
  useEffect(() => {
    return springMv.on("change", (v) => {
      const n = Math.round(v);
      setDisplay(n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`);
    });
  }, [springMv]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-white transition hover:text-emerald-300"
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-7 text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── App Mockup ───────────────────────────────────────────────────────────────

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[370px]">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 via-lime-300/20 to-transparent blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur">
            <div className="mb-2 flex justify-center">
              <div className="h-1.5 w-14 rounded-full bg-white/10" />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1220]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px]">
                <span className="font-semibold text-white">NeroPlant</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  AI active
                </div>
              </div>
              <div className="space-y-3 p-3">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-lime-400 to-emerald-300 p-5 text-slate-950">
                  <motion.div
                    animate={{ y: ["0%", "2500%", "0%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-slate-950/20 to-transparent"
                  />
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4" /> AI scan complete
                  </div>
                  <h3 className="mt-2 text-xl font-bold">Monstera Deliciosa</h3>
                  <p className="mt-1 text-sm opacity-70">
                    Tropical · easy care · 94% match
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
                    <span className="flex items-center gap-1 rounded-full bg-slate-950/15 px-2.5 py-1">
                      <CheckCircle2 className="h-3 w-3" /> Healthy
                    </span>
                    <span className="rounded-full bg-slate-950/15 px-2.5 py-1">
                      Low light ok
                    </span>
                    <span className="rounded-full bg-slate-950/15 px-2.5 py-1">
                      Water in 2d
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: Droplets,
                      label: "Water",
                      value: "2 days",
                      bg: "bg-blue-400/10",
                      color: "text-blue-300",
                    },
                    {
                      icon: Sun,
                      label: "Light",
                      value: "Indirect",
                      bg: "bg-yellow-400/10",
                      color: "text-yellow-300",
                    },
                    {
                      icon: Bell,
                      label: "Care",
                      value: "Today",
                      bg: "bg-emerald-400/10",
                      color: "text-emerald-300",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
                    >
                      <div
                        className={`mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-xl ${s.bg}`}
                      >
                        <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
                      </div>
                      <p className="text-[10px] text-slate-400">{s.label}</p>
                      <p className="text-[11px] font-semibold text-white">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: Camera,
                      label: "Quick scan",
                      sub: "Identify from camera",
                      bg: "bg-emerald-400/10",
                      color: "text-emerald-300",
                    },
                    {
                      icon: Layers3,
                      label: "AR preview",
                      sub: "Place in your room",
                      bg: "bg-lime-400/10",
                      color: "text-lime-300",
                    },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3.5"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${a.bg}`}
                      >
                        <a.icon className={`h-4 w-4 ${a.color}`} />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-white">
                        {a.label}
                      </p>
                      <p className="text-[11px] text-slate-400">{a.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 1.1, ease }}
        className="absolute -right-5 top-16 rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-xl backdrop-blur"
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
        transition={{ duration: 0.55, delay: 1.3, ease }}
        className="absolute -left-5 bottom-32 rounded-2xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-xl backdrop-blur"
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
  const [emailError, setEmailError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [annual, setAnnual] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function handleSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <ScrollProgress />
      <BackToTop />

      {/* Background radial glows */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.15), transparent), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(132,204,22,0.1), transparent)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#050816]/90 shadow-sm shadow-black/30 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex cursor-pointer items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">
                NeroPlant
              </div>
              <div className="text-xs text-slate-400">
                AI plant care companion
              </div>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden items-center gap-6 md:flex"
          >
            {[
              { id: "features", label: "Features" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Reviews" },
              { id: "faq", label: "FAQ" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-slate-400 transition hover:text-white"
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
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/5 bg-[#050816]/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-5 text-sm">
                {[
                  { id: "features", label: "Features" },
                  { id: "pricing", label: "Pricing" },
                  { id: "testimonials", label: "Reviews" },
                  { id: "faq", label: "FAQ" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left text-slate-300 transition hover:text-white"
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
        <div
          ref={heroRef}
          className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-24"
        >
          <section className="grid items-center gap-14 pb-4 lg:grid-cols-2">
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div
                variants={FADE_UP}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Now in early access · Limited spots
              </motion.div>

              <motion.h1
                variants={FADE_UP}
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
                variants={FADE_UP}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
              >
                NeroPlant uses AI to identify plants, diagnose problems, and
                guide your care routine — with AR preview so you know exactly
                how a plant fits your space.
              </motion.p>

              <motion.div
                variants={FADE_UP}
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

              <motion.div
                variants={FADE_UP}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {["#78f0a4", "#59d984", "#94ffbf", "#4caf82", "#2d9e60"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-[#050816]"
                        style={{ background: c }}
                      />
                    ),
                  )}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">2,400+</span> plant
                  lovers already joined
                </p>
              </motion.div>

              <motion.div
                variants={FADE_UP}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.38 }}
                className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8 text-center"
              >
                <div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCount target={50} suffix="k+" />
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    Plants identified
                  </div>
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
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything your plants need.
              </h2>
              <p className="mt-4 max-w-xl text-slate-400">
                AI identification, smart care reminders, AR preview, and disease
                detection — built for beginners and plant nerds alike.
              </p>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    variants={SCALE_IN}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} ${f.iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {f.text}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* ── How it works ── */}
          <section id="how" className="mt-28 grid gap-8 lg:grid-cols-2">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                How it works
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                Three steps to thriving plants.
              </h2>
              <div className="mt-7 space-y-4">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.12, ease }}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-emerald-400/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-bold text-slate-950">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                        {s.title} <span>{s.emoji}</span>
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {s.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={FADE_UP}
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
                  Swap copy, colors, and mockups, then plug in your waitlist.
                  Deploy to Vercel in minutes.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Zero external UI dependencies",
                    "Pure Tailwind + Framer Motion",
                    "SSR-safe, Vercel-ready",
                    "Accessible and mobile-first",
                  ].map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      {p}
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
                <button
                  onClick={() => scrollTo("pricing")}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
                >
                  View pricing
                </button>
              </div>
            </motion.div>
          </section>

          {/* ── Pricing ── */}
          <section id="pricing" className="mt-28">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent pricing.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Start free. Upgrade when you're ready. No hidden fees, no
                surprises.
              </p>
              <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    !annual
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    annual
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Annual
                  <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-3"
            >
              {PLANS.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={SCALE_IN}
                  className={`relative flex flex-col rounded-3xl p-px ${
                    plan.highlight
                      ? "bg-gradient-to-b from-emerald-400/60 to-emerald-400/10"
                      : "bg-white/10"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-4 py-1 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
                      {plan.badge}
                    </div>
                  )}
                  <div
                    className={`flex h-full flex-col rounded-[calc(1.5rem-1px)] p-7 ${
                      plan.highlight ? "bg-[#0d1f17]" : "bg-[#090d1a]"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-300">
                        {plan.name}
                      </p>
                      <div className="mt-3 flex items-end gap-1">
                        <span className="text-4xl font-bold text-white">
                          ${annual ? plan.price.annual : plan.price.monthly}
                        </span>
                        {(annual ? plan.price.annual : plan.price.monthly) >
                          0 && (
                          <span className="mb-1 text-sm text-slate-400">
                            /mo
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        {plan.description}
                      </p>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li
                          key={f.text}
                          className="flex items-center gap-2.5 text-sm"
                        >
                          {f.ok ? (
                            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                          ) : (
                            <Minus className="h-4 w-4 shrink-0 text-slate-600" />
                          )}
                          <span
                            className={
                              f.ok ? "text-slate-300" : "text-slate-600"
                            }
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => scrollTo("waitlist")}
                      className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition active:scale-95 ${
                        plan.highlight
                          ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-300"
                          : "border border-white/15 text-white hover:bg-white/5"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Testimonials ── */}
          <section id="testimonials" className="mt-28">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                Reviews
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Plant lovers already love it.
              </h2>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-3"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.name}
                  variants={SCALE_IN}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-emerald-400 text-emerald-400"
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                    {t.text}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-slate-950"
                      style={{ background: t.avatarBg }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── FAQ ── */}
          <section
            id="faq"
            className="mt-28 grid gap-12 lg:grid-cols-[1fr_1.4fr]"
          >
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Common questions.
              </h2>
              <p className="mt-4 text-slate-400">
                Can't find what you're looking for?{" "}
                <a
                  href="mailto:hello@neroplant.app"
                  className="text-emerald-300 underline underline-offset-4 transition hover:text-emerald-200"
                >
                  Email us
                </a>
                .
              </p>
            </motion.div>

            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 }}
            >
              {FAQS.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </motion.div>
          </section>

          {/* ── Waitlist CTA ── */}
          <section id="waitlist" className="mt-28">
            <motion.div
              variants={SCALE_IN}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 via-white/5 to-transparent p-10 text-center md:p-16"
            >
              <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-lime-400/10 blur-3xl" />

              <p className="relative text-sm font-semibold uppercase tracking-widest text-emerald-300">
                Waitlist
              </p>
              <h2 className="relative mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Be first when we launch.
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Join 2,400+ plant lovers. Early access includes 3 months of Pro
                free — no credit card needed.
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
                    className="relative mx-auto mt-8 max-w-md"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(false);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="your@email.com"
                        className={`flex-1 rounded-full border bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none transition ${
                          emailError
                            ? "border-red-400/50 focus:border-red-400/70"
                            : "border-white/10 focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/15"
                        }`}
                      />
                      <button
                        onClick={handleSubmit}
                        className="group inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
                      >
                        Join waitlist
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    {emailError && (
                      <p className="mt-2 text-left text-xs text-red-400">
                        Please enter a valid email address.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="relative mt-5 text-xs text-slate-500">
                No spam, ever. Unsubscribe anytime. By joining you agree to our{" "}
                <a
                  href="#"
                  className="underline underline-offset-2 transition hover:text-slate-300"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
                  <Leaf className="h-4 w-4" />
                </div>
                <span className="font-semibold text-white">NeroPlant</span>
              </div>
              <p className="mt-3 max-w-[200px] text-sm leading-6 text-slate-400">
                AI-powered plant care for everyone. Identify, preview, and grow
                with confidence.
              </p>
            </div>

            {[
              {
                heading: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                heading: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Contact"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 transition hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} NeroPlant. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with <span className="text-emerald-400">♥</span> for plant
              lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
