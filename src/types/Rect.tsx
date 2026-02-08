export default interface Rect {
	rect: DOMRect
	characters: { char: string; rect: DOMRect }[]
	type: string
	classList: DOMTokenList
}
