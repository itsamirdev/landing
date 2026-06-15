"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowRight, ArrowUp, Leaf, ScanSearch, Brain, Layers3, ShieldCheck,
  Star, CheckCircle2, Check, Minus, Menu, X, Droplets, Sun, Bell,
  Zap, ChevronDown, Sparkles, Camera,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ElementType;
  title: string;
  text: string;
  accent: string;
  shadow: string;
  border: string;
}

interface Plan {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: { text: string; ok: boolean }[];
  cta: string;
  highlight: boolean;
  badge: string | null;
}

interface Testimonial {
  name: string; role: string; text: string;
  rating: number; initials: string; grad: string;
}

// ─── Animation ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

const MARQUEE = [
  "AI Plant Identification", "AR Room Preview", "Smart Care Reminders",
  "Disease Detection", "Watering Schedules", "Growth Tracking",
  "50,000+ Species", "Light Optimization",
];

const FEATURES: Feature[] = [
  {
    icon: ScanSearch, title: "Instant plant ID",
    text: "Point your camera at any plant. Get an accurate match in under 2 seconds from a library of 50k+ species.",
    accent: "from-emerald-500/20 to-transparent",
    shadow: "shadow-emerald-500/10 hover:shadow-emerald-400/20",
    border: "border-emerald-500/15 hover:border-emerald-400/35",
  },
  {
    icon: Brain, title: "AI care assistant",
    text: "Ask anything about watering, light, soil, or pests. Get simple, reliable guidance backed by real plant science.",
    accent: "from-violet-500/20 to-transparent",
    shadow: "shadow-violet-500/10 hover:shadow-violet-400/20",
    border: "border-violet-500/15 hover:border-violet-400/35",
  },
  {
    icon: Layers3, title: "AR plant preview",
    text: "See exactly how a plant looks in your room at true scale before placing or buying it.",
    accent: "from-sky-500/20 to-transparent",
    shadow: "shadow-sky-500/10 hover:shadow-sky-400/20",
    border: "border-sky-500/15 hover:border-sky-400/35",
  },
  {
    icon: ShieldCheck, title: "Smart reminders",
    text: "Timely nudges for watering, misting, repotting, and seasonal care — so nothing falls through the cracks.",
    accent: "from-amber-500/20 to-transparent",
    shadow: "shadow-amber-500/10 hover:shadow-amber-400/20",
    border: "border-amber-500/15 hover:border-amber-400/35",
  },
];

const STEPS = [
  { n: "01", title: "Scan", text: "Open camera. Point at any plant. Get an ID in seconds.", icon: Camera },
  { n: "02", title: "Learn", text: "Get care guides, diagnosis hints, and growth timelines instantly.", icon: Brain },
  { n: "03", title: "Grow", text: "AR previews, smart reminders — keep every plant thriving.", icon: Sparkles },
];

