import "./App.css"
import { ASCII } from "./ASCII"

function App() {
	return (
		<ASCII>
			<div className="w-72 h-48 border-1 text-center ascii p-4">
				<div className="m-4 border-1 h-8 ascii" />
				<div className="m-2 border-1 h-8 ascii" />
				<button className="ascii">button</button>
				<br></br>
				<a href="https://en.wikipedia.org/wiki/Block_Elements" className="ascii">
					a link
				</a>
			</div>
			<textarea className="w-64 h-64 ascii" defaultValue={"test"}>
				<div>test?</div>
			</textarea>
		</ASCII>
	)
}

export default App
