import React, { useState, useEffect } from "react";
const base_url = "https://assets.breatheco.de/apis/fake/todos/user/jferragut";

//create your first component
export function Home() {
	const [currentTodo, setCurrentTodo] = useState("");
	const [list, setList] = useState([
		{ label: "Become Jedi Master", done: true },
		{ label: "Blow up a Death Star", done: false },
		{ label: "Develop super powers", done: false },
		{ label: "Get a Labotomy", done: false }
	]);
	const [done, setDone] = useState(1);
	const emptyList = [{ label: "Sample Todo", done: false }]; // for reset

	useEffect(() => {
		syncData();
	}, []);

	const syncData = () => {
		fetch(base_url)
			.then(res => {
				if (!res.ok)
					throw new Error(`${res.status} - ${res.statusText}`);
				return res.json();
			})
			.then(data => {
				setList(data);
				calculateDone(data);
			})
			.catch(err => console.error(err));
	};

	const updateData = data => {
		fetch(base_url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => {
				if (!res.ok)
					throw new Error(`${res.status} - ${res.statusText}`);
				return res.json();
			})
			.then(data => syncData())
			.catch(err => console.error(err));
	};

	const handleKeyPress = e => {
		if (e.key === "Enter" && currentTodo !== "") {
			let newList = list.concat({ label: currentTodo, done: false });
			updateData(newList);
			calculateDone(newList);
			setCurrentTodo("");
		}
	};

	const deleteTodo = index => {
		let newList = [];

		if (list.length > 1) {
			newList = list.filter((item, i) => i !== index);
		} else {
			newList = emptyList;
		}

		updateData(newList);
		calculateDone(newList);
	};

	const handleCompleteTodo = index => {
		let newList = [].concat(list);
		newList[index].done = !newList[index].done;
		calculateDone(newList);
		updateData(newList);
	};

	const calculateDone = list => {
		let count = 0;
		for (let i = 0; i < list.length; i++) {
			list[i].done && count++;
		}
		setDone(count);
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
								role="button"
								tabIndex="0"
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
				<div className="list-group-item footer d-flex justify-content-between">
					{list.length > 0 && list.length - done > 0
						? `${list.length} item${
								list.length > 1 ? "s total (" : " total ("
						  }`
						: "All Caught Up!"}
					{list.length > 0 && list.length - done > 0
						? `${list.length - done} unfinished)`
						: ""}

					<span
						role="button"
						tabIndex="0"
						className="btn btn-sm btn-outline-danger clear"
						onClick={() => updateData(emptyList)}>
						Clear List
					</span>
				</div>
			</div>
		</div>
	);
}
