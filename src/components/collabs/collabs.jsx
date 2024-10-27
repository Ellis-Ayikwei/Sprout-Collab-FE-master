import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollabImage from "../../images/collabb.png";
import { fetchCollaborations, setCollabid } from "../../redux/collabSlice";
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";
import AddCollabButton from "./AddCollabButton";

const CollabList = ({ goal }) => {
	const [selectedCollabId, setSelectedCollabId] = useState("");

	const dispatch = useDispatch();
	const collaborations = useSelector(
		(state) => state.collaborations.collaborations
	);
	const status = useSelector((state) => state.collaborations.status);
	const error = useSelector((state) => state.collaborations.error);

	// Fetch collaborations when the goal id is available
	useEffect(() => {
		if (goal?.id) {
			dispatch(fetchCollaborations(goal.id));
		}
	}, [dispatch, goal?.id]);

	// Memoized sorted collaborations to avoid re-sorting on every render
	const sortedCollaborations = useMemo(() => {
		return [...collaborations].sort((a, b) => a.name.localeCompare(b.name));
	}, [collaborations]);

	// Extract collaboration IDs
	const collabIds = useMemo(
		() => collaborations.map((collab) => collab.id),
		[collaborations]
	);

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5 px-2">
			<div className="w-full flex items-center justify-between">
				<h2>Collaborations</h2>
				{goal && <AddCollabButton goalId={goal.id} />}
			</div>

			<div className="mt-6 flex flex-col items-center justify-start h-full w-full p-2 gap-2">
				{/* Loader */}
				{status === "loading" && (
					<div className="flex justify-center mx-auto items-center">
						<DotLoader />
					</div>
				)}

				{/* Error */}

				{/* No Collaborations */}
				{status === "succeeded" && sortedCollaborations.length === 0 && (
					<p>No collaborations found for this goal. Create a new one.</p>
				)}

				{/* Collaborations List */}
				{status === "succeeded" &&
					sortedCollaborations.length > 0 &&
					sortedCollaborations.map((collab) => {
						const membersCount = collab.all_members?.length;
						const isMember = collab.all_members?.some(
							(member) => member.user_id === localStorage.getItem("userid")
						);

						return (
							<GenericCard
								key={collab.id}
								title={collab.name}
								description={collab.description}
								icon={CollabImage}
								memberCount={membersCount}
								status={collab.status}
								dateCreated={collab.created_at.split("T")[0]}
								onClick={() => {
									dispatch(setCollabid(collab.id));
									setSelectedCollabId(collab.id);
								}}
								isCollaboration={true}
								isMember={isMember}
								data={collab}
								goalId={goal?.id}
								className={
									selectedCollabId === collab.id ? "border-2 border-main" : ""
								}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default CollabList;
