import { motion, useScroll, useTransform } from "motion/react";
import colorMandala from "@/assets/mandala-line.svg";
import lineMandala from "@/assets/mandala-line.svg";

/** Colourful mandala, usually cropped by a section edge (like a peeking half-mandala). */
export function ColorMandala({ className = "" }: { className?: string }) {
	const { scrollYProgress } = useScroll();
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
	return (
		<motion.img
			src={colorMandala}
			alt=""
			aria-hidden
			width={1024}
			height={1024}
			style={{ rotate }}
			initial={{ opacity: 0, scale: 0.85 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
			className={`pointer-events-none absolute select-none opacity-60 ${className}`}
		/>
	);
}

/** Faint tone-on-tone line mandala used as a background watermark. */
export function LineMandala({ className = "" }: { className?: string }) {
	return (
		<img
			src={lineMandala}
			alt=""
			aria-hidden
			loading="lazy"
			width={1024}
			height={1024}
			className={`pointer-events-none absolute max-w-none select-none ${className}`}
		/>
	);
}

/** A row of small mandalas hanging like a garland (toran). */
export function Garland({ count = 7 }: { count?: number }) {
	return (
		<div
			className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center gap-0 sm:-top-14"
			aria-hidden
		>
			{Array.from({ length: count }).map((_, i) => {
				const mid = Math.floor(count / 2);
				const big = i === mid;
				return (
					<motion.img
						key={i}
						src={colorMandala}
						alt=""
						width={1024}
						height={1024}
						initial={{ y: -30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{
							delay: Math.abs(i - mid) * 0.08,
							type: "spring",
							stiffness: 120,
							damping: 12,
						}}
						className={`-mx-2 opacity-70 ${big ? "size-28 sm:size-36" : Math.abs(i - mid) === 1 ? "size-20 sm:size-28" : "size-14 sm:size-20"}`}
					/>
				);
			})}
		</div>
	);
}
