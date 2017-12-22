
export default function products_filter(state, filter)
{
	var product_items = state.products.items;
	var cart_items = state.cart.items;

	switch (filter) {

		case "cart":
			return product_items.filter((obj) => {
					var bool = false;

					cart_items.forEach((elt) => {
						if (elt.id === obj.id){
							bool = true;
						}
					})

					return bool;
				});

		case "quantity":
			return product_items.filter((obj) => obj.quantity > 0);

		default:
			return state;

	}
};
