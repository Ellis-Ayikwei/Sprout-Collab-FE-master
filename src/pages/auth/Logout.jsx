import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetLoginData } from "../../redux/authActions/LoginSlice";

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();



	return (
		<button
			onClick={logoutHandler}
			className="flex gap-2 rounded-full m-2 
					font-semibold w-2/5 px-4 
					py-2 shadow-md justify-center
					items-center
					hover:text-blue-400 hover:bg-white
					transition duration-200 ease-in"
		>
			Logout
		</button>
	);
};

export default Logout;

