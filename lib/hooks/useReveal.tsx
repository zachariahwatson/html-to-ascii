import { useEffect, useState } from "react"

export function useReveal(grid: string[], speed = 1) {
	const [index, setIndex] = useState(0)
	useEffect(() => {
		let frame: number

		const loop = () => {
			setIndex((i) => {
				if (i >= grid.length) return i
				return i + speed
			})

			frame = requestAnimationFrame(loop)
		}

		loop()

		return () => cancelAnimationFrame(frame)
	}, [grid, speed])

	return grid.slice(0, index)
}
