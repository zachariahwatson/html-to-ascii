import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.js"),
			formats: ["es"],
		},
		copyPublicDir: false,
		rollupOptions: {
			external: ["react", "react/jsx-runtime"],
		},
	},
})
