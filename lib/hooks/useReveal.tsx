import { useEffect, useRef, useState } from "react"

/** Reveals the grid character by character by a specified duration. */
export function useReveal(grid: string[], duration = 1000) {
	const [index, setIndex] = useState(0)
	const revealed = useRef(false)

	//run reveal animation on mount
	useEffect(() => {
		if (revealed.current) {
			setIndex(grid.length)
			return
		}

		if (duration <= 0 || grid.length === 0) {
			setIndex(grid.length)
			revealed.current = true
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
			} else {
				revealed.current = true
			}
		}

		frame = requestAnimationFrame(loop)

		return () => cancelAnimationFrame(frame)
	}, [grid.length, duration])

	if (revealed.current) return grid
	return index >= grid.length ? grid : grid.slice(0, index)
}
