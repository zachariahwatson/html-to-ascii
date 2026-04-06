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
			fontColor="#fff609"
			bgColor="#150c05"
			textShadow="0 0 19px #ff8000, 0 0 26px #ff8000, 0 0 50px #ff8000,0 0 0px #ff4540, 0 0 3px #ff4540, 0 0 7px #ff4540"
		>
			<App />
		</ASCIIProvider>
	</StrictMode>,
)
