import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { products_increment_product, products_decrement_product, products_start_edit_product, products_remove_product } from "../../../services/products/actions";
import { path_change_path } from "../../../services/path/actions";

import {CardTitle, CardText} from 'material-ui/Card';

import Product from "../Product";


class InventoryList extends Component {

	_increment_product(id){
		this.props.products_increment_product(id);
		this.setState({});
	}

	_decrement_product(id){
		this.props.products_decrement_product(id);
		this.setState({});
	}

	_start_edit_product(id){
		this.props.products_start_edit_product(id);
		this.props.path_change_path("/inventory/product/edit");
		this.setState({});
	}

	_remove_product(id){
		this.props.products_remove_product(id);
		this.setState({});
	}

	render(){
		return (
			<div>
				<CardTitle title="Inventory" titleStyle={{fontSize: "4em", margin: "20px 0"}}/>
				{
					this.props.products.length > 0 ?
						this.props.products.map((item, i) => {
							return (
									<Product
										{...item}
										key={"inventory_" + item.id}
										quantity_action={{
											exist: true,
											increment_product: this._increment_product.bind(this),
											decrement_product: this._decrement_product.bind(this)
										}}
										action1={{
											exist: true,
											action: this._start_edit_product.bind(this),
											text: "Modifier"
										}}
										action2={{
											exist: true,
											action: this._remove_product.bind(this),
											text: "Supprimer"
										}}
									/>
								);
						})
					:
						<CardText style={{marginTop: 50, fontSize: "1.5em"}}>
							No article seemed to be registered.
						</CardText>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.products.items
});


const mapActionsToProps = (dispatch) => ({
	products_increment_product: bindActionCreators(products_increment_product, dispatch),
	products_decrement_product: bindActionCreators(products_decrement_product, dispatch),
	products_start_edit_product: bindActionCreators(products_start_edit_product, dispatch),
	products_remove_product: bindActionCreators(products_remove_product, dispatch),
	path_change_path: bindActionCreators(path_change_path, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( InventoryList );
