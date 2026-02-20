import { useEffect, useState } from "react"

export function useReveal(grid: string[], duration = 1000) {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		if (duration <= 0 || grid.length === 0) {
			setIndex(grid.length)
			return
		}

		let frame: number
		const start = performance.now()

		const loop = (now: number) => {
			const progress = (now - start) / duration
			const nextIndex = Math.floor(progress * grid.length)

			setIndex((prev) => {
				if (prev === nextIndex) return prev
				return nextIndex
			})

			if (progress < 1) {
				frame = requestAnimationFrame(loop)
			}
		}

		frame = requestAnimationFrame(loop)

		return () => cancelAnimationFrame(frame)
	}, [grid, duration])

	return index >= grid.length ? grid : grid.slice(0, index)
}
