import { purgeStoredState } from "redux-persist";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logoutSuccess = () => async (dispatch) => {
	const config = {
		key: "root",
		storage: localStorage,
	};
	await purgeStoredState(config);
	dispatch({ type: LOGOUT_SUCCESS });
};
