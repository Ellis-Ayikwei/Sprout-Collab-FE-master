import DotLoader from "components/DotLoader";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Card from "../components/card";
import fetcher from "../helpers/fetcher";

const GoalCatergories = () => {
	const [goalTypes, setGoalTypes] = useState([]);

	const { data, isLoading } = useSWR(`/goal_types`, fetcher);
	useEffect(() => {
		if (data) {
			setGoalTypes(data);
		}
	}, [data]);

	return (
		<div className="goal-types !items-center justify-center">
			{isLoading && <DotLoader />}
			{!isLoading && goalTypes.length === 0 && (
				<p>You Dont have any Goal Types yet</p>
			)}

			{goalTypes.map((goal_T) => (
				<Card
					key={goal_T.id}
					title={goal_T.name}
					description={goal_T.description}
					imageUrl={goal_T.image_url}
					link={`/goals/${goal_T.id}`}
				/>
			))}
		</div>
	);
};

export default GoalCatergories;
