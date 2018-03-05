import React, { Component } from "react";

import {
	Route,
	Switch
} from 'react-router-dom';

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

export default Inventory;
