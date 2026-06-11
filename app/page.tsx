"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox, Sphere, Sparkles, Text, useCursor } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Camera, Leaf, ScanSearch, Sparkles as SparklesIcon, Brain, Layers3, ShieldCheck, Star } from "lucide-react";
import type { Group } from "three";

const features = [
  {
    icon: ScanSearch,
    title: "Instant plant ID",
    text: "Point your camera at any plant and get a fast match with care info.",
  },
  {
    icon: Brain,
    title: "AI care assistant",
    text: "Ask about watering, light, soil, or pests and get simple guidance.",
  },
  {
    icon: Layers3,
    title: "AR plant preview",
    text: "See how a plant looks in your room before you place it.",
  },
  {
    icon: ShieldCheck,
    title: "Healthy habit reminders",
    text: "Get reminders for watering, misting, repotting, and seasonal care.",
  },
];

const steps = [
  {
    title: "Scan",
    text: "Open the camera and identify a plant in seconds.",
  },
  {
    title: "Learn",
    text: "See care tips, diagnosis hints, and growth details.",
  },
  {
    title: "Grow",
    text: "Use AR and reminders to keep every plant thriving.",
  },
];

function FloatingParticles() {
  const points = useMemo(
    () =>
      Array.from({ length: 120 }, () => ({
        position: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
        ] as [number, number, number],
        scale: 0.02 + Math.random() * 0.06,
        speed: 0.5 + Math.random() * 1.2,
      })),
    []
  );

  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial emissive="#7CFFB2" emissiveIntensity={2.2} color="#d8ffe8" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function GlowRing({ y = 0, scale = 1 }: { y?: number; scale?: number }) {
  const ring = useRef<Group>(null);
  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.8;
    ring.current.position.y = y + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
  });

  return (
    <group ref={ring} scale={scale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.015, 16, 100]} />
        <meshStandardMaterial color="#9affbf" emissive="#7CFFB2" emissiveIntensity={2.5} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function PlantModel() {
  const ref = useRef<Group>(null);
  const leaf1 = useRef<Group>(null);
  const leaf2 = useRef<Group>(null);
  const leaf3 = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.28;
      ref.current.position.y = Math.sin(t * 1.2) * 0.08;
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.04;
      ref.current.rotation.z = Math.cos(t * 0.8) * 0.02;
    }
    if (leaf1.current) leaf1.current.rotation.z = Math.sin(t * 1.8) * 0.12 + 0.25;
    if (leaf2.current) leaf2.current.rotation.z = -Math.sin(t * 1.6) * 0.12 - 0.25;
    if (leaf3.current) leaf3.current.rotation.z = Math.sin(t * 1.4) * 0.1;
  });

  return (
    <group ref={ref}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.45}>
        <group position={[0, -0.35, 0]}>
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 1.5, 18]} />
            <meshStandardMaterial color="#4c9f6a" roughness={0.7} metalness={0.05} />
          </mesh>

          <group ref={leaf1} position={[-0.18, 0.05, 0.02]} rotation={[0.45, 0.2, 0.25]}>
            <mesh>
              <Sphere args={[0.42, 32, 32]} scale={[1.2, 0.6, 0.25]}>
                <meshStandardMaterial color="#78f0a4" roughness={0.5} metalness={0.08} />
              </Sphere>
            </mesh>
          </group>

          <group ref={leaf2} position={[0.22, -0.02, -0.02]} rotation={[-0.4, -0.1, -0.3]}>
            <mesh>
              <Sphere args={[0.48, 32, 32]} scale={[1.25, 0.62, 0.25]}>
                <meshStandardMaterial color="#59d984" roughness={0.5} metalness={0.08} />
              </Sphere>
            </mesh>
          </group>

          <group ref={leaf3} position={[0.02, 0.28, 0.05]} rotation={[0.1, 0, 0.1]}>
            <mesh>
              <Sphere args={[0.52, 32, 32]} scale={[1.35, 0.72, 0.28]}>
                <meshStandardMaterial color="#94ffbf" roughness={0.45} metalness={0.1} />
              </Sphere>
            </mesh>
          </group>

          <mesh position={[0, -1.12, 0]}>
            <Sphere args={[0.55, 32, 32]} scale={[1.2, 0.45, 1.2]}>
              <meshStandardMaterial color="#1f2937" roughness={1} metalness={0.02} />
            </Sphere>
          </mesh>

          <mesh position={[0, -1.03, 0]}>
            <cylinderGeometry args={[0.72, 0.9, 0.22, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.95} metalness={0.02} />
          </mesh>

          <GlowRing y={-0.75} scale={1.05} />
          <GlowRing y={0.05} scale={0.85} />
          <FloatingParticles />

          <Html position={[0.85, 0.2, 0]} center style={{ pointerEvents: "none" }}>
            <div className="rounded-full border border-emerald-300/25 bg-black/30 px-3 py-1 text-[11px] text-emerald-100 backdrop-blur">
              AI scan active
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
}

