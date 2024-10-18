import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../helpers/configEndpoints";
import CollabImage from "../../images/collabb.png";
import { fetchCollaborations, setCollabid } from "../../redux/collabSlice";
// @ts-ignore
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";
import AddCollabButton from "./AddCollabButton";

const useFetchAllCollaborationMembers = (collabIds) => {
	const [collaborationMembers, setCollaborationMembers] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCollaborationMembersData = async () => {
			console.log("started a new fetch");
			try {
				const promises = collabIds.map((collabId) =>
					axiosInstance.get(`collaborations/${collabId}/collaboration_members`)
				);
				const results = await Promise.all(promises);
				const collabData = results.reduce((acc, res, index) => {
					acc[collabIds[index]] = res.data;
					return acc;
				}, {});
				setCollaborationMembers(collabData);
			} catch (err) {
				setError(err);
			}
		};

		if (collabIds.length > 0) {
			fetchCollaborationMembersData();
		}
	}, []);

	return { collaborationMembers, error };
};

const CollabList = ({ goal }) => {
	const dispatch = useDispatch();
	const collaborations = useSelector(
		// @ts-ignore
		(state) => state.collaborations.collaborations
	);
	// @ts-ignore
	const status = useSelector((state) => state.collaborations.status);
	// @ts-ignore
	const error = useSelector((state) => state.collaborations.error);

	useEffect(() => {
		if (goal?.id) {
			// @ts-ignore
			dispatch(fetchCollaborations(goal.id));
		}
	}, [dispatch, goal]);

	const sortedCollaborations = useMemo(
		() => [...collaborations].sort(),
		[collaborations]
	);

	const collabIds = collaborations.map((collab) => collab.id);
	const { collaborationMembers } = useFetchAllCollaborationMembers(collabIds);
	console.log("the colab membs", collaborationMembers);

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5 px-2">
			<div className="w-full flex items-center justify-between">
				<h2>Collaborations</h2>
				{goal && <AddCollabButton goalId={goal.id} />}
			</div>
			<div className="mt-6 flex flex-col items-center justify-start h-full w-full p-2 gap-2">
				{status === "loading" && (
					<div className="flex justify-center mx-auto items-center">
						<DotLoader />
					</div>
				)}
				{status === "failed" && <div className="error-message">{error}</div>}
				{status === "succeeded" && sortedCollaborations.length === 0 && (
					<p>No collaborations found for this goal. Create a new one.</p>
				)}
				{status === "succeeded" &&
					sortedCollaborations.length > 0 &&
					sortedCollaborations.map((collab) => {
						const membersCount = collaborationMembers[collab.id]?.length || 0;
						const isMember = collaborationMembers[collab.id]?.some(
							(member) => member.user_id === localStorage.getItem("userid")
						);
						console.log("is member", isMember);

						return (
							// @ts-ignore
							<GenericCard
								key={collab.id}
								title={collab.name}
								description={collab.description}
								icon={CollabImage}
								// icon={}
								memberCount={membersCount}
								status={collab.status}
								dateCreated={collab.created_at.split("T")[0]}
								onClick={() => dispatch(setCollabid(collab.id))}
								join={true}
								isMember={isMember}
								data={collab}
								goalId={goal?.id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default CollabList;
