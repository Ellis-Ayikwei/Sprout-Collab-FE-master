import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Project from "../../images/project.png";
import { fetchProjects } from "../../redux/ProjectsSlice";
import DotLoader from "../DotLoader";

const GenericCard = lazy(() => import("../task/genericCard"));
const AddProjectButton = lazy(() => import("./AddProjectButton"));

const ProjectList = ({ goal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const collabId = useSelector((state) => state.collaborations.collabid);
	const projects = useSelector((state) => state.projects.projectList);
	const status = useSelector((state) => state.projects.status);
	const error = useSelector((state) => state.projects.error);

	useEffect(() => {
		if (collabId) {
			dispatch(fetchProjects(collabId));
		}
	}, [dispatch, collabId]);

	const handleClick = (projectId) => {
		navigate(`/projects/${projectId}/tasks`);
	};

	const renderProjects = () => {
		if (status === "loading") {
			return <DotLoader />;
		}
		if (!collabId) {
			return <p>Please select a collaboration to view its projects.</p>;
		}
		if (projects.length === 0) {
			return <p>No projects available for the selected collaboration.</p>;
		}
		if (error) {
			return <p>Error: {error.message}</p>;
		}
		return projects.map((project) => (
			<Suspense fallback={<DotLoader key={project?.id} />}>
				<GenericCard
					key={project?.id}
					title={project?.name}
					description={project?.description}
					icon={Project}
					status={project.status}
					dateCreated={project?.created_at.split("T")[0]}
					memberCount={project.all_members?.length}
					onClick={() => handleClick(project?.id)}
				/>
			</Suspense>
		));
	};

	return (
		<div className="flex flex-col justify-start items-center h-full border-2 border-main rounded-3xl py-5 px-2 shadow-xl">
			<div className="w-full flex items-center justify-between">
				<h2>Projects</h2>
				{goal?.id && collabId && (
					<Suspense fallback={<DotLoader />}>
						<AddProjectButton
							goalId={goal?.id}
							collabId={collabId}
						/>
					</Suspense>
				)}
			</div>
			<div className="flex flex-col w-full gap-2 h-96 overflow-y-scroll mt-6 p-2">
				{renderProjects()}
			</div>
		</div>
	);
};

export default ProjectList;
