import path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import browserslist from "browserslist"
import { browserslistToTargets } from "lightningcss"
import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		transformer: "lightningcss",
		lightningcss: {
			targets: browserslistToTargets(browserslist(">= 0.25%")),
		},
	},
	build: {
		cssMinify: "lightningcss",
	},
	plugins: [
		react({
			tsDecorators: true,
			plugins: [],
		}),
		TanStackRouterVite(),
		svgr(),
		UnoCSS(),
		VitePWA({ registerType: "autoUpdate" }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
})
