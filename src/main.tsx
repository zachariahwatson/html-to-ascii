import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import ASCIIProvider from "../lib/providers/ASCIIProvider.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ASCIIProvider>
			<App />
		</ASCIIProvider>
	</StrictMode>,
)
