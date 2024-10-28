import axios from "axios";
// const apiUrl = "http://127.0.0.1:5004/sc/api/v1";
const apiUrl = "https://api.sproutcollab.me/sc/api/v1";

const axiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `${localStorage.getItem("acccesToken")}`,
		"X-Refresh-Token": `${localStorage.getItem("refreshToken")}`,
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = localStorage.getItem("acccesToken");
		config.headers["X-Refresh-Token"] = localStorage.getItem("refreshToken");
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			localStorage.removeItem("acccesToken");
			localStorage.removeItem("refreshToken");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;


