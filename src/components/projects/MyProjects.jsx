import fetcher from "helpers/fetcher";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import axiosInstance from "../../helpers/configEndpoints";
import Rocket from "../../images/rocket.png";
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";
import ProjectIMg from "../../images/project.png";
import { setCollabid } from "../../redux/collabSlice";


const MyProjects = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [projectMemberCount, setProjectMemberCount] = useState({}); // Object for member counts

	const {
		data: myprojectList,
		error,
		isLoading,
	} = useSWR(`project/myprojects/${localStorage.getItem("userid")}`, fetcher);



	const getGoalMemberCount = async (projectId) => {
		try {
			const response = await axiosInstance.get(
				`/projects/${projectId}/project_members`
			);
			return response.data.length;
		} catch (error) {
			console.error(error); // Handle errors here (log or set default count)
			return 0;
		}
	};

	// Fetch member counts for all projects
	const fetchGoalMemberCounts = async () => {
		try {
			const counts = await Promise.all(
				myprojectList?.map(async (myproject) => ({
					projectId: myproject.project.id, // Consistent naming
					count: await getGoalMemberCount(myproject.project.id),
				}))
			);
			setProjectMemberCount(
				counts.reduce((acc, { projectId, count }) => {
					acc[projectId] = count;
					return acc;
				}, {})
			);
		} catch (error) {
			console.error(error); // Handle errors here (log or display error message)
		}
	};

	// Polling for member counts
	useEffect(() => {
		if (myprojectList?.length > 0) {
			fetchGoalMemberCounts();
		}
		// 1 second polling
	}, [myprojectList]); // Re-run when myprojectList changes

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5">
			<div className="inline-block border-[2px] justify-center w-20 rounded-full border-orange-400 border-solid"></div>

			<h3 className="text-lg font-semibold mt-2">My Projects</h3>

			<div className="mt-6 flex flex-col items-center justify-start h-auto w-full p-2 gap-2 overflow-y-scroll">
				{isLoading && (
					<div className="flex justify-center mx-auto items-center">
						<DotLoader />
					</div>
				)}
				{myprojectList?.length === 0 && (
					<p className="text-center text-gray-500">
						You Dont have any projects yet
					</p>
				)}

				{myprojectList?.map((project) => (
					<GenericCard
						key={project.project.id}
						progress={project.project_member.progress ?? 0}
						title={project.project.name}
						description={project.project.description}
						icon={ProjectIMg}
						collaborationCount={0}
						memberCount={projectMemberCount[project.project.id] || 0} // Default to 0 if missing
						dateCreated={project.project.created_at.split("T")[0]}
						onClick={() => {navigate(`/projects/${project.project.id}/tasks/`) 
							dispatch(setCollabid(project.project.collab_id))
						}}
						
					/>
				))}
			</div>
		</div>
	);
};

export default MyProjects;
