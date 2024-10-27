import React, { useEffect, useState } from "react";
import { FaBars, FaTh, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import MyCollabs from "../collabs/myCollabs";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const toggle = () => {
		if (isMobile) {
			setIsOpen(!isOpen);
		}
	};

	const handleResize = () => {
		setIsMobile(window.innerWidth < 768);
		if (window.innerWidth >= 768) {
			setIsOpen(true); // Ensure sidebar is open on larger screens
		} else {
			setIsOpen(false); // Default to closed on smaller screens
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize(); // Set initial state
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const menuItems = [
		{
			path: "/home",
			name: "Home",
			icon: <FaTh />,
		},
		{
			path: "/goal-catergories",
			name: "Goals",
			icon: <FaUserAlt />,
		},
	];

	return (
		<div
			className="main--aside"
			style={{
				zIndex: isOpen && isMobile ? "1" : "0",
			}}
		>
			<div
				style={{
					width: isOpen || !isMobile ? "200px" : "50px",
					// zIndex: (isOpen && isMobile) ? "1" : "0",
				}}
				className="sidebar overflow-y-hidden"
			>
				<div className="top-section">
					<p
						style={{ display: isOpen || !isMobile ? "block" : "none" }}
						className="logo"
					>
						<b>Sprout</b>Collab
					</p>
					<div
						style={{
							marginLeft: isOpen || !isMobile ? "30px" : "0px",
							paddingLeft: isOpen || !isMobile ? "40px" : "0px",
							// display: isOpen || !isMobile ? "none" : "block"
						}}
						className="bars"
					>
						<FaBars onClick={toggle} />
					</div>
				</div>
				<div className="nav-section">
					{menuItems.map((item, index) => (
						<NavLink
							to={item.path}
							key={index}
							className="link"
							// activeClassName="active"
						>
							<div className="icondd">{item.icon}</div>
							<div
								style={{ display: isOpen || !isMobile ? "block" : "none" }}
								className="link-text"
							>
								{item.name}
							</div>
						</NavLink>
					))}
				</div>
				<hr />
				My Collabs
				<div
					style={{
						margin: "10px",
						display: isOpen || !isMobile ? "block" : "none",
					}}
					className="flex !justify-center !items-center   h-[60%] overflow-y-scroll gap-2 py-2"
				>
					<MyCollabs />
				</div>
			</div>
			{/* <div className="version">Sprout Collab 1.0.0</div> */}
		</div>
	);
};

export default Sidebar;
