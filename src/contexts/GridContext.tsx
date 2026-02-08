import { createContext } from "react"
import type GridData from "../types/GridData"
import { defaultOptions } from "../utils/defaultOptions"

export const GridContext = createContext<GridData>({
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
