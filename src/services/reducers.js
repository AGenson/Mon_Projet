import {
	combineReducers
} from "redux";


import users from "./users/reducer";
import products from "./products/reducer";
import cart from "./cart/reducer";
import path from "./path/reducer";

export default
	combineReducers({
		users,
		products,
		cart,
		path
	});

