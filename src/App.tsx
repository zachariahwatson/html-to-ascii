import ASCII from "./components/ASCII"

function App() {
	return (
		<ASCII>
			<div className="flex justify-center">
				<div className="w-72 h-48 border text-center ascii p-4" draggable>
					<div className="m-4 border h-8 ascii" />
					<div className="m-2 border h-8 ascii" />
					<button className="ascii">button</button>
					<br></br>
					<a href="https://en.wikipedia.org/wiki/Block_Elements" className="ascii">
						a link
					</a>
				</div>
				<textarea className="w-64 h-64 ascii" defaultValue={"test"}></textarea>
				<br></br>
				<div className="p-4">
					{" "}
					<label htmlFor="cars" className="ascii ascii-text">
						Choose a car:
					</label>
					<select name="cars" id="cars" className="ascii">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="mercedes">Mercedes</option>
						<option value="audi">Audi</option>
					</select>
				</div>
			</div>
		</ASCII>
	)
}

export default App
