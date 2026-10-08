import { describe, expect, it } from "vitest";

import { contact, home, outline, work } from "@/components/portfolio/outline";
import { heroEntrance, navEntrance } from "@/components/portfolio/reveal";
import { randomSequence } from "@/components/portfolio/sequence";

describe("page outline", () => {
	it("gives every section one address", () => {
		const ids = outline.map((section) => section.id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(ids).not.toContain("projects-m");
		for (const section of outline) {
			expect(section.href).toBe(`#${section.id}`);
		}
	});

	it("keeps home off the nav list and points work at one id", () => {
		expect(home.href).toBe("#home");
		expect(outline.map((section) => section.id)).not.toContain(home.id);
		expect(work.href).toBe("#projects");
		expect(contact.href).toBe("#contact");
	});
});

describe("reveal", () => {
	it("lets the hero start before the nav", () => {
		expect(heroEntrance).toBeGreaterThan(0);
		expect(navEntrance).toBeGreaterThan(heroEntrance);
	});
});

describe("sequence", () => {
	it("builds a string of ATGC of the requested length", () => {
		expect(randomSequence(12)).toMatch(/^[ATGC]{12}$/);
	});
});
