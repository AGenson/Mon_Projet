import * as types from "./constants";


export function path_reset_path() {
	return (dispatch, state) => {

		dispatch({
			type: types.PATH_RESET_PATH
		});

	}
}

export function path_change_path(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PATH_CHANGE_PATH,
			payload: payload
		});

	}
}
