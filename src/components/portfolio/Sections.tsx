import {
	motion,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from "motion/react";
import {
	lazy,
	Suspense,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type MouseEvent,
	type ReactNode,
} from "react";
import { fullName, profile } from "@/content/profile";
import { LineMandala } from "./Decor";
import { SectionHeading } from "./SectionHeading";
import { about, contact, disciplines, home, journey, work } from "./outline";
import { heroEntrance } from "./reveal";
import { randomSequence, sequenceSeed } from "./sequence";
import { Rangoli } from "./ui";

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

function Magnetic({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
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
		<motion.div
			onMouseMove={move}
			onMouseLeave={() => {
				x.set(0);
				y.set(0);
			}}
			style={{ x: sx, y: sy }}
			className={`inline-block ${className}`}
		>
			{children}
		</motion.div>
	);
}

/** Indian block-print style border band. */
function BlockPrint({ className = "" }: { className?: string }) {
	return (
		<svg className={`h-6 w-full text-accent ${className}`} aria-hidden>
			<defs>
				<pattern
					id="bp"
					width="48"
					height="24"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M24 2 L34 12 L24 22 L14 12 Z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
					/>
					<circle cx="24" cy="12" r="2.2" fill="currentColor" />
					<circle cx="0" cy="12" r="1.4" className="fill-gold" />
					<circle cx="48" cy="12" r="1.4" className="fill-gold" />
					<path
						d="M4 12 Q8 6 12 12 T20 12"
						fill="none"
						className="stroke-gold"
						strokeWidth="0.8"
					/>
					<path
						d="M28 12 Q32 18 36 12 T44 12"
						fill="none"
						className="stroke-gold"
						strokeWidth="0.8"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#bp)" />
		</svg>
	);
}

function Marquee({
	items,
	reverse = false,
	className = "",
}: {
	items: string[];
	reverse?: boolean;
	className?: string;
}) {
	const row = [...items, ...items];
	return (
		<div className={`flex overflow-hidden ${className}`}>
			<motion.div
				className="flex shrink-0 items-center gap-10 pr-10"
				animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
				transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
			>
				{row.map((t, i) => (
					<span
						key={i}
						className="flex items-center gap-10 whitespace-nowrap"
					>
						{t}
						<span className="text-accent">✦</span>
					</span>
				))}
			</motion.div>
		</div>
	);
}

/* ---------- Hero ---------- */

function SequencePulse() {
	const [seq, setSeq] = useState(sequenceSeed);
	useEffect(() => {
		const id = window.setInterval(() => {
			setSeq(randomSequence());
		}, 220);
		return () => window.clearInterval(id);
	}, []);
	return (
		<p className="font-display text-[11px] tracking-[0.42em] text-gold">
			{seq}
		</p>
	);
}

function KolamRing({ className = "" }: { className?: string }) {
	const dots = Array.from({ length: 16 }, (_, i) => {
		const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
		return {
			i,
			x: 100 + Math.cos(a) * 93,
			y: 100 + Math.sin(a) * 93,
			gold: i % 4 === 0,
		};
	});
	return (
		<svg viewBox="0 0 200 200" className={className} aria-hidden>
			<circle
				cx="100"
				cy="100"
				r="78"
				fill="none"
				stroke="currentColor"
				strokeDasharray="1.5 7"
				strokeWidth="0.55"
				className="text-accent/70"
			/>
			<circle
				cx="100"
				cy="100"
				r="93"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.4"
				className="text-foreground/25"
			/>
			{dots.map((d) => (
				<circle
					key={d.i}
					cx={d.x}
					cy={d.y}
					r={d.gold ? 2 : 1.15}
					className={d.gold ? "fill-gold" : "fill-accent/80"}
				/>
			))}
		</svg>
	);
}

export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const d = heroEntrance;

	return (
		<section
			id={home.id}
			ref={ref}
			className="relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden pt-20 lg:h-auto lg:min-h-[100svh] lg:pt-24"
		>
			<div className="kolam-bg pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
			<div className="pointer-events-none absolute top-[18%] right-[8%] size-[36rem] rounded-full bg-secondary/80 blur-3xl" />
			<div className="pointer-events-none absolute bottom-[12%] left-[6%] size-[22rem] rounded-full bg-leaf/15 blur-3xl" />

			<div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-5 pt-1 pb-1 sm:px-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:py-0">
				<div className="relative z-10 shrink-0 lg:max-w-xl">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: d + 0.35, duration: 0.7, ease }}
						className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:gap-3 sm:text-xs sm:tracking-[0.28em]"
					>
						<span className="text-accent">(00)</span>
						<span className="h-px w-5 bg-border sm:w-8" />
						<span className="hidden sm:inline">Introduction</span>
						<span className="rounded-full border border-border bg-background/80 px-2.5 py-1 tracking-[0.16em] sm:px-3 sm:tracking-[0.18em]">
							{profile.hero.badge}
						</span>
					</motion.div>

					<h1 className="mt-3 font-display font-light leading-[0.82] tracking-[-0.045em] text-[clamp(3.15rem,12.5vw,7.6rem)] lg:mt-7">
						<span className="block overflow-hidden">
							<motion.span
								className="block"
								initial={{ y: "110%" }}
								animate={{ y: 0 }}
								transition={{ delay: d, duration: 1.15, ease }}
							>
								{profile.name.first}
							</motion.span>
						</span>
						<span className="-mb-[0.18em] block overflow-hidden pb-[0.18em] pl-[0.08em]">
							<motion.span
								className="block italic text-accent"
								initial={{ y: "110%" }}
								animate={{ y: 0 }}
								transition={{
									delay: d + 0.1,
									duration: 1.15,
									ease,
								}}
							>
								{profile.name.last}
							</motion.span>
						</span>
					</h1>

					<motion.div
						initial={{ opacity: 0, scaleX: 0.4 }}
						animate={{ opacity: 1, scaleX: 1 }}
						transition={{ delay: d + 0.45, duration: 0.8, ease }}
						className="mt-3 flex origin-left items-center gap-3 lg:mt-6"
					>
						<Rangoli className="size-5 lg:size-6" />
						<span className="h-px flex-1 max-w-40 bg-gradient-to-r from-accent/80 to-transparent" />
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: d + 0.5, duration: 0.85, ease }}
						className="mt-3 max-w-md text-sm leading-snug text-foreground/85 sm:mt-7 sm:text-lg sm:leading-relaxed lg:text-xl"
					>
						{profile.hero.lead}{" "}
						{profile.hero.emphasis.map((word, i) => (
							<span key={word}>
								{i > 0 ? " and " : null}
								<em
									className={`font-display italic ${i === 0 ? "text-accent" : ""}`}
								>
									{word}
								</em>
								{i === profile.hero.emphasis.length - 1
									? "."
									: null}
							</span>
						))}
					</motion.p>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: d + 0.7 }}
						className="mt-3 hidden max-w-sm text-sm leading-relaxed text-muted-foreground lg:block"
					>
						{profile.hero.detail}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: d + 0.8, duration: 0.7, ease }}
						className="mt-4 flex flex-wrap items-center gap-2.5 lg:mt-9 lg:gap-3"
					>
						<a
							href={about.href}
							className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-accent lg:px-6 lg:py-3"
						>
							Enter the lab
							<motion.span
								animate={{ y: [0, 3, 0] }}
								transition={{
									duration: 1.6,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								↓
							</motion.span>
						</a>
						<a
							href={contact.href}
							className="inline-flex items-center rounded-full border border-foreground/20 bg-background px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent lg:px-6 lg:py-3"
						>
							Let's talk
						</a>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: d + 1 }}
						className="mt-10 hidden flex-wrap gap-2 lg:flex"
					>
						{profile.hero.chips.map((t) => (
							<span
								key={t}
								className="rounded-full border border-foreground/15 bg-background/85 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
							>
								{t}
							</span>
						))}
					</motion.div>
				</div>

				<motion.div
					style={{ opacity: fade }}
					initial={{ opacity: 0, scale: 0.88 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: d, duration: 1.5, ease }}
					className="relative mx-auto mt-2 flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden lg:mt-0 lg:block lg:flex-none lg:w-full lg:overflow-visible"
				>
					<div className="relative aspect-square h-[min(100%,calc(100vw-2.5rem))] w-auto max-w-full lg:h-auto lg:w-full">
						<LineMandala className="absolute inset-[-10%] size-[120%] opacity-20 lg:inset-[-14%] lg:size-[128%] lg:opacity-25" />
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 72,
								repeat: Infinity,
								ease: "linear",
							}}
							className="absolute inset-0"
						>
							<KolamRing className="size-full text-foreground" />
						</motion.div>
						<div
							data-cursor="drag"
							className="dna-blend absolute inset-0"
						>
							<ClientDNA />
						</div>
						<div className="absolute top-3 right-1 hidden rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md lg:top-6 lg:right-4 lg:block">
							Helix · live
						</div>
						<div className="pointer-events-none absolute inset-x-0 bottom-2 hidden justify-center lg:bottom-4 lg:flex">
							<div className="rounded-full bg-background/75 px-4 py-1.5 text-center backdrop-blur-md">
								<SequencePulse />
								<p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
									Drag to inspect
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			<div className="relative z-20 shrink-0 border-y border-border bg-background/80 py-2.5 font-display text-base italic text-muted-foreground backdrop-blur lg:py-3.5 lg:text-lg">
				<Marquee items={[...profile.hero.marquee]} />
			</div>
		</section>
	);
}

