import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

interface GridData {
	fontHeight: number | 0
	courierRatio: number
	fontWidth: number
	truncWidth: number
	truncHeight: number
	windowWidth: number
	windowHeight: number
	rows: number
	cols: number
	grid: string[]
	options: {
		t: string
		ti: string
		b: string
		bi: string
		l: string
		li: string
		r: string
		ri: string
		tl: string
		tr: string
		br: string
		bl: string
		fill: string
	}
}

interface Rect {
	rect: DOMRect
	characters: { char: string; rect: DOMRect }[]
}

interface GridOptions {
	t?: string
	ti?: string
	b?: string
	bi?: string
	l?: string
	li?: string
	r?: string
	ri?: string
	tl?: string
	tr?: string
	br?: string
	bl?: string
	fill?: string
}

const defaultOptions = {
	t: "─",
	ti: "┴",
	b: "─",
	bi: "┬",
	l: "│",
	li: "┤",
	r: "│",
	ri: "├ ",
	tl: "┌",
	tr: "┐",
	br: "┘",
	bl: "└",
	fill: String.fromCharCode(160),
}

interface ASCIIOptionsProps extends GridOptions {
	children: React.ReactNode
}

function useWindowDimensions() {
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

function initGrid({ width, height }: { width: number; height: number }): GridData {
	const fontHeight = 16
	const courierRatio = 1229 / 2048
	const fontWidth = fontHeight * courierRatio
	const truncWidth = width - (width % fontWidth)
	const truncHeight = height - (height % fontHeight)
	const windowWidth = width
	const windowHeight = height
	const rows = Math.floor(truncHeight / fontHeight)
	const cols = Math.floor(truncWidth / fontWidth)
	const grid = Array.from({ length: rows * cols }, () => /*String.fromCharCode(160)*/ "░")
	const options = defaultOptions
	return {
		fontHeight,
		courierRatio,
		fontWidth,
		truncWidth,
		truncHeight,
		windowWidth,
		windowHeight,
		rows,
		cols,
		grid,
		options,
	}
}

const GridContext = createContext<GridData>({
	fontHeight: 0,
	courierRatio: 0,
	fontWidth: 0,
	truncWidth: 0,
	truncHeight: 0,
	windowWidth: 0,
	windowHeight: 0,
	rows: 0,
	cols: 0,
	grid: [],
	options: defaultOptions,
})

const useGridContext = () => {
	return useContext(GridContext)
}

const ASCIIProvider = ({ children }: { children: React.ReactNode }) => {
	const { width, height } = useWindowDimensions()
	const grid = initGrid({ width, height })
	return <GridContext value={grid}>{children}</GridContext>
}

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

const getIndex = (x: number, y: number, grid: GridData) => {
	const col = (x / grid.fontWidth) | 0
	const row = (y / grid.fontHeight) | 0
	return row * grid.cols + col
}

const ASCIIOptions: React.FC<ASCIIOptionsProps> = ({ children, t, ti, b, bi, l, li, r, ri, tl, tr, br, bl }) => {
	const grid = useGridContext()
	return children
}

const drawRect = ({ rect, grid }: { rect: Rect; grid: GridData }) => {
	const rectLeft = Math.floor(rect.rect.left / grid.fontWidth) * grid.fontWidth
	const rectRight = Math.floor(rect.rect.right / grid.fontWidth) * grid.fontWidth
	const rectTop = Math.floor(rect.rect.top / grid.fontHeight) * grid.fontHeight
	const rectBottom = Math.floor(rect.rect.bottom / grid.fontHeight) * grid.fontHeight

	//verticals
	for (let i = rectTop + grid.fontHeight; i < rectBottom; i += grid.fontHeight) {
		const l = getIndex(rectLeft, i, grid)
		const r = getIndex(rectRight, i, grid)

		switch (grid.grid[l]) {
			case grid.options.t:
			case grid.options.b:
				grid.grid[l] = grid.options.li
				break
			default:
				grid.grid[l] = grid.options.l
		}
		switch (grid.grid[r]) {
			case grid.options.t:
			case grid.options.b:
				grid.grid[r] = grid.options.ri
				break
			default:
				grid.grid[r] = grid.options.r
		}
	}

	//horizontals
	for (let i = rectLeft + grid.fontWidth; i < rectRight; i += grid.fontWidth) {
		const t = getIndex(i, rectTop, grid)
		const b = getIndex(i, rectBottom, grid)

		switch (grid.grid[t]) {
			case grid.options.l:
			case grid.options.r:
				grid.grid[t] = grid.options.ti
				break
			default:
				grid.grid[t] = grid.options.t
		}
		switch (grid.grid[b]) {
			case grid.options.l:
			case grid.options.r:
				grid.grid[b] = grid.options.bi
				break
			default:
				grid.grid[b] = grid.options.b
		}
	}

	//corners
	//tl
	const tl = getIndex(rectLeft, rectTop, grid)
	switch (grid.grid[tl]) {
		case grid.options.t:
		case grid.options.b:
			grid.grid[tl] = grid.options.bi
			break
		case grid.options.l:
		case grid.options.r:
			grid.grid[tl] = grid.options.ri
			break
		default:
			grid.grid[tl] = grid.options.tl
	}
	//tr
	const tr = getIndex(rectRight, rectTop, grid)
	switch (grid.grid[tr]) {
		case grid.options.t:
		case grid.options.b:
			grid.grid[tr] = grid.options.bi
			break
		case grid.options.l:
		case grid.options.r:
			grid.grid[tr] = grid.options.li
			break
		default:
			grid.grid[tr] = grid.options.tr
	}
	//br
	const br = getIndex(rectRight, rectBottom, grid)
	switch (grid.grid[br]) {
		case grid.options.l:
		case grid.options.r:
			grid.grid[br] = grid.options.li
			break
		case grid.options.t:
		case grid.options.b:
			grid.grid[br] = grid.options.ti
			break
		default:
			grid.grid[br] = grid.options.br
	}
	//bl
	const bl = getIndex(rectLeft, rectBottom, grid)
	switch (grid.grid[bl]) {
		case grid.options.l:
		case grid.options.r:
			grid.grid[bl] = grid.options.ri
			break
		case grid.options.t:
		case grid.options.b:
			grid.grid[bl] = grid.options.ti
			break
		default:
			grid.grid[bl] = grid.options.bl
	}

	//fill
	for (let y = rectTop + grid.fontHeight; y < rectBottom; y += grid.fontHeight) {
		for (let x = rectLeft + grid.fontWidth; x < rectRight; x += grid.fontWidth) {
			grid.grid[getIndex(x, y, grid)] = grid.options.fill
		}
	}

	//characters
	rect.characters.forEach((c) => {
		grid.grid[getIndex(c.rect.left, c.rect.bottom, grid)] = c.char
	})
}

function ASCII({ children }: { children: React.ReactNode }) {
	const parentRef = useRef<HTMLDivElement | null>(null)
	const grid = useGridContext()
	const [rects, setRects] = useState<Rect[] | null>([])

	useLayoutEffect(() => {
		if (!parentRef.current) return

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				console.log("DOM changed:", mutation.type)
				// Handle the DOM change here
			})
		})

		parentRef.current.addEventListener("input", function (e) {
			console.log(e)
		})

		observer.observe(parentRef.current, {
			attributes: true,
			childList: true,
			subtree: true,
			characterData: true,
		})

		const r = Array.from(parentRef.current.querySelectorAll<HTMLElement>(".ascii")).map((el) => {
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
			}
		})

		setRects(r)

		return () => {
			observer.disconnect()
			parentRef.current?.removeEventListener("input", function (e) {
				console.log(e)
			})
		}
	}, [])

	rects?.forEach((rect) => {
		drawRect({ rect, grid })
	})

	return (
		<div ref={parentRef}>
			<div
				style={{ width: grid.truncWidth, height: grid.truncHeight }}
				className="absolute top-0 left-0 opacity-0 bg-none pointer-events-none"
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

export { GridContext, useGridContext, ASCII, ASCIIProvider }
