import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { INTRO } from "./Chrome";
import { LineMandala } from "./Decor";

const DNA3D = lazy(() => import("./DNA3D"));
const ease = [0.22, 1, 0.36, 1] as const;

function ClientDNA() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <DNA3D />
    </Suspense>
  );
}

/* ---------- small building blocks ---------- */

function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
      <span className="text-accent">({n})</span>
      <span className="h-px w-10 bg-border" />
      {children}
    </div>
  );
}

function LineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  return (
    <motion.div onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/** Indian block-print style border band. */
function BlockPrint({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-6 w-full text-accent ${className}`} aria-hidden>
      <defs>
        <pattern id="bp" width="48" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 2 L34 12 L24 22 L14 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="12" r="2.2" fill="currentColor" />
          <circle cx="0" cy="12" r="1.4" className="fill-gold" />
          <circle cx="48" cy="12" r="1.4" className="fill-gold" />
          <path d="M4 12 Q8 6 12 12 T20 12" fill="none" className="stroke-gold" strokeWidth="0.8" />
          <path d="M28 12 Q32 18 36 12 T44 12" fill="none" className="stroke-gold" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp)" />
    </svg>
  );
}

function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const d = INTRO + 0.2;

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28">
      <div className="kolam-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-secondary/70 blur-3xl" />

      {/* DNA in the middle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: d, duration: 1.6, ease }}
        style={{ opacity: fade }}
        data-cursor="drag"
        className="absolute inset-x-0 top-24 bottom-24 z-10 mx-auto max-w-3xl"
      >
        <ClientDNA />
      </motion.div>

      <div className="relative flex flex-1 flex-col justify-between px-5 pb-8 sm:px-10">
        <div className="flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.6 }}>
            Portfolio <span className="text-accent">©2026</span>
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.7 }} className="text-right">
            B.Tech Biotechnology<br />Year III — India
          </motion.p>
        </div>

        <h1 className="pointer-events-none relative z-20 font-display font-light leading-[0.82] tracking-[-0.04em] text-[19vw] sm:text-[14vw]">
          <motion.span style={{ y: yLeft }} className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: d, duration: 1.2, ease }}>
              Lisa
            </motion.span>
          </motion.span>
          <motion.span style={{ y: yRight }} className="block overflow-hidden text-right">
            <motion.span className="block italic text-accent" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: d + 0.12, duration: 1.2, ease }}>
              Jana
            </motion.span>
          </motion.span>
        </h1>

        <div className="relative z-20 mt-6 grid items-end gap-6 sm:grid-cols-3">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.5, duration: 0.8 }} className="max-w-xs text-base leading-relaxed">
            Biotechnologist in the making, reading life's code with <em className="font-display text-accent">biology</em> and <em className="font-display">AI</em>.
          </motion.p>
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d + 0.8 }}
            className="hidden items-center justify-center gap-3 justify-self-center text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex"
          >
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>↓</motion.span>
            Scroll to explore
          </motion.a>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.9 }} className="flex gap-2 sm:justify-self-end">
            {["Bio", "×", "AI"].map((t) => (
              <span key={t} className="rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-widest">{t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 border-y border-border bg-background/80 py-4 font-display text-lg italic text-muted-foreground backdrop-blur">
        <Marquee items={["Bioinformatics", "Machine learning", "Microbiology", "Bioremediation", "Data science", "Plant biotech", "Wastewater treatment"]} />
      </div>
    </section>
  );
}

/* ---------- About: scroll-scrubbed manifesto ---------- */

function Word({ p, range, children }: { p: MotionValue<number>; range: [number, number]; children: string }) {
  const o = useTransform(p, range, [0.12, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.22em] inline-block">{children}</motion.span>;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  return (
    <motion.span
      onViewportEnter={() => {
        const s = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - s) / 1400);
          setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
      viewport={{ once: true }}
    >
      {v}{suffix}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const text =
    "I'm a third-year biotechnology student from India who feels at home in two labs — one with petri dishes, one with Python. I culture microbes, run assays, and train models on biological data, hoping to help nature heal its soil and water.";
  const words = text.split(" ");

  return (
    <section id="about" className="relative px-5 py-28 sm:px-10 md:py-40">
      <LineMandala className="-top-10 -right-48 size-[34rem] opacity-25" />
      <div className="relative mx-auto max-w-6xl">
        <Kicker n="01">About</Kicker>
        <p ref={ref} className="mt-10 font-display text-2xl font-light leading-[1.3] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {words.map((w, i) => (
            <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </p>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {[
            [3, "rd", "year of B.Tech Biotechnology"],
            [15, "+", "areas of biotech explored"],
            [1, "", "bioinformatics & AI internship"],
          ].map(([n, s, l]) => (
            <div key={l as string} className="bg-background p-8 transition-colors duration-500 hover:bg-secondary">
              <p className="font-display text-5xl font-light text-accent"><Counter to={n as number} suffix={s as string} /></p>
              <p className="mt-3 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mt-20 flex flex-col gap-4 border-l-2 border-accent pl-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="font-display text-2xl italic sm:text-3xl">"Every cell runs code.<br />I want to learn how to read it."</p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Calm, curious, careful</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ---------- Skills: expanding editorial rows ---------- */

const disciplines = [
  { t: "AI & Data", note: "the computational side", items: ["Python", "Machine learning", "Data science", "Bioinformatics with AI", "Data visualisation"] },
  { t: "Lab Sciences", note: "the bench side", items: ["Lab techniques", "Biology techniques", "Biochemistry assays", "Analytical techniques", "Microbiology"] },
  { t: "Applied Biotech", note: "biology at work", items: ["Bioprocess", "Pharmaceutical", "Industrial", "Plant biotech", "Environmental"] },
  { t: "Earth Repair", note: "what I care about most", items: ["Bioremediation", "Wastewater treatment", "Microbial degradation"] },
];

export function Skills() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section id="skills" className="relative bg-muted/60 px-5 py-28 text-foreground sm:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] opacity-60">
              <span className="text-accent">(02)</span><span className="h-px w-10 bg-border" />Disciplines
            </div>
            <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl">
              <LineReveal>Where biology</LineReveal>
              <LineReveal delay={0.1}><em className="text-accent">meets code.</em></LineReveal>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed opacity-70">A mix of wet-lab science, applied biotechnology and computation — hover a row to open it.</p>
        </div>

        <div className="mt-20 border-t border-foreground/10">
          {disciplines.map((d, i) => {
            const open = active === i;
            return (
              <div
                key={d.t}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(open ? null : i)}
                className="group cursor-pointer border-b border-foreground/10"
              >
                <div className="flex items-baseline gap-6 py-7 sm:gap-10">
                  <span className="text-xs text-accent">0{i + 1}</span>
                  <h3 className={`flex-1 font-display text-3xl font-light transition-all duration-500 sm:text-5xl ${open ? "translate-x-2 italic text-accent" : "opacity-80"}`}>{d.t}</h3>
                  <span className="hidden text-sm opacity-50 sm:block">{d.note}</span>
                  <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-2xl">+</motion.span>
                </div>
                <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                  <div className="flex flex-wrap gap-2 pb-8 pl-10 sm:pl-16">
                    {d.items.map((it, k) => (
                      <motion.span
                        key={it}
                        initial={false}
                        animate={{ y: open ? 0 : 10, opacity: open ? 1 : 0 }}
                        transition={{ delay: open ? k * 0.05 : 0 }}
                        className="rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {it}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */

export function Experience() {
  const items = [
    { when: "2026", role: "Bioinformatics & AI Intern", org: "Research lab (placeholder)", text: "Applied machine learning to biological sequence data and built Python analysis pipelines." },
    { when: "2025 — now", role: "Laboratory Trainee", org: "University biotech lab (placeholder)", text: "Hands-on microbiology, biochemical assays and analytical techniques." },
    { when: "2024", role: "Environmental Biotech Study", org: "Coursework (placeholder)", text: "Explored microbial degradation of pollutants and biological wastewater treatment." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-5 py-28 sm:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <Kicker n="03">Journey</Kicker>
          <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl">
            <LineReveal>Steps on</LineReveal>
            <LineReveal delay={0.1}><em className="text-accent">the path.</em></LineReveal>
          </h2>
          <BlockPrint className="mt-10 max-w-[12rem] opacity-70" />
        </div>
        <div ref={ref} className="relative">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
          <motion.div style={{ height: h }} className="absolute top-0 left-0 w-px bg-accent" />
          {items.map((it, i) => (
            <motion.div
              key={it.role}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
              className="group relative pb-16 pl-10 last:pb-0"
            >
              <span className="absolute top-2 -left-[5px] size-[11px] rounded-full border-2 border-background bg-accent transition-transform group-hover:scale-150" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">{it.when}</p>
              <h3 className="mt-3 font-display text-3xl font-light transition-colors group-hover:italic sm:text-4xl">{it.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.org}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects: pinned horizontal scroll ---------- */

const projects = [
  { t: "Protein Function Predictor", d: "A machine learning model that predicts protein function from sequences.", tags: ["Python", "ML"], tone: "bg-secondary", ink: "text-accent" },
  { t: "Microbes vs Pollutants", d: "Screening soil bacteria that break down industrial dyes.", tags: ["Microbiology", "Bioremediation"], tone: "bg-leaf/30", ink: "text-primary" },
  { t: "Wastewater Insights", d: "Analysing microbial communities across treatment stages.", tags: ["Data science", "Environment"], tone: "bg-gold/30", ink: "text-accent" },
  { t: "Gene Expression Explorer", d: "Interactive charts for exploring gene expression data.", tags: ["Pandas", "Visualisation"], tone: "bg-muted", ink: "text-primary" },
];

/** Generative kolam artwork — loops drawn around a dot grid. */
function KolamArt({ seed, className = "" }: { seed: number; className?: string }) {
  const dots: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) dots.push([20 + c * 15, 20 + r * 15]);
  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden>
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" />)}
      {dots.map(([x, y], i) =>
        (i + seed) % 3 === 0 ? (
          <motion.path
            key={`p${i}`}
            d={`M${x - 7} ${y} Q${x} ${y - 10} ${x + 7} ${y} Q${x} ${y + 10} ${x - 7} ${y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: i * 0.03 }}
          />
        ) : null,
      )}
      <motion.circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
    </svg>
  );
}

