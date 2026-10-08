import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		host: true,
		allowedHosts: ["darkness-yen-expletive.ngrok-free.dev"],
	},
	plugins: [
		tailwindcss(),
		tanstackStart({
			server: { entry: "server" },
		}),
		viteReact(),
		nitro(),
	],
});
