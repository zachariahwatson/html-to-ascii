import type { GridOptions } from "./GridOptions"

export interface GridData {
	fontHeight: number | 0
	fontRatio: number
	fontWidth: number
	truncWidth: number
	truncHeight: number
	windowWidth: number
	windowHeight: number
	rows: number
	cols: number
	grid: string[]
	options: Required<GridOptions>
}
