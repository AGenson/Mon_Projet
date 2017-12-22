import * as types from "./constants";


export function cart_add_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CART_ADD_PRODUCT,
			payload: payload
		});

	}
}

export function cart_remove_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CART_REMOVE_PRODUCT,
			payload: payload
		});

	}
}

export function cart_increment_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CART_INCREMENT_PRODUCT,
			payload: payload
		});

	}
}

export function cart_decrement_product(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.CART_DECREMENT_PRODUCT,
			payload: payload
		});

	}
}

export function cart_valid_cart() {
	return (dispatch, state) => {

		dispatch({
			type: types.CART_VALID_CART
		});

	}
}
