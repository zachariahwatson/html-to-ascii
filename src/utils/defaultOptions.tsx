import type GridOptions from "../types/GridOptions"

export const defaultOptions: GridOptions = {
	t: "─",
	ti: "┴",
	b: "─",
	bi: "┬",
	l: "│",
	li: "┤",
	r: "│",
	ri: "├",
	tl: "┌",
	tr: "┐",
	br: "┘",
	bl: "└",
	i: "┼",
	fill: String.fromCharCode(160),
}
