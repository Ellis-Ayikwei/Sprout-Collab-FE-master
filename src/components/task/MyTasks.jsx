import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import GenericCard from "../../components/task/genericCard";
import axiosInstance from "../../helpers/configEndpoints";
import fetcher from "../../helpers/fetcher";
import Rocket from "../../images/rocket.png";
import { fetchtaskCheckList, setTaskMData } from "../../redux/ChecklistSlice";
import { setTaskData } from "../../redux/TaskSlice";
import { setCollabid } from "../../redux/collabSlice";
import DotLoader from "../DotLoader";

// Sample data for GenericCard and MyGoalCard

const MyTasks = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userTasks, setUserTasks] = useState([]);
	const [taskMemberCounts, setTaskMemberCounts] = useState({});
	const currentUserId = localStorage.getItem("userid");

	const {
		data: userTaskData,
		error,
		isLoading,
	} = useSWR(`/tasks/mytasks/${currentUserId}`, fetcher);

	const getTaskMemberCount = async (taskId) => {
		try {
			const response = await axiosInstance.get(`/tasks/${taskId}/task_members`);
			return response.data.length;
		} catch (error) {
			console.error(error);
			return 0;
		}
	};
	const getProject = async (projectId) => {
		try {
			const response = await axiosInstance.get(`/projects/${projectId}`);
			return response.data;
		} catch (error) {
			console.error(error);
			return 0;
		}
	};

	useEffect(() => {
		if (userTaskData) {
			setUserTasks(userTaskData);
		}
	}, [userTaskData]);

	useEffect(() => {
		const fetchTaskMemberCounts = async () => {
			const counts = await Promise.all(
				userTasks.map(async (userTask) => ({
					taskId: userTask.task.id,
					count: await getTaskMemberCount(userTask.task.id),
				}))
			);
			setTaskMemberCounts(
				counts.reduce((acc, { taskId, count }) => {
					console.log("the accumulator", acc);
					acc[taskId] = count;
					return acc;
				}, {})
			);
		};

		if (userTasks.length > 0) {
			fetchTaskMemberCounts();
		}
	}, [userTasks]);

	const handleClick = async (task) => {
		dispatch(fetchtaskCheckList(task.task.id))
		const theProject = await getProject(task.task.project_id);
		dispatch(setCollabid(theProject.collab_id));
		dispatch(setTaskData(task.task));
		navigate(`/projects/${task.task.project_id}/tasks/`);
	};

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5">
			<div className="inline-block border-[2px] justify-center w-20 rounded-full border-main border-solid"></div>

			<h3 className="text-lg font-semibold mt-2">My Tasks</h3>
			<div className="mt-6 flex flex-col items-center justify-start h-auto w-full p-2 gap-2 overflow-y-scroll">

			{isLoading && (
				<div className="flex justify-center mx-auto items-center">
					<DotLoader />
				</div>
			)}
				{!isLoading && userTasks.length === 0 && (
					<p className="text-center text-gray-500" >You Dont have any tasks yet yet</p>
				)}

				{userTasks.map((userTask) => (
					<GenericCard
						key={userTask.task.id}
						progress={userTask.task_member.no_of_approvals ?? 0}
						title={userTask.task.name}
						description={userTask.task.description}
						icon={Rocket}
						memberCount={taskMemberCounts[userTask.task.id]}
						dateCreated={userTask.task.created_at.split("T")[0]}
						onClick={() => handleClick(userTask)}
					/>
				))}
			</div>
		</div>
	);
};

export default MyTasks;
