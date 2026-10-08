# Lisa Jana — Biotech & AI Portfolio

Personal site for Lisa Jana, a B.Tech Biotechnology student working where biology meets AI, data science, and bioinformatics. One page: a short introduction, a 3D helix, and sections for biography, disciplines, journey, selected work, and contact.

Copy, links, and project cards all live in [`src/content/profile.ts`](src/content/profile.ts). Change that file to update the site. The page reads from it; the components do not hard-code her name, email, or projects.

## The page

Sections run in this order. The names in the nav are the ones visitors see. The hash is the stable id in the markup.

| Nav | Hash | What it holds |
| --- | --- | --- |
| — | `#home` | Name, introduction, and the helix |
| About | `#about` | Biography, three counts, and the quote |
| Disciplines | `#skills` | Practice groups: computation, the bench, applied biotechnology, and earth repair |
| Journey | `#experience` | Roles and studies |
| Work | `#projects` | Selected projects |
| Contact | `#contact` | Email and social links |

Section order, nav labels, and hashes are defined in [`src/components/portfolio/outline.ts`](src/components/portfolio/outline.ts).

The opening sequence shows a short “Sequencing…” count before the page settles. Scrolling is smoothed with Lenis, and that smoothing is skipped when the visitor prefers reduced motion. A custom cursor appears on devices with a fine pointer.

## Requirements

[Bun](https://bun.sh).

## Develop

```sh
bun install
bun run dev
```

Vite prints a local URL. `server.host` is on, so the same server is reachable on the local network.

```sh
bun run build      # production build (Vite + Nitro)
bun run preview    # serve the production build
bun run test       # Vitest, once
bun run typecheck
bun run lint
bun run format
```

`bun run test:watch` reruns tests as files change. `bun run format:check` checks formatting without writing.

## Edit the site

Open [`src/content/profile.ts`](src/content/profile.ts) and change the fields. The page picks them up on the next reload.

| Field | Shows up as |
| --- | --- |
| `name`, `seo` | Title, meta description, and the home heading |
| `hero` | Opening line, chips, and the scrolling marquee |
| `about` | Biography, counts, quote, and signature |
| `skills` | Discipline groups and the items inside each |
| `experience` | Journey entries |
| `projects` | Work cards |
| `email` | Address shown in the nav and on Contact (click copies it) |
| `socials` | Contact links |
| `location`, `timeZone` | Local time in the nav |
| `footer`, `preloader` | Closing line and the opening sequence |

`socials` are the only outbound links. Keep each `href` as a full URL.

To rename a section in the nav, or to change its number, edit [`src/components/portfolio/outline.ts`](src/components/portfolio/outline.ts). Leave the `id` values alone unless you also update every hash that points at them.

The helix is drawn in [`src/components/portfolio/DNA3D.tsx`](src/components/portfolio/DNA3D.tsx). Pair count, rise, twist, and base colors are constants at the top of that file.

## Layout

```
src/
  content/profile.ts          copy and links
  components/portfolio/       the page: sections, nav, helix, motion
  routes/index.tsx            the only page, at /
  routes/__root.tsx           document shell, fonts, 404, and error states
  styles.css                  theme tokens
```

Routes are file-based. See [`src/routes/README.md`](src/routes/README.md) before adding a page. `src/routeTree.gen.ts` is generated; do not edit it.

`src/components/ui/` is the shadcn component set. The portfolio does not import it.

## Stack

- [TanStack Start](https://tanstack.com/start) on Vite, with Nitro for the production server
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for transitions, Lenis for scroll, Three.js (React Three Fiber) for the helix
- Vitest and Testing Library
