import lineMandala from "@/assets/mandala-line.svg";

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
