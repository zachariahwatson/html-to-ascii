import { useMemo } from "react"
import { GridContext } from "../contexts/GridContext"
import { useWindowDimensions } from "../hooks/useWindowDimensions"
import type { ASCIIProviderProps } from "../types/ASCIIProviderProps"
import type { GridData } from "../types/GridData"
import type { GridOptions } from "../types/GridOptions"
import { defaultOptions } from "../utils/defaultOptions"

function initGrid({ width, height, ...options }: { width: number; height: number } & Partial<GridOptions>): GridData {
	const mergedOptions: GridOptions = {
		...defaultOptions,
		...options,
	}
	const fontHeight = 16
	const courierRatio = 1229 / 2048
	const fontWidth = fontHeight * courierRatio
	const truncWidth = width - (width % fontWidth)
	const truncHeight = height - (height % fontHeight)
	const rows = Math.floor(truncHeight / fontHeight)
	const cols = Math.floor(truncWidth / fontWidth)
	const grid = Array.from({ length: rows * cols }, () => mergedOptions.fill)
	return {
		fontHeight,
		courierRatio,
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
	// const parentGrid = useContext(GridContext)

	// // if a grid already exists, reuse it
	// if (parentGrid) {
	// 	return <GridContext.Provider value={parentGrid}>{children}</GridContext.Provider>
	// }

	const { width, height } = useWindowDimensions()
	const grid = useMemo(() => initGrid({ width, height, ...options }), [width, height, options])
	//const grid = initGrid({ width, height, ...options })
	return <GridContext.Provider value={grid}>{children}</GridContext.Provider>
}
