import Draggable from "react-draggable"
import { ASCII } from "../lib/components/ASCII"
import { useRef } from "react"
import { useGridContext } from "../lib/hooks/useGridContext"

function App() {
	const nodeRef = useRef(null)
	const grid = useGridContext()
	return (
		<ASCII>
			<div ref={nodeRef} className="ascii-text whitespace-pre p-4">
				{String.raw`
      ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
     ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
    ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
   ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
  ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
 ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
            ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
            ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
           ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
          ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
         ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼
       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼       ┼┼┼┼┼┼┼┼┼┼┼┼┼┼         
`}
			</div>
			<div className="ascii-text whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod eros nec libero finibus placerat.
				Vestibulum cursus, elit eu rhoncus blandit, eros nisi volutpat mi, in tempus leo arcu in massa. Praesent
				bibendum hendrerit ante ut lobortis. Donec felis libero, rutrum ac orci id, fringilla tristique sem.
				Pellentesque dapibus urna vel nisl maximus ullamcorper. Duis ultrices orci elit, sed laoreet dui finibus
				interdum. Fusce odio purus, laoreet at volutpat rutrum, placerat quis metus. Sed fringilla scelerisque tempus.
				Proin facilisis posuere nisi, quis mattis nunc vehicula hendrerit.
			</div>
			<label htmlFor="cars" className="border ascii-text">
				Choose a car:
			</label>
			<select name="cars" id="cars" className="border ascii h-8">
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="mercedes">Mercedes</option>
				<option value="audi">Audi</option>
			</select>
			<Draggable
				nodeRef={nodeRef}
				//grid={[grid.fontWidth, grid.fontHeight]}
			>
				<div
					ref={nodeRef}
					className="ascii-border absolute ascii-shadow-bl border w-64 pointer-events-auto cursor-grab react-draggable-dragging:cursor-grabbing ascii-parent"
				>
					<div>
						<div className="ascii-text pl-1">test</div>
						<div className="ascii-text pl-2">test</div>
						<div className="ascii-text pl-3">test</div>
						<div className="ascii-text pl-4">test</div>
						<div className="ascii-text pl-5">test</div>
						<div className="ascii-text pl-6">test</div>
						<div className="ascii-text pl-7">test</div>
						<div className="flex flex-col items-center">
							<div className="ascii pl-1">test</div>
							<div className="ascii pl-2">test</div>
							<div className="ascii pl-3">test</div>
							<div className="ascii pl-4">test</div>
						</div>
					</div>
				</div>
			</Draggable>
			<Draggable
				nodeRef={nodeRef}
				//grid={[grid.fontWidth, grid.fontHeight]}
				handle="strong"
			>
				<div
					ref={nodeRef}
					className="ascii-border absolute ascii-shadow-bl ascii-parent"
					style={{
						width: 500,
						height: 500,
					}}
				>
					<strong className="pointer-events-auto cursor-grab react-draggable-dragging:cursor-grabbing">
						<div className="w-full h-8 ascii ascii-border-b whitespace-pre flex justify-end px-2 space-x-2">
							<div className="absolute left-6 top-4 ascii-text ascii-no-fill">test</div>
							<div className="absolute top-4 ascii-text ascii-no-fill">a b c</div>
						</div>
					</strong>
					<div className="absolute whitespace-pre pl-5 top-12 ascii-text ascii-no-fill">
						{String.raw`
   ______________________
 / \        __  _    _   \
|   |      /  )' )  /    |
 \_ |     /     (  /     |
    |    (__/    \/      |
    |                    |
    | ########           |
    |  . ~~~~~~~~~~~~~~~ |
    |  . ~~~~~~~         |
    | ###### ####        |
    |  . ~~~~~~~~~~~     |
    |  __________________|__
    \_ /what
`}
					</div>
				</div>
			</Draggable>
			{/* </div> */}
		</ASCII>
	)
}

export default App
