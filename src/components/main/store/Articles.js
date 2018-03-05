import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { products_increment_product, products_decrement_product } from "../../../services/products/actions";
import products_filter from "../../../services/products/selector";
import { cart_add_product, cart_increment_product, cart_decrement_product } from "../../../services/cart/actions";
import { path_change_path } from "../../../services/path/actions";

import {CardTitle, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

import Product from "../Product";


class Articles extends Component {

	state = {
		added_to_cart: false
	}

	_add_product(id){
		var bool = true;
		this.props.cart.forEach((elt) => {
			if (elt.id === id){
				bool = false
			}
		})
		if (bool){
			this.props.cart_add_product(id);
			this.props.products_decrement_product(id);
			this.setState({ added_to_cart: true });
		}
	}

	_increment_product(id){
		this.props.cart_increment_product(id);
		this.props.products_decrement_product(id);
		this.setState({});
	}

	_decrement_product(id, quantity){
		this.props.cart_decrement_product(id);
		if (quantity !== 1){
			this.props.products_increment_product(id);
		}
		this.setState({});
	}

	_product_in_cart(id){
		var product = {
			exist: false,
			obj: null
		};
		this.props.cart.forEach((elt) => {
			if (elt.id === id){
				product = {
					exist: true,
					obj: elt
				};
			}
		})
		return product;
	}

	render(){
		return (
			<div>
				<Snackbar
					open={this.state.added_to_cart}
					message={"Your product has successfully been added to the inventory."}
					autoHideDuration={4000}
					onRequestClose={ () => this.setState({ added_to_cart: false })}
				/>
				<CardTitle title="Store" titleStyle={{fontSize: "4em", margin: "20px 0"}}/>
				{
					this.props.articles.length > 0 ?
						this.props.articles.map((item, i) => {
							var product_in_cart = this._product_in_cart(item.id)
							return (
									<Product
										{...item}
										quantity={product_in_cart.exist === true ? product_in_cart.obj.quantity : 0}
										key={"store_" + item.id}
										quantity_action={{
											exist: product_in_cart.exist,
											increment_product: this._increment_product.bind(this),
											decrement_product: this._decrement_product.bind(this)
										}}
										action1={{
											exist: true,
											action: this._add_product.bind(this),
											text: "Add"
										}}
										action2={{
											exist: false,
											action: null,
											text: ""
										}}
									/>
								);
						})
					:
						<CardText style={{marginTop: 50, fontSize: "1.5em"}}>
							No article seemed to be registered, or the store might be empty.
						</CardText>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	articles: products_filter(state, "quantity"),
	cart: state.cart.items
});


const mapActionsToProps = (dispatch) => ({
	cart_increment_product: bindActionCreators(cart_increment_product, dispatch),
	cart_decrement_product: bindActionCreators(cart_decrement_product, dispatch),
	cart_add_product: bindActionCreators(cart_add_product, dispatch),
	products_increment_product: bindActionCreators(products_increment_product, dispatch),
	products_decrement_product: bindActionCreators(products_decrement_product, dispatch),
	path_change_path: bindActionCreators(path_change_path, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( Articles );
