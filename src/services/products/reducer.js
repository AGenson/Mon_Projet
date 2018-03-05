import * as types from "./constants";
import default_inventory from "./default_inventory";


const initialState = {
	//items: []
	items: default_inventory,
	product_edit: {}
};


export default function reducer(state = initialState, action)
{
	var {items} = state;
	var {product_edit} = state;

	switch (action.type) {

		case types.PRODUCTS_ADD_PRODUCT:
			items.push(
				{
					id: Date.now(),
					title: action.payload.title,
					description: action.payload.description,
					url: action.payload.url,
					price: action.payload.price,
					quantity: 0
				}
			);

			return {
				...state,
				items: items
			};

		case types.PRODUCTS_START_EDIT_PRODUCT:
			items.forEach((elt) => {
				if (elt.id === action.payload){
					product_edit = elt
				}
			})

			return {
				...state,
				product_edit: product_edit
			};

		case types.PRODUCTS_EDIT_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload.id){
					arr[i] = {
						id: elt.id,
						title: action.payload.title,
						description: action.payload.description,
						url: action.payload.url,
						price: action.payload.price,
						quantity: elt.quantity
					};
				}
			})

			return {
				...state,
				items: items
			};

		case types.PRODUCTS_RESET_EDIT_PRODUCT:
			product_edit = {}

			return {
				...state,
				product_edit: product_edit
			};

		case types.PRODUCTS_REMOVE_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload){
					arr.splice(i, 1);
				}
			})

			return {
				...state,
				items: items
			};

		case types.PRODUCTS_INCREMENT_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload){
					arr[i].quantity += 1;
				}
			})

			return {
				...state,
				items: items
			};

		case types.PRODUCTS_DECREMENT_PRODUCT:
			items.forEach((elt, i, arr) => {
				if (elt.id === action.payload && elt.quantity !== 0){
					arr[i].quantity -= 1;
				}
			})

			return {
				...state,
				items: items
			};

		default:
			return state;

	}
};
