import React, { useEffect } from "react";
import MyGoals from "../components/goals/MyGoals";
import MyProjects from "../components/projects/MyProjects";
import MyTasks from "../components/task/MyTasks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeLoggedIn = () => {
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn]);

	return (
		<div className="w-full h-full flex flex-col !justify-start ">
			{/* <div
				aria-hidden="true"
				className="absolute opacity-70 inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
				/>
			</div> */}
			<div className="flex items-center justify-center w-full bg-white rounded-full px-5 py-2 text-main shadow h-16 mb-0">
				Set your goals high, and don’t stop till you get there. 🌟
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-2">
				<div
					className="h-full md:h-[90%] xl:h-[90%]"
					id="mygoals"
				>
					<MyGoals />
				</div>
				<div
					className="h-full md:h-[90%] xl:h-[90%]"
					id="myprojects"
				>
					<MyProjects />
				</div>
				<div
					className="h-full md:h-[90%] xl:h-[90%]"
					id="mytasks"
				>
					<MyTasks />
				</div>
			</div>
			<div
				aria-hidden="true"
				className="absolute opacity-70 inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-10"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	);
};

export default HomeLoggedIn;
