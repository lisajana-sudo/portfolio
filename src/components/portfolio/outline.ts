/**
 * Visitor-facing sections, in page order.
 * Home sits above the list. Ids stay stable; nav and kicker are the names people see.
 */

export const home = { id: "home", href: "#home" } as const;

export const about = {
	id: "about",
	href: "#about",
	n: "01",
	nav: "About",
	kicker: "About",
} as const;

export const disciplines = {
	id: "skills",
	href: "#skills",
	n: "02",
	nav: "Disciplines",
	kicker: "Disciplines",
} as const;

export const journey = {
	id: "experience",
	href: "#experience",
	n: "03",
	nav: "Journey",
	kicker: "Journey",
} as const;

export const work = {
	id: "projects",
	href: "#projects",
	n: "04",
	nav: "Work",
	kicker: "Selected work",
} as const;

export const contact = {
	id: "contact",
	href: "#contact",
	n: "05",
	nav: "Contact",
	kicker: "Contact",
} as const;

export const outline = [about, disciplines, journey, work, contact] as const;
