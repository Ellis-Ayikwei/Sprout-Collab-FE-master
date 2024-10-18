import { Facebook, Google } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import DotLoader from "components/DotLoader";
import CheckedSymbol from "components/checkSymbol";
import React from "react";
import authAxiosInstance from "../../helpers/authAxiosInstance";
import logo from "../../images/sclogo-alone.png";
import { SetloginData } from "../../redux/authActions/LoginSlice";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginEmail, setLoginEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isignedUp, setIsignedUp] = useState(false);
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	const myData = useSelector((state) => state.login.myData);
	const [loading, setLoading] = useState(false);
	const [userNameOrEmail, setUserNameOrEmail] = useState("");
	const [error, setError] = useState("");

	const loginHandler = async (event) => {
		event.preventDefault();
		setError("");
	  
		const input = userNameOrEmail.trim();
		const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isUsername = /^[a-zA-Z0-9_.-]{3,}$/;
		const userInput = { email: "", username: "" };
	  
		// Determine if input is email or username
		if (isEmail.test(input)) {
		  userInput.email = input;
		} else if (isUsername.test(input)) {
		  userInput.username = input;
		} else {
		  setError("Invalid input. Please enter a valid username or email.");
		  return;
		}
	  
		// Check for empty password or input
		if (!password) {
		  setError("Please fill in all fields");
		  return;
		}
	  
		const payload = { ...userInput, password };
		console.log("payload", payload);
	  
		try {
		  setLoading(true);
		  const response = await authAxiosInstance.post("/login", payload);
		  await dispatch(SetloginData(response.data));
		} catch (error) {
		  setLoading(false);
		  setError(error.message);
		}
	  };
	  
	  useEffect(() => {
		if (isLoggedIn) {
		  setLoading(false); 
		  navigate("/home");
		}
	  }, [isLoggedIn]);
	  

	return (
		<div className="h-screen flex items-center justify-center">
			<main className="flex flex-col items-center w-full mx-auto">
				<div className="flex items-center text-3xl mb-8">
					<img
						className="w-14 h-14"
						src={logo}
						alt="Logo"
					/>
					<p className="logo-text">
						<b>Sprout</b>Collab
					</p>{" "}
				</div>
				<div className="w-full max-w-md rounded-2xl shadow p-10 items-center">
					<h3 className="text-2xl font-semibold  pt-2 mb-4">Sign In!</h3>
					{/* Inputs */}
					{error && <div>{error}</div>}
					<form className="flex flex-col">
						<input
							type="text"
							className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 m-1 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="Email or Username"
							value={userNameOrEmail}
							onChange={(e) => setUserNameOrEmail(e.target.value)}
							autoComplete="on"
						></input>
						<input
							type="password"
							className=" p-2 rounded-2xl lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 m-1 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="on"
						></input>
						<div className="flex-row-reverse items-center w-full">
							<p className="text-sm justify-end text-right">
								{" "}
								Forgot Password?
							</p>
						</div>
						<button
							onClick={(e) => loginHandler(e)}
							className="flex gap-2 rounded-full m-2 
						font-semibold w-2/5 px-4 
						py-2 shadow-md justify-center
						items-center
						hover:text-blue-400 hover:bg-white
						transition duration-200 ease-in"
						>
							{loading ?
							<DotLoader
								width="w-7"
								height="h-7"
							/>
							:"sign In"
						}
						{isignedUp && (
							<CheckedSymbol
								width="w-7"
								height="h-7"
							/>
						)}
							
						</button>
					</form>
					<div className="flex space-x-2 m-4 items-center justify-center rounded-full border-[3px] border-black-400 hover:border-green-400 p-2">
						<button className="flex gap-2 ">
							<div className="item-center">
								<Google />
							</div>{" "}
							Sign In With Google
						</button>
					</div>
					<div className="flex space-x-2 m-4 items-center justify-center rounded-full border-[3px] border-black-400 hover:border-green-400 p-2">
						<button className="flex gap-2 ">
							<div className="item-center">
								<Facebook />
							</div>{" "}
							Sign In With Facebook
						</button>
					</div>

					<div className="flex flex-row items-center justify-center text-center !gab-6">
						<p className="  text-sm"> Don't have an account?</p>
						<Link
							to="/register"
							className="text-blue-400 ml-1 text-sm font-medium"
						>
							Register
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
