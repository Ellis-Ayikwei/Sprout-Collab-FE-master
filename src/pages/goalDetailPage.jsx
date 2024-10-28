import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import CollabList from "../components/collabs/collabs";
import SubNav from "../components/navigations/SubNav";
import ProjectList from "../components/projects/ProjectList";
import Resources from "../components/resources/Resources";
import fetcher from "../helpers/fetcher";

const GoalDetails = () => {
	const { goalId } = useParams();
	const [goal, setGoal] = useState();

	const { data: goalData, error } = useSWR(`/goals/${goalId}`, fetcher);

	useEffect(() => {
		if (goalData) {
			setGoal(goalData);
		}
	}, [goalData]);

	// useEffect(() => {
	// 	return () => {
	// 		dispatch(setCollabid(""));
	// 	};
	// }, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="goal-details-container">
			<Suspense fallback={<div>Loading...</div>}>
				<SubNav
					title={goal?.name}
					members={goal?.all_members?.length}
					collabs={goal?.all_collaborations?.length}
					projects={goal?.all_projects?.length}
					tasks={goal?.all_tasks?.length}
				/>
				<div className="h-screen w-full flex flex-col justify-start items-start ">
					<div className="flex items-center justify-center w-full bg-white rounded-full px-5 py-2 text-main shadow h-16 mb-0">
						{goalData?.description}
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-2 mt-2">
						<div className="h-full md:h-[90%] xl:h-[90%]">
							<CollabList goal={goalData} />
						</div>
						<div className="h-full md:h-[90%] xl:h-[90%]">
							<ProjectList goal={goalData} />
						</div>
						<div className="h-full md:h-[90%] xl:h-[90%] ">
							<Resources goal={goalData} />
						</div>
					</div>
				</div>
			</Suspense>
		</div>
	);
};

export default GoalDetails;
