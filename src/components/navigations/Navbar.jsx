"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { usePreferences } from "../../contexts/PreferenceContext";
import logo from "../../images/sclogo-alone.png";

import { faHomeAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import authAxiosInstance from "helpers/authAxiosInstance";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, signOut } from "../../firebase/firebaseAuthConfig";
import { resetLogin } from "../../redux/authActions/LoginSlice";
import { logoutSuccess } from "../../redux/authActions/authActions";
import { persistor } from "../../redux/store";

const NavBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { showPrefs } = usePreferences();
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	const dispatch = useDispatch();
	const myData = useSelector((state) => state.login.myData);
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			signOut(auth)
				.then(() => {
					console.log("User signed out");
				})
				.catch((error) => {
					console.error("Error during logout:", error);
				});
			const logout = await authAxiosInstance.post("/logout", {});
			if (logout.status === 202) {
				alert("Logged out successfully");
				dispatch(logoutSuccess());
				dispatch(resetLogin());
				localStorage.clear();
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!isLoggedIn) {
			persistor.purge().then(() => persistor.pause());
			localStorage.clear();
			navigate("/login"); // Ensure redirection upon logout
		}
	}, [isLoggedIn, dispatch, navigate]);

	const NavItems = () => {
		return (
			<div className={`lg:flex lg:flex-1 gap-2 lg:justify-end`}>
				{!isLoggedIn && (
					<Link
						to="/register"
						className="btn--outline menu-item rounded-3xl text-"
					>
						Get Started
					</Link>
				)}
				{!isLoggedIn && (
					<Link
						to="/login"
						className="btn--primary rounded-3xl"
					>
						Login
					</Link>
				)}
				{isLoggedIn && (
					<div className="flex items-center space-x-4">
						<div>
							<Link
								to="/home"
								className="btn--primary menu-item rounded-3xl"
							>
								<FontAwesomeIcon icon={faHomeAlt} />
							</Link>
						</div>

						{/* <div>
							<button
								type="button"
								className="btn--primary menu-item rounded-3xl"
								onClick={() => dispatch(showPrefs())}
							>
								<FontAwesomeIcon icon={faBell} />
							</button>
						</div> */}
						<button
							onClick={logoutHandler}
							className="btn--primary menu-item rounded-3xl"
						>
							Logout
						</button>
						<div className="flex items-center space-x-4 rounded-full shadow border-main border-2 pl-1">
							<b>{myData.username}</b>
							{myData.profilePicture ? (
								<img
									className="h-10 w-10 rounded-full shadow border-main border-2"
									src={myData.profilePicture}
									alt={`${myData.username}'s Profile`}
								/>
							) : (
								<div className="px-2 py-1 rounded-full shadow border-main border-2 text-main text- justify-center items-center">
									<FontAwesomeIcon icon={faUserAlt} />
								</div>
							)}
						</div>
					</div>
				)}
				<button
					type="button"
					className="btn--secondary menu-item rounded-3xl"
					onClick={() =>
						alert(
							"if you need assistance  reset password and make changes to you profile kilndly send a whatsapp message to +233 248138722"
						)
					}
				>
					Help
				</button>
				{/* {isLoggedIn && (
					<button
						onClick={() => dispatch(showPrefs())}
						className="btn--primary menu-item rounded-3xl"
					>
						<FontAwesomeIcon icon={faGear} />
					</button>
				)} */}
			</div>
		);
	};

	return (
		<header className="sticky flex top-0 z-50">
			<nav className="mx-auto fixed z-10 flex w-full items-center justify-between p-6 lg:px-8">
				<div className="flex lg:flex-1">
					<Link
						to="/"
						className="main-logo"
						style={{ textDecoration: "none" }}
					>
						<img
							className="logo"
							src={logo}
							alt="Logo"
						/>
						<p className="logo-text">
							<b>Sprout</b>Collab
						</p>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon
							aria-hidden="true"
							className="h-6 w-6"
						/>
					</button>
				</div>

				<div className="hidden lg:flex">
					<NavItems />
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<div className="fixed inset-0" />
				<DialogPanel className="fixed inset-y-0 right-0 top-0 w-full overflow-y-auto sm:z-50 md:z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link
							to="/"
							className="main-logo"
							style={{ textDecoration: "none" }}
						>
							<img
								className="logo"
								src={logo}
								alt="Logo"
							/>
							<p className="logo-text">
								<b>Sprout</b>Collab
							</p>
						</Link>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon
								aria-hidden="true"
								className="h-6 w-6"
							/>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6">
								<NavItems />
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default NavBar;
