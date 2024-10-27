import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { submitLink } from "../../redux/ChecklistSlice"; // Import your action for link submission
import Tippy from "@tippyjs/react";

const ChecklistBox = ({ task }) => {
	const dispatch = useDispatch();
	const checklist = useSelector((state) => state.tasks.taskListChecklists);
	const checklistStatus = useSelector((state) => state.taskCheckList.status);
	const checklistError = useSelector((state) => state.tasks.taskMetaData);
	const taskMetadata = useSelector((state) => state.tasks.taskMetaData);
	const taskData = useSelector((state) => state.tasks.taskData);
	const userChecklistData = useSelector(
		(state) => state.tasks.userChecklistData
	);

	const [checkedItems, setCheckedItems] = useState([]);
	const [link, setLink] = useState(""); // State for the input link
	const [saveActions, setSaveActions] = useState(false);
	const [prevCheckedItems, setPrevCheckedItems] = useState([]);

	useEffect(() => {
		if (checklist) {
			setCheckedItems(
				checklist?.map((item) => ({
					id: item.id,
					completed: item.completed,
				}))
			);
			setPrevCheckedItems(
				checklist?.map((item) => ({
					id: item.id,
					completed: item.completed,
				}))
			);
		}
	}, [checklist, checklistStatus]);

	useEffect(() => {
		if (JSON.stringify(checkedItems) !== JSON.stringify(prevCheckedItems)) {
			setSaveActions(true);
		} else {
			setSaveActions(false);
		}
	}, [checkedItems, prevCheckedItems]);

	const handleToggle = (e, itemId) => {
		setCheckedItems(
			checkedItems?.map((item) =>
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
			{taskMetadata?.status && (
				<div className="bg-amber-500 w-fit text-white text-xs rounded-full px-4 py-1.5 before:mr-2 before:bg-white before:rounded-full before:w-2 before:h-2 before:inline-block">
					{taskMetadata?.status}
				</div>
			)}
			{taskData?.name && (
				<h2 className="text-xl font-bold mt-1">
					{taskData?.name} - Checklists{" "}
				</h2>
			)}
			<div className="h-1 w-full bg-amber-500 y-5 "></div>
			{checklistStatus === "loading" && <p>Loading checklist...</p>}
			{!taskData && (
				<p className="text-gray-600">
					Please select a Task to show its check lists
				</p>
			)}
			{checklist?.length === 0 && (
				<p className="text-gray-600">
					No Check list available for the selected task
				</p>
			)}
			{checklistStatus === "succeeded" && checklist?.length > 0 && (
				<div>
					<ul className="list-none">
						{checklist?.map((item) => (
							<li
								key={item.id}
								className="flex items-center"
							>
								<input
									className="mr-2"
									type="checkbox"
									id={item.id}
									checked={
										checkedItems?.find((i) => i.id === item.id)?.completed ||
										taskMetadata?.status === "done"
									}
									onChange={(e) => handleToggle(e, item.id)}
								/>
								<Tippy content={item.description}>
									<label
										className="text-gray-700"
										htmlFor={item.id}
									>
										{item.name}
									</label>
								</Tippy>
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
					<div className="mt-4 flex flex-wrap gap-1">
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
					<div className="mt-4 flex flex-wrap">
						{saveActions && (
							<>
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									onClick={handleLinkSubmit}
								>
									save
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
