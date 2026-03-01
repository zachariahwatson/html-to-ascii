import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react"
import type { GridData } from "../types/GridData"
import type { Rect } from "../types/Rect"
import { useGridContext } from "../hooks/useGridContext"
import { useReveal } from "../hooks/useReveal"
import type { GridOptions } from "../types/GridOptions"

/** Gets the index from the specified rows and columns. */
const getIndex = (col: number, row: number, grid: GridData) => {
	return row * grid.cols + col
}

/** Gets the override character from the element's class list. */
function getCharOverride(cl: DOMTokenList, option: keyof GridOptions, fallback: string) {
	for (const c of cl) {
		if (c.startsWith(`ascii-${option}-`)) {
			return c.slice(`ascii-${option}-`.length)
		}
	}
	return fallback
}

/** Draws the element and handles intersections. */
const drawRect = ({ rect, grid }: { rect: Rect; grid: GridData }) => {
	const maxCols = grid.cols - 1

	const trim = 1e-6

	//get the bounding rows and cols of the element
	const parentLeft = Math.floor(rect.parentRect.left / grid.fontWidth + trim)
	const leftOffset = Math.floor((rect.rect.left - rect.parentRect.left) / grid.fontWidth + trim)
	const leftCol = parentLeft + leftOffset
	const rightOffset = Math.floor((rect.rect.right - rect.rect.left) / grid.fontWidth + trim)
	const rightCol = leftCol + rightOffset
	const parentTop = Math.floor(rect.parentRect.top / grid.fontHeight + trim)
	const topOffset = Math.floor((rect.rect.top - rect.parentRect.top) / grid.fontHeight + trim)
	const topRow = parentTop + topOffset
	const bottomOffset = Math.floor((rect.rect.bottom - rect.rect.top) / grid.fontHeight + trim)
	const bottomRow = topRow + bottomOffset

	const cl = rect.classList

	const hasASCII = cl.contains("ascii")
	const hasBorder = cl.contains("ascii-border")
	const hasL = cl.contains("ascii-border-l")
	const hasR = cl.contains("ascii-border-r")
	const hasT = cl.contains("ascii-border-t")
	const hasB = cl.contains("ascii-border-b")
	const hasTL = cl.contains("ascii-border-tl")
	const hasTR = cl.contains("ascii-border-tr")
	const hasBR = cl.contains("ascii-border-br")
	const hasBL = cl.contains("ascii-border-bl")
	const hasNoFill = cl.contains("ascii-no-fill")
	const hasText = cl.contains("ascii-text")
	const hasUnderline = cl.contains("ascii-underline")
	const hasShadowTL = cl.contains("ascii-shadow-tl")
	const hasShadowTR = cl.contains("ascii-shadow-tr")
	const hasShadowBR = cl.contains("ascii-shadow-br")
	const hasShadowBL = cl.contains("ascii-shadow-bl")
	const hasShadowL = cl.contains("ascii-shadow-l")
	const hasShadowR = cl.contains("ascii-shadow-r")
	const hasShadowT = cl.contains("ascii-shadow-t")
	const hasShadowB = cl.contains("ascii-shadow-b")

	//get character overrides if there are any
	const lChar = getCharOverride(cl, "l", grid.options.l)
	const rChar = getCharOverride(cl, "r", grid.options.r)
	const tChar = getCharOverride(cl, "t", grid.options.t)
	const bChar = getCharOverride(cl, "b", grid.options.b)
	const tlChar = getCharOverride(cl, "tl", grid.options.tl)
	const trChar = getCharOverride(cl, "tr", grid.options.tr)
	const brChar = getCharOverride(cl, "br", grid.options.br)
	const blChar = getCharOverride(cl, "bl", grid.options.bl)
	const fillChar = getCharOverride(cl, "fill", grid.options.fill)
	const liChar = getCharOverride(cl, "li", grid.options.li)
	const riChar = getCharOverride(cl, "ri", grid.options.ri)
	const tiChar = getCharOverride(cl, "ti", grid.options.ti)
	const biChar = getCharOverride(cl, "bi", grid.options.bi)
	const iChar = getCharOverride(cl, "i", grid.options.i)
	const shadowLChar = getCharOverride(cl, "sl", grid.options.sl)
	const shadowRChar = getCharOverride(cl, "sl", grid.options.sr)
	const shadowTChar = getCharOverride(cl, "sl", grid.options.st)
	const shadowBChar = getCharOverride(cl, "sl", grid.options.sb)

	//determine if element is partially or fully off-screen
	let leftOverflow = leftCol < 0 || leftCol > maxCols
	let rightOverflow = rightCol < 0 || rightCol > maxCols
	let leftShadowOverflow = leftCol < 1 || leftCol > maxCols
	let rightShadowOverflow = rightCol < 1 || rightCol > maxCols

	//TODO: associate grid cells with the local options of the dom element - right now the intersections only look for the default characters

	//HORIZONTALS
	//top
	if (hasT || ((hasASCII || hasBorder) && !hasL && !hasR && !hasB && !hasTL && !hasTR && !hasBR && !hasBL)) {
		for (let col = leftCol + 1; col < rightCol; col++) {
			//hiding overflow so it doesn't wrap around the other side of the screen
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const t = getIndex(col, topRow, grid)

			if (hasShadowT || hasShadowTL || hasShadowTR) {
				grid.grid[t] = tChar
				continue
			}

			switch (grid.grid[t]) {
				case grid.options.l:
				case grid.options.r:
				case grid.options.bl:
				case grid.options.br:
				case grid.options.i:
				case grid.options.li:
				case grid.options.ri:
				case grid.options.ti:
					grid.grid[t] = tiChar
					break
				default:
					grid.grid[t] = tChar
			}
		}
	}
	//top shadows
	if (hasShadowT) {
		for (let col = leftCol + 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, topRow - 1, grid)
			grid.grid[b] = shadowTChar
		}
	}
	if (hasShadowTL) {
		for (let col = leftCol - 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, topRow - 1, grid)
			grid.grid[b] = shadowTChar
		}
	}
	if (hasShadowTR) {
		for (let col = leftCol + 1; col < rightCol + 2; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, topRow - 1, grid)
			grid.grid[b] = shadowTChar
		}
	}

	//bottom
	if (hasB || ((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasTL && !hasTR && !hasBR && !hasBL)) {
		for (let col = leftCol + 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, bottomRow, grid)

			if (hasShadowB || hasShadowBL || hasShadowBR) {
				grid.grid[b] = bChar
				continue
			}

			switch (grid.grid[b]) {
				case grid.options.l:
				case grid.options.r:
				case grid.options.tl:
				case grid.options.tr:
				case grid.options.i:
				case grid.options.li:
				case grid.options.ri:
				case grid.options.bi:
					grid.grid[b] = biChar
					break
				default:
					grid.grid[b] = bChar
			}
		}
	}
	//bottom shadows
	if (hasShadowB) {
		for (let col = leftCol + 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, bottomRow + 1, grid)
			grid.grid[b] = shadowBChar
		}
	}
	if (hasShadowBL) {
		for (let col = leftCol - 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, bottomRow + 1, grid)
			grid.grid[b] = shadowBChar
		}
	}
	if (hasShadowBR) {
		for (let col = leftCol + 1; col < rightCol + 2; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const b = getIndex(col, bottomRow + 1, grid)
			grid.grid[b] = shadowBChar
		}
	}

	//VERTICALS
	//left
	if (!leftOverflow) {
		if (hasL || ((hasASCII || hasBorder) && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBR && !hasBL)) {
			for (let row = topRow + 1; row < bottomRow; row++) {
				const l = getIndex(leftCol, row, grid)

				if (hasShadowL || hasShadowTL || hasShadowBL) {
					grid.grid[l] = lChar
					continue
				}

				switch (grid.grid[l]) {
					case grid.options.t:
					case grid.options.b:
					case grid.options.tr:
					case grid.options.br:
					case grid.options.i:
					case grid.options.ri:
					case grid.options.ti:
					case grid.options.bi:
						grid.grid[l] = liChar
						break
					default:
						grid.grid[l] = lChar
				}
			}
		}
	}
	//left shadows
	if (!leftShadowOverflow) {
		if (hasShadowL) {
			for (let row = topRow + 1; row < bottomRow; row++) {
				const l = getIndex(leftCol - 1, row, grid)
				grid.grid[l] = shadowLChar
			}
		}
		if (hasShadowTL) {
			for (let row = topRow - 1; row < bottomRow; row++) {
				const l = getIndex(leftCol - 1, row, grid)
				grid.grid[l] = shadowLChar
			}
		}
		if (hasShadowBL) {
			for (let row = topRow + 1; row < bottomRow + 2; row++) {
				const l = getIndex(leftCol - 1, row, grid)
				grid.grid[l] = shadowLChar
			}
		}
	}

	//right
	if (!rightOverflow) {
		if (hasR || ((hasASCII || hasBorder) && !hasL && !hasT && !hasB && !hasTL && !hasTR && !hasBR && !hasBL)) {
			for (let row = topRow + 1; row < bottomRow; row++) {
				const r = getIndex(rightCol, row, grid)

				if (hasShadowR || hasShadowTR || hasShadowBR) {
					grid.grid[r] = rChar
					continue
				}

				switch (grid.grid[r]) {
					case grid.options.t:
					case grid.options.b:
					case grid.options.tl:
					case grid.options.bl:
					case grid.options.i:
					case grid.options.ri:
					case grid.options.ti:
					case grid.options.bi:
						grid.grid[r] = riChar
						break
					default:
						grid.grid[r] = rChar
				}
			}
		}
	}
	//right shadows
	if (!rightShadowOverflow) {
		if (hasShadowR) {
			for (let row = topRow + 1; row < bottomRow; row++) {
				const r = getIndex(rightCol + 1, row, grid)
				grid.grid[r] = shadowRChar
			}
		}
		if (hasShadowTR) {
			for (let row = topRow - 1; row < bottomRow; row++) {
				const r = getIndex(rightCol + 1, row, grid)
				grid.grid[r] = shadowRChar
			}
		}
		if (hasShadowBR) {
			for (let row = topRow + 1; row < bottomRow + 2; row++) {
				const r = getIndex(rightCol + 1, row, grid)
				grid.grid[r] = shadowRChar
			}
		}
	}

	//CORNERS
	//top left
	if (
		!leftOverflow &&
		(hasTL ||
			(hasT && hasL) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTR && !hasBR && !hasBL))
	) {
		const tl = getIndex(leftCol, topRow, grid)

		if (hasShadowTL) {
			grid.grid[tl] = tlChar
		} else {
			switch (grid.grid[tl]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.tr:
				case grid.options.bi:
					grid.grid[tl] = biChar
					break
				case grid.options.l:
				case grid.options.r:
				case grid.options.bl:
				case grid.options.ri:
					grid.grid[tl] = riChar
					break
				case grid.options.br:
				case grid.options.i:
				case grid.options.li:
				case grid.options.ti:
					grid.grid[tl] = iChar
					break
				default:
					grid.grid[tl] = tlChar
			}
		}
	}
	//top right
	if (
		!rightOverflow &&
		(hasTR ||
			(hasT && hasR) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasBR && !hasBL))
	) {
		const tr = getIndex(rightCol, topRow, grid)

		if (hasShadowTR) {
			grid.grid[tr] = trChar
		} else {
			switch (grid.grid[tr]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.tl:
				case grid.options.bi:
					grid.grid[tr] = biChar
					break
				case grid.options.l:
				case grid.options.r:
				case grid.options.br:
				case grid.options.li:
					grid.grid[tr] = liChar
					break
				case grid.options.bl:
				case grid.options.i:
				case grid.options.ri:
				case grid.options.ti:
					grid.grid[tr] = iChar
					break
				default:
					grid.grid[tr] = trChar
			}
		}
	}
	//bottom right
	if (
		!rightOverflow &&
		(hasBR ||
			(hasB && hasR) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBL))
	) {
		const br = getIndex(rightCol, bottomRow, grid)

		if (rect.type === "textarea") {
			grid.grid[br] = "▼"
		} else if (hasShadowBR) {
			grid.grid[br] = brChar
		} else {
			switch (grid.grid[br]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.bl:
				case grid.options.ti:
					grid.grid[br] = tiChar
					break
				case grid.options.l:
				case grid.options.r:
				case grid.options.tr:
				case grid.options.li:
					grid.grid[br] = liChar
					break
				case grid.options.tl:
				case grid.options.i:
				case grid.options.ri:
				case grid.options.bi:
					grid.grid[br] = iChar
					break
				default:
					grid.grid[br] = brChar
			}
		}
	}

	//bottom left
	if (
		!leftOverflow &&
		(hasBL ||
			(hasB && hasL) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBR))
	) {
		const bl = getIndex(leftCol, bottomRow, grid)

		if (hasShadowBL) {
			grid.grid[bl] = blChar
		} else {
			switch (grid.grid[bl]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.br:
				case grid.options.ti:
					grid.grid[bl] = tiChar
					break
				case grid.options.l:
				case grid.options.r:
				case grid.options.tl:
				case grid.options.ri:
					grid.grid[bl] = riChar
					break
				case grid.options.tr:
				case grid.options.i:
				case grid.options.li:
				case grid.options.bi:
					grid.grid[bl] = iChar
					break
				default:
					grid.grid[bl] = blChar
			}
		}
	}

	//fill
	if (!hasNoFill) {
		for (let row = topRow + 1; row < bottomRow; row++) {
			for (let col = leftCol + 1; col < rightCol; col++) {
				if (!(col < 0 || col > maxCols)) {
					grid.grid[getIndex(col, row, grid)] = fillChar
				}
			}
		}
	}

	//characters
	if (hasASCII || hasText) {
		if (rect.characters.length > 0) {
			let i = 0
			while (i < rect.characters.length) {
				const rowOffset = Math.round((rect.characters[i].rect.top - rect.rect.top) / grid.fontHeight + trim)
				const row = topRow + rowOffset

				let j = 0
				while (i + j < rect.characters.length) {
					const c = rect.characters[i + j]
					if (c.char === String.fromCharCode(160) || c.char === "\n") {
						j++
						break
					}

					const colOffset = Math.round((c.rect.left - rect.rect.left) / grid.fontWidth + trim)
					const col = leftCol + colOffset

					if (!(col < 0 || col > maxCols)) {
						if (hasUnderline && "abcdefhiklmnorstuvwxyz".includes(c.char)) {
							grid.grid[getIndex(col, row, grid)] = c.char + "\u{332}"
						} else {
							grid.grid[getIndex(col, row, grid)] = c.char
						}
					}

					j++
				}

				i += j
			}
		}
	}
}

