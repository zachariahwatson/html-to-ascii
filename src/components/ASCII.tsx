import { useLayoutEffect, useRef, useState } from "react"
import type GridData from "../types/GridData"
import type Rect from "../types/Rect"
import { useGridContext } from "../hooks/useGridContext"

const getIndex = (x: number, y: number, grid: GridData) => {
	const col = (x / grid.fontWidth) | 0
	const row = (y / grid.fontHeight) | 0
	return row * grid.cols + col
}

const drawRect = ({ rect, grid }: { rect: Rect; grid: GridData }) => {
	const rectLeft = Math.floor(rect.rect.left / grid.fontWidth) * grid.fontWidth
	const rectRight = Math.floor(rect.rect.right / grid.fontWidth) * grid.fontWidth
	const rectTop = Math.floor(rect.rect.top / grid.fontHeight) * grid.fontHeight
	const rectBottom = Math.floor(rect.rect.bottom / grid.fontHeight) * grid.fontHeight

	//verticals
	//left
	if (
		(rect.classList.contains("ascii-border") &&
			!["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some((c) =>
				rect.classList.contains(c),
			)) ||
		rect.classList.contains("ascii-border-l")
	) {
		for (let i = rectTop + grid.fontHeight; i < rectBottom; i += grid.fontHeight) {
			const l = getIndex(rectLeft, i, grid)

			switch (grid.grid[l]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.tr:
				case grid.options.br:
					grid.grid[l] = grid.options.li
					break
				default:
					grid.grid[l] = grid.options.l
			}
		}
	}
	//right
	if (
		(rect.classList.contains("ascii-border") &&
			!["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some((c) =>
				rect.classList.contains(c),
			)) ||
		rect.classList.contains("ascii-border-r")
	) {
		for (let i = rectTop + grid.fontHeight; i < rectBottom; i += grid.fontHeight) {
			const r = getIndex(rectRight, i, grid)

			switch (grid.grid[r]) {
				case grid.options.t:
				case grid.options.b:
				case grid.options.tl:
				case grid.options.bl:
					grid.grid[r] = grid.options.ri
					break
				default:
					grid.grid[r] = grid.options.r
			}
		}
	}

	//horizontals
	//top
	if (
		(rect.classList.contains("ascii-border") &&
			!["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some((c) =>
				rect.classList.contains(c),
			)) ||
		rect.classList.contains("ascii-border-t")
	) {
		for (let i = rectLeft + grid.fontWidth; i < rectRight; i += grid.fontWidth) {
			const t = getIndex(i, rectTop, grid)

			switch (grid.grid[t]) {
				case grid.options.l:
				case grid.options.r:
				case grid.options.bl:
				case grid.options.br:
					grid.grid[t] = grid.options.ti
					break
				default:
					grid.grid[t] = grid.options.t
			}
		}
	}
	//bottom
	if (
		(rect.classList.contains("ascii-border") &&
			!["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some((c) =>
				rect.classList.contains(c),
			)) ||
		rect.classList.contains("ascii-border-b")
	) {
		for (let i = rectLeft + grid.fontWidth; i < rectRight; i += grid.fontWidth) {
			const b = getIndex(i, rectBottom, grid)
			switch (grid.grid[b]) {
				case grid.options.l:
				case grid.options.r:
				case grid.options.tl:
				case grid.options.tr:
					grid.grid[b] = grid.options.bi
					break
				default:
					grid.grid[b] = grid.options.b
			}
		}
	}

	//corners
	//tl
	if (
		["ascii-border", "ascii-border-tl"].some((c) => rect.classList.contains(c)) ||
		["ascii-border-l", "ascii-border-t"].every((c) => rect.classList.contains(c))
	) {
		const tl = getIndex(rectLeft, rectTop, grid)
		switch (grid.grid[tl]) {
			case grid.options.t:
			case grid.options.b:
			case grid.options.tr:
				grid.grid[tl] = grid.options.bi
				break
			case grid.options.l:
			case grid.options.r:
			case grid.options.bl:
				grid.grid[tl] = grid.options.ri
				break
			case grid.options.br:
				grid.grid[tl] = grid.options.i
				break
			default:
				grid.grid[tl] = grid.options.tl
		}
	}
	//tr
	if (
		["ascii-border", "ascii-border-tr"].some((c) => rect.classList.contains(c)) ||
		["ascii-border-r", "ascii-border-t"].every((c) => rect.classList.contains(c))
	) {
		const tr = getIndex(rectRight, rectTop, grid)
		switch (grid.grid[tr]) {
			case grid.options.t:
			case grid.options.b:
			case grid.options.tl:
				grid.grid[tr] = grid.options.bi
				break
			case grid.options.l:
			case grid.options.r:
			case grid.options.br:
				grid.grid[tr] = grid.options.li
				break
			case grid.options.bl:
				grid.grid[tr] = grid.options.i
				break
			default:
				grid.grid[tr] = grid.options.tr
		}
	}
	//br
	if (
		["ascii-border", "ascii-border-br"].some((c) => rect.classList.contains(c)) ||
		["ascii-border-r", "ascii-border-b"].every((c) => rect.classList.contains(c))
	) {
		const br = getIndex(rectRight, rectBottom, grid)
		if (rect.type === "textarea") {
			grid.grid[br] = "▼"
		} else {
			switch (grid.grid[br]) {
				case grid.options.l:
				case grid.options.r:
				case grid.options.tr:
					grid.grid[br] = grid.options.li
					break
				case grid.options.t:
				case grid.options.b:
				case grid.options.bl:
					grid.grid[br] = grid.options.ti
					break
				case grid.options.tl:
					grid.grid[br] = grid.options.i
					break
				default:
					grid.grid[br] = grid.options.br
			}
		}
	}

	//bl
	if (
		["ascii-border", "ascii-border-bl"].some((c) => rect.classList.contains(c)) ||
		["ascii-border-l", "ascii-border-b"].every((c) => rect.classList.contains(c))
	) {
		const bl = getIndex(rectLeft, rectBottom, grid)
		switch (grid.grid[bl]) {
			case grid.options.l:
			case grid.options.r:
			case grid.options.tl:
				grid.grid[bl] = grid.options.ri
				break
			case grid.options.t:
			case grid.options.b:
			case grid.options.br:
				grid.grid[bl] = grid.options.ti
				break
			case grid.options.tr:
				grid.grid[bl] = grid.options.i
				break
			default:
				grid.grid[bl] = grid.options.bl
		}
	}

	//fill
	if (rect.classList.contains("ascii-fill")) {
		for (let y = rectTop + grid.fontHeight; y < rectBottom; y += grid.fontHeight) {
			for (let x = rectLeft + grid.fontWidth; x < rectRight; x += grid.fontWidth) {
				grid.grid[getIndex(x, y, grid)] = grid.options.fill
			}
		}
	}

	//characters
	if (rect.classList.contains("ascii-text")) {
		rect.characters.forEach((c) => {
			const cRectLeft = Math.floor(c.rect.left / grid.fontWidth) * grid.fontWidth
			const cRectBottom = Math.floor(c.rect.bottom / grid.fontHeight) * grid.fontHeight
			grid.grid[getIndex(cRectLeft, cRectBottom, grid)] = c.char
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

export default function ASCII({ children }: { children: React.ReactNode }) {
	const parentRef = useRef<HTMLDivElement | null>(null)
	const grid = useGridContext()
	const [rects, setRects] = useState<Rect[] | null>([])

	useLayoutEffect(() => {
		if (!parentRef.current) return

		const update = () => {
			const r = getElements(parentRef)
			setRects(r)
		}

		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				//console.log("DOM changed:", mutation.type)
				// Handle the DOM change here
				update()
			})
		})

		observer.observe(parentRef.current, {
			attributes: true,
			childList: true,
			subtree: true,
			characterData: true,
		})
	}, [])

	// clear canvas
	// maybe find better way
	for (let i = 0; i < grid.grid.length; i++) {
		grid.grid[i] = String.fromCharCode(160)
	}

	rects?.forEach((rect) => {
		drawRect({ rect, grid })
	})

	return (
		<div ref={parentRef}>
			<div
				style={{ width: grid.truncWidth, height: grid.truncHeight }}
				className="absolute opacity-0 top-0 left-0 bg-none pointer-events-none"
			>
				{children}
			</div>
			{parentRef.current && (
				<div style={{ width: grid.truncWidth, height: grid.truncHeight }} className="leading-none wrap-break-word">
					{grid.grid.join("")}
				</div>
			)}
		</div>
	)
}
