/*************  ✨ Codeium Command 🌟  *************/
import { lazy, Suspense, useEffect, useState } from "react";
import React from "react";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";

const Card = lazy(() => import("../components/card"));
const DotLoader = lazy(() => import("components/DotLoader"));

const GoalCatergories = () => {
	const [goalTypes, setGoalTypes] = useState([]);

	const { data, isLoading } = useSWR(`/goal_types`, fetcher);
	useEffect(() => {
		if (data) {
			setGoalTypes(data);
			console.log("goalTypes", goalTypes);
		}
	}, [data]);

	return (
		<div className="goal-types !items-center justify-center">
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
		</div>
	);
};

export default GoalCatergories;


/******  8ff3383c-ac0a-41b2-bb3b-4174e5317a3e  *******/