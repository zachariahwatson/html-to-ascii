import { useMemo } from "react"
import { GridContext } from "../contexts/GridContext"
import { useWindowDimensions } from "../hooks/useWindowDimensions"
import type { ASCIIProviderProps } from "../types/ASCIIProviderProps"
import type { GridData } from "../types/GridData"
import type { GridOptions } from "../types/GridOptions"
import { defaultOptions } from "../utils/defaultOptions"

function initGrid({
	width,
	height,
	fontHeight = 16,
	...options
}: { width: number; height: number; fontHeight?: number } & Partial<GridOptions>): GridData {
	const mergedOptions: GridOptions = {
		...defaultOptions,
		...options,
	}
	const fontRatio = 1202 / 2048 // 1200 is the width of Cascadia Mono (but I have no clue why 1202 is the closest number that works)
	const fontWidth = fontHeight * fontRatio
	const truncWidth = width - (width % fontWidth)
	const truncHeight = height - (height % fontHeight)
	const rows = Math.floor(truncHeight / fontHeight)
	const cols = Math.floor(truncWidth / fontWidth)
	const grid = Array.from({ length: rows * cols }, () => mergedOptions.fill)
	return {
		fontHeight,
		fontRatio,
		fontWidth,
		truncWidth,
		truncHeight,
		windowWidth: width,
		windowHeight: height,
		rows,
		cols,
		grid,
		options: mergedOptions,
	}
}

export function ASCIIProvider({ children, ...options }: ASCIIProviderProps) {
	const { width, height } = useWindowDimensions()
	const grid = useMemo(() => initGrid({ width, height, ...options }), [width, height, options])

	return <GridContext.Provider value={grid}>{children}</GridContext.Provider>
}
