const BASES = "ATGC";

export const sequenceSeed = "ATGCGTACCTGA";

export function randomSequence(length = 12) {
	return Array.from(
		{ length },
		() => BASES[Math.floor(Math.random() * BASES.length)],
	).join("");
}
