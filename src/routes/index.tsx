import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Cursor, Preloader, SmoothScroll } from "@/components/portfolio/Chrome";
import {
	About,
	Contact,
	Experience,
	Footer,
	Hero,
	Projects,
	Skills,
} from "@/components/portfolio/Sections";

const title = "Lisa Jana — Biotech & AI Portfolio";
const description =
	"Lisa Jana, B.Tech Biotechnology student from India working where biology meets AI, data science and bioinformatics.";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	}),
	component: Index,
});

function Index() {
	return (
		<main className="overflow-x-clip">
			<SmoothScroll />
			<Preloader />
			<Cursor />
			<Nav />
			<Hero />
			<About />
			<Skills />
			<Experience />
			<Projects />
			<Contact />
			<Footer />
		</main>
	);
}
