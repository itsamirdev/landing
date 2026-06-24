"use client";

import Head from "next/head";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type MouseEvent as ReactMouseEvent,
} from "react";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  desc: string;
  tags: string[];
  type: string;
  year: string;
  link: string;
  featured?: boolean;
};

type Experience = {
  role: string;
  company: string;
  period: string;
  place: string;
  bullets: string[];
};

type Writing = {
  title: string;
  excerpt: string;
  link: string;
  tag: string;
};

const PROJECTS: Project[] = [
  {
    id: "nero",
    title: "NeroPlant",
    subtitle: "Founder & Full-Stack Developer",
    metric: "Live",
    metricLabel: "product in active development",
    desc:
      "An intelligent plant care platform with automated scheduling, species-based recommendations, notifications, and a modern React + Django stack.",
    tags: ["React", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    type: "Founder Project",
    year: "2025–Now",
    link: "https://neroplant.com",
    featured: true,
  },
  {
    id: "logiown",
    title: "LogiOwn",
    subtitle: "Backend & DevOps impact",
    metric: "60%",
    metricLabel: "geospatial latency reduced",
    desc:
      "Optimized production logistics APIs with spatial indexing, Redis caching, async Celery processing, CI/CD automation, and production hardening.",
    tags: ["Django", "FastAPI", "PostgreSQL", "Redis", "Docker", "GitLab CI"],
    type: "Production System",
    year: "2024–2026",
    link: "https://github.com/itsamirdev",
  },
  {
    id: "ops",
    title: "CI/CD Delivery Pipeline",
    subtitle: "Deployment automation",
    metric: "Faster",
    metricLabel: "delivery and fewer manual steps",
    desc:
      "Containerized services, configured Nginx, automated deployments, and reduced repetitive operations so the team could move faster with fewer production risks.",
    tags: ["GitLab CI/CD", "Docker", "Nginx", "Linux", "Bash"],
    type: "DevOps",
    year: "2024",
    link: "https://github.com/itsamirdev",
  },
  {
    id: "monitor",
    title: "Monitoring & Reliability",
    subtitle: "Production visibility",
    metric: "Alerting",
    metricLabel: "and issue visibility",
    desc:
      "Used monitoring and error reporting flows to keep production systems observable and maintainable, with emphasis on reliability and response speed.",
    tags: ["Sentry", "Postman", "Testing", "Linux", "Bash"],
    type: "Reliability",
    year: "2024",
    link: "https://github.com/itsamirdev",
  },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Backend & DevOps Engineer",
    company: "LogiOwn",
    period: "Nov 2024 – Mar 2026",
    place: "United Arab Emirates",
    bullets: [
      "Reduced geospatial query latency by 60% through spatial indexing and Redis caching.",
      "Offloaded heavy jobs to Celery workers to keep APIs responsive under load.",
      "Built and maintained CI/CD and deployment flows, improving production delivery and stability.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Danoup Guys",
    period: "Nov 2023 – Jul 2026",
    place: "Iran",
    bullets: [
      "Started in Django and grew into a hybrid development / DevOps role.",
      "Set up GitLab CI/CD, Docker containerization, and stable Nginx-based production environments.",
      "Worked closely with frontend, product, and infrastructure teams across the full delivery cycle.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Hoopad Cloud",
    period: "Jul 2023 – Oct 2023",
    place: "Iran",
    bullets: [
      "Learned how production teams collaborate through sprints, meetings, and shared responsibility.",
      "Built a foundation in backend delivery, communication, and the full software lifecycle.",
    ],
  },
];

const WRITING: Writing[] = [
  {
    title: "Multi thread and multi process in Python",
    excerpt:
      "A practical article for Python developers exploring concurrency, execution models, and when to use each approach.",
    link: "https://itsamirdev.hashnode.dev/multi-thread-and-multi-process-in-python",
    tag: "Python",
  },
  {
    title: "Python Design Patterns",
    excerpt:
      "A clean explanation of design patterns and how they fit into day-to-day software development.",
    link: "https://itsamirdev.hashnode.dev/python-design-patterns",
    tag: "Architecture",
  },
  {
    title: "Linux basic for beginners",
    excerpt:
      "A friendly introduction to Linux essentials for developers and learners entering production workflows.",
    link: "https://itsamirdev.hashnode.dev/linux-basic-for-beginners",
    tag: "Linux",
  },
];

const SKILLS = {
  backend: ["Python", "Django", "DRF", "FastAPI", "Go", "Gin", "Celery", "WebSockets"],
  data: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "SQLite"],
  devops: ["Docker", "Linux", "Nginx", "GitLab CI/CD", "Ansible", "Bash", "Sentry"],
  frontend: ["React", "JavaScript", "HTML/CSS"],
  testing: ["Postman", "Unit testing", "Snapshot testing", "Stress testing", "TDD"],
};

const IMPACT = [
  { value: 60, suffix: "%", label: "query latency reduced", note: "LogiOwn geospatial optimization" },
  { value: 3, suffix: "+", label: "years of production experience", note: "backend and infrastructure work" },
  { value: 20, suffix: "+", label: "projects delivered", note: "production and personal systems" },
  { value: 3, suffix: "+", label: "articles published", note: "technical writing for developers" },
];

const TYPE_COLOR: Record<string, string> = {
  "Founder Project": "#8b5cf6",
  "Production System": "#3b82f6",
  DevOps: "#14b8a6",
  Reliability: "#f59e0b",
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    // Safari fallback
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);
  return reduced;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, trigger, duration]);
  return value;
}

const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconSpark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2 9 14l-6 2 6 2 4 10 4-10 6-2-6-2-4-12Z" />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconCommand = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18a3 3 0 1 0 0-6h12a3 3 0 1 1 0 6H6Z" />
    <path d="M6 12a3 3 0 1 1 0-6h12a3 3 0 1 1 0 6H6Z" />
  </svg>
);

