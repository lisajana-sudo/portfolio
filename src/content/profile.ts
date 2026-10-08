/**
 * Personal info for the portfolio.
 * Edit this file only — the page reads from here.
 */

export const profile = {
	name: {
		first: "Lisa",
		last: "Jana",
	},
	location: "India",
	timeZone: "Asia/Kolkata",
	timeZoneLabel: "IST",
	email: "hello@lisajana.in",
	year: 2026,
	field: "Biotech × AI",

	seo: {
		title: "Lisa Jana — Biotech & AI Portfolio",
		description:
			"Lisa Jana, B.Tech Biotechnology student from India working where biology meets AI, data science and bioinformatics.",
	},

	hero: {
		badge: "Year III · India",
		lead: "Biotechnologist in the making — reading life's code with",
		emphasis: ["biology", "AI"],
		detail: "B.Tech Biotechnology. Wet lab, bioinformatics, and models that help soil and water recover.",
		chips: ["Bio", "AI", "Earth repair"],
		marquee: [
			"Bioinformatics",
			"Machine learning",
			"Microbiology",
			"Bioremediation",
			"Data science",
			"Plant biotech",
			"Wastewater treatment",
		],
	},

	about: {
		bio: "I'm a third-year biotechnology student from India who feels at home in two labs — one with petri dishes, one with Python. I culture microbes, run assays, and train models on biological data, hoping to help nature heal its soil and water.",
		stats: [
			{
				value: 3,
				suffix: "rd",
				label: "year of B.Tech Biotechnology",
			},
			{ value: 15, suffix: "+", label: "areas of biotech explored" },
			{
				value: 1,
				suffix: "",
				label: "bioinformatics & AI internship",
			},
		],
		quote: ["Every cell runs code.", "I want to learn how to read it."],
		signature: "Calm, curious, careful",
	},

	skills: {
		intro: "A mix of wet-lab science, applied biotechnology and computation — hover a row to open it.",
		groups: [
			{
				title: "AI & Data",
				note: "the computational side",
				items: [
					"Python",
					"Machine learning",
					"Data science",
					"Bioinformatics with AI",
					"Data visualisation",
				],
			},
			{
				title: "Lab Sciences",
				note: "the bench side",
				items: [
					"Lab techniques",
					"Biology techniques",
					"Biochemistry assays",
					"Analytical techniques",
					"Microbiology",
				],
			},
			{
				title: "Applied Biotech",
				note: "biology at work",
				items: [
					"Bioprocess",
					"Pharmaceutical",
					"Industrial",
					"Plant biotech",
					"Environmental",
				],
			},
			{
				title: "Earth Repair",
				note: "what I care about most",
				items: [
					"Bioremediation",
					"Wastewater treatment",
					"Microbial degradation",
				],
			},
		],
	},

	experience: [
		{
			when: "2026",
			role: "Bioinformatics & AI Intern",
			org: "Research lab (placeholder)",
			text: "Applied machine learning to biological sequence data and built Python analysis pipelines.",
		},
		{
			when: "2025 — now",
			role: "Laboratory Trainee",
			org: "University biotech lab (placeholder)",
			text: "Hands-on microbiology, biochemical assays and analytical techniques.",
		},
		{
			when: "2024",
			role: "Environmental Biotech Study",
			org: "Coursework (placeholder)",
			text: "Explored microbial degradation of pollutants and biological wastewater treatment.",
		},
	],

	projects: {
		note: "Sample projects — to be replaced with real work.",
		badge: "Sample",
		items: [
			{
				title: "Protein Function Predictor",
				description:
					"A machine learning model that predicts protein function from sequences.",
				tags: ["Python", "ML"],
			},
			{
				title: "Microbes vs Pollutants",
				description:
					"Screening soil bacteria that break down industrial dyes.",
				tags: ["Microbiology", "Bioremediation"],
			},
			{
				title: "Wastewater Insights",
				description:
					"Analysing microbial communities across treatment stages.",
				tags: ["Data science", "Environment"],
			},
			{
				title: "Gene Expression Explorer",
				description:
					"Interactive charts for exploring gene expression data.",
				tags: ["Pandas", "Visualisation"],
			},
		],
	},

	socials: [
		{ label: "LinkedIn", href: "https://linkedin.com/in/lisajana" },
		{ label: "GitHub", href: "https://github.com/codewithlisa" },
		{ label: "X / Twitter", href: "https://x.com/lisajana" },
	],

	footer: {
		note: "Made with curiosity in India",
	},

	preloader: {
		status: "Sequencing…",
		caption: "reading the code of life",
	},
} as const;

export const fullName = `${profile.name.first} ${profile.name.last}`;
