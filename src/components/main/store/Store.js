import React, { Component } from "react";

import {
	Route,
	Switch
} from 'react-router-dom';

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

export default Store;
