import { useEffect, useMemo, useState } from "react"
import { GridContext } from "../contexts/GridContext"
import { useWindowDimensions } from "../hooks/useWindowDimensions"
import type { GridData } from "../types/GridData"
import type { GridOptions } from "../types/GridOptions"
import { defaultOptions } from "../utils/defaultOptions"
import { Font, parse } from "opentype.js"
function initGrid({
	width,
	height,
	fontData,
	...options
}: { width: number; height: number; fontData: Font } & GridOptions): GridData {
	//calculate font dimensions
	const unitsPerEm = fontData.unitsPerEm || 1000
	const fontSize = options.fontSize
	const fontWidth = (fontData.tables.hhea.advanceWidthMax * fontSize) / unitsPerEm
	const fontHeight = ((fontData.tables.hhea.ascender - fontData.tables.hhea.descender) * fontSize) / unitsPerEm

	//calculate grid dimensions
	const truncWidth = width - (width % fontWidth)
	const truncHeight = height - (height % fontHeight)
	const rows = Math.floor(truncHeight / fontHeight)
	const cols = Math.floor(truncWidth / fontWidth)
	const grid = Array.from({ length: rows * cols }, () => options.fill)

	return {
		fontHeight,
		fontWidth,
		truncWidth,
		truncHeight,
		windowWidth: width,
		windowHeight: height,
		rows,
		cols,
		grid,
		options: options,
	}
}

export function ASCIIProvider({ children, ...options }: React.PropsWithChildren<Partial<GridOptions>>) {
	const { width, height } = useWindowDimensions()
	const [fontData, setFontData] = useState<Font | null>(null)
	//const defaultFontPath = new URL(CascadiaMono, import.meta.url)

	const mergedOptions: GridOptions = {
		...defaultOptions,
		...options,
	}

	useEffect(() => {
		fetch(mergedOptions.fontPath)
			.then((res) => res.arrayBuffer())
			.then((data) => {
				setFontData(parse(data))
			})
	}, [mergedOptions.fontPath])

	const grid = useMemo(() => {
		if (!fontData) return null
		return initGrid({ width, height, fontData, ...mergedOptions })
	}, [width, height, fontData, options])

	if (!grid) return null
	return <GridContext.Provider value={grid}>{children}</GridContext.Provider>
}
