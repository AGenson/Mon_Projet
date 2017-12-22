import * as types from "./constants";


export function products_add_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_ADD_PRODUCT,
			payload: payload
		});

	}
}

export function products_start_edit_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_START_EDIT_PRODUCT,
			payload: payload
		});

	}
}

export function products_edit_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_EDIT_PRODUCT,
			payload: payload
		});

	}
}

export function products_resest_edit_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_RESET_EDIT_PRODUCT
		});

	}
}

export function products_remove_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_REMOVE_PRODUCT,
			payload: payload
		});

	}
}

export function products_increment_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_INCREMENT_PRODUCT,
			payload: payload
		});

	}
}

export function products_decrement_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.PRODUCTS_DECREMENT_PRODUCT,
			payload: payload
		});

	}
}
