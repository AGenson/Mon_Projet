import * as types from "./constants";


const initialState = {
	//items: []
	items: [{
		id: Date.now(),
		title: "Mon article",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis sem rhoncus tortor sollicitudin consectetur nec vel tellus. Mauris in malesuada urna, in imperdiet sem. Ut viverra augue at mi consectetur suscipit. Fusce finibus dui erat, eu pulvinar libero imperdiet vitae. Sed fermentum dictum sodales. Sed vehicula est ut mi luctus pharetra. Sed maximus odio mollis varius lobortis. Nulla facilisi. Aenean posuere nisl eget enim ornare commodo.",
		url: "http://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
		price: 99,
		quantity: 10
	},{
		id: Date.now()+1,
		title: "Un autre article",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis sem rhoncus tortor sollicitudin consectetur nec vel tellus. Mauris in malesuada urna, in imperdiet sem. Ut viverra augue at mi consectetur suscipit. Fusce finibus dui erat, eu pulvinar libero imperdiet vitae. Sed fermentum dictum sodales. Sed vehicula est ut mi luctus pharetra. Sed maximus odio mollis varius lobortis. Nulla facilisi. Aenean posuere nisl eget enim ornare commodo.",
		url: "https://fr.cdn.v5.futura-sciences.com/buildsv6/images/mediumoriginal/6/5/2/652a7adb1b_98148_01-intro-773.jpg",
		price: 19,
		quantity: 5
	}],
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

