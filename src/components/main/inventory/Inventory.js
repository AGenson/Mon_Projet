import React, { Component } from "react";

import {
	Route,
	Switch
} from 'react-router-dom';

import { connect } from 'react-redux';
//import { bindActionCreators } from "redux";

import Paper from 'material-ui/Paper';

import InventoryList from "./InventoryList";
import InventoryProduct from "./InventoryProduct";


class Inventory extends Component {
	render(){
		return (
			<div style={{margin: "0px 25%", textAlign: 'center'}}>
				<Paper id="hello" zDepth={5} style={{padding: "20px 15%"}}>
					<Switch>
						<Route exact path="/inventory" component={InventoryList}/>
						<Route path="/inventory/product/:action" component={InventoryProduct}/>
					</Switch>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	//log_status: state.users.logged
});


const mapActionsToProps = (dispatch) => ({
	//users_log_out_user: bindActionCreators(users_log_out_user, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( Inventory );
