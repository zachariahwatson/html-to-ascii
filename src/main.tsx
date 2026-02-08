import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ASCIIProvider } from "./ASCII.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ASCIIProvider>
			<App />
		</ASCIIProvider>
	</StrictMode>,
)
