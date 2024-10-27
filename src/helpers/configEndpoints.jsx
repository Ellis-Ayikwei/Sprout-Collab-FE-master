import axios from "axios";
// const apiUrl = "http://127.0.0.1:5004/sc/api/v1";
const apiUrl = "https://api.sproutcollab.me/sc/api/v1";

const axiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
		Authorization: `${localStorage.getItem("acccesToken")}`,
		"X-Refresh-Token": `${localStorage.getItem("refreshToken")}`,
	},
});
export default axiosInstance;
