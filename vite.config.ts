import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import million from "million/compiler"
import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		million.vite({
			auto: {
				threshold: 0.05,
				skip: ["useBadHook", /badVariable/g],
			},
		}),
		react(),
		TanStackRouterVite(),
		svgr(),
		UnoCSS(),
		tailwindcss(),
		VitePWA({ registerType: "autoUpdate" }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
})
