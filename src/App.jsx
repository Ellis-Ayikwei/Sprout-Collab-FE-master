import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import GoalCatergories from "./pages/GoalCatergory";
import GoalDetails from "./pages/goalDetailPage";
import Goals from "./pages/GoalsPage";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import ProjectPage from "./pages/ProjectPage";
import SeTT from "./pages/SettingsPage";
import store, { persistor } from "./redux/store";

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
			<Route
				path="home"
				element={<HomeLoggedIn />}
			/>
			<Route
				path="sett"
				element={<SeTT />}
			/>

			<Route
				path="goal-details/:goalId"
				element={<GoalDetails />}
			/>
			<Route
				path="goals/:typeId"
				element={<Goals />}
			/>
			<Route
				path="/projects/:projectId/tasks"
				element={<ProjectPage />}
			/>
			<Route
				path="/goal-catergories"
				element={<GoalCatergories />}
			/>

			<Route
				path="*"
				element={<NoPage />}
			/>
		</Route>
	)
);
const App = () => {
	return (
		<div className="App mt-20">
			<ThemeProvider>
				<Provider store={store}>
					<PersistGate
						loading={null}
						persistor={persistor}
					>
						<RouterProvider router={router} />
						<ToastContainer />
					</PersistGate>
				</Provider>
			</ThemeProvider>
		</div>
	);
};

export default App;
