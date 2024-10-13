import React from "react";
import MyGoals from "../components/goals/MyGoals";
import MyProjects from "../components/projects/MyProjects";
import MyTasks from "../components/task/MyTasks";

const HomeLoggedIn = () => {
	return (
		<div className="goal-details-container">
			<header
				className="goal-description"
				style={{
					padding: "15px",
					alignItems: "center",
					height: "auto",
					fontSize: "20px",
					fontWeight: "bold",
				}}
			>
				Set your goals high, and don’t stop till you get there. 🌟
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<div>
					<MyGoals />
				</div>
				<div>
					<MyProjects />
				</div>
				<div>
					<MyTasks />
				</div>
			</div>
		</div>
	);
};

export default HomeLoggedIn;
