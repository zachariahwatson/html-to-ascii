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

	//calculate font dimensions
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")!
	ctx.font = `${mergedOptions.fontSize}px ${mergedOptions.font}`
	const text = "█"
	const metrics = ctx.measureText(text)

	const fontWidth = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft
	const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
	const truncWidth = width - (width % fontWidth)
	const truncHeight = height - (height % fontHeight)
	const rows = Math.floor(truncHeight / fontHeight)
	const cols = Math.floor(truncWidth / fontWidth)
	const grid = Array.from({ length: rows * cols }, () => mergedOptions.fill)

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
		options: mergedOptions,
	}
}

export function ASCIIProvider({ children, ...options }: ASCIIProviderProps) {
	const { width, height } = useWindowDimensions()
	const grid = useMemo(() => initGrid({ width, height, ...options }), [width, height, options])

	return <GridContext.Provider value={grid}>{children}</GridContext.Provider>
}