const PLANS: Plan[] = [
  {
    name: "Seed", price: { monthly: 0, annual: 0 }, description: "Perfect for getting started.",
    features: [
      { text: "10 plant scans / month", ok: true },
      { text: "Basic care tips", ok: true },
      { text: "Plant diary & notes", ok: true },
      { text: "AI care assistant", ok: false },
      { text: "AR room preview", ok: false },
      { text: "Smart reminders", ok: false },
    ],
    cta: "Start for free", highlight: false, badge: null,
  },
  {
    name: "Bloom", price: { monthly: 9, annual: 7 }, description: "Everything for thriving plants.",
    features: [
      { text: "Unlimited scans", ok: true },
      { text: "AI care assistant", ok: true },
      { text: "AR room preview", ok: true },
      { text: "Smart care reminders", ok: true },
      { text: "Disease detection", ok: true },
      { text: "Priority support", ok: false },
    ],
    cta: "Start 14-day free trial", highlight: true, badge: "Most popular",
  },
  {
    name: "Garden", price: { monthly: 19, annual: 15 }, description: "For plant-loving households.",
    features: [
      { text: "Everything in Bloom", ok: true },
      { text: "Up to 5 profiles", ok: true },
      { text: "Shared plant library", ok: true },
      { text: "Priority support", ok: true },
      { text: "Early feature access", ok: true },
      { text: "Custom care programs", ok: true },
    ],
    cta: "Start 14-day free trial", highlight: false, badge: null,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah K.", role: "Plant enthusiast", rating: 5, initials: "SK",
    grad: "from-emerald-400 to-teal-500",
    text: "I killed so many plants before NeroPlant. Now I actually know what each one needs. My monstera has never looked better.",
  },
  {
    name: "Marcus T.", role: "Interior designer", rating: 5, initials: "MT",
    grad: "from-violet-400 to-purple-500",
    text: "The AR preview is a game changer for staging rooms. I show clients exactly how a plant fits before they commit.",
  },
  {
    name: "Priya N.", role: "Home gardener", rating: 5, initials: "PN",
    grad: "from-sky-400 to-blue-500",
    text: "Identified a mystery plant in under three seconds. The care advice was spot-on. Absolutely love this app.",
  },
];

const FAQS = [
  { q: "How accurate is the plant identification?", a: "NeroPlant achieves over 95% accuracy on common houseplants and garden plants, drawing from a database of 50,000+ species. For rare species it returns the closest matches with confidence scores." },
  { q: "Does the app work offline?", a: "Basic plant scans work offline for the 500 most common species. Full AI features, disease detection, and AR preview require an internet connection." },
  { q: "How does AR plant preview work?", a: "Point your camera at any flat surface. NeroPlant places a 3D model of the plant in your space at true scale. Walk around it, resize it, and see exactly how it fits before buying." },
  { q: "Is my plant and location data private?", a: "Completely. Scan images are processed on-device or deleted immediately. We never sell or share your data. Your plant library lives on your device." },
  { q: "Can I cancel my subscription anytime?", a: "Yes. Cancel from settings with one tap. You keep full access until the end of your billing period with zero extra charges." },
  { q: "What platforms does NeroPlant support?", a: "NeroPlant is available on iOS and Android. A web companion for managing your plant library from desktop is coming soon." },
];

// ─── Particle canvas ──────────────────────────────────────────────────────────

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.4 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${d.a})`;
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach((b) => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 110) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(52,211,153,${0.05 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}

// ─── Back to top ──────────────────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 shadow-xl shadow-emerald-500/10 backdrop-blur-xl transition-all hover:bg-emerald-400 hover:text-slate-950 focus-visible:outline-none"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] py-4" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#030712] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#030712] to-transparent" />
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap text-[13px] font-medium tracking-wide text-slate-500">
            <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18 });
  const [val, setVal] = useState("0");
  useEffect(() => { if (inView) mv.set(target); }, [inView, mv, target]);
  useEffect(() => spring.on("change", (v) => {
    const n = Math.round(v);
    setVal(n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`);
  }), [spring]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen((p) => !p)} aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-medium text-white/90 transition hover:text-emerald-300 focus-visible:outline-none"
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-7 text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 3D Phone Mockup ──────────────────────────────────────────────────────────

