import React, { Component } from "react";

import {
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { users_log_out_user } from "../../services/users/actions";
import { products_resest_edit_product } from "../../services/products/actions";
import { path_reset_path, path_change_path } from "../../services/path/actions";

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import Inventory from "./inventory/Inventory";
import Store from "./store/Store";


class Main extends Component {

	state = {
		show_menu: false
	}

	_show_menu(){
		this.setState(prevState => ({
			show_menu: !prevState.show_menu
		}));
	}

	_log_out(){
		this.props.path_reset_path();
		this.props.users_log_out_user();
		this.setState({
			show_menu: false
		});
	}

	_onClickMenu(elt){
		this.setState({
			show_menu: false
		});
		if (this.props.section_path === "/inventory/product/edit"){
			this.props.products_resest_edit_product();
		}
		this.props.path_change_path(elt);
	}

	render(){
		if (!this.props.log_status){
			return (
				<Redirect to={{
					pathname: '/',
					state: { from: this.props.location }
				}}/>
			);
		}
		else if (this.props.section_path !== this.props.location.pathname){
			return (
				<Redirect to={{
					pathname: this.props.section_path,
					state: { from: this.props.location }
				}}/>
			);
		}
		else {
			return (
				<div style={{minHeight: "100%", backgroundColor: "rgba(70, 70, 0, 0.85)"}}>
					<header>
						<AppBar
							position="static"
							zDepth={3}
							title="My Web Store"
							titleStyle={{fontWeight: "bold", fontSize: "2em"}}
							iconElementRight={
								<div>
									<span style={{marginBottom: 50, fontSize: "1.5em"}}>
										{this.props.user.firstname} {this.props.user.lastname}
									</span>
									<IconButton>
										<ActionExitToApp/>
									</IconButton>
								</div>
							}
							onLeftIconButtonClick={this._show_menu.bind(this)}
							onRightIconButtonClick={this._log_out.bind(this)}
							color="default"/>
					</header>
					<Drawer
						docked={false}
						width={300}
						open={this.state.show_menu}
						onRequestChange={(show_menu) => this.setState({show_menu})}
					>
						<CardTitle title="Menu" style={{marginBottom: 30}}/>
						<Divider/>
						<MenuItem onClick={ () => this._onClickMenu("/inventory")}>
							Inventory
						</MenuItem>
						<MenuItem onClick={ () => this._onClickMenu("/inventory/product/create")}>Add a product</MenuItem>
						<Divider/>
						<MenuItem onClick={ () => this._onClickMenu("/store")}>Store</MenuItem>
						<MenuItem onClick={ () => this._onClickMenu("/store/cart")}>My Cart</MenuItem>
						<Divider/>
						<MenuItem onClick={this._log_out.bind(this)}>
							Log Out
						</MenuItem>
					</Drawer>
					<div id="body">
						<Switch>
							<Route path="/inventory" component={Inventory}/>
							<Route path="/store" component={Store}/>
						</Switch>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	log_status: state.users.logged,
	section_path: state.path.value,
	user:{
		firstname: state.users.user_logged.firstname,
		lastname: state.users.user_logged.lastname
	}
});


const mapActionsToProps = (dispatch) => ({
	users_log_out_user: bindActionCreators(users_log_out_user, dispatch),
	path_reset_path: bindActionCreators(path_reset_path, dispatch),
	products_resest_edit_product: bindActionCreators(products_resest_edit_product, dispatch),
	path_change_path: bindActionCreators(path_change_path, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( Main );
