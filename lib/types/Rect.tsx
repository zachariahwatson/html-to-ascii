export interface Rect {
	rect: DOMRect
	parentRect: DOMRect
	characters: { char: string; rect: DOMRect }[]
	type: string
	classList: DOMTokenList
}
