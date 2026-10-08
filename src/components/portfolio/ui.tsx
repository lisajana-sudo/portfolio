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