/* ---------- About: scroll-scrubbed manifesto ---------- */

function Word({
	p,
	range,
	children,
}: {
	p: MotionValue<number>;
	range: [number, number];
	children: string;
}) {
	const o = useTransform(p, range, [0.12, 1]);
	return (
		<motion.span
			style={{ opacity: o }}
			className="mr-[0.22em] inline-block"
		>
			{children}
		</motion.span>
	);
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
			{v}
			{suffix}
		</motion.span>
	);
}

export function About() {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.85", "end 0.45"],
	});
	const text = profile.about.bio;
	const words = text.split(" ");

	return (
		<section
			id={about.id}
			className="relative px-5 py-28 sm:px-10 md:py-40"
		>
			<LineMandala className="-top-10 -right-48 size-[34rem] opacity-25" />
			<div className="relative mx-auto max-w-6xl">
				<SectionHeading n={about.n} label={about.kicker} />
				<p
					ref={ref}
					className="mt-10 font-display text-2xl font-light leading-[1.3] tracking-tight sm:text-4xl md:text-[2.75rem]"
				>
					{words.map((w, i) => (
						<Word
							key={i}
							p={scrollYProgress}
							range={[i / words.length, (i + 1) / words.length]}
						>
							{w}
						</Word>
					))}
				</p>

				<div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
					{profile.about.stats.map((stat) => (
						<div
							key={stat.label}
							className="bg-background p-8 transition-colors duration-500 hover:bg-secondary"
						>
							<p className="font-display text-5xl font-light text-accent">
								<Counter to={stat.value} suffix={stat.suffix} />
							</p>
							<p className="mt-3 text-sm text-muted-foreground">
								{stat.label}
							</p>
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
					<p className="font-display text-2xl italic sm:text-3xl">
						"{profile.about.quote[0]}
						<br />
						{profile.about.quote[1]}"
					</p>
					<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
						— {profile.about.signature}
					</p>
				</motion.blockquote>
			</div>
		</section>
	);
}

/* ---------- Skills: expanding editorial rows ---------- */

export function Skills() {
	const [active, setActive] = useState<number | null>(0);
	return (
		<section
			id={disciplines.id}
			className="relative bg-muted/60 px-5 py-28 text-foreground sm:px-10 md:py-40"
		>
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
					<div>
						<SectionHeading
							n={disciplines.n}
							label={disciplines.kicker}
							lines={[
								"Where biology",
								<em className="text-accent">meets code.</em>,
							]}
						/>
					</div>
					<p className="max-w-xs text-sm leading-relaxed opacity-70">
						{profile.skills.intro}
					</p>
				</div>

				<div className="mt-20 border-t border-foreground/10">
					{profile.skills.groups.map((d, i) => {
						const open = active === i;
						return (
							<div
								key={d.title}
								onMouseEnter={() => setActive(i)}
								onClick={() => setActive(open ? null : i)}
								className="group cursor-pointer border-b border-foreground/10"
							>
								<div className="flex items-baseline gap-6 py-7 sm:gap-10">
									<span className="text-xs text-accent">
										0{i + 1}
									</span>
									<h3
										className={`flex-1 font-display text-3xl font-light transition-all duration-500 sm:text-5xl ${open ? "translate-x-2 italic text-accent" : "opacity-80"}`}
									>
										{d.title}
									</h3>
									<span className="hidden text-sm opacity-50 sm:block">
										{d.note}
									</span>
									<motion.span
										animate={{ rotate: open ? 45 : 0 }}
										className="text-2xl"
									>
										+
									</motion.span>
								</div>
								<motion.div
									initial={false}
									animate={{
										height: open ? "auto" : 0,
										opacity: open ? 1 : 0,
									}}
									transition={{ duration: 0.5, ease }}
									className="overflow-hidden"
								>
									<div className="flex flex-wrap gap-2 pb-8 pl-10 sm:pl-16">
										{d.items.map((it, k) => (
											<motion.span
												key={it}
												initial={false}
												animate={{
													y: open ? 0 : 10,
													opacity: open ? 1 : 0,
												}}
												transition={{
													delay: open ? k * 0.05 : 0,
												}}
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
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.7", "end 0.6"],
	});
	const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<section
			id={journey.id}
			className="relative px-5 py-28 sm:px-10 md:py-40"
		>
			<div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.6fr]">
				<div className="md:sticky md:top-32 md:self-start">
					<SectionHeading
						n={journey.n}
						label={journey.kicker}
						lines={[
							"Steps on",
							<em className="text-accent">the path.</em>,
						]}
					/>
					<BlockPrint className="mt-10 max-w-[12rem] opacity-70" />
				</div>
				<div ref={ref} className="relative">
					<div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
					<motion.div
						style={{ height: h }}
						className="absolute top-0 left-0 w-px bg-accent"
					/>
					{profile.experience.map((it, i) => (
						<motion.div
							key={it.role}
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-15%" }}
							transition={{
								duration: 0.9,
								delay: i * 0.05,
								ease,
							}}
							className="group relative pb-16 pl-10 last:pb-0"
						>
							<span className="absolute top-2 -left-[5px] size-[11px] rounded-full border-2 border-background bg-accent transition-transform group-hover:scale-150" />
							<p className="text-xs uppercase tracking-[0.3em] text-accent">
								{it.when}
							</p>
							<h3 className="mt-3 font-display text-3xl font-light transition-colors group-hover:italic sm:text-4xl">
								{it.role}
							</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								{it.org}
							</p>
							<p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
								{it.text}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ---------- Projects: pinned horizontal scroll ---------- */

const projectTones = [
	{ tone: "bg-secondary", ink: "text-accent" },
	{ tone: "bg-leaf/30", ink: "text-primary" },
	{ tone: "bg-gold/30", ink: "text-accent" },
	{ tone: "bg-muted", ink: "text-primary" },
] as const;

/** Generative kolam artwork — loops drawn around a dot grid. */
function KolamArt({
	seed,
	className = "",
}: {
	seed: number;
	className?: string;
}) {
	const dots: [number, number][] = [];
	for (let r = 0; r < 5; r++)
		for (let c = 0; c < 5; c++) dots.push([20 + c * 15, 20 + r * 15]);
	return (
		<svg viewBox="0 0 110 110" className={className} aria-hidden>
			{dots.map(([x, y], i) => (
				<circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" />
			))}
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
			<motion.circle
				cx="50"
				cy="50"
				r="44"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.5"
				strokeDasharray="2 3"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 2 }}
			/>
		</svg>
	);
}

function ProjectCard({
	p,
	i,
	className = "",
}: {
	p: (typeof profile.projects.items)[number];
	i: number;
	className?: string;
}) {
	const look = projectTones[i % projectTones.length] ?? projectTones[0];
	return (
		<article
			data-cursor="view"
			className={`group flex shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card ${className}`}
		>
			<div
				className={`relative flex flex-1 items-center justify-center overflow-hidden ${look.tone}`}
			>
				<KolamArt
					seed={i}
					className={`size-[70%] max-h-80 transition-transform duration-1000 group-hover:rotate-45 group-hover:scale-110 ${look.ink}`}
				/>
				<span className="absolute top-6 left-6 font-display text-7xl font-light text-foreground/15">
					0{i + 1}
				</span>
				<span className="absolute top-6 right-6 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
					{profile.projects.badge}
				</span>
			</div>
			<div className="flex items-end justify-between gap-6 p-7">
				<div>
					<h3 className="font-display text-2xl sm:text-3xl">
						{p.title}
					</h3>
					<p className="mt-2 max-w-sm text-sm text-muted-foreground">
						{p.description}
					</p>
					<div className="mt-4 flex gap-2">
						{p.tags.map((t) => (
							<span
								key={t}
								className="rounded-full border border-border px-3 py-1 text-xs"
							>
								{t}
							</span>
						))}
					</div>
				</div>
				<span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:-rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">
					→
				</span>
			</div>
		</article>
	);
}

export function Projects() {
	const ref = useRef<HTMLElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const [dist, setDist] = useState(0);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});
	const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
	const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	useLayoutEffect(() => {
		const m = () =>
			track.current &&
			setDist(track.current.scrollWidth - window.innerWidth);
		m();
		window.addEventListener("resize", m);
		return () => window.removeEventListener("resize", m);
	}, []);

	const intro = (
		<div className="flex shrink-0 flex-col justify-center md:w-[34vw]">
			<SectionHeading
				n={work.n}
				label={work.kicker}
				lines={[
					<>
						Things I've <em className="text-accent">explored.</em>
					</>,
				]}
			/>
			<p className="mt-6 max-w-xs text-sm text-muted-foreground">
				{profile.projects.note}
			</p>
		</div>
	);

	return (
		<div id={work.id}>
			{/* desktop: pinned horizontal */}
			<section
				ref={ref}
				className="relative hidden h-[360vh] bg-muted/50 md:block"
			>
				<div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
					<motion.div
						ref={track}
						style={{ x }}
						className="flex h-[70vh] gap-8 pr-[8vw] pl-10"
					>
						{intro}
						{profile.projects.items.map((p, i) => (
							<ProjectCard
								key={p.title}
								p={p}
								i={i}
								className="w-[46vw]"
							/>
						))}
					</motion.div>
					<div className="absolute inset-x-10 bottom-10 h-px bg-border">
						<motion.div
							style={{ width: bar }}
							className="h-px bg-accent"
						/>
					</div>
				</div>
			</section>
			{/* mobile: stacked */}
			<section className="bg-muted/50 px-5 py-24 md:hidden">
				{intro}
				<div className="mt-12 flex flex-col gap-6">
					{profile.projects.items.map((p, i) => (
						<ProjectCard
							key={p.title}
							p={p}
							i={i}
							className="h-[30rem]"
						/>
					))}
				</div>
			</section>
		</div>
	);
}

/* ---------- Contact + Footer ---------- */

export function Contact() {
	const [copied, setCopied] = useState(false);
	return (
		<section
			id={contact.id}
			className="relative overflow-hidden px-5 pt-32 pb-16 sm:px-10 md:pt-44"
		>
			<LineMandala className="-bottom-60 left-1/2 size-[44rem] -translate-x-1/2 opacity-25" />
			<div className="relative mx-auto max-w-6xl">
				<SectionHeading
					n={contact.n}
					label={contact.kicker}
					titleClassName="mt-10 font-display text-[12vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[6.5rem]"
					lines={[
						"Let's grow",
						<em className="text-accent">something.</em>,
					]}
				/>
				<div className="mt-16 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
					<Magnetic>
						<button
							data-cursor="copy"
							onClick={() => {
								navigator.clipboard?.writeText(profile.email);
								setCopied(true);
								setTimeout(() => setCopied(false), 1600);
							}}
							className="group flex items-center gap-4 rounded-full bg-primary py-4 pr-4 pl-7 text-base text-primary-foreground transition-colors hover:bg-accent sm:text-xl"
						>
							{profile.email}
							<span className="flex size-10 items-center justify-center rounded-full bg-primary-foreground text-sm text-primary">
								{copied ? "✓" : "⧉"}
							</span>
						</button>
					</Magnetic>
					<div className="flex flex-col gap-1">
						{profile.socials.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noreferrer"
								className="group flex items-center gap-3 font-display text-2xl"
							>
								<span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-8" />
								{link.label}
								<span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
									↗
								</span>
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
				<span>
					© {profile.year} {fullName}
				</span>
				<span>{profile.footer.note}</span>
				<a href={home.href}>Back to top ↑</a>
			</div>
			<p className="mt-8 select-none text-center font-display text-[15vw] font-light leading-[0.8] tracking-[-0.04em] text-outline opacity-20">
				{fullName}
			</p>
		</footer>
	);
}
