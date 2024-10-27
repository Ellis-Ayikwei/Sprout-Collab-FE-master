import axios from "axios";
const apiUrl = 'http://127.0.0.1:5004/sc/api/v1/auth';
//const apiUrl = "http://api.sproutcollab.me/sc/api/v1/auth";

const authAxiosInstance = axios.create({
	baseURL: apiUrl,
	headers : {
		'content-type': 'application/json'
	},
});
export default authAxiosInstance;
