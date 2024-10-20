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
	const navigate = useNavigate();
	const { typeId } = useParams();
	const dispatch = useDispatch();

	const { goals, goalsStatus, goalsError } = useSelector(
		(state) => state.goals
	);
	const { types, typesStatus } = useSelector((state) => state.goalTypes);

	
	useEffect(() => {
		
		if (typesStatus === "idle") {
			dispatch(fetchGoalTypes());
		}
	}, [dispatch, typesStatus]);

	const filteredGoals = goals?.filter((goal) => goal.type === typeId);
	const type = types?.find((t) => t.id === typeId);

	const goalIds = filteredGoals?.map((goal) => goal.id);

	return (
		<div className="goals-page">
			<SubNav
				title={`goals in the ${type?.name} category`}
				addedComponent={<AddGoalButton TypeData={type} />}
			/>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
					gap: "0.6rem",
					justifyContent: "flex-start",
					alignContent: "flex-start",
					height: "60vh",
				}}
				className="goal-cards"
			>
				{goalsStatus === "loading" && <DotLoader />}
				{goalsStatus !== "loading" &&
					filteredGoals?.map((goal) => {
						return (
							<GenericCard
								key={goal.id}
								title={goal.name}
								description={goal.description}
								icon={Rocket}
								duration={goal.duration}
								collaborationCount={goal.all_collaborations?.length}
								dateCreated={goal.created_at.split("T")[0]}
								memberCount={goal.all_members?.length}
								onClick={() => navigate(`/goal-details/${goal.id}`)}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default GoalsPage;