function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [14, -14]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-16, 16]), { stiffness: 80, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[340px]"
      onMouseMove={handleMouse} onMouseLeave={reset} style={{ perspective: "1000px" }}>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-4 top-8 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -right-4 bottom-8 h-48 w-48 rounded-full bg-lime-500/15 blur-3xl"
        />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          {/* Phone body */}
          <div
            className="relative overflow-hidden rounded-[2.4rem] border border-white/[0.1]"
            style={{
              background: "linear-gradient(160deg,#0f1729 0%,#070d1a 60%,#0a1520 100%)",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7),0 0 0 0.5px rgba(255,255,255,0.07) inset,0 1px 0 rgba(255,255,255,0.1) inset",
            }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-[5px] w-16 rounded-full bg-white/[0.07]" />
            </div>
            <div className="flex items-center justify-between px-5 py-2 text-[11px]">
              <span className="font-semibold text-white/90 tracking-wide">NeroPlant</span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />AI active
              </div>
            </div>
            <div className="mx-4 h-px bg-white/[0.05]" />
            <div className="space-y-2.5 p-3.5">
              {/* Scan result */}
              <div className="relative overflow-hidden rounded-2xl p-4"
                style={{ background:"linear-gradient(135deg,#10b981 0%,#84cc16 60%,#34d399 100%)", boxShadow:"0 8px 24px -6px rgba(16,185,129,0.5)" }}>
                <motion.div
                  animate={{ y:["-100%","700%"] }}
                  transition={{ duration:2.8, repeat:Infinity, ease:"linear", repeatDelay:1 }}
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900/75">
                  <Sparkles className="h-3 w-3" /> AI scan complete
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-slate-950">Monstera Deliciosa</h3>
                <p className="text-[11px] text-slate-900/55 mt-0.5">Tropical · easy care · 94% match</p>
                <div className="mt-2.5 flex flex-wrap gap-1 text-[10px] font-bold text-slate-950">
                  {["✓ Healthy","Low light ok","Water in 2d"].map((l) => (
                    <span key={l} className="rounded-full bg-slate-950/12 px-2 py-0.5">{l}</span>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Droplets, label:"Water", val:"2 days", c:"#60a5fa" },
                  { icon: Sun, label:"Light", val:"Indirect", c:"#fbbf24" },
                  { icon: Bell, label:"Care", val:"Today", c:"#34d399" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.05] p-2.5 text-center" style={{ background:"rgba(255,255,255,0.025)" }}>
                    <s.icon className="mx-auto mb-1 h-3.5 w-3.5" style={{ color:s.c }} />
                    <p className="text-[9px] text-slate-500">{s.label}</p>
                    <p className="text-[10px] font-semibold text-white/80">{s.val}</p>
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Camera, label:"Quick scan", sub:"From camera", c:"#34d399", bg:"rgba(52,211,153,0.07)" },
                  { icon: Layers3, label:"AR preview", sub:"In your room", c:"#a3e635", bg:"rgba(163,230,53,0.07)" },
                ].map((a) => (
                  <div key={a.label} className="rounded-xl border border-white/[0.05] p-3" style={{ background:a.bg }}>
                    <a.icon className="h-4 w-4 mb-1.5" style={{ color:a.c }} />
                    <p className="text-[11px] font-semibold text-white/80">{a.label}</p>
                    <p className="text-[10px] text-slate-500">{a.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center pb-3 pt-2">
              <div className="h-1 w-24 rounded-full bg-white/[0.08]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating badges */}
      <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:1.0, ease }}
        className="absolute -right-6 top-20 z-20 rounded-2xl border border-white/[0.08] px-3 py-2.5 text-xs shadow-2xl backdrop-blur-xl"
        style={{ background:"rgba(10,18,36,0.88)" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/12">
            <Bell className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white">Time to water!</p>
            <p className="text-[10px] text-slate-400">Pothos needs a drink</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:1.2, ease }}
        className="absolute -left-6 bottom-36 z-20 rounded-2xl border border-white/[0.08] px-3 py-2.5 text-xs shadow-2xl backdrop-blur-xl"
        style={{ background:"rgba(10,18,36,0.88)" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime-400/12">
            <ScanSearch className="h-3.5 w-3.5 text-lime-400" />
          </div>
          <div>
            <p className="font-semibold text-white">94% match</p>
            <p className="text-[10px] text-slate-400">Monstera identified</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── 3D Feature card ──────────────────────────────────────────────────────────

function FeatureCard({ f }: { f: Feature }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-80,80], [7,-7]), { stiffness:150, damping:20 });
  const ry = useSpring(useTransform(mx, [-80,80], [-7,7]), { stiffness:150, damping:20 });

  const Icon = f.icon;
  return (
    <motion.div
      ref={cardRef} variants={scaleIn}
      style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d" }}
      onMouseMove={(e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.055] to-white/[0.01] p-6 shadow-xl transition-all duration-300 cursor-default ${f.border} ${f.shadow}`}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${f.accent}`} />
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-[15px] font-semibold text-white">{f.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{f.text}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NeroPlantLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroSY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(heroSY, [0,1], [0,-50]);
  const heroOpacity = useTransform(heroSY, [0,0.75], [1,0]);
  const { scrollYProgress } = useScroll();
  const barScale = useSpring(scrollYProgress, { stiffness:120, damping:30 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setEmailError(true); return; }
    setEmailError(false); setSubmitted(true);
  }, [email]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-white antialiased selection:bg-emerald-400/25">
      <Particles />

      {/* Ambient light layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-teal-500/6 blur-[100px]" />
        <div className="absolute left-0 top-1/2 h-[500px] w-[300px] -translate-y-1/2 rounded-full bg-lime-500/5 blur-[80px]" />
      </div>

      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-[100] h-[2px]" aria-hidden>
        <motion.div style={{ scaleX: barScale }} className="h-full w-full origin-left bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400" />
      </div>

      <BackToTop />

      {/* ── Header ── */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/[0.05] bg-[#030712]/80 shadow-2xl shadow-black/40 backdrop-blur-2xl" : "border-b border-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <motion.button initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5 }}
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            className="group flex items-center gap-3 focus-visible:outline-none" aria-label="NeroPlant — home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-400/45"
              style={{ background:"linear-gradient(135deg,#10b981,#84cc16)" }}>
              <Leaf className="h-4 w-4 text-slate-950" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold tracking-wide text-white">NeroPlant</div>
              <div className="text-[11px] text-slate-500">AI plant care companion</div>
            </div>
          </motion.button>

          <motion.nav initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="hidden items-center gap-1 md:flex">
            {NAV.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white focus-visible:outline-none">
                {label}
              </button>
            ))}
            <div className="ml-3 h-4 w-px bg-white/[0.08]" />
            <button onClick={() => scrollTo("waitlist")}
              className="ml-3 rounded-full px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.03] hover:shadow-emerald-400/35 active:scale-95 focus-visible:outline-none"
              style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>
              Join waitlist
            </button>
          </motion.nav>

          <button onClick={() => setMenuOpen((p) => !p)} aria-expanded={menuOpen} aria-label="Toggle navigation"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.04] hover:text-white focus-visible:outline-none md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav key="mob" initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
              exit={{ opacity:0, height:0 }} transition={{ duration:0.25, ease }}
              className="overflow-hidden border-t border-white/[0.05] bg-[#030712]/95 backdrop-blur-2xl md:hidden">
              <div className="flex flex-col gap-3 px-6 py-5 text-sm">
                {NAV.map(({ id, label }) => (
                  <button key={id} onClick={() => scrollTo(id)}
                    className="text-left text-slate-300 transition hover:text-white focus-visible:outline-none">{label}</button>
                ))}
                <button onClick={() => scrollTo("waitlist")}
                  className="mt-1 w-fit rounded-full px-5 py-2 text-sm font-semibold text-slate-950 focus-visible:outline-none"
                  style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>
                  Join waitlist
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ══ HERO ══ */}
        <div ref={heroRef} className="relative z-10 mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-28">
          <section className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/18 bg-emerald-500/7 px-4 py-2 text-[13px] text-emerald-300 shadow-lg shadow-emerald-500/8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-55" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Now in early access · Limited spots
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.08 }}
                className="mt-6 max-w-xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Give every{" "}
                <span style={{
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundImage:"linear-gradient(135deg,#34d399 0%,#a3e635 50%,#34d399 100%)",
                  backgroundSize:"200% 100%", animation:"shimmer 4s ease infinite",
                }}>plant</span>{" "}a voice.
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.15 }}
                className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                NeroPlant uses AI to identify plants, diagnose problems, and guide your care routine — with AR preview so you know exactly how a plant fits your space.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.22 }}
                className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => scrollTo("waitlist")}
                  className="group relative inline-flex items-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-2xl shadow-emerald-500/25 transition-all hover:scale-[1.03] hover:shadow-emerald-400/45 active:scale-95 focus-visible:outline-none"
                  style={{ background:"linear-gradient(135deg,#34d399 0%,#a3e635 100%)" }}>
                  Get early access
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => scrollTo("how")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/[0.07] hover:border-white/[0.15] active:scale-95 focus-visible:outline-none">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  See how it works
                </button>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.3 }}
                className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#34d399","#10b981","#6ee7b7","#059669","#a7f3d0"].map((c,i) => (
                    <div key={i} className="h-8 w-8 rounded-full ring-2 ring-[#030712]"
                      style={{ background:`linear-gradient(135deg,${c},${c}88)` }} />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-white">2,400+</span> plant lovers already joined
                </p>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.38 }}
                className="mt-10 grid max-w-sm grid-cols-3 gap-4 border-t border-white/[0.05] pt-8">
                {[
                  { v: <Counter target={50} suffix="k+" />, l: "Plants identified" },
                  { v: "4.9★", l: "Beta rating" },
                  { v: <Counter target={2400} suffix="+" />, l: "On waitlist" },
                ].map((s,i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold" style={{ WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundImage:"linear-gradient(135deg,#ffffff,#a3e635)" }}>{s.v}</div>
                    <div className="mt-1 text-xs text-slate-500">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div style={{ y: mockupY }} className="relative z-10 lg:justify-self-end">
              <PhoneMockup />
            </motion.div>
          </section>
        </div>

        {/* Marquee */}
        <div className="relative z-10 mt-20"><Marquee /></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-8">

          {/* ══ FEATURES ══ */}
          <section id="features" className="mt-28">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Features</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Everything your plants need.</h2>
              <p className="mt-4 max-w-lg text-slate-400">AI identification, smart care reminders, AR preview, and disease detection — built for beginners and plant nerds alike.</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
              className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" style={{ perspective:"1200px" }}>
              {FEATURES.map((f) => <FeatureCard key={f.title} f={f} />)}
            </motion.div>
          </section>

          {/* ══ HOW IT WORKS ══ */}
          <section id="how" className="mt-28">
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 backdrop-blur-sm">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/8 blur-2xl" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">How it works</p>
                <h2 className="mt-3 text-2xl font-bold text-white">Three steps to thriving plants.</h2>
                <div className="mt-8 space-y-3">
                  {STEPS.map((s,i) => (
                    <motion.div key={s.title}
                      initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
                      viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.12, ease }}
                      className="group flex gap-4 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-emerald-500/20 hover:bg-emerald-500/4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-slate-950 shadow-lg transition group-hover:scale-110"
                        style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>{i+1}</div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{s.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
                transition={{ delay:0.15 }}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/12 p-8"
                style={{ background:"linear-gradient(135deg,rgba(16,185,129,0.055) 0%,rgba(132,204,22,0.03) 50%,rgba(255,255,255,0.008) 100%)" }}>
                <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-emerald-500/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-lime-500/8 blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/18 bg-emerald-400/7 px-3 py-1.5 text-[12px] font-medium text-emerald-300">
                    <Sparkles className="h-3 w-3" /> Launch ready
                  </div>
                  <h3 className="mt-6 text-3xl font-bold leading-tight text-white">Ready for<br />your launch.</h3>
                  <p className="mt-4 text-slate-400">Swap copy, colors, and mockups, then plug in your waitlist. Deploy to Vercel in minutes.</p>
                  <ul className="mt-6 space-y-3">
                    {["Zero external UI dependencies","Pure Tailwind + Framer Motion","SSR-safe, Vercel-ready","Accessible and mobile-first"].map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-8 flex flex-wrap gap-3">
                  <button onClick={() => scrollTo("waitlist")}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/18 transition hover:scale-[1.02] active:scale-95 focus-visible:outline-none"
                    style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>Get started</button>
                  <button onClick={() => scrollTo("pricing")}
                    className="rounded-full border border-white/[0.08] px-5 py-2.5 text-sm text-white transition hover:bg-white/[0.04] focus-visible:outline-none">View pricing</button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ══ PRICING ══ */}
          <section id="pricing" className="mt-28">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }} className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Pricing</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing.</h2>
              <p className="mx-auto mt-4 max-w-md text-slate-400">Start free. Upgrade when you're ready. No hidden fees, no surprises.</p>
              <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.025] p-1 backdrop-blur-sm">
                {([["Monthly", false], ["Annual", true]] as [string, boolean][]).map(([label, val]) => (
                  <button key={label} onClick={() => setAnnual(val)}
                    aria-pressed={annual === val}
                    className={`flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition focus-visible:outline-none ${annual === val ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-white"}`}>
                    {label}
                    {val && <span className="rounded-full bg-emerald-400/12 px-2 py-0.5 text-[10px] font-bold text-emerald-400">−20%</span>}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-3">
              {PLANS.map((plan) => {
                const price = annual ? plan.price.annual : plan.price.monthly;
                return (
                  <motion.div key={plan.name} variants={scaleIn}
                    className={`relative flex flex-col rounded-2xl p-px ${plan.highlight ? "" : "border border-white/[0.06]"}`}
                    style={plan.highlight ? { background:"linear-gradient(160deg,rgba(52,211,153,0.45) 0%,rgba(163,230,53,0.18) 50%,rgba(255,255,255,0.04) 100%)" } : {}}>
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold text-slate-950 shadow-lg shadow-emerald-500/25"
                        style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>{plan.badge}</div>
                    )}
                    <div className={`flex h-full flex-col rounded-[calc(1rem-1px)] p-6 ${plan.highlight ? "bg-[#071511]" : "bg-[#060a14]"}`}>
                      <p className="text-sm font-semibold text-slate-300">{plan.name}</p>
                      <div className="mt-4 flex items-end gap-1">
                        <span className="text-5xl font-bold tracking-tight text-white">${price}</span>
                        {price > 0 && <span className="mb-1.5 text-sm text-slate-500">/mo</span>}
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                      <ul className="mt-6 flex-1 space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f.text} className="flex items-center gap-2.5 text-sm">
                            {f.ok ? <Check className="h-4 w-4 shrink-0 text-emerald-400" /> : <Minus className="h-4 w-4 shrink-0 text-slate-700" />}
                            <span className={f.ok ? "text-slate-300" : "text-slate-600"}>{f.text}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => scrollTo("waitlist")}
                        className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition focus-visible:outline-none active:scale-95 ${plan.highlight ? "text-slate-950 shadow-lg shadow-emerald-500/22 hover:opacity-90" : "border border-white/[0.08] text-white hover:bg-white/[0.04]"}`}
                        style={plan.highlight ? { background:"linear-gradient(135deg,#34d399,#84cc16)" } : {}}>
                        {plan.cta}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* ══ TESTIMONIALS ══ */}
          <section id="reviews" className="mt-28">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Reviews</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plant lovers already love it.</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
              className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.figure key={t.name} variants={scaleIn}
                  whileHover={{ y:-4, transition:{ duration:0.2 } }}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 backdrop-blur-sm">
                  <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background:`linear-gradient(90deg,transparent,${i===0?"#34d399":i===1?"#a78bfa":"#60a5fa"},transparent)` }} />
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_,j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate-400">"{t.text}"</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.grad} text-[11px] font-bold text-white shadow-lg`} aria-hidden>{t.initials}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </section>

          {/* ══ FAQ ══ */}
          <section id="faq" className="mt-28 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
              className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Common questions.</h2>
              <p className="mt-4 text-slate-400">
                Can't find what you're looking for?{" "}
                <a href="mailto:hello@neroplant.app" className="text-emerald-400 underline underline-offset-4 transition hover:text-emerald-300 focus-visible:outline-none">Email us</a>.
              </p>
              <div className="mt-10 hidden lg:block">
                <div className="h-32 w-32 rounded-full opacity-35 blur-2xl" style={{ background:"radial-gradient(circle,#34d399,transparent)" }} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }} transition={{ delay:0.1 }}>
              {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </motion.div>
          </section>

          {/* ══ WAITLIST CTA ══ */}
          <section id="waitlist" className="mt-28">
            <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-500/12 p-10 text-center md:p-16"
              style={{ background:"linear-gradient(160deg,rgba(16,185,129,0.065) 0%,rgba(132,204,22,0.035) 50%,rgba(255,255,255,0.008) 100%)" }}>
              <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/12 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-lime-500/8 blur-[60px]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
                style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />

              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Waitlist</p>
              <h2 className="relative mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Be first when we launch.</h2>
              <p className="relative mx-auto mt-4 max-w-md text-lg text-slate-400">
                Join 2,400+ plant lovers. Early access includes 3 months of Pro free — no credit card needed.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="ok" role="status" aria-live="polite"
                    initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    className="relative mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-emerald-500/18 bg-emerald-500/7 px-6 py-4 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span>You're on the list! We'll be in touch soon.</span>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    className="relative mx-auto mt-8 max-w-md">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <label htmlFor="wl-email" className="sr-only">Email address</label>
                      <input id="wl-email" type="email" value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="your@email.com" autoComplete="email" aria-invalid={emailError}
                        className={`flex-1 rounded-full border bg-white/[0.035] px-5 py-3 text-sm text-white placeholder-slate-600 outline-none backdrop-blur-sm transition ${emailError ? "border-red-500/35 focus:border-red-400/55" : "border-white/[0.07] focus:border-emerald-500/35 focus:ring-2 focus:ring-emerald-500/8"}`}
                      />
                      <button onClick={handleSubmit}
                        className="group inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/22 transition-all hover:scale-[1.02] hover:shadow-emerald-400/38 active:scale-95 focus-visible:outline-none"
                        style={{ background:"linear-gradient(135deg,#34d399,#84cc16)" }}>
                        Join waitlist
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    {emailError && <p role="alert" className="mt-2 text-left text-xs text-red-400">Please enter a valid email address.</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="relative mt-5 text-xs text-slate-600">
                No spam, ever. Unsubscribe anytime. By joining you agree to our{" "}
                <a href="#" className="underline underline-offset-2 transition hover:text-slate-400 focus-visible:outline-none">Privacy Policy</a>.
              </p>
            </motion.div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.04] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background:"linear-gradient(135deg,#10b981,#84cc16)" }}>
                  <Leaf className="h-4 w-4 text-slate-950" />
                </div>
                <span className="font-semibold text-white">NeroPlant</span>
              </div>
              <p className="mt-4 max-w-[180px] text-sm leading-6 text-slate-500">
                AI-powered plant care for everyone. Identify, preview, and grow with confidence.
              </p>
            </div>
            {[
              { h:"Product", links:["Features","Pricing","Changelog","Roadmap"] },
              { h:"Company", links:["About","Blog","Careers","Press"] },
              { h:"Legal", links:["Privacy","Terms","Cookies","Contact"] },
            ].map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600">{col.h}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-500 transition hover:text-white focus-visible:outline-none">{l}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 text-xs text-slate-600 sm:flex-row">
            <p>© {new Date().getFullYear()} NeroPlant. All rights reserved.</p>
            <p className="flex items-center gap-1.5">Built with <span className="text-emerald-500">♥</span> for plant lovers everywhere</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}