import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			tsconfigPath: resolve(__dirname, "./tsconfig.lib.json"),
		}),
		cssInjectedByJsPlugin(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "html-to-ascii",
			fileName: (format) => `index.${format}.js`,
		},
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
	},
})
