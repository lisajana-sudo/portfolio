import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

/** Small rangoli-style motif: 8 petals around a dot. */
export function Rangoli({ className = "" }: { className?: string }) {
	return (
		<svg viewBox="0 0 40 40" className={className} aria-hidden>
			{Array.from({ length: 8 }).map((_, i) => (
				<path
					key={i}
					transform={`rotate(${i * 45} 20 20)`}
					d="M20 20 C 23 15, 23 9, 20 4 C 17 9, 17 15, 20 20Z"
					className={i % 2 ? "fill-leaf/70" : "fill-accent/80"}
				/>
			))}
			<circle cx="20" cy="20" r="3" className="fill-gold" />
		</svg>
	);
}

export function SectionHead({
	kicker,
	title,
	intro,
}: {
	kicker: string;
	title: ReactNode;
	intro?: string;
}) {
	return (
		<Reveal className="mx-auto mb-12 max-w-2xl md:mb-16 text-center">
			<div className="flex items-center justify-center gap-3 text-sm font-medium text-accent">
				<Rangoli className="size-5" />
				{kicker}
			</div>
			<h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl md:text-6xl">
				{title}
			</h2>
			{intro && (
				<p className="mt-5 text-lg text-muted-foreground">{intro}</p>
			)}
		</Reveal>
	);
}
