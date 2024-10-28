import axios from "axios";
// const apiUrl = 'http://127.0.0.1:5004/sc/api/v1/auth';
const apiUrl = "https://api.sproutcollab.me/sc/api/v1/auth";

const authAxiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `${localStorage.getItem("acccesToken")}`,
		"X-Refresh-Token": `${localStorage.getItem("refreshToken")}`,
	},
});
export default authAxiosInstance;
