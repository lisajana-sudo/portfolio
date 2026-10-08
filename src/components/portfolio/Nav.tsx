import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { contact, home, outline } from "./outline";
import { navEntrance } from "./reveal";

function IndiaTime() {
	const [t, setT] = useState("");
	useEffect(() => {
		const f = () =>
			setT(
				new Intl.DateTimeFormat("en-IN", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
					timeZone: profile.timeZone,
				}).format(new Date()),
			);
		f();
		const id = setInterval(f, 30000);
		return () => clearInterval(id);
	}, []);
	return (
		<span className="tabular-nums">
			{t
				? `${profile.location} ${t} ${profile.timeZoneLabel}`
				: profile.location}
		</span>
	);
}

export function Nav() {
	const [open, setOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (v) => {
		const prev = scrollY.getPrevious() ?? 0;
		setHidden(v > prev && v > 200);
	});

	return (
		<>
			<motion.header
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: hidden && !open ? -100 : 0, opacity: 1 }}
				transition={{
					delay: hidden ? 0 : navEntrance,
					duration: 0.6,
					ease: [0.22, 1, 0.36, 1],
				}}
				className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-10"
			>
				<div className="flex items-center justify-between gap-6 rounded-full border border-border/70 bg-background/70 py-2 pr-2 pl-5 backdrop-blur-xl">
					<a href={home.href} className="font-display text-xl italic">
						{profile.name.first}
						<span className="text-accent">.</span>
					</a>
					<nav className="hidden items-center gap-1 md:flex">
						{outline.map((section) => (
							<a
								key={section.id}
								href={section.href}
								className="group relative overflow-hidden rounded-full px-4 py-2 text-sm"
							>
								<span className="mr-1 text-[10px] text-muted-foreground">
									{section.n}
								</span>
								<span className="inline-flex h-5 overflow-hidden align-middle leading-5">
									<span className="relative block transition-transform duration-500 group-hover:-translate-y-full">
										{section.nav}
										<span className="absolute top-full left-0 font-display italic text-accent">
											{section.nav}
										</span>
									</span>
								</span>
							</a>
						))}
					</nav>
					<div className="flex items-center gap-4">
						<span className="hidden text-xs text-muted-foreground lg:inline">
							<IndiaTime />
						</span>
						<a
							href={contact.href}
							className="hidden rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-accent sm:inline-block"
						>
							Let's talk
						</a>
						<button
							aria-label="Menu"
							onClick={() => setOpen((o) => !o)}
							className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full bg-primary md:hidden"
						>
							<motion.span
								animate={
									open
										? { rotate: 45, y: 4 }
										: { rotate: 0, y: 0 }
								}
								className="h-px w-4 bg-primary-foreground"
							/>
							<motion.span
								animate={
									open
										? { rotate: -45, y: -3 }
										: { rotate: 0, y: 0 }
								}
								className="h-px w-4 bg-primary-foreground"
							/>
						</button>
					</div>
				</div>
			</motion.header>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ clipPath: "circle(0% at 100% 0%)" }}
						animate={{ clipPath: "circle(150% at 100% 0%)" }}
						exit={{ clipPath: "circle(0% at 100% 0%)" }}
						transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
						className="fixed inset-0 z-40 flex flex-col justify-end bg-primary p-6 pb-12 text-primary-foreground md:hidden"
					>
						{outline.map((section, i) => (
							<motion.a
								key={section.id}
								href={section.href}
								onClick={() => setOpen(false)}
								initial={{ y: 40, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.25 + i * 0.06 }}
								className="flex items-baseline gap-4 border-b border-primary-foreground/15 py-4 font-display text-5xl font-light"
							>
								<span className="text-xs text-gold">
									{section.n}
								</span>
								{section.nav}
							</motion.a>
						))}
						<p className="mt-8 text-sm opacity-60">
							{profile.email}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
