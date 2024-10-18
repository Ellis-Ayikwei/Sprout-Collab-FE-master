import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { submitLink } from "../../redux/ChecklistSlice"; // Import your action for link submission

const ChecklistBox = ({ task }) => {
	const dispatch = useDispatch();
	const checklist = useSelector((state) => state.taskCheckList.checkList);
	const checklistStatus = useSelector((state) => state.taskCheckList.status);
	const checklistError = useSelector((state) => state.taskCheckList.error);
	const taskMetadata = useSelector((state) => state.taskCheckList.taskMData);
	const taskData = useSelector((state) => state.tasks.taskData);

	const [checkedItems, setCheckedItems] = useState([]);
	const [link, setLink] = useState(""); // State for the input link

	useEffect(() => {
		if (checklistStatus === "succeeded") {
			setCheckedItems(
				checklist.map((item) => ({
					id: item.id,
					completed: item.completed,
				}))
			);
		}
	}, [checklist, checklistStatus]);

	const handleToggle = (itemId) => {
		setCheckedItems(
			checkedItems.map((item) =>
				item.id === itemId ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const handleLinkChange = (e) => {
		setLink(e.target.value); // Update the link state
	};

	const handleLinkSubmit = () => {
		if (link) {
			dispatch(submitLink({ taskId: task.id, link }));
			setLink("");
		} else {
			toast.info("Please enter a link.");
		}
	};

	return (
		<div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col">
			<div className="bg-amber-500 w-fit text-white text-xs rounded-full px-4 py-1.5 before:mr-2 before:bg-white before:rounded-full before:w-2 before:h-2 before:inline-block">
				{taskMetadata?.status}
			</div>
			<h2 className="text-xl font-bold mt-1">{taskData?.name} - Checklists </h2>
			<div className="h-1 w-full bg-amber-500 y-5 "></div>
			{checklistStatus === "loading" && <p>Loading checklist...</p>}
			{checklistStatus === "idle" && (
				<p className="text-gray-600">
					Please select a Task to show its check lists
				</p>
			)}
			{checklistStatus === "succeeded" && checklist.length === 0 && (
				<p className="text-gray-600">
					No Check list available for the selected task
				</p>
			)}
			{checklistStatus === "succeeded" && checklist.length > 0 && (
				<div>
					<ul className="list-none">
						{checklist.map((item) => (
							<li
								key={item.id}
								className="flex items-center"
							>
								<input
									className="mr-2"
									type="checkbox"
									id={item.id}
									checked={
										checkedItems.find((i) => i.id === item.id)?.completed ||
										taskMetadata?.status === "done"
									}
									onChange={() => handleToggle(item.id)}
								/>
								<label
									className="text-gray-700"
									htmlFor={item.id}
								>
									{item.name}
								</label>
							</li>
						))}
					</ul>

					<div className="task-metadata mt-4">
						<b className="text-gray-700">
							Due date:{" "}
							{taskData?.end_date
								? new Date(taskData?.end_date).toDateString()
								: ""}
						</b>
					</div>
					<div className="task-actions mt-4">
						{taskMetadata?.status === "done" && (
							<>
								<input
									type="text"
									id="url"
									placeholder="Link :"
									className="border border-gray-400 rounded px-2 py-1 w-64"
									value={link}
									onChange={handleLinkChange}
								/>
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									onClick={handleLinkSubmit}
								>
									Submit
								</button>
							</>
						)}
					</div>
				</div>
			)}
			{checklistStatus === "failed" && (
				<p className="text-red-500">Error: {checklistError}</p>
			)}
			<ToastContainer />
		</div>
	);
};

export default ChecklistBox;
