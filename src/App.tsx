import { ASCII } from "../lib/components/ASCII"

function App() {
	return (
		<ASCII>
			<div className="flex justify-center">
				<div className="w-72 h-48 border text-center p-4 ascii-border">
					<div className="m-4 ascii-border-tl ascii-border-br h-8" />
					<div className="m-2 border h-8 ascii-border-r ascii-border-b" />
					<button className="ascii-border ascii-text">button</button>
					<br></br>
					<a href="https://en.wikipedia.org/wiki/Block_Elements" className="ascii-border ascii-text">
						a link
					</a>
				</div>
				<textarea className="w-64 h-64 ascii-border" defaultValue={"test"}></textarea>
				<br></br>
				<div className="p-4">
					{" "}
					<label htmlFor="cars" className="border">
						Choose a car:
					</label>
					<select name="cars" id="cars" className="border">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="mercedes">Mercedes</option>
						<option value="audi">Audi</option>
					</select>
				</div>
			</div>
			{/* <img
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmancelona-vet.com%2Fwp-content%2Fuploads%2F2022%2F04%2FPuppy-Care.png&f=1&nofb=1&ipt=fdd8b957d76c0c6eda753c0b89ca41de8642c16b654126bf5cd82e61c0d114ea"
				className="ascii-border opacity-100 p-10 mt-4"
			></img> */}
		</ASCII>
	)
}

export default App
