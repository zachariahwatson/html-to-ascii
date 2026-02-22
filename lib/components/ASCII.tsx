import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react"
import type { GridData } from "../types/GridData"
import type { Rect } from "../types/Rect"
import { useGridContext } from "../hooks/useGridContext"
import { useReveal } from "../hooks/useReveal"
import type { GridOptions } from "../types/GridOptions"

const getIndex = (col: number, row: number, grid: GridData) => {
	return row * grid.cols + col
}

function getCharOverride(cl: DOMTokenList, option: keyof GridOptions, fallback: string) {
	for (const c of cl) {
		if (c.startsWith(`ascii-${option}-`)) {
			return c.slice(`ascii-${option}-`.length)
		}
	}
	return fallback
}

const drawRect = ({ rect, grid }: { rect: Rect; grid: GridData }) => {
	// const rectLeft = Math.floor(rect.rect.left / grid.fontWidth) * grid.fontWidth
	// const rectRight = Math.floor(rect.rect.right / grid.fontWidth) * grid.fontWidth
	// const rectTop = Math.floor(rect.rect.top / grid.fontHeight) * grid.fontHeight
	// const rectBottom = Math.floor(rect.rect.bottom / grid.fontHeight) * grid.fontHeight
	const invFontWidth = 1 / grid.fontWidth
	const invFontHeight = 1 / grid.fontHeight

	const trim = 0.001

	const maxCols = grid.cols - 1

	const leftCol = Math.floor(rect.rect.left * invFontWidth + trim)
	const rightCol = Math.floor(rect.rect.right * invFontWidth + trim)
	const topRow = Math.floor(rect.rect.top * invFontHeight + trim)
	const bottomRow = Math.floor(rect.rect.bottom * invFontHeight + trim)

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

	let leftOverflow = leftCol < 0 || leftCol > maxCols
	let rightOverflow = rightCol < 0 || rightCol > maxCols

	//TODO: associate grid cells with the local options of the dom element - right now the intersections only look for the default characters

	//horizontals
	//top
	if (hasT || ((hasASCII || hasBorder) && !hasL && !hasR && !hasB && !hasTL && !hasTR && !hasBR && !hasBL)) {
		for (let col = leftCol + 1; col < rightCol; col++) {
			if (col < 0) {
				continue
			}
			if (col > maxCols) {
				break
			}

			const t = getIndex(col, topRow, grid)

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

	//verticals
	//left
	if (
		!leftOverflow &&
		(hasL || ((hasASCII || hasBorder) && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBR && !hasBL))
	) {
		for (let row = topRow + 1; row < bottomRow; row++) {
			const l = getIndex(leftCol, row, grid)

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
	//right
	if (
		!rightOverflow &&
		(hasR || ((hasASCII || hasBorder) && !hasL && !hasT && !hasB && !hasTL && !hasTR && !hasBR && !hasBL))
	) {
		for (let row = topRow + 1; row < bottomRow; row++) {
			const r = getIndex(rightCol, row, grid)

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

	//corners
	//tl
	if (
		!leftOverflow &&
		(hasTL ||
			(hasT && hasL) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTR && !hasBR && !hasBL))
	) {
		const tl = getIndex(leftCol, topRow, grid)
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
	//tr
	if (
		!rightOverflow &&
		(hasTR ||
			(hasT && hasR) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasBR && !hasBL))
	) {
		const tr = getIndex(rightCol, topRow, grid)
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
	//br
	if (
		!rightOverflow &&
		(hasBR ||
			(hasB && hasR) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBL))
	) {
		const br = getIndex(rightCol, bottomRow, grid)
		if (rect.type === "textarea") {
			grid.grid[br] = "▼"
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

	//bl
	if (
		!leftOverflow &&
		(hasBL ||
			(hasB && hasL) ||
			((hasASCII || hasBorder) && !hasL && !hasR && !hasT && !hasB && !hasTL && !hasTR && !hasBR))
	) {
		const bl = getIndex(leftCol, bottomRow, grid)
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
		rect.characters.forEach((c) => {
			const col = Math.floor(c.rect.left * invFontWidth)
			const row = Math.floor(c.rect.bottom * invFontHeight)
			if (!(col < 0 || col > maxCols)) {
				grid.grid[getIndex(col, row, grid)] = rect.type === "a" ? c.char + "\u{332}" : c.char
			}
		})
	}
}

function getElements(ref: React.RefObject<HTMLDivElement | null>): Rect[] {
	if (!ref.current) return []
	return Array.from(ref.current.querySelectorAll<HTMLElement>('[class*="ascii"]')).map((el) => {
		//console.log("element", el)
		const c: { char: string; rect: DOMRect }[] = []
		const textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)

		while (textWalker.nextNode()) {
			const textNode = textWalker.currentNode as Text
			const text = textNode.textContent ?? ""

			for (let i = 0; i < text.length; i++) {
				if (text[i].trim() === "") continue
				//console.log(text[i])
				const range = document.createRange()
				range.setStart(textNode, i)
				range.setEnd(textNode, i + 1)

				const rect = range.getBoundingClientRect()
				//if (rect.width === 0 || rect.height === 0) continue

				c.push({ char: text[i], rect })
			}
		}
		return {
			rect: el.getBoundingClientRect(),
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
	//const [rects, setRects] = useState<Rect[] | null>([])
	const rectsRef = useRef<Rect[]>([])
	const reveal = gridReveal ? useReveal(grid.grid, revealDuration) : grid.grid
	const [, forceRender] = useReducer((x) => x + 1, 0)

	useLayoutEffect(() => {
		if (!parentRef.current) return

		let frame: number

		const loop = () => {
			rectsRef.current = getElements(parentRef)
			frame = requestAnimationFrame(loop)

			forceRender()
		}

		loop()

		return () => cancelAnimationFrame(frame)
	}, [])

	// clear canvas
	// maybe find better way
	for (let i = 0; i < grid.grid.length; i++) {
		grid.grid[i] = String.fromCharCode(160)
	}

	rectsRef.current.forEach((rect) => {
		drawRect({ rect, grid })
	})

	return (
		<div ref={parentRef} className="leading-none">
			<div
				style={{ width: grid.truncWidth, height: grid.truncHeight }}
				className="absolute top-0 left-0 bg-none pointer-events-none overflow-hidden"
				//className="absolute bg-transparent text-transparent border-transparent shadow-none ring-0 top-0 left-0 bg-none pointer-events-none"
			>
				{children}
			</div>
			{parentRef.current && rectsRef.current && (
				<div style={{ width: grid.truncWidth, height: grid.truncHeight }}>
					{Array.from({ length: grid.rows }, (_, r) => {
						let str = ""
						const start = r * grid.cols
						const end = start + grid.cols

						for (let i = start; i < end; i++) {
							str += reveal[i] ?? String.fromCharCode(160)
						}

						return <p key={r}>{str}</p>
					})}
				</div>
				// <div style={{ width: grid.truncWidth, height: grid.truncHeight }} className="leading-none wrap-break-word">
				// 	{String.raw`${reveal.join("")}`}
				// </div>
			)}
		</div>
	)
}

export const ASCII = (props: React.ComponentProps<typeof ASCIIGrid>) => {
	const [key, setKey] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			setKey((k) => k + 1)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return <ASCIIGrid key={key} {...props} />
}
