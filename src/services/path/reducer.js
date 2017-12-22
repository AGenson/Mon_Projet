import * as types from "./constants";


const initialState = {
	value: types.INIT_PATH
};


export default function reducer(state = initialState, action)
{
	var {value} = state;

	switch (action.type) {

		case types.PATH_RESET_PATH:
			value = types.INIT_PATH

			return {
				...state,
				value: value
			};

		case types.PATH_CHANGE_PATH:
			value = action.payload

			return {
				...state,
				value: value
			};

		default:
			return state;

	}
};

