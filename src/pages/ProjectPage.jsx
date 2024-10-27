import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import AddCollabButton from "../components/collabs/AddCollabButton";
import SubNav from "../components/navigations/SubNav";
import Resources from "../components/resources/Resources";
import TaskMembersDone from "../components/task/TMembersDone";
import ChecklistBox from "../components/task/TaskCheckList";
import Tasks from "../components/task/Tasks";
import fetcher from "../helpers/fetcher";

const ProjectPage = () => {
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const [projectdata, setProjectdata] = useState(null);
	const { data, error, isLoading } = useSWR(`projects/${projectId}`, fetcher);
	useEffect(() => {
		if (data) {
			setProjectdata(data);
		}
	}, []);

	return (
		<div>
			<SubNav
				title={projectdata?.name}
				addedComponent={<AddCollabButton />}
			/>
			{/* <TaskList projectID={projectId} /> */}
			<div className="h-screen w-full flex flex-col justify-start items-start">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 flex-grow mt-0 w-full max-h-[70%] ">
					<Tasks projectID={projectId} />
					<div className="h-full">
						<ChecklistBox />
						<p
							style={{
								textAlign: "center",
								marginTop: "10px",
								marginBottom: "10px",
							}}
						>
							Members Done with this task <FontAwesomeIcon icon={faArrowDown} />
							:
						</p>
						<TaskMembersDone />
					</div>
					<Resources />
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;
