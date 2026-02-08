import type GridOptions from "./GridOptions"

export default interface GridData {
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
	options: Required<GridOptions>
}
