import type { GridOptions } from "./GridOptions"

export type ASCIIProviderProps = React.PropsWithChildren<Partial<GridOptions>> & {
	fontSize?: number
	font?: string
	fontPath: string
}
