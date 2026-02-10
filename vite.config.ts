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
			tsconfigPath: resolve(__dirname, "./tsconfig.lib.json"),
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "html-to-ascii",
			fileName: (format) => `index.${format}.js`,
		},
		copyPublicDir: false,
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		sourcemap: true,
		emptyOutDir: true,
		minify: true,
	},
})
