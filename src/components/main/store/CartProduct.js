import React from "react";

import {Card, CardHeader, CardMedia, CardActions} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import {grey500 as grey} from 'material-ui/styles/colors';


const Product = (props) => (
	<Card zDepth={2} style={{margin: "5% 0", textAlign: "justify"}}>
		<CardMedia
			overlay={<CardHeader
						title={<Badge badgeContent={props.quantity}
									style={{padding: "13px 0 0 0"}}
									badgeStyle={{right: "-40px", fontSize: "0.6em", height: 30, width: 30}}
									secondary={true}
								>
									{props.title}
								</Badge>
						}
						titleStyle={{fontSize: "1.9em", margin: "3% 0"}}
						subtitle={"Price: " + props.price + " €"}
						subtitleStyle={{fontSize: "1.5em"}}
						style={{paddingTop: 0, paddingLeft: 90, textAlign: "center"}}
					/>}
		>
			<Paper style={{height: 200, width: "100%", backgroundColor: grey, textAlign: "center"}} /*Problème avec le style, existe apparement ailleurs*/>
				<img src={props.url} height="100%" width="auto" alt="product_image"/>
			</Paper>
		</CardMedia>
		<Divider/>
		<CardActions style={{overflow: "auto"}}>
			<FlatButton
				primary={true}
				style={{height: 40}}
				labelStyle={{fontWeight: "bold"}}
				label="Remove from cart"
				onClick={ e => {props.remove_product(props.id)}}
			/>
			<FloatingActionButton
				mini={true}
				style={{float: "right"}}
				children={<p style={{margin: 0, color: "white", fontSize: "1.8em"}}>+</p>}
				onClick={ e => props.increment_product(props.id)}
				disabled={props.quantity_stock === 0 ? true : false}
			/>
			<FloatingActionButton
				mini={true}
				style={{float: "right"}}
				children={<p style={{margin: 0, color: "white", fontSize: "1.8em"}}>-</p>}
				onClick={ e => props.decrement_product(props.id)}
				disabled={props.quantity === 1 ? true : false}
			/>
		</CardActions>
	</Card>
)

export default Product;
