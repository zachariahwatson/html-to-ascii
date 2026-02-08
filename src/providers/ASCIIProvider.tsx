import { GridContext } from "../contexts/GridContext"
import useWindowDimensions from "../hooks/useWindowDimensions"
import type GridData from "../types/GridData"
import { defaultOptions } from "../utils/defaultOptions"

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
	const grid = Array.from({ length: rows * cols }, () => String.fromCharCode(160))
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

export default function ASCIIProvider({ children }: { children: React.ReactNode }) {
	const { width, height } = useWindowDimensions()
	const grid = initGrid({ width, height })
	return <GridContext.Provider value={grid}>{children}</GridContext.Provider>
}
