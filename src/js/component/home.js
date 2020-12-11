import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [currentTodo, setCurrentTodo] = useState("");
	const [list, setList] = useState([
		{ label: "Become Jedi Master", done: true },
		{ label: "Blow up a Death Star", done: false },
		{ label: "Develop super powers", done: false },
		{ label: "Get a Labotomy", done: false }
	]);
	// const [list, setList] = useState([]);

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			setList(list.concat({ label: currentTodo, done: false }));
			setCurrentTodo("");
		}
	};

	const deleteTodo = index => setList(list.filter((item, i) => i !== index));

	const handleCompleteTodo = index => {
		let newList = [].concat(list);
		newList[index].done = !newList[index].done;

		setList(newList);
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center wrap">
			<h1 className="mb-4">Simple To-Do</h1>
			<div className="todo-container">
				<ul className="list-group">
					<li className="list-group-item">
						{/* field for entering new todo */}
						<input
							className="form-control border-0"
							type="text"
							placeholder="What would you like accomplish today?"
							aria-label="add todo"
							value={currentTodo}
							onChange={e => setCurrentTodo(e.target.value)}
							onKeyPress={e => handleKeyPress(e)}
						/>
					</li>
					{// some mapping here
					list.map((item, index) => (
						<li className="list-group-item" key={index}>
							<div
								className={
									item.done
										? "status border rounded-circle d-inline-block done mr-3"
										: "status border rounded-circle d-inline-block mr-3"
								}
								onClick={() => handleCompleteTodo(index)}>
								{" "}
							</div>
							{item.label}
							<span
								className="delete ml-auto"
								onClick={() => deleteTodo(index)}>
								&#10007;
							</span>
						</li>
					))}
				</ul>
				<div className="list-group-item footer">
					{list.length > 0
						? `${list.length} item${
								list.length > 1 ? "s" : ""
						  } left`
						: "All Caught Up!"}
				</div>
			</div>
		</div>
	);
}
