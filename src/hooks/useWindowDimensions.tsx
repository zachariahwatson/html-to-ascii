import { useEffect, useState } from "react"

export default function useWindowDimensions() {
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	})
	useEffect(() => {
		const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })

		update() // Set initial size
		window.addEventListener("resize", update)
		return () => window.removeEventListener("resize", update)
	}, [])

	return dimensions
}
