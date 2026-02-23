import { useEffect, useState } from "react"

export function useWindowDimensions() {
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	})
	useEffect(() => {
		const update = () =>
			setDimensions({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })

		update() // Set initial size
		window.addEventListener("resize", update)
		return () => window.removeEventListener("resize", update)
	}, [])

	return dimensions
}
