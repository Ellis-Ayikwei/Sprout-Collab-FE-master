import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../helpers/configEndpoints";
import CollabImage from "../../images/collabb.png";
import { fetchCollaborations, setCollabid } from "../../redux/collabSlice";
import Loader from "../Loader";
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
		(state) => state.collaborations.collaborations
	);
	const status = useSelector((state) => state.collaborations.status);
	const error = useSelector((state) => state.collaborations.error);

	useEffect(() => {
		if (goal?.id) {
			dispatch(fetchCollaborations(goal.id));
		}
	}, [dispatch, goal]);

	const sortedCollaborations = useMemo(
		() => [...collaborations].sort(),
		[collaborations]
	);

	const collabIds = collaborations.map((collab) => collab.id);
	const { collaborationMembers } = useFetchAllCollaborationMembers(collabIds);

	return (
		<div className="list-container">
			<div
				style={{
					display: "flex",
					alignContent: "center",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px",
				}}
			>
				<h2>Collaborations</h2>
				{goal && <AddCollabButton goalId={goal.id} />}
			</div>
			<div className="generic-cards">
				{status === "loading" && <Loader />}
				{status === "failed" && <div className="error-message">{error}</div>}
				{status === "succeeded" && sortedCollaborations.length === 0 && (
					<p>No collaborations found for this goal. Create a new one.</p>
				)}
				{status === "succeeded" &&
					sortedCollaborations.length > 0 &&
					sortedCollaborations.map((collab) => {
						const membersCount = collaborationMembers[collab.id]?.length || 0;

						return (
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
							/>
						);
					})}
			</div>
		</div>
	);
};

export default CollabList;
