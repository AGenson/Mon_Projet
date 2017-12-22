import products_filter from "../products/selector";


export default function final_price(state)
{
	var cart_items = products_filter(state, "cart");
	var {cart} = state;
	var quantity = 0;
	var sum = 0;

	cart_items.forEach((elt) => {
		quantity = 0;
		cart.items.forEach((elt2) => {
			if (elt.id === elt2.id){
				quantity = elt2.quantity;
			}
		})
		sum += (elt.price * quantity);
	})

	return sum;
};