const Navbar: FC<{
  y: number;
  onOpenPalette: () => void;
}> = ({ y, onOpenPalette }) => {
  const [open, setOpen] = useState(false);
  const stuck = y > 20;

  const jump = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={`nav${stuck ? " nav--stuck" : ""}`}>
        <a href="#" className="logo" aria-label="Amirhossein Gholami home">
          AG<span className="logo-dot">.</span>
        </a>

        <div className="nav-links">
          {[
            ["About", "about"],
            ["Experience", "experience"],
            ["Projects", "projects"],
            ["Writing", "writing"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => jump(id)} type="button">
              {label}
            </button>
          ))}

          <button className="nav-ghost" onClick={onOpenPalette} type="button" aria-label="Open command palette">
            <IconCommand />
            <span>Command</span>
            <kbd>⌘K</kbd>
          </button>
        </div>

        <button className="burger" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mob-menu${open ? " mob-menu--open" : ""}`}>
        {[
          ["About", "about"],
          ["Experience", "experience"],
          ["Projects", "projects"],
          ["Writing", "writing"],
          ["Contact", "contact"],
        ].map(([label, id]) => (
          <button key={id} className="mob-link" onClick={() => jump(id)} type="button">
            {label}
          </button>
        ))}
        <button className="mob-link mob-link--palette" onClick={onOpenPalette} type="button">
          <IconCommand />
          Command Palette
        </button>
      </div>
    </>
  );
};

const Hero: FC<{ reducedMotion: boolean; onOpenPalette: () => void }> = ({ reducedMotion, onOpenPalette }) => {
  const [phase, setPhase] = useState(0);
  const phrases = ["Backend systems", "Performance work", "DevOps delivery", "Founder mode"];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setPhase(5);
      return;
    }
    const timings = [0, 450, 900, 1350, 1750];
    const timers = timings.map((t, i) => setTimeout(() => setPhase(i + 1), t));
    const rotate = setInterval(() => setPhraseIndex((i) => (i + 1) % phrases.length), 2200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(rotate);
    };
  }, [reducedMotion, phrases.length]);

  const show = (n: number) => phase >= n;

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className={`hero-topline${show(1) ? " hero-topline--in" : ""}`}>
          <span className="hero-chip">
            <IconSpark />
            Open for remote / UAE roles
          </span>
          <button className="hero-chip hero-chip--ghost" onClick={onOpenPalette} type="button">
            <IconSearch />
            Search sections
          </button>
        </div>

        <div className={`hero-terminal${show(1) ? " hero-terminal--in" : ""}`}>
          <span className="prompt-path">~/amir</span>
          <span className="prompt-arrow">❯</span>
          <span className="prompt-cmd">status</span>
          <span className="prompt-cursor">{show(1) ? "█" : ""}</span>
        </div>

        <h1 className={`hero-name${show(2) ? " hero-name--in" : ""}`}>
          Amirhossein
          <br />
          <span className="hero-name-accent">Gholami</span>
        </h1>

        <div className={`hero-rotator${show(3) ? " hero-rotator--in" : ""}`} aria-live="polite">
          <span className="hero-rotator-label">I build</span>
          <span className="hero-rotator-phrase">{phrases[phraseIndex]}</span>
        </div>

        <p className={`hero-bio${show(4) ? " hero-bio--in" : ""}`}>
          Backend Engineer specializing in performance optimization, production reliability, and systems that are easier to ship, operate, and trust.
          I build with Python, Go, PostgreSQL, Redis, Docker, Linux, and the kind of deployment hygiene that keeps teams calm.
        </p>

        <div className={`hero-metrics${show(5) ? " hero-metrics--in" : ""}`}>
          {[
            ["60%", "query latency reduced"],
            ["3+", "years production experience"],
            ["20+", "projects and systems"],
          ].map(([v, l]) => (
            <div key={l} className="hero-metric">
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>

        <div className={`hero-actions${show(5) ? " hero-actions--in" : ""}`}>
          <a href="#projects" className="btn-primary">
            Featured work
            <span className="btn-icon">
              <IconArrow />
            </span>
          </a>
          <a href="#contact" className="btn-ghost">
            Contact me
          </a>
        </div>

        <div className={`hero-status${show(5) ? " hero-status--in" : ""}`}>
          <span className="status-dot" />
          <span>Currently building NeroPlant and improving production systems</span>
        </div>
      </div>

      <div className={`hero-side${show(5) ? " hero-side--in" : ""}`}>
        <div className="glass-card glass-card--big">
          <div className="glass-card-label">Current focus</div>
          <div className="glass-card-title">Backend + DevOps + Founder</div>
          <p>
            Systems engineering, deployment automation, clean APIs, and product thinking for real users.
          </p>
        </div>
        <div className="glass-card">
          <div className="glass-card-label">Primary stack</div>
          <div className="glass-chip-list">
            {["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker"].map((item) => (
              <span key={item} className="glass-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
};

const CountCard: FC<{
  value: number;
  suffix: string;
  label: string;
  note: string;
  trigger: boolean;
}> = ({ value, suffix, label, note, trigger }) => {
  const n = useCountUp(value, trigger, 1100);
  return (
    <div className="impact-card">
      <div className="impact-value">
        {n}
        <span>{suffix}</span>
      </div>
      <div className="impact-label">{label}</div>
      <div className="impact-note">{note}</div>
    </div>
  );
};

const About: FC = () => {
  const { ref, visible } = useInView(0.15);

  return (
    <section ref={ref} id="about" className={`section reveal${visible ? " reveal--in" : ""}`}>
      <div className="eyebrow">About</div>
      <h2 className="section-title">
        Backend engineer with a founder’s mindset
        <em> and a production-first way of building.</em>
      </h2>

      <div className="about-grid">
        <div className="panel panel--intro">
          <p>
            I build systems that matter in production: APIs, background workers, databases, and deployment flows that stay stable under real load.
            My work combines backend engineering, DevOps, and product awareness.
          </p>
          <p>
            The portfolio is centered on the story from my CV: production backend work at LogiOwn, growing into DevOps responsibilities at Danoup Guys,
            and now building NeroPlant as a founder and full-stack developer. fileciteturn1file0L29-L33 fileciteturn1file0L38-L43 fileciteturn1file0L52-L58
          </p>
          <blockquote>
            <span>“</span>
            Simplicity is the soul of efficiency.
            <cite>— Austin Freeman</cite>
          </blockquote>
        </div>

        <div className="panel panel--meta">
          <div className="meta-row">
            <span>Location</span>
            <strong>Yerevan, Armenia · Remote</strong>
          </div>
          <div className="meta-row">
            <span>Languages</span>
            <strong>English · German · Persian</strong>
          </div>
          <div className="meta-row">
            <span>Focus</span>
            <strong>Backend · DevOps · Product build</strong>
          </div>
          <div className="meta-row">
            <span>Status</span>
            <strong className="meta-status"><span />Open to full remote</strong>
          </div>
        </div>

        <div className="panel panel--stats">
          {IMPACT.map((item) => (
            <CountCard
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              note={item.note}
              trigger={visible}
            />
          ))}
        </div>

        <div className="panel panel--social">
          <a href="https://github.com/itsamirdev" target="_blank" rel="noreferrer" className="social-link">
            <IconGithub />
            <span>itsamirdev</span>
          </a>
          <a href="https://www.linkedin.com/in/amirhossein-gholami1/" target="_blank" rel="noreferrer" className="social-link">
            <IconLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:amirhosseindev@gmail.com" className="social-link">
            <IconMail />
            <span>amirhosseindev@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Timeline: FC = () => {
  const { ref, visible } = useInView(0.12);

  return (
    <section ref={ref} id="experience" className={`section reveal${visible ? " reveal--in" : ""}`}>
      <div className="eyebrow">Experience</div>
      <h2 className="section-title">
        The path from backend work
        <em> to ownership and shipping.</em>
      </h2>

      <div className="timeline">
        {EXPERIENCE.map((item, idx) => (
          <article key={item.company + item.role} className={`timeline-item timeline-item--${idx % 2 === 0 ? "left" : "right"}`}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-head">
                <div>
                  <div className="timeline-company">{item.company}</div>
                  <h3>{item.role}</h3>
                </div>
                <div className="timeline-period">
                  <span>{item.period}</span>
                  <span>{item.place}</span>
                </div>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>
                    <IconCheck />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const SkillGroup: FC<{ title: string; items: string[]; tone?: string }> = ({ title, items, tone }) => (
  <div className="skill-box">
    <div className="skill-box-top">
      <span className="skill-box-title">{title}</span>
      <span className="skill-box-tone" style={tone ? { color: tone } : undefined}>
        {items.length} items
      </span>
    </div>
    <div className="skill-chips">
      {items.map((item) => (
        <span key={item} className="skill-chip">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Stack: FC = () => {
  const { ref, visible } = useInView(0.1);
  return (
    <section ref={ref} id="stack" className={`section reveal${visible ? " reveal--in" : ""}`}>
      <div className="eyebrow">Stack</div>
      <h2 className="section-title">
        Tools I actually use
        <em> in production.</em>
      </h2>

      <div className="stack-grid">
        <SkillGroup title="Backend" items={SKILLS.backend} tone="#60a5fa" />
        <SkillGroup title="Data" items={SKILLS.data} tone="#a78bfa" />
        <SkillGroup title="DevOps" items={SKILLS.devops} tone="#34d399" />
        <SkillGroup title="Frontend" items={SKILLS.frontend} tone="#fbbf24" />
        <SkillGroup title="Testing" items={SKILLS.testing} tone="#fb7185" />
      </div>
    </section>
  );
};

const FeaturedProjectCard: FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, visible } = useInView(0.08);
  const color = TYPE_COLOR[project.type] || "#60a5fa";

  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <article
      ref={ref}
      className={`project-card project-card--${project.featured ? "featured" : "regular"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div ref={cardRef} className="project-inner" onMouseMove={onMouseMove}>
        <div className="project-spotlight" aria-hidden="true" />
        <div className="project-head">
          <span className="project-tag" style={{ color, borderColor: `${color}33`, background: `${color}12` }}>
            {project.type}
          </span>
          <span className="project-year">{project.year}</span>
        </div>

        <div className="project-metric" style={{ color }}>
          <strong>{project.metric}</strong>
          <span>{project.metricLabel}</span>
        </div>

        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.desc}</p>

        <div className="project-tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <span key={tag} className="project-chip">
              {tag}
            </span>
          ))}
        </div>

        <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
          <span>{project.featured ? "Open live project" : "View source"}</span>
          <span className="project-link-icon">
            <IconArrow />
          </span>
        </a>
      </div>
    </article>
  );
};

