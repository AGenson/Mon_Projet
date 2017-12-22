import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { products_increment_product, products_decrement_product } from "../../../services/products/actions";
import products_filter from "../../../services/products/selector";
import final_price from "../../../services/cart/final_price";
import { cart_remove_product, cart_increment_product, cart_decrement_product, cart_valid_cart } from "../../../services/cart/actions";
import { path_reset_path } from "../../../services/path/actions";

import Dialog from 'material-ui/Dialog';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CartProduct from "./CartProduct";


class Cart extends Component {

	state = {
		remove: false,
		id: -1,
		valid: false
	}

	_handle_remove(id){
		this.setState({
			remove: true,
			id: id
		})
	}

	_remove_product(){
		for (var i = 0; i < this._get_quantity(this.state.id); i++){
			this.props.products_increment_product(this.state.id);
		}
		this.props.cart_remove_product(this.state.id);
		this.setState({
			id: -1
		});
	}

	_increment_product(quantity, id){
		if (quantity !== 0){
			this.props.cart_increment_product(id);
		}
		this.props.products_decrement_product(id);
		this.setState({});
	}

	_decrement_product(id){
		this.props.cart_decrement_product(id);
		if (this._get_quantity(id) !== 1){
			this.props.products_increment_product(id);
		}
		this.setState({});
	}

	_get_quantity(id){
		var quantity = -1;

		this.props.cart.forEach((elt) => {
			if (elt.id === id){
				quantity = elt.quantity;
			}
		})

		return quantity;
	}

	render(){
		const actions_remove = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={ () => this.setState({ remove: false})}
			/>,
			<FlatButton
				label="Continue"
				primary={true}
				onClick={() => {
					this._remove_product();
					this.setState({ remove: false})
				}}
			/>
		]
		const actions_valid = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={ () => this.setState({ valid: false})}
			/>,
			<FlatButton
				label="Continue"
				primary={true}
				onClick={() => {
					//Link to payement here
					this.setState({ valid: false});
					this.props.cart_valid_cart();
					this.props.path_reset_path();
				}}
			/>
		]
		return (
			<div>
				<Dialog
					title="Are you sure ?"
					actions={actions_remove}
					modal={true}
					open={this.state.remove}
				>
					Your product will be remove from your cart.
				</Dialog>
				<Dialog
					title="Proceed with payement ?"
					actions={actions_valid}
					modal={true}
					open={this.state.valid}
				>
					Thank you for shopping on our website. Do you want to proceed ?
				</Dialog>
				<CardTitle title="My Cart" titleStyle={{fontSize: "4em", margin: "20px 0"}}/>
				{
					this.props.cart_product.length > 0 ?
						this.props.cart_product.map((item, i) => {
							var quantity = this._get_quantity(item.id)
							return (
									<CartProduct
										{...item}
										quantity_stock={item.quantity}
										quantity={quantity}
										key={"store_" + item.id}
										increment_product= {this._increment_product.bind(this, item.quantity)}
										decrement_product= {this._decrement_product.bind(this)}
										remove_product= {this._handle_remove.bind(this)}
									/>
								);
						})
					:
						<CardText style={{marginTop: 50, fontSize: "1.5em"}}>
							You have no article in your cart.
						</CardText>
				}
				<Card style={{margin: "50px 15% 0 15%"}}>
					<CardText style={{fontSize: "1.5em"}}>
						Total price: {this.props.final_price} €
					</CardText>
					<RaisedButton
						primary={true}
						style={{height: 40, marginBottom: 20}}
						labelStyle={{fontWeight: "bold"}}
						label="Valid your order"
						onClick={ () => this.setState({ valid: true })}
						disabled={this.props.final_price === 0 ? true : false}
					/>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cart_product: products_filter(state, "cart"),
	cart: state.cart.items,
	final_price: final_price(state)
});


const mapActionsToProps = (dispatch) => ({
	cart_increment_product: bindActionCreators(cart_increment_product, dispatch),
	cart_decrement_product: bindActionCreators(cart_decrement_product, dispatch),
	cart_remove_product: bindActionCreators(cart_remove_product, dispatch),
	cart_valid_cart: bindActionCreators(cart_valid_cart, dispatch),
	products_increment_product: bindActionCreators(products_increment_product, dispatch),
	products_decrement_product: bindActionCreators(products_decrement_product, dispatch),
	path_reset_path: bindActionCreators(path_reset_path, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( Cart );
