import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { products_add_product, products_edit_product } from "../../../services/products/actions";
import { path_change_path } from "../../../services/path/actions";

import Dialog from 'material-ui/Dialog';
import { Card, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { grey200, grey500 } from 'material-ui/styles/colors';


class InventoryProduct extends Component {

	constructor(props) {
		super(props);
		if (props.match.params.action !== "create" && props.match.params.action !== "edit"){
			props.path_change_path("/inventory");
		}
		props.match.params.action === "edit" ?
			this.state = {
				...props.product_edit,
				image_loaded: false,
				error_open: false,
				succes_open: false
			}
		:
			this.state = {
				title: "",
				description: "",
				url: "",
				image_loaded: false,
				price: 0,
				error_open: false,
				succes_open: false
			};
	}

	_onChangeTitle(e){
		this.setState({
			title: e.target.value,
			succes_open: false
		});
	}

	_onChangePrice(e){
		var value = parseInt(e.target.value, 10);
		if (isNaN(value) === false || e.target.value === ""){
			this.setState({
				price: value,
				succes_open: false
			});
		}
	}

	_onChangeDescription(e){
		this.setState({
			description: e.target.value,
			succes_open: false
		});
	}

	_onChangeURL(e){
		this.setState({
			url: e.target.value,
			image_loaded: false,
			succes_open: false
		});
	}

	_onLoad(){
		this.setState({
			image_loaded: true
		})
	}

	_onClick(){
		if (this.state.title.length > 0 && this.state.description.length > 0 && this.state.price > 0 && this.state.image_loaded === true){
			if (this.props.match.params.action === "create")
			{
				this.props.products_add_product({
					title: this.state.title,
					description: this.state.description,
					url: this.state.url,
					price: this.state.price
				});
				this.setState({
					title: "",
					description: "",
					url: "",
					image_loaded: false,
					price: 0,
					succes_open: true
				});
			}
			else if (this.props.match.params.action === "edit"){
				this.props.products_edit_product({
					id: this.props.product_edit.id,
					title: this.state.title,
					description: this.state.description,
					url: this.state.url,
					price: this.state.price
				});
				this.props.path_change_path("/inventory");
			}
		}
		else{
			this.setState({
				error_open: true
			})
		}
	}

	_handleClose(){
		this.setState({
			error_open: false
		});
	}

	render(){
		return (
			<div>
				<Dialog
					title="Incomplete Form"
					actions={<FlatButton
						label="Ok"
						primary={true}
						onClick={this._handleClose.bind(this)}
					/>}
					modal={true}
					open={this.state.error_open}
					onRequestClose={this._handleClose.bind(this)}
				>
					You need to fill all the fields, and the URL of the image needs to be correct.
				</Dialog>
				<Snackbar
					open={this.state.succes_open}
					message={"Your product has successfully been added to the inventory."}
					autoHideDuration={6000}
				/>
				<CardTitle title="Product Info" titleStyle={{fontSize: "4em", margin: "20px 0"}}/>
				<Card zDepth={2} style={{margin: "5% 0", textAlign: "justify"}}>
					<Paper style={{height: 200, width: "100%", backgroundColor: grey500, textAlign: "center"}}>
						<img onLoad={this._onLoad.bind(this)} src={this.state.url} height="100%" width="auto" alt="product_image" style={this.state.image_loaded === true ? {} : {display: "none"}}/>
						{
							this.state.image_loaded === false ?
								<CircularProgress size={80} thickness={5} style={{top: 50}}/>
							:
								null
						}
					</Paper>
					<TextField
						type="text"
						onChange={(e) => this._onChangeTitle(e)}
						value={this.state.title}
						hintText="Enter a title for your product"
						floatingLabelText="Title"
						fullWidth={true}
						inputStyle={{paddingLeft: 5, fontSize: 20}}
						hintStyle={{paddingLeft: 5, fontSize: 20}}
						floatingLabelStyle={{paddingLeft: 5}}
					/>
					<TextField
						type="text"
						onChange={(e) => this._onChangePrice(e)}
						value={this.state.price > 0 ? this.state.price : ""}
						hintText="Price"
						floatingLabelText="Enter a price (--€)"
						fullWidth={true}
						inputStyle={{paddingLeft: 5, fontSize: 20}}
						hintStyle={{paddingLeft: 5, fontSize: 20}}
						floatingLabelStyle={{paddingLeft: 5}}
					/>
					<TextField
						type="text"
						onChange={(e) => this._onChangeURL(e)}
						value={this.state.url}
						hintText="Enter a URL for the image of your product"
						floatingLabelText="Image URL"
						fullWidth={true}
						inputStyle={{paddingLeft: 5, fontSize: 20}}
						hintStyle={{paddingLeft: 5, fontSize: 20}}
						floatingLabelStyle={{paddingLeft: 5}}
					/>
					<TextField
						type="text"
						onChange={(e) => this._onChangeDescription(e)}
						value={this.state.description}
						hintText="Write a little description about your product."
						floatingLabelText="Description"
						fullWidth={true}
						multiLine={true}
						rows={10}
						rowsMax={10}
						textareaStyle={{backgroundColor: grey200, padding: 5, fontSize: 20, textAlign: "justify"}}
						floatingLabelStyle={{paddingLeft: 5}}
					/>
				</Card>
				<RaisedButton
					type="button"
					onClick={this._onClick.bind(this)}
					label={this.props.match.params.action === "edit" ? "Edit Product" : "Create Product"}
					primary={true}
					style={{margin: 20, height: '50px'}}
					labelStyle={{fontSize: '1.2em', top: 15}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	product_edit: state.products.product_edit
});


const mapActionsToProps = (dispatch) => ({
	products_add_product: bindActionCreators(products_add_product, dispatch),
	products_edit_product: bindActionCreators(products_edit_product, dispatch),
	path_change_path: bindActionCreators(path_change_path, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( InventoryProduct );
