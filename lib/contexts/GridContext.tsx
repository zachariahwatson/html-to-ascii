import { createContext } from "react"
import type { GridData } from "../types/GridData"
import { defaultOptions } from "../utils/defaultOptions"

export const GridContext = createContext<GridData>({
	fontHeight: 0,
	fontWidth: 0,
	truncWidth: 0,
	truncHeight: 0,
	windowWidth: document.documentElement.clientWidth,
	windowHeight: document.documentElement.clientHeight,
	rows: 0,
	cols: 0,
	grid: [],
	options: defaultOptions,
})
