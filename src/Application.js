import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom';

import Main from "./components/main/Main";
import Connection from "./components/connection/Connection";
import PrivateRoute from "./components/PrivateRoute";

import AppBar from 'material-ui/AppBar';


class Application extends Component {

	render() {
		return (	
			<div className="App" style={{height: "100%"}}>
				<Switch>
					<Route path="/connection" component={Connection}/>
					<PrivateRoute path="/:sub_path" component={Main}/>
					<Redirect to="/store"/>
				</Switch>
				<footer>
					<AppBar position="static" zDepth={3} color="default" showMenuIconButton={false} style={{bottom: 0}}/>
				</footer>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	log_status: state.users.logged
});


const mapActionsToProps = (dispatch) => ({

});


export default withRouter(connect(mapStateToProps, mapActionsToProps)( Application ));
