const { default: axiosInstance } = require("helpers/configEndpoints");

const joinCollab = async (collaborationData, collaborationId) => {
	try {
		const response = await axiosInstance.post(
			`collaborations/${collaborationId}/members`,
			JSON.stringify(collaborationData)
		);
		return response;
	} catch (error) {
		console.error("Error joining collaboration:", error);
	}
};

export default joinCollab;
