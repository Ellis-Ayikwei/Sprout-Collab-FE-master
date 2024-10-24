import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddGoalButton from "../components/goals/addGoalbutton";
import SubNav from "../components/navigations/SubNav";
import GenericCard from "../components/task/genericCard";
import Rocket from "../images/rocket.png";
import { fetchGoals } from "../redux/goalsSlice";
import { fetchGoalTypes } from "../redux/goalTypeSlice";

import DotLoader from "components/DotLoader";

const GoalsPage = () => {
	const { typeId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		goalsList: goals,
		status: goalsStatus,
		error: goalsError,
	} = useSelector((state) => state.goals);
	const { typesList: types, status: typesStatus } = useSelector(
		(state) => state.goalTypes
	);

	useEffect(() => {
		console.log("goalsStatus:", goalsStatus);
		if (goalsStatus === "idle" || goalsStatus === "failed") {
			console.log("Fetching goals...");
			dispatch(fetchGoals());
		}
		console.log("typesStatus:", typesStatus);
		if (typesStatus === "idle" || typesStatus === "failed") {
			console.log("Fetching goal types...");
			dispatch(fetchGoalTypes());
		}
	}, [dispatch, goalsStatus, typesStatus]);

	const filteredGoals = goals?.filter((goal) => goal.type === typeId);
	const type = types?.find((t) => t.id === typeId);

	return (
		<div className="goals-page">
			<SubNav
				title={`goals in the ${type?.name} category`}
				addedComponent={<AddGoalButton TypeData={type} />}
			/>
			<div className=" grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 2xl:grid-cols-5 gap-2 justify-start">
				{goalsStatus === "loading" && <DotLoader />}
				{filteredGoals?.map((goal) => (
					<GenericCard
						key={goal.id}
						title={goal.name}
						description={goal.description}
						icon={Rocket}
						duration={goal.duration}
						collaborationCount={goal.all_collaborations?.length}
						dateCreated={goal.created_at.split("T")[0]}
						memberCount={goal.all_members?.length}
						onClick={() => {
							console.log("Navigating to goal-details...", goal.id);
							navigate(`/goal-details/${goal.id}`);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default GoalsPage;