function ProjectCard({ p, i, className = "" }: { p: (typeof projects)[number]; i: number; className?: string }) {
  return (
    <article data-cursor="view" className={`group flex shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card ${className}`}>
      <div className={`relative flex flex-1 items-center justify-center overflow-hidden ${p.tone}`}>
        <KolamArt seed={i} className={`size-[70%] max-h-80 transition-transform duration-1000 group-hover:rotate-45 group-hover:scale-110 ${p.ink}`} />
        <span className="absolute top-6 left-6 font-display text-7xl font-light text-foreground/15">0{i + 1}</span>
        <span className="absolute top-6 right-6 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">Sample</span>
      </div>
      <div className="flex items-end justify-between gap-6 p-7">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl">{p.t}</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{p.d}</p>
          <div className="mt-4 flex gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 text-xs">{t}</span>)}</div>
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:-rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">→</span>
      </div>
    </article>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useLayoutEffect(() => {
    const m = () => track.current && setDist(track.current.scrollWidth - window.innerWidth);
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const intro = (
    <div className="flex shrink-0 flex-col justify-center md:w-[34vw]">
      <Kicker n="04">Selected work</Kicker>
      <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl">
        Things I've <em className="text-accent">explored.</em>
      </h2>
      <p className="mt-6 max-w-xs text-sm text-muted-foreground">Sample projects — to be replaced with real work.</p>
    </div>
  );

  return (
    <>
      {/* desktop: pinned horizontal */}
      <section id="projects" ref={ref} className="relative hidden h-[360vh] bg-muted/50 md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex h-[70vh] gap-8 pr-[8vw] pl-10">
            {intro}
            {projects.map((p, i) => <ProjectCard key={p.t} p={p} i={i} className="w-[46vw]" />)}
          </motion.div>
          <div className="absolute inset-x-10 bottom-10 h-px bg-border">
            <motion.div style={{ width: bar }} className="h-px bg-accent" />
          </div>
        </div>
      </section>
      {/* mobile: stacked */}
      <section id="projects-m" className="bg-muted/50 px-5 py-24 md:hidden">
        {intro}
        <div className="mt-12 flex flex-col gap-6">
          {projects.map((p, i) => <ProjectCard key={p.t} p={p} i={i} className="h-[30rem]" />)}
        </div>
      </section>
    </>
  );
}

/* ---------- Contact + Footer ---------- */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const links = [
    ["LinkedIn", "https://linkedin.com/in/lisajana"],
    ["GitHub", "https://github.com/codewithlisa"],
    ["X / Twitter", "https://x.com/lisajana"],
  ];
  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-10 md:pt-44">
      <LineMandala className="-bottom-60 left-1/2 size-[44rem] -translate-x-1/2 opacity-25" />
      <div className="relative mx-auto max-w-6xl">
        <Kicker n="05">Contact</Kicker>
        <h2 className="mt-10 font-display text-[12vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[6.5rem]">
          <LineReveal>Let's grow</LineReveal>
          <LineReveal delay={0.1}><em className="text-accent">something.</em></LineReveal>
        </h2>
        <div className="mt-16 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <Magnetic>
            <button
              data-cursor="copy"
              onClick={() => { navigator.clipboard?.writeText("hello@lisajana.in"); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
              className="group flex items-center gap-4 rounded-full bg-primary py-4 pr-4 pl-7 text-base text-primary-foreground transition-colors hover:bg-accent sm:text-xl"
            >
              hello@lisajana.in
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-foreground text-sm text-primary">{copied ? "✓" : "⧉"}</span>
            </button>
          </Magnetic>
          <div className="flex flex-col gap-1">
            {links.map(([n, h]) => (
              <a key={n} href={h} target="_blank" rel="noreferrer" className="group flex items-center gap-3 font-display text-2xl">
                <span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-8" />
                {n}
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-8 sm:px-10">
      <BlockPrint className="mb-8" />
      <div className="flex flex-col justify-between gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex-row">
        <span>© 2026 Lisa Jana</span>
        <span>Made with curiosity in India</span>
        <a href="#home">Back to top ↑</a>
      </div>
      <p className="mt-8 select-none text-center font-display text-[15vw] font-light leading-[0.8] tracking-[-0.04em] text-outline opacity-20">Lisa Jana</p>
    </footer>
  );
}
