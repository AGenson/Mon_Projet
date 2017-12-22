import React, { Component } from "react";

import {
	Route,
	Switch
} from 'react-router-dom';

import { connect } from 'react-redux';
//import { bindActionCreators } from "redux";

import Paper from 'material-ui/Paper';

import Articles from "./Articles";
import Cart from "./Cart";


class Store extends Component {
	render(){
		return (
			<div style={{margin: "0px 25%", textAlign: 'center'}}>
				<Paper id="hello" zDepth={5} style={{padding: "20px 15%"}}>
					<Switch>
						<Route exact path="/store" component={Articles}/>
						<Route path="/store/cart" component={Cart}/>
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

export default connect(mapStateToProps, mapActionsToProps)( Store );
