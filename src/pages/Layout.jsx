import Footer from "components/navigations/Footer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SecondNav from "../components/navigations/navbar2";
import Sidebar from "../components/navigations/Sidebar";
import AllProviders from "../contexts/allProviders";
import SeTT from "./SettingsPage";

const Layout = () => {
	const location = useLocation();
	const [showAside, setShowAside] = useState(false);
	const [showFooter, setShowFooter] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const load = useSelector((state) => state.loading.load);

	useEffect(() => {
		setShowAside(
			location.pathname !== "/register" &&
				location.pathname !== "/login" &&
				location.pathname !== "/"
		);
		setShowNav(
			location.pathname !== "/register" && location.pathname !== "/login"
		);
		setShowFooter(location.pathname === "/");
	}, [location.pathname]);

	const [isopen, setIsopen] = useState(false);
	const toggle = () => {
		setIsopen(!isopen);
	};
	return (
		<>
			<AllProviders>
				{load && <div className="main-loader"></div>}

				{showNav && <SecondNav />}
				{showAside && <Sidebar />}
				<div
					className={
						showAside
							? "Outlet flex-col h-full relative !justify-start overflow-hidden lg:min-h-screen mt-5"
							: ""
					}
				>
					<Outlet />
				</div>
				<Footer />
				<SeTT />
			</AllProviders>
		</>
	);
};

export default Layout;