/** Returns elements (along with their text) that have any class that starts with "ascii". */
function getElements(ref: React.RefObject<HTMLDivElement | null>): Rect[] {
	if (!ref.current) return []

	const parentRectCache = new Map<HTMLElement, DOMRect>()

	return Array.from(ref.current.querySelectorAll<HTMLElement>('[class*="ascii"]')).map((el) => {
		const parent = el.closest<HTMLElement>(".ascii-parent")

		if (!parent) {
			throw new Error("ASCII element must be inside .ascii-parent")
		}

		let parentRect = parentRectCache.get(parent)

		if (!parentRect) {
			parentRect = parent.getBoundingClientRect()
			parentRectCache.set(parent, parentRect)
		}

		const c: {
			char: string
			rect: DOMRect
		}[] = []

		el.childNodes.forEach((node) => {
			if (node.nodeType !== Node.TEXT_NODE) return
			const textNode = node as Text
			const text = textNode.textContent ?? ""

			for (let i = 0; i < text.length; i++) {
				let _char = text[i]

				//sanitizing whitespace
				if (_char.trim() === "") _char = String.fromCharCode(160)

				const range = document.createRange()
				range.setStart(textNode, i)
				range.setEnd(textNode, i + 1)

				const rect = range.getBoundingClientRect()

				c.push({
					char: _char,
					rect,
				})
			}
		})

		return {
			rect: el.getBoundingClientRect(),
			parentRect,
			characters: c,
			type: el.tagName.toLowerCase(),
			classList: el.classList,
		}
	})
}

