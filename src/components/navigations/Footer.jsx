import React from "react";
import logo from "../../images/sclogo-alone.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

// import '../styles/sass/Footer.scss';

const Footer = () => {
	return (
		<footer className="flex bg-transparent shadow-md shadow-main">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-2">
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						<p>Copyright &copy; {new Date().getFullYear()} Sprout Collab</p>
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						<p>Version 1.0</p>
					</span>
					</span>
					<div className="mb-6 md:mb-0">
						<a
							href="https://flowbite.com/"
							className="flex items-center"
						>
							<img
								src={logo}
								className="h-8 me-3"
								alt="Sprout Collab Logo"
							/>
							<p className="logo-text">
								<b>Sprout</b>Collab
							</p>
						</a>
					</div>
					<div className="flex mt-4 sm:justify-center sm:mt-0">
						<a
							href="#"
							className="text-gray-500 hover:text-gray-900"
						>
							<FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
							<span className="sr-only">Facebook page</span>
						</a>

						<a
							href="#"
							className="text-gray-500 hover:text-gray-900 ms-5"
						>
							<FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
							<span className="sr-only">Twitter page</span>
						</a>

						<a
							href="#"
							className="text-gray-500 hover:text-gray-900 ms-5"
						>
							<FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
							<span className="sr-only">GitHub account</span>
						</a>
						<p className="text-gray-500 hover:text-gray-900 ms-5">
							+233 24 819 8722
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
