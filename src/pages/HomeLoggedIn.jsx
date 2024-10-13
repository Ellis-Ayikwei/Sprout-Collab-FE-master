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
					alignItems: "centre",
					height: "auto",
					fontsize: "20px",
					fontWeight: "bold",
				}}
			>
				Set your goals high, and don’t stop till you get there. 🌟
			</header>
			<div className="goal-content">
				<MyGoals />
				<MyProjects />
				<MyTasks />
			</div>
		</div>
	);
};

export default HomeLoggedIn;