const Projects: FC = () => {
  const { ref, visible } = useInView(0.1);
  return (
    <section ref={ref} id="projects" className={`section reveal${visible ? " reveal--in" : ""}`}>
      <div className="eyebrow">Projects</div>
      <h2 className="section-title">
        A portfolio built around
        <em> impact, not filler.</em>
      </h2>

      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <FeaturedProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const Writing: FC = () => {
  const { ref, visible } = useInView(0.15);
  return (
    <section ref={ref} id="writing" className={`section reveal${visible ? " reveal--in" : ""}`}>
      <div className="eyebrow">Writing</div>
      <h2 className="section-title">
        Technical articles that
        <em> support the engineering story.</em>
      </h2>

      <div className="writing-grid">
        {WRITING.map((item) => (
          <a key={item.title} href={item.link} target="_blank" rel="noreferrer" className="writing-card">
            <div className="writing-top">
              <span className="writing-tag">{item.tag}</span>
              <span className="writing-arrow">
                <IconArrow />
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

const Contact: FC = () => {
  const { ref, visible } = useInView(0.2);

  return (
    <section ref={ref} id="contact" className={`contact reveal${visible ? " reveal--in" : ""}`}>
      <div className="contact-inner">
        <div className="eyebrow">Contact</div>
        <h2 className="section-title contact-title">
          Let’s build something
          <em> reliable and worth shipping.</em>
        </h2>
        <p className="contact-sub">
          Open to backend, DevOps, and founder-friendly product roles. The best opportunities are the ones where performance, reliability,
          and shipping speed all matter at once.
        </p>

        <div className="contact-actions">
          <a href="mailto:amirhosseindev@gmail.com" className="btn-primary">
            <IconMail />
            Send email
          </a>
          <a href="https://www.linkedin.com/in/amirhossein-gholami1/" target="_blank" rel="noreferrer" className="btn-ghost">
            <IconLinkedin />
            LinkedIn
          </a>
          <a href="https://github.com/itsamirdev" target="_blank" rel="noreferrer" className="btn-ghost">
            <IconGithub />
            GitHub
          </a>
        </div>

        <div className="terminal">
          <div className="terminal-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="terminal-title">contact.sh</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line"><span className="muted">$</span> whoami</div>
            <div className="terminal-line">Backend Engineer · DevOps Engineer · Founder</div>
            <div className="terminal-line"><span className="muted">$</span> stack</div>
            <div className="terminal-line">Python · Django · FastAPI · PostgreSQL · Redis · Docker · Linux</div>
            <div className="terminal-line"><span className="muted">$</span> status</div>
            <div className="terminal-line terminal-line--good">Open to full remote</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Dock: FC<{ onOpenPalette: () => void }> = ({ onOpenPalette }) => (
  <div className="dock" aria-label="Quick actions">
    {[
      ["About", "about"],
      ["Projects", "projects"],
      ["Contact", "contact"],
    ].map(([label, id]) => (
      <button key={label} type="button" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>
        {label}
      </button>
    ))}
    <button type="button" onClick={onOpenPalette}>
      Command
    </button>
  </div>
);

const CommandPalette: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const items = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Stack", href: "#stack" },
      { label: "Writing", href: "#writing" },
      { label: "Contact", href: "#contact" },
      { label: "GitHub", href: "https://github.com/itsamirdev", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/amirhossein-gholami1/", external: true },
    ],
    []
  );

  const jump = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noreferrer");
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="palette-backdrop" role="dialog" aria-modal="true" aria-label="Command palette" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-search">
          <IconSearch />
          <span>Search sections or open links</span>
          <kbd>Esc</kbd>
        </div>
        <div className="palette-list">
          {items.map((item) => (
            <button key={item.label} className="palette-item" type="button" onClick={() => jump(item.href, item.external)}>
              <span>{item.label}</span>
              <span>{item.external ? "↗" : item.href.replace("#", "")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer: FC = () => (
  <footer className="footer">
    <span className="footer-brand">
      AG<span className="logo-dot">.</span>
    </span>
    <span className="footer-copy">© {new Date().getFullYear()} Amirhossein Gholami</span>
    <a href="https://github.com/itsamirdev" target="_blank" rel="noreferrer" className="footer-link">
      github ↗
    </a>
  </footer>
);

export default function Portfolio() {
  const y = useScrollY();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (key === "escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openPalette = () => setPaletteOpen(true);

  return (
    <>
      <Head>
        <title>Amirhossein Gholami — Backend & DevOps Engineer</title>
        <meta
          name="description"
          content="Backend engineer and DevOps-focused developer building production systems with Python, Go, PostgreSQL, Redis, Docker, and Linux."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Amirhossein Gholami — Backend & DevOps Engineer" />
        <meta
          property="og:description"
          content="Production systems, performance optimization, deployment automation, and founder-level product thinking."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        :root{
          --bg:#090d16;
          --bg-2:#0d1321;
          --card:#111827;
          --card-2:#152033;
          --line:rgba(255,255,255,0.08);
          --line-2:rgba(255,255,255,0.14);
          --text:#f8fafc;
          --muted:#94a3b8;
          --muted-2:#cbd5e1;
          --accent:#60a5fa;
          --accent-2:#8b5cf6;
          --accent-3:#22c55e;
          --shadow:0 24px 80px rgba(0,0,0,.35);
          --radius:24px;
          --radius-sm:14px;
          --pad:clamp(18px, 4vw, 72px);
          --display:"Archivo",system-ui,sans-serif;
          --body:"Space Grotesk",system-ui,sans-serif;
          --mono:"JetBrains Mono",monospace;
          --ease:cubic-bezier(.23,1,.32,1);
        }

        *{box-sizing:border-box}
        html{scroll-behavior:smooth;font-size:16px}
        html,body,#__next{min-height:100%;background:#020617}
        body{
          margin:0;
          background:#020617;
          color:var(--text);
          font-family:var(--body);
          -webkit-font-smoothing:antialiased;
          text-rendering:optimizeLegibility;
          overflow-x:hidden;
          position:relative;
        }
        .page-shell{
          position:relative;
          z-index:1;
        }
        .site-bg{
          position:fixed;
          inset:0;
          z-index:0;
          pointer-events:none;
          overflow:hidden;
          background:#020617;
        }
        .site-bg::before{
          content:"";
          position:absolute;
          inset:-20%;
          background:
            radial-gradient(circle at 15% 10%, rgba(96,165,250,.16), transparent 28%),
            radial-gradient(circle at 85% 0%, rgba(139,92,246,.12), transparent 28%),
            radial-gradient(circle at 75% 85%, rgba(34,197,94,.08), transparent 26%);
          filter:blur(24px);
        }
        .site-bg::after{
          content:"";
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size:56px 56px;
          opacity:.22;
          mask-image:linear-gradient(180deg, rgba(0,0,0,.7), transparent 92%);
        }
        a{color:inherit;text-decoration:none}
        button,input{font:inherit}
        ::selection{background:rgba(96,165,250,.35);color:#fff}
        :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}

        .nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:14px var(--pad);
          backdrop-filter:blur(0px);
          border-bottom:1px solid transparent;
          transition:background .25s var(--ease),border-color .25s var(--ease),backdrop-filter .25s var(--ease);
        }
        .nav--stuck{
          background:rgba(9,13,22,.72);
          backdrop-filter:blur(22px) saturate(140%);
          border-bottom-color:var(--line);
        }
        .logo{
          display:inline-flex;align-items:center;gap:2px;
          font-family:var(--display);font-weight:800;letter-spacing:-.04em;
          font-size:20px;
        }
        .logo-dot{color:var(--accent)}
        .nav-links{display:flex;align-items:center;gap:10px}
        .nav-link{
          background:transparent;border:0;color:var(--muted);
          padding:10px 12px;border-radius:12px;cursor:pointer;
          transition:color .18s var(--ease),background .18s var(--ease);
        }
        .nav-link:hover{color:var(--text);background:rgba(255,255,255,.04)}
        .nav-ghost{
          display:inline-flex;align-items:center;gap:8px;
          padding:10px 14px;border:1px solid var(--line-2);border-radius:12px;
          background:rgba(255,255,255,.02);
          color:var(--muted-2);cursor:pointer;
          transition:all .18s var(--ease);
        }
        .nav-ghost:hover{border-color:rgba(96,165,250,.35);color:var(--text);background:rgba(96,165,250,.08)}
        .nav-ghost kbd,.palette-search kbd{
          font-family:var(--mono);font-size:11px;
          padding:4px 6px;border-radius:8px;
          background:rgba(255,255,255,.05);border:1px solid var(--line);
          color:var(--muted-2);
        }
        .burger{
          display:none;flex-direction:column;gap:5px;
          background:transparent;border:0;cursor:pointer;padding:8px;
          min-width:44px;min-height:44px;align-items:center;justify-content:center;
        }
        .burger span{display:block;width:22px;height:1.5px;background:var(--muted-2);border-radius:999px}
        .mob-menu{
          position:fixed;top:64px;left:0;right:0;z-index:99;
          padding:14px var(--pad) 18px;
          background:rgba(9,13,22,.92);
          backdrop-filter:blur(18px);
          border-bottom:1px solid var(--line);
          display:flex;flex-direction:column;gap:8px;
          transform:translateY(-8px);opacity:0;pointer-events:none;
          transition:all .22s var(--ease);
        }
        .mob-menu--open{transform:none;opacity:1;pointer-events:auto}
        .mob-link{
          display:flex;align-items:center;gap:8px;
          min-height:44px;padding:12px 14px;border-radius:14px;
          background:rgba(255,255,255,.03);border:1px solid var(--line);
          color:var(--text);text-align:left;cursor:pointer;
        }
        .mob-link--palette{justify-content:flex-start}

        .hero{
          position:relative;
          min-height:88svh;
          padding:88px var(--pad) 56px;
          display:grid;
          grid-template-columns:1.25fr .75fr;
          gap:28px;
          align-items:center;
          overflow:hidden;
        }
        .hero-inner{
          position:relative;z-index:1;max-width:860px
        }
        .hero-topline{
          display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px;
          opacity:0;transform:translateY(12px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-topline--in{opacity:1;transform:none}
        .hero-chip{
          display:inline-flex;align-items:center;gap:8px;
          min-height:40px;padding:10px 14px;border-radius:999px;
          background:rgba(255,255,255,.04);border:1px solid var(--line);
          color:var(--muted-2);
        }
        .hero-chip--ghost{cursor:pointer;background:rgba(255,255,255,.02)}
        .hero-terminal{
          display:flex;align-items:center;gap:8px;
          margin-bottom:18px;
          font-family:var(--mono);font-size:13px;color:var(--muted);
          opacity:0;transform:translateY(10px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-terminal--in{opacity:1;transform:none}
        .prompt-path{color:#86efac}
        .prompt-cmd{color:var(--accent)}
        .prompt-cursor{color:#dbeafe}
        .hero-name{
          margin:0;
          font-family:var(--display);
          font-size:clamp(54px, 8vw, 106px);
          line-height:.92;
          letter-spacing:-.06em;
          opacity:0;transform:translateY(22px);
          transition:opacity .65s var(--ease),transform .65s var(--ease);
        }
        .hero-name--in{opacity:1;transform:none}
        .hero-name-accent{
          background:linear-gradient(90deg, #dbeafe 0%, #60a5fa 50%, #a78bfa 100%);
          -webkit-background-clip:text;background-clip:text;color:transparent;
        }
        .hero-rotator{
          display:flex;align-items:center;gap:12px;flex-wrap:wrap;
          margin-top:18px;margin-bottom:20px;
          opacity:0;transform:translateY(12px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-rotator--in{opacity:1;transform:none}
        .hero-rotator-label{
          font-family:var(--mono);font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.18em;
        }
        .hero-rotator-phrase{
          font-family:var(--display);font-size:clamp(22px, 2.6vw, 34px);font-weight:700;
          color:var(--text);
        }
        .hero-bio{
          max-width:720px;
          margin:0 0 28px;
          font-size:18px;
          line-height:1.85;
          color:var(--muted-2);
          opacity:0;transform:translateY(12px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-bio--in{opacity:1;transform:none}
        .hero-metrics{
          display:grid;grid-template-columns:repeat(3, minmax(0,1fr));
          gap:12px;margin-bottom:24px;
          opacity:0;transform:translateY(12px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-metrics--in{opacity:1;transform:none}
        .hero-metric{
          padding:16px 18px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid var(--line);
        }
        .hero-metric strong{
          display:block;font-family:var(--display);font-size:28px;letter-spacing:-.04em;margin-bottom:4px;
        }
        .hero-metric span{
          display:block;font-family:var(--mono);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.15em;
        }
        .hero-actions{
          display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px;
          opacity:0;transform:translateY(10px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-actions--in{opacity:1;transform:none}
        .btn-primary,.btn-ghost{
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          min-height:48px;padding:14px 20px;border-radius:14px;cursor:pointer;
          transition:transform .18s var(--ease),border-color .18s var(--ease),background .18s var(--ease),box-shadow .18s var(--ease);
        }
        .btn-primary{
          border:0;background:linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%);
          color:white;font-weight:600;box-shadow:0 18px 40px rgba(96,165,250,.18);
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 22px 50px rgba(96,165,250,.24)}
        .btn-ghost{
          border:1px solid var(--line-2);background:rgba(255,255,255,.02);color:var(--muted-2)
        }
        .btn-ghost:hover{transform:translateY(-2px);border-color:rgba(96,165,250,.35);color:var(--text);background:rgba(96,165,250,.08)}
        .btn-icon{display:inline-flex;transition:transform .18s var(--ease)}
        .btn-primary:hover .btn-icon{transform:translate(2px,-2px)}
        .hero-status{
          display:flex;align-items:center;gap:8px;
          font-family:var(--mono);font-size:12px;color:var(--muted);
          opacity:0;transition:opacity .55s var(--ease);
        }
        .hero-status--in{opacity:1}
        .status-dot{
          width:8px;height:8px;border-radius:999px;background:#22c55e;
          box-shadow:0 0 0 0 rgba(34,197,94,.35);
          animation:pulse 2.4s ease-in-out infinite;
        }
        .hero-side{
          position:relative;z-index:1;
          display:grid;gap:14px;align-self:stretch;align-content:center;grid-template-columns:1fr;
          opacity:0;transform:translateY(18px);
          transition:opacity .55s var(--ease),transform .55s var(--ease);
        }
        .hero-side--in{opacity:1;transform:none}
        .glass-card{
          padding:22px;border-radius:24px;background:rgba(255,255,255,.05);
          border:1px solid var(--line);
          backdrop-filter:blur(12px) saturate(140%);
          box-shadow:var(--shadow);
        }
        .glass-card--big{padding:28px}
        .glass-card-label{
          font-family:var(--mono);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.16em;margin-bottom:8px
        }
        .glass-card-title{
          font-family:var(--display);font-size:28px;line-height:1.05;letter-spacing:-.04em;margin-bottom:10px
        }
        .glass-card p{margin:0;color:var(--muted-2);line-height:1.7}
        .glass-chip-list{display:flex;flex-wrap:wrap;gap:8px}
        .glass-chip{
          display:inline-flex;padding:8px 10px;border-radius:999px;
          background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--muted-2);
          font-size:12px
        }
        .scroll-cue{
          position:absolute;bottom:18px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:8px;
          animation:fadeUp 1s ease 2.2s both;
          pointer-events:none;
        }
        .scroll-line{
          width:1.5px;height:44px;border-radius:999px;
          background:linear-gradient(to bottom, var(--accent), transparent);
          animation:scrollPulse 2s ease-in-out infinite;
        }
        .scroll-cue span{font-family:var(--mono);font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.16em}

        .section{position:relative;padding:88px var(--pad);max-width:1380px;margin:0 auto}
        .section, .contact, .hero{background:transparent}
        .eyebrow{
          display:flex;align-items:center;gap:10px;margin-bottom:16px;
          font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#93c5fd
        }
        .eyebrow::before{content:"";width:24px;height:1.5px;border-radius:999px;background:linear-gradient(90deg, var(--accent), var(--accent-2))}
        .section-title{
          margin:0 0 36px;
          font-family:var(--display);
          font-size:clamp(32px, 5vw, 56px);
          line-height:1.05;
          letter-spacing:-.05em;
        }
        .section-title em{font-style:normal;color:#93c5fd}

        .reveal{opacity:0;transform:translateY(26px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
        .reveal--in{opacity:1;transform:none}

        .about-grid{
          display:grid;grid-template-columns:1.4fr .9fr;gap:14px;
        }
        .panel{
          background:rgba(255,255,255,.04);
          border:1px solid var(--line);
          border-radius:var(--radius);
          box-shadow:var(--shadow);
          overflow:hidden;
        }
        .panel--intro{padding:28px}
        .panel--intro p{margin:0 0 16px;color:var(--muted-2);line-height:1.85;font-size:15px}
        .panel--intro blockquote{
          margin:22px 0 0;padding:18px 18px 16px 18px;border-left:3px solid var(--accent);
          background:rgba(96,165,250,.06);border-radius:0 16px 16px 0;
        }
        .panel--intro blockquote span{display:block;font-family:var(--display);font-size:42px;line-height:.7;color:var(--accent);margin-bottom:4px}
        .panel--intro cite{display:block;margin-top:10px;font-family:var(--mono);font-size:11px;font-style:normal;color:var(--muted)}
        .panel--meta{padding:16px}
        .meta-row{
          display:flex;align-items:center;justify-content:space-between;gap:10px;
          padding:16px 12px;border-bottom:1px solid var(--line);
        }
        .meta-row:last-child{border-bottom:0}
        .meta-row span{color:var(--muted);font-size:12px;font-family:var(--mono);letter-spacing:.12em;text-transform:uppercase}
        .meta-row strong{font-size:14px;font-weight:600;color:var(--text)}
        .meta-status{display:flex;align-items:center;gap:8px;color:#86efac!important}
        .meta-status span{
          width:8px;height:8px;border-radius:999px;background:#22c55e;
          box-shadow:0 0 0 0 rgba(34,197,94,.34);animation:pulse 2.4s ease-in-out infinite;
        }
        .panel--stats{
          grid-column:1 / span 2;
          display:grid;grid-template-columns:repeat(4, minmax(0,1fr));gap:14px;
          background:transparent;border:0;box-shadow:none;
        }
        .impact-card{
          padding:22px;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid var(--line);
          box-shadow:var(--shadow);
        }
        .impact-value{
          font-family:var(--display);font-size:44px;letter-spacing:-.05em;line-height:1;margin-bottom:6px;color:#dbeafe;
        }
        .impact-value span{font-size:.6em}
        .impact-label{font-weight:600;margin-bottom:4px}
        .impact-note{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
        .panel--social{
          grid-column:1 / span 2;
          display:flex;gap:10px;flex-wrap:wrap;padding:16px;background:transparent;border:0;box-shadow:none;
        }
        .social-link{
          display:inline-flex;align-items:center;gap:8px;min-height:44px;
          padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.04);
          border:1px solid var(--line);color:var(--muted-2);transition:all .18s var(--ease)
        }
        .social-link:hover{border-color:rgba(96,165,250,.35);background:rgba(96,165,250,.08);color:var(--text)}

        .timeline{
          position:relative;padding-left:28px;
          display:grid;gap:18px;
        }
        .timeline::before{
          content:"";position:absolute;left:12px;top:2px;bottom:2px;width:2px;border-radius:999px;
          background:linear-gradient(180deg, rgba(96,165,250,.9), rgba(139,92,246,.4), rgba(34,197,94,.55));
        }
        .timeline-item{position:relative}
        .timeline-dot{
          position:absolute;left:-22px;top:24px;width:12px;height:12px;border-radius:999px;background:#60a5fa;
          box-shadow:0 0 0 5px rgba(96,165,250,.16), 0 0 24px rgba(96,165,250,.22);
        }
        .timeline-card{
          background:rgba(255,255,255,.04);
          border:1px solid var(--line);
          border-radius:24px;padding:24px;
          box-shadow:var(--shadow);
        }
        .timeline-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}
        .timeline-company{font-family:var(--mono);font-size:11px;color:#93c5fd;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}
        .timeline-card h3{margin:0;font-family:var(--display);font-size:24px;letter-spacing:-.04em}
        .timeline-period{display:flex;flex-direction:column;gap:4px;align-items:flex-end;color:var(--muted);font-family:var(--mono);font-size:11px;letter-spacing:.08em}
        .timeline-card ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}
        .timeline-card li{display:flex;gap:10px;align-items:flex-start;color:var(--muted-2);line-height:1.7}
        .timeline-card li svg{flex:0 0 auto;margin-top:3px;color:#86efac}

        .stack-grid{
          display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;
        }
        .skill-box{
          background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:24px;padding:22px;
          box-shadow:var(--shadow);
        }
        .skill-box-top{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:16px}
        .skill-box-title{font-family:var(--display);font-size:22px;letter-spacing:-.04em}
        .skill-box-tone{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--muted)}
        .skill-chips{display:flex;flex-wrap:wrap;gap:8px}
        .skill-chip{
          display:inline-flex;align-items:center;min-height:36px;padding:8px 10px;border-radius:999px;
          background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--muted-2);font-size:12px
        }

        .projects-grid{
          display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:20px;margin-top:18px;
        }
        .project-card{
          grid-column:span 6;
          overflow:hidden;border-radius:28px;
          opacity:1;transform:none;
          transition:transform .25s var(--ease),box-shadow .25s var(--ease),border-color .25s var(--ease);
        }
        .project-card--featured{grid-column:span 12}
        .project-inner{
          position:relative;height:100%;min-height:100px;
          padding:28px;border-radius:inherit;background:rgba(255,255,255,.04);
          border:1px solid var(--line);
          box-shadow:var(--shadow);
          overflow:hidden;
          transition:transform .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease);
        }
        .project-card--featured .project-inner{
          min-height:280px;
          display:grid;
          grid-template-columns:1fr .9fr;
          gap:20px;
          align-items:end;
        }
        .project-inner:hover{transform:translateY(-4px);border-color:rgba(96,165,250,.3);box-shadow:0 24px 80px rgba(0,0,0,.45)}
        .project-spotlight{
          position:absolute;inset:0;pointer-events:none;border-radius:inherit;
          background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(96,165,250,.14) 0%, transparent 60%);
          opacity:0;transition:opacity .18s var(--ease)
        }
        .project-inner:hover .project-spotlight{opacity:1}
        .project-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;position:relative;z-index:1}
        .project-tag{
          display:inline-flex;align-items:center;min-height:32px;padding:0 10px;border-radius:999px;border:1px solid;
          font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase
        }
        .project-year{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
        .project-metric{
          display:flex;flex-direction:column;gap:4px;margin-bottom:14px;position:relative;z-index:1;
        }
        .project-metric strong{
          font-family:var(--display);font-size:clamp(38px, 5vw, 72px);line-height:.9;letter-spacing:-.06em
        }
        .project-metric span{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase}
        .project-card h3{
          margin:0 0 8px;position:relative;z-index:1;
          font-family:var(--display);font-size:clamp(24px, 2.4vw, 34px);letter-spacing:-.05em
        }
        .project-subtitle{
          margin:0 0 12px;position:relative;z-index:1;color:#c7d2fe;font-weight:600
        }
        .project-desc{
          margin:0 0 20px;position:relative;z-index:1;color:var(--muted-2);line-height:1.8;
          max-width:58ch
        }
        .project-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;position:relative;z-index:1}
        .project-chip{
          display:inline-flex;min-height:34px;padding:8px 10px;border-radius:999px;
          background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--muted-2);font-size:12px
        }
        .project-link{
          position:relative;z-index:1;
          display:inline-flex;align-items:center;gap:8px;
          color:#dbeafe;font-weight:600
        }
        .project-link-icon{transition:transform .18s var(--ease)}
        .project-inner:hover .project-link-icon{transform:translate(2px,-2px)}

        .writing-grid{
          display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;
        }
        .writing-card{
          display:block;padding:24px;border-radius:24px;
          background:rgba(255,255,255,.04);border:1px solid var(--line);
          box-shadow:var(--shadow);
          transition:transform .2s var(--ease),border-color .2s var(--ease),background .2s var(--ease);
        }
        .writing-card:hover{transform:translateY(-4px);border-color:rgba(96,165,250,.3);background:rgba(96,165,250,.06)}
        .writing-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:20px}
        .writing-tag{
          display:inline-flex;min-height:30px;align-items:center;padding:0 10px;border-radius:999px;
          background:rgba(255,255,255,.05);border:1px solid var(--line);color:#bfdbfe;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em
        }
        .writing-arrow{display:inline-flex;color:#bfdbfe}
        .writing-card h3{margin:0 0 10px;font-family:var(--display);font-size:24px;line-height:1.1;letter-spacing:-.04em}
        .writing-card p{margin:0;color:var(--muted-2);line-height:1.75}

        .contact{
          margin-top:88px;
          background:transparent;
          border-top:1px solid var(--line);
        }
        .contact-inner{max-width:1380px;margin:0 auto;padding:96px var(--pad) 120px}
        .contact-title{margin-bottom:16px}
        .contact-sub{max-width:760px;margin:0 0 34px;color:var(--muted-2);line-height:1.8;font-size:17px}
        .contact-actions{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:34px}
        .terminal{
          max-width:700px;border-radius:24px;overflow:hidden;background:rgba(8,12,20,.9);
          border:1px solid var(--line);box-shadow:var(--shadow)
        }
        .terminal-bar{
          display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(255,255,255,.03);border-bottom:1px solid var(--line)
        }
        .terminal-bar span{width:11px;height:11px;border-radius:999px;display:inline-block}
        .terminal-bar span:nth-child(1){background:#fb7185}
        .terminal-bar span:nth-child(2){background:#fbbf24}
        .terminal-bar span:nth-child(3){background:#34d399}
        .terminal-title{margin-left:8px;font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase}
        .terminal-body{padding:18px 18px 20px;font-family:var(--mono);font-size:13px;line-height:2}
        .terminal-line{color:var(--muted-2)}
        .terminal-line--good{color:#86efac}
        .muted{color:var(--muted)}
        .footer{
          padding:22px var(--pad) 120px;
          display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;
          border-top:1px solid var(--line);color:var(--muted)
        }
        .footer-brand{
          font-family:var(--display);font-weight:800;font-size:18px;letter-spacing:-.04em;color:var(--text)
        }
        .footer-copy{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase}
        .footer-link{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
        .footer-link:hover{color:#93c5fd}

        .dock{
          position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
          z-index:120;display:flex;gap:8px;padding:10px;
          background:rgba(9,13,22,.74);backdrop-filter:blur(18px);
          border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow)
        }
        .dock button{
          min-height:40px;padding:0 14px;border-radius:999px;border:1px solid transparent;
          background:rgba(255,255,255,.04);color:var(--muted-2);cursor:pointer;
          transition:all .18s var(--ease)
        }
        .dock button:hover{color:var(--text);border-color:rgba(96,165,250,.3);background:rgba(96,165,250,.08)}

        .palette-backdrop{
          position:fixed;inset:0;z-index:120;
          display:flex;align-items:flex-start;justify-content:center;
          padding:92px 16px 16px;
          background:rgba(2,6,23,.58);
          backdrop-filter:blur(12px);
        }
        .palette{
          width:min(720px, 100%);
          background:rgba(10,15,26,.92);
          border:1px solid var(--line);
          border-radius:28px;
          box-shadow:0 30px 100px rgba(0,0,0,.5);
          overflow:hidden;
        }
        .palette-search{
          display:flex;align-items:center;gap:10px;
          padding:16px 18px;border-bottom:1px solid var(--line);
          color:var(--muted-2);
        }
        .palette-search span{flex:1}
        .palette-list{padding:10px}
        .palette-item{
          width:100%;
          display:flex;justify-content:space-between;gap:12px;align-items:center;
          min-height:48px;padding:0 14px;border-radius:16px;
          background:transparent;border:1px solid transparent;
          color:var(--text);text-align:left;cursor:pointer;
          transition:background .18s var(--ease),border-color .18s var(--ease);
        }
        .palette-item:hover{background:rgba(96,165,250,.08);border-color:rgba(96,165,250,.24)}
        .palette-item span:last-child{font-family:var(--mono);font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em}

        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.26)}
          50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px)} to { opacity:1; transform:none } }
        @keyframes scrollPulse {
          0% { transform:scaleY(0); transform-origin:top; opacity:.35}
          50% { transform:scaleY(1); transform-origin:top; opacity:1}
          51% { transform:scaleY(1); transform-origin:bottom; opacity:1}
          100% { transform:scaleY(0); transform-origin:bottom; opacity:.35}
        }

        @media (max-width: 1180px){
          .hero{grid-template-columns:1fr;align-items:start}
          .hero-side{grid-template-columns:repeat(2,minmax(0,1fr))}
          .panel--stats,.panel--social{grid-column:1 / -1}
          .about-grid{grid-template-columns:1fr}
          .stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
          .writing-grid{grid-template-columns:1fr}
          .projects-grid{grid-template-columns:1fr}
          .project-card,.project-card--featured{grid-column:span 12}
          .project-card--featured .project-inner{grid-template-columns:1fr}
          .dock{display:none}
        }
        @media (max-width: 768px){
          .nav-links{display:none}
          .burger{display:flex}
          .hero{padding-top:88px;padding-bottom:56px}
          .hero-name{font-size:clamp(46px, 12vw, 68px)}
          .hero-bio{font-size:16px}
          .hero-metrics{grid-template-columns:1fr}
          .hero-side{grid-template-columns:1fr}
          .section{padding-top:84px}
          .timeline{padding-left:20px}
          .timeline::before{left:8px}
          .timeline-dot{left:-16px}
          .timeline-head{flex-direction:column}
          .timeline-period{align-items:flex-start}
          .stack-grid{grid-template-columns:1fr}
          .panel--stats{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media (max-width: 520px){
          .panel--stats{grid-template-columns:1fr}
          .hero-actions,.contact-actions{flex-direction:column}
          .btn-primary,.btn-ghost{width:100%}
          .section-title{font-size:clamp(28px, 8vw, 42px)}
        }
        @media (prefers-reduced-motion: reduce){
          *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
        }
      `}</style>

      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="site-bg" aria-hidden="true" />
      <div className="page-shell" style={{ opacity: mounted ? 1 : 0, transition: "opacity .45s ease" }}>
        <Navbar y={y} onOpenPalette={openPalette} />
        <main id="main">
          <Hero reducedMotion={reducedMotion} onOpenPalette={openPalette} />
          <About />
          <Timeline />
          <Stack />
          <Projects />
          <Writing />
          <Contact />
        </main>
        <Footer />
        <Dock onOpenPalette={openPalette} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </>
  );
}