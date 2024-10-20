import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import CollabList from "../components/collabs/collabs";
import SubNav from "../components/navigations/SubNav";
import ProjectList from "../components/projects/ProjectList";
import Resources from "../components/resources/Resources";
import fetcher from "../helpers/fetcher";
import { setCollabid } from "../redux/collabSlice";

const filterProjects = (projectsData, goalId) => {
	return projectsData.filter((project) => project.goal_id === goalId);
};

const filterTasks = (tasksData, goalId) => {
	return tasksData.filter((task) => task.goal_id === goalId);
};

const GoalDetails = () => {
	const { goalId } = useParams();
	const [goal, setGoal] = useState({
		goalData: null,
		goalMembers: null,
		collaborations: null,
		projects: null,
		tasks: null,
	});

	const dispatch = useDispatch();
	const { data: goalData, error } = useSWR(`/goals/${goalId}`, fetcher);
	const { data: goalMembers } = useSWR(
		`/goals/${goalId}/goal_members`,
		fetcher
	);
	const { data: collaborations } = useSWR(
		`/goals/${goalId}/collaborations`,
		fetcher
	);
	const { data: projectsData } = useSWR(`/projects`, fetcher);
	const { data: tasksData } = useSWR(`/tasks`, fetcher);

	useEffect(() => {
		if (
			goalData &&
			collaborations &&
			goalMembers &&
			projectsData &&
			tasksData !== undefined
		) {
			const projects = filterProjects(projectsData, goalId);
			const tasks = filterTasks(tasksData, goalId);
			setGoal({ goalData, goalMembers, collaborations, projects, tasks });
		}
	}, [goalData, collaborations, goalMembers, projectsData, tasksData]);

	useEffect(() => {
		return () => {
			dispatch(setCollabid(""));
		};
	}, []);

	const memoizedGoalName = useMemo(
		() => goal.goalData?.name || "Loading...",
		[goal.goalData]
	);
	const memoizedMemberCount = useMemo(
		() => goal.goalMembers?.length || 0,
		[goal.goalMembers]
	);
	const memoizedCollaborationCount = useMemo(
		() => goal.collaborations?.length || 0,
		[goal.collaborations]
	);
	const memoizedProjectCount = useMemo(
		() => goal.projects?.length || 0,
		[goal.projects]
	);
	const memoizedTaskCount = useMemo(
		() => goal.tasks?.length || 0,
		[goal.tasks]
	);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="goal-details-container">
			<Suspense fallback={<div>Loading...</div>}>
				<SubNav
					title={memoizedGoalName}
					members={memoizedMemberCount}
					collabs={memoizedCollaborationCount}
					projects={memoizedProjectCount}
					tasks={memoizedTaskCount}
				/>
				<div className="h-screen w-full flex flex-col justify-start items-start">
					<div className="flex items-center justify-center w-full bg-white rounded-full px-5 py-2 text-main shadow h-16 mb-0">
						{goalData?.description}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow w-full max-h-[70%] mt-5">
						<CollabList goal={goalData} />
						<ProjectList goal={goalData} />
						<Resources goal={goalData} />
					</div>
				</div>
			</Suspense>
		</div>
	);
};

export default GoalDetails;

