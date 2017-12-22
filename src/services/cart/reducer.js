import * as types from "./constants";


const initialState = {
	items: []
};


export default function reducer(state = initialState, action)
{
	var {items} = state;

	switch (action.type) {

		case types.CART_ADD_PRODUCT:
			items.push(
				{
					id: action.payload,
					quantity: 1
				}
			);

			return {
				...state,
				items: items
			};

		case types.CART_REMOVE_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload){
					arr.splice(i, 1);
				}
			})

			return {
				...state,
				items: items
			};

		case types.CART_INCREMENT_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload){
					arr[i].quantity += 1;
				}
			})

			return {
				...state,
				items: items
			};

		case types.CART_DECREMENT_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload && elt.quantity !== 1){
					arr[i].quantity -= 1;
				}
			})

			return {
				...state,
				items: items
			};

		case types.CART_VALID_CART:
			return {
				...state,
				items: []
			};

		default:
			return state;

	}
};

