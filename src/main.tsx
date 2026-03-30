import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../lib/index.css"
import App from "./App.tsx"
import { ASCIIProvider } from "../lib/providers/ASCIIProvider.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ASCIIProvider
			sl="░"
			sr="░"
			st="░"
			sb="░"
			fontPath="https://raw.githubusercontent.com/zachariahwatson/html-to-ascii/main/CascadiaMono.woff"
		>
			<App />
		</ASCIIProvider>
	</StrictMode>,
)
