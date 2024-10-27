import ProtectedRoute from "middlewares/ProtectedRoutes";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import GoalDetails from "../pages/goalDetailPage";
import Goals from "../pages/GoalsPage";
import HomeLoggedIn from "../pages/HomeLoggedIn";
import LandingPage from "../pages/LandingPage";
import Layout from "../pages/Layout";
import NoPage from "../pages/NoPage";
import ProjectPage from "../pages/ProjectPage";
import SeTT from "../pages/SettingsPage";
import GoalCatergories from "../pages/GoalCatergory";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}
		>
			<Route
				index
				element={<LandingPage />}
			/>
			<Route
				path="login"
				element={<LoginPage />}
			/>
			<Route
				path="register"
				element={<RegisterPage />}
			/>

			{/* Protected Routes */}
			<Route
				path="home"
				element={
					<ProtectedRoute>
						<HomeLoggedIn />
					</ProtectedRoute>
				}
			/>
			<Route
				path="sett"
				element={
					<ProtectedRoute>
						<SeTT />
					</ProtectedRoute>
				}
			/>
			<Route
				path="goaldetails/:goalId"
				element={
					<ProtectedRoute>
						<GoalDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="goals/:typeId"
				element={
					<ProtectedRoute>
						<Goals />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/projects/:projectId/tasks"
				element={
					<ProtectedRoute>
						<ProjectPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/goalcategories"
				element={
					<ProtectedRoute>
						<GoalCatergories />
					</ProtectedRoute>
				}
			/>

			<Route
				path="*"
				element={<NoPage />}
			/>
		</Route>
	)
);

export default router;
