import Footer from "components/navigations/Footer";
import React from "react";
import { useLocation } from "react-router-dom";

const LayoutsMiddleware = ({ children }) => {
	const location = useLocation();

	return (
		<div>
			{location.pathname !== "/register" && location.pathname !== "/resetpassword" && location.pathname !== "/login" && <SecondNav />}
			{location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/resetpassword" && <Sidebar />}
			<div
				className={
					location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/resetpassword"
						? "Outlet flex-col h-auto relative !justify-start overflow-hidden xl:min-h-screen"
						: ""
				}
			>
				{children}
			</div>
			{location.pathname === "/" && <Footer />}
		</div>
	)
};

export default LayoutsMiddleware;

