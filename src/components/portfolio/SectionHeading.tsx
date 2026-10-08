import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const titleClass =
	"mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl";

/** Number, label, and an optional title that reveals line by line. */
export function SectionHeading({
	n,
	label,
	lines,
	titleClassName = titleClass,
}: {
	n: string;
	label: ReactNode;
	lines?: ReactNode[];
	titleClassName?: string;
}) {
	return (
		<>
			<div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
				<span className="text-accent">({n})</span>
				<span className="h-px w-10 bg-border" />
				{label}
			</div>
			{lines && lines.length > 0 && (
				<h2 className={titleClassName}>
					{lines.map((line, i) => (
						<span key={i} className="block overflow-hidden">
							<motion.span
								className="block"
								initial={{ y: "110%" }}
								whileInView={{ y: 0 }}
								viewport={{ once: true, margin: "-10%" }}
								transition={{
									duration: 1.1,
									delay: i * 0.1,
									ease,
								}}
							>
								{line}
							</motion.span>
						</span>
					))}
				</h2>
			)}
		</>
	);
}
