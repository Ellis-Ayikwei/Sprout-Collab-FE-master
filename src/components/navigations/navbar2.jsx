"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePreferences } from "../../contexts/PreferenceContext";
import logo from "../../images/sclogo-alone.png";

import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Example = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { showPrefs } = usePreferences();
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

	const NavItems = () => {
		return (
			<div className={`lg:flex lg:flex-1 gap-2 lg:justify-end `}>
				{!isLoggedIn && (
					<NavLink
						to="/register"
						onClick={() => console.log("hello")}
						className="btn--outline menu-item rounded-3xl text-"
					>
						Get Started
					</NavLink>
				)}
				{!isLoggedIn && (
					<NavLink
						to="/login"
						className="btn--primary rounded-3xl"
					>
						Login
					</NavLink>
				)}
				{isLoggedIn && (
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-4">
							<p>Ellis</p>
							<img
								className="h-10 w-10 rounded-full shadow border-main border-2"
								src="https://avatars.githubusercontent.com/u/57622665?v=4"
								alt="Atilwind Logo"
							/>
						</div>
						<div>
							<button
								type="button"
								className="btn--primary menu-item rounded-3xl"
							>
								<FontAwesomeIcon icon={faBell} />
							</button>
						</div>
						<NavLink
							to="/logout"
							className="btn--primary menu-item rounded-3xl"
						>
							Logout
						</NavLink>
					</div>
				)}
				{isLoggedIn && (
					<button
						onClick={showPrefs}
						className="btn--primary menu-item rounded-3xl"
					>
						<FontAwesomeIcon icon={faGear} />
					</button>
				)}
			</div>
		);
	};

	return (
		<header className="bg-transparent">
			<nav
				aria-label="Global"
				className="mx-auto flex w-full items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<NavLink
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
					</NavLink>
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
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<NavLink
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
						</NavLink>
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
							<div className="space-y-2 py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Features
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Marketplace
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Company
								</a>
							</div>
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

export default Example;