const ASCIIGrid = ({
	children,
	gridReveal = true,
	revealDuration = 1000,
}: {
	children: React.ReactNode
	gridReveal?: boolean
	revealDuration?: number
}) => {
	const parentRef = useRef<HTMLDivElement | null>(null)
	const grid = useGridContext()
	const rectsRef = useRef<Rect[]>([])
	const reveal = gridReveal ? useReveal(grid.grid, revealDuration) : grid.grid
	const [, forceRender] = useReducer((x) => x + 1, 0)

	//poll for changes in the DOM
	useLayoutEffect(() => {
		if (!parentRef.current) return

		let frame: number

		const loop = () => {
			rectsRef.current = getElements(parentRef)
			frame = requestAnimationFrame(loop)
			if (frame === 1) {
				console.log(rectsRef.current)
			}
			forceRender()
		}

		loop()

		return () => cancelAnimationFrame(frame)
	}, [])

	// clear canvas, maybe find better way
	for (let i = 0; i < grid.grid.length; i++) {
		grid.grid[i] = String.fromCharCode(160)
	}

	rectsRef.current.forEach((rect) => {
		drawRect({ rect, grid })
	})

	return (
		<div
			ref={parentRef}
			className="leading-none ascii-parent"
			style={{
				fontFamily: grid.options.font,
				fontSize: `${grid.options.fontSize}px`,
				fontWeight: grid.options.fontWeight,
			}}
		>
			<div
				style={{ width: grid.truncWidth, height: grid.truncHeight }}
				//show actual DOM elements if debug is on
				className={
					grid.options.debug
						? "absolute top-0 left-0 bg-none pointer-events-none overflow-hidden select-none z-10"
						: "absolute bg-transparent text-transparent border-transparent shadow-none ring-0 top-0 left-0 bg-none pointer-events-none select-none z-10"
				}
			>
				{children}
			</div>
			{parentRef.current && rectsRef.current && (
				<div className="fixed top-0 left-0 z-0" style={{ width: grid.truncWidth, height: grid.truncHeight }}>
					{/* kind of ugly, but is required to get ASCII art to work (come back to this perhaps) - splits the grid string into rows */}
					{Array.from({ length: grid.rows }, (_, r) => {
						let str = ""
						const start = r * grid.cols
						const end = start + grid.cols

						for (let i = start; i < end; i++) {
							str += reveal[i] ?? String.fromCharCode(160)
						}

						return <div key={r}>{str}</div>
					})}
				</div>
			)}
		</div>
	)
}

export const ASCII = (props: React.ComponentProps<typeof ASCIIGrid>) => {
	const [key, setKey] = useState(0)

	//trick page to refresh to draw a new grid when window is resized (doesn't work on minimize or maximize; fix)
	useEffect(() => {
		const handleResize = () => {
			setKey((k) => k + 1)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return <ASCIIGrid key={key} {...props} />
}
