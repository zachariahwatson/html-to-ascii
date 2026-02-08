import { createContext, useContext } from "react"

const GridContext = createContext<string | null>(null)

const useGridContext = () => {
	return useContext(GridContext)
}

export { GridContext, useGridContext }
