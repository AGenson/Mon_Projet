import * as types from "./constants";


const initialState = {
	user_logged: {},
	logged: false,
	items: [
		{
			id: Date.now(),
			email: "admin@gmail.com",
			firstname: "admin",
			lastname: "",
			password: "admin"
		}
	]
};

export default function reducer(state = initialState, action)
{
	var {items} = state;

	switch(action.type)
	{
		case types.USERS_ADD_USER:
			items.push(
				{
					id: Date.now(),
					email: action.payload.email,
					firstname: action.payload.firstname,
					lastname: action.payload.lastname,
					password: action.payload.password
				}
			);

			return {
				...state,
				items: items
			};

		case types.USERS_LOGIN_USER:
			var user = {};

			items.forEach((elt) => {
				if (action.payload.email === elt.email){
					user = elt;
				}
			})

			if (action.payload.password === user.password){
				return {
					...state,
					items: items,
					user_logged: user,
					logged: true
				};
			}
			else{
				return {
					...state,
					items: items
				};
			}

		case types.USERS_LOGOUT_USER:
			return {
				...state,
				user_logged: {},
				logged: false
			};

		default:
			return state;
	}
};