function PlantScene() {
  const [hovered, setHovered] = React.useState(false);
  useCursor(hovered);
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#09111f] via-[#08101c] to-[#040816] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(132,204,22,0.10),transparent_20%)]" />
      <Canvas
        camera={{ position: [0, 0.15, 4.2], fov: 42 }}
        onPointerMove={(e) => {
          pointer.current = { x: e.pointer.x, y: e.pointer.y };
        }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 2]} intensity={1.8} color="#dfffe8" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#6cff9d" />
        <spotLight position={[0, 4, 4]} intensity={3.2} angle={0.35} penumbra={1} color="#9dffb8" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
          <circleGeometry args={[3.2, 64]} />
          <meshStandardMaterial color="#0b1321" roughness={1} metalness={0} />
        </mesh>

        <group rotation={[-0.08 + pointer.current.y * 0.08, pointer.current.x * 0.18, 0]}>
          <PlantModel />
        </group>

        <mesh position={[0, -1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.06, 1.25, 96]} />
          <meshStandardMaterial color="#9dffb8" emissive="#62ff9a" emissiveIntensity={1.8} transparent opacity={0.35} />
        </mesh>

        <Sparkles count={80} scale={5.8} size={2.4} speed={0.35} color="#d8ffe8" />

        <Text position={[0, -1.95, 0]} fontSize={0.16} color="#86efac" anchorX="center" anchorY="middle">
          Plantino AR Preview
        </Text>

        <Suspense fallback={null}>
          <Html position={[0, 1.75, 0]} center style={{ pointerEvents: "none" }}>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur">
              Move the mouse to animate the scene
            </div>
          </Html>
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3 text-xs text-slate-200">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur">
          <div className="font-medium text-white">Healthy</div>
          <div className="mt-1 text-slate-400">Great growth</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur">
          <div className="font-medium text-white">Light</div>
          <div className="mt-1 text-slate-400">Bright indirect</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur">
          <div className="font-medium text-white">Water</div>
          <div className="mt-1 text-slate-400">In 2 days</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default function PlantinoLanding() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);

  return (
    <div className="min-h-screen bg-[#040816] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_70%_15%,rgba(132,204,22,0.10),transparent_20%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">Plantino</div>
            <div className="text-xs text-slate-400">AI plant care companion</div>
          </div>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href="#features" className="text-sm text-slate-300 hover:text-white">Features</a>
          <a href="#how" className="text-sm text-slate-300 hover:text-white">How it works</a>
          <a href="#waitlist" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
            Join waitlist
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pt-14">
        <section className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              AI + AR for plant lovers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Give every plant a voice.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
            >
              Plantino helps people identify plants, preview them in AR, and get smart care guidance in one polished experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#waitlist"
                className="inline-flex items-center rounded-full bg-emerald-400 px-6 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
              >
                Get early access <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
              >
                See features
              </a>
            </motion.div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <Stat value="AI" label="Plant insights" />
              <Stat value="AR" label="Room preview" />
              <Stat value="24/7" label="Care support" />
            </div>
          </motion.div>

          <div className="lg:justify-self-end">
            <PlantScene />
          </div>
        </section>

        <section id="features" className="mt-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Premium feel, clear value, and a 3D-first hero.</h2>
            <p className="mt-4 text-slate-300">
              Built for a modern AI plant product: strong headline, cinematic hero, clear feature cards, and a conversion CTA.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-none backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="how" className="mt-24 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">How it works</p>
            <div className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-400/15 via-white/5 to-white/0 p-8">
            <div className="flex items-center gap-2 text-emerald-300">
              <SparklesIcon className="h-4 w-4" />
              Launch-ready conversion block
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">Ready for your launch.</h3>
            <p className="mt-4 max-w-md text-slate-300">
              Swap the copy, colors, and screenshots, then connect your waitlist or contact form. The 3D scene is fully procedural, so you do not need a model file.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-lg font-semibold text-white">Fast</div>
                <div className="mt-1 text-xs text-slate-400">Lightweight scene</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-lg font-semibold text-white">Clean</div>
                <div className="mt-1 text-xs text-slate-400">Minimal UI</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-lg font-semibold text-white">3D</div>
                <div className="mt-1 text-xs text-slate-400">Animated hero</div>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Waitlist</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Collect emails before launch.</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Use this section for your early access form, Discord link, or app store pre-registration.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                <Star className="h-4 w-4 text-emerald-300" />
                your@email.com
              </div>
              <button className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300">
                Join the waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <Camera className="h-4 w-4" />
                Works great as a launch page, pitch page, or pre-signup page.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
