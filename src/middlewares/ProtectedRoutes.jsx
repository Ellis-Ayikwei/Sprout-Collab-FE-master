// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

	return isLoggedIn ? (
		children
	) : (
		<Navigate
			to="/login"
			state={{ from: location }}
		/>
	);
};

export default ProtectedRoute;
