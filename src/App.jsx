import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import router from "Router/routes";
import "./App.scss";
import store, { persistor } from "./redux/store";

// const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<Route
// 			path="/"
// 			element={<Layout />}
// 		>
// 			<Route
// 				index
// 				element={<LandingPage />}
// 			/>
// 			<Route
// 				path="login"
// 				element={<LoginPage />}
// 			/>
// 			<Route
// 				path="register"
// 				element={<RegisterPage />}
// 			/>
// 			<Route
// 				path="home"
// 				element={<HomeLoggedIn />}
// 			/>
// 			<Route
// 				path="sett"
// 				element={<SeTT />}
// 			/>

// 			<Route
// 				path="goal-details/:goalId"
// 				element={<GoalDetails />}
// 			/>
// 			<Route
// 				path="goals/:typeId"
// 				element={<Goals />}
// 			/>
// 			<Route
// 				path="/projects/:projectId/tasks"
// 				element={<ProjectPage />}
// 			/>
// 			<Route
// 				path="/goal-catergories"
// 				element={<GoalCatergories />}
// 			/>

// 			<Route
// 				path="*"
// 				element={<NoPage />}
// 			/>
// 		</Route>
// 	)
// );
const App = () => {
	return (
		<div className="App mt-16">
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
