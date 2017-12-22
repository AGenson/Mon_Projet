import React, { Component } from "react";

import { connect } from 'react-redux';

import {
	Route,
	Redirect
} from 'react-router-dom';


class PrivateRoute extends Component {

	render(){
		var {log_status, component: MyComponent, ...rest} = this.props
		return (
			<Route {...rest} render={props => (
				log_status ? (
					<MyComponent {...props}/>
				) : (
					<Redirect to={{
						pathname: '/connection',
						state: { from: props.location }
					}}/>
				)
			)}>
			</Route>
		);
	}
}


const mapStateToProps = (state) => ({
	log_status: state.users.logged
});


const mapActionsToProps = (dispatch) => ({
	//
});

export default connect(mapStateToProps, mapActionsToProps)( PrivateRoute );
