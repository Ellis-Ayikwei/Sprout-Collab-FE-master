import DotLoader from "components/DotLoader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import taskImg from "../../images/task.png";
import { fetchtaskCheckList } from "../../redux/ChecklistSlice";
import { fetchtasks, setTaskData } from "../../redux/TaskSlice";
import AddTaskButton from "./addTaskbutton";
import GenericCard from "./genericCard";

const Tasks = ({ projectID }) => {
	const dispatch = useDispatch();
	const taskList = useSelector((state) => state.tasks.taskList);
	const status = useSelector((state) => state.tasks.status);
	const error = useSelector((state) => state.tasks.error);

	const { data: project } = useSWR(`/projects/${projectID}`, fetcher);

	const handleTaskClick = (task) => {
		dispatch(fetchtaskCheckList(task.id));
		dispatch(setTaskData(task));
	};

	useEffect(() => {
		dispatch(fetchtasks(projectID));
	}, [projectID]);

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5 px-2">
			<div className="w-full flex items-center justify-between">
				<h2>Tasks</h2>
				<AddTaskButton
					projectID={projectID}
					goalID={project?.goal_id}
				/>
			</div>
			<div className="mt-6 flex flex-col items-center justify-center h-full w-full p-2 gap-2">
				{status === "loading" && <DotLoader />}
				{status === "failed" && (
					<div className="error-message">{error.message}</div>
				)}
				{status === "succeeded" && taskList.length === 0 && (
					<p>No tasks found.</p>
				)}
				{status === "succeeded" &&
					taskList.length > 0 &&
					taskList.map((task) => (
						<GenericCard
							icon={taskImg}
							title={task.name}
							description={task.description}
							status={task.status}
							dateCreated={task?.created_at.split("T")[0]}
							duration={6}
							onClick={() => handleTaskClick(task)}
						/>
					))}
			</div>
		</div>
	);
};

export default Tasks;
