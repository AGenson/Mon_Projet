import * as types from "./constants";

export function users_add_user(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.USERS_ADD_USER,
			payload: payload
		});
	};
};


export function users_login_user(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.USERS_LOGIN_USER,
			payload: payload
		});
	};
};


export function users_log_out_user() {
	return (dispatch, state) => {
		dispatch({
			type: types.USERS_LOGOUT_USER
		});
	};
};
