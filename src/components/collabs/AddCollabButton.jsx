import DotLoader from "components/DotLoader";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/configEndpoints";
import {
	fetchCollaborations,
	fetchMyCollaborations,
} from "../../redux/collabSlice";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary

const initialdata = {
	name: "",
	description: "",
	visibility: "Public",
	type: "",
};
const AddCollabButton = ({ goalId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialdata);
	const [loading, setLoading] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setDisabled(true);
		setLoading(true);

		try {
			const isPublic = formData.visibility === "Public";
			const visibilityValue = isPublic ? 1 : 0;

			const collaborationData = {
				...formData,
				is_public: visibilityValue,
				user_id: localStorage.getItem("userid"),
				goal_id: goalId,
			};
			await axiosInstance.post(
				`goals/${goalId}/collaborations`,
				collaborationData
			);
			dispatch(fetchCollaborations(goalId));
			dispatch(fetchMyCollaborations(goalId));
			toast.success("Collaboration created successfully");
			setFormData(initialdata);
			setLoading(false);
			closeModal();
		} catch (error) {
			console.error("Error creating collaboration:", error);
		} finally {
			setDisabled(false);
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-3xl text-white px-4 "
			>
				+
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add A New Collab Group"
			>
				<h2>Add New Collab</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Collaboration Name"
						value={formData.name}
						onChange={handleChange}
						required
						maxLength={128}
					/>
					<textarea
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="visibility"
						placeholder="Visibility"
						value={formData.visibility}
						onChange={handleChange}
						list="visibility-options"
						required
					/>
					<datalist id="visibility-options">
						<option value="Public" />
						<option value="Private" />
					</datalist>

					<div className="flex flex-row !justify-end !items-end gap-2">
						{loading ? (
							<button className="btn bg-main text-white rounded-full">
								<DotLoader
									height={"h-5"}
									width={"w-5"}
								/>
							</button>
						) : (
							<button
								className="btn bg-main text-white rounded-full"
								type="submit"
							>
								Add Collab
							</button>
						)}
						<button
							type="button"
							className="btn--outline rounded-full"
							onClick={closeModal}
							disabled={disabled}
						>
							Cancel
						</button>
					</div>
				</form>
			</ReusableModal>
		</div>
	);
};

export default AddCollabButton;
