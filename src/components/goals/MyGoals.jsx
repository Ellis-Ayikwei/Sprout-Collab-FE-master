import fetcher from "helpers/fetcher";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import axiosInstance from "../../helpers/configEndpoints";
import Rocket from "../../images/rocket.png";
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";

const MyGoals = () => {
	const userId = localStorage.getItem("userid");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [goalMemberCount, setGoalMemberCount] = useState({}); // Object for member counts

	const {
		data: mygoalsList,
		error,
		isLoading,
	} = useSWR(`/goals/mygoals/${localStorage.getItem("userid")}`, fetcher);

	// Fetch member count for a specific goal
	const getGoalMemberCount = async (goalId) => {
		try {
			const response = await axiosInstance.get(`/goals/${goalId}/goal_members`);
			return response.data.length;
		} catch (error) {
			console.error(error); // Handle errors here (log or set default count)
			return 0;
		}
	};

	// Fetch member counts for all goals
	const fetchGoalMemberCounts = async () => {
		try {
			const counts = await Promise.all(
				mygoalsList?.map(async (mygoal) => ({
					goalId: mygoal.goal.id, // Consistent naming
					count: await getGoalMemberCount(mygoal.goal.id),
				}))
			);
			setGoalMemberCount(
				counts.reduce((acc, { goalId, count }) => {
					acc[goalId] = count;
					return acc;
				}, {})
			);
		} catch (error) {
			console.error(error); // Handle errors here (log or display error message)
		}
	};

	// Polling for member counts
	useEffect(() => {
		if (mygoalsList?.length > 0) {
			fetchGoalMemberCounts();
		}
	}, [mygoalsList]);

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5">
			<div className="rounded-full border-2 border-blue-400 w-20 flex justify-center"></div>

			<h3 className="text-lg font-semibold mt-2">My Goals</h3>
			<div className="mt-6 flex flex-col items-center justify-start h-auto w-full p-2 gap-2 overflow-y-scroll">
				{isLoading && (
					<div className="flex justify-center items-center mx-auto">
						<DotLoader />
					</div>
				)}
				{!isLoading && mygoalsList?.length === 0 && (
					<p className="text-center text-gray-500">
						You don't have any goals yet
					</p>
				)}
				{mygoalsList?.map((goal, index) => (
					<GenericCard
						key={`${index} - ${goal.goal.id}`}
						progress={goal.goal_member.progress ?? 0}
						title={goal.goal.name}
						description={goal.goal.description}
						icon={Rocket}
						collaborationCount={0}
						progressType="bar"
						memberCount={goalMemberCount[goal.goal.id] || 0} // Default to 0 if missing
						dateCreated={goal.goal.created_at.split("T")[0]}
						onClick={() => navigate(`/goal-details/${goal.goal.id}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default MyGoals;
