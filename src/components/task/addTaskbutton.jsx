import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/configEndpoints";
import { fetchtasks } from "../../redux/TaskSlice";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary
import ChecklistCloner from "./CheckListsCloner";

const initialdata = {
	name: "",
	description: "",
	start_date: "",
	end_date: "",
};
const AddTaskButton = ({ projectID, goalID }) => {
	console.log("the goal id", goalID);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFormDisabled, setIsFormDisabled] = useState(false);
	const dispatch = useDispatch();
	const [taskFormData, setTaskFormData] = useState(initialdata);
	const [checklistData, setChecklistData] = useState();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaskFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleChecklistDataChange = (data) => {
		setChecklistData(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFormDisabled(true);

		try {
			const visibilityValue = taskFormData.visibility === "Public" ? 1 : 0;
			const userId = localStorage.getItem("userid");

			const taskData = {
				...taskFormData,
				is_public: visibilityValue,
				user_id: userId,
				goal_id: goalID,
				project_id: projectID,
				checklists: checklistData,
			};

			await axiosInstance.post(`projects/${projectID}/tasks`, taskData);
			dispatch(fetchtasks(projectID));
			toast.success("Task created successfully");
			console.log("Task created successfully:", taskData);
			setTaskFormData(initialdata);
			closeModal();
		} catch (error) {
			console.error("Error creating task:", error);
		} finally {
			setIsFormDisabled(false);
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-xl text-white px-4"
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Task"
			>
				<h2 className="text-2xl font-bold mb-4">Add New Task</h2>
				<form
					onSubmit={handleSubmit}
					className="items-start"
				>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Task Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Task Name"
						value={taskFormData.name}
						onChange={handleChange}
						required
						maxLength={128}
						className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
					/>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 mb-1 "
					>
						Description:
					</label>
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={taskFormData.description}
						onChange={handleChange}
						required
						className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
					/>
					<label
						htmlFor="checklists"
						className="block text-sm font-medium text-gray-700 mb-1 "
					>
						Checklists:
					</label>
					<ChecklistCloner onChecklistsChange={handleChecklistDataChange} />
					<label
						htmlFor="startDate"
						className="block text-sm font-medium text-gray-700 mb-1 "
					>
						Start Date:
					</label>
					<input
						type="date"
						id="startDate"
						name="start_date"
						value={taskFormData.start_date}
						onChange={handleChange}
						required
						className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
					/>
					<label
						htmlFor="dueDate"
						className="block text-sm font-medium text-gray-700 mb-1 "
					>
						Due Date:
					</label>
					<input
						type="date"
						id="dueDate"
						name="end_date"
						value={taskFormData.end_date}
						onChange={handleChange}
						required
						className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
					/>

					<div className="form-buttons mt-6 gap-4">
						<button
							className="btn--primary"
							type="submit"
						>
							Add Task
						</button>
						<button
							type="button"
							className="btn--outline"
							onClick={closeModal}
							disabled={isFormDisabled}
						>
							Cancel
						</button>
					</div>
				</form>
			</ReusableModal>
		</div>
	);
};

export default AddTaskButton;
