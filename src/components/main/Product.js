import React from "react";

import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import {grey500 as grey} from 'material-ui/styles/colors';


const Product = (props) => (
	<Card zDepth={2} style={{margin: "5% 0", textAlign: "justify"}}>
		<Paper style={{height: 200, width: "100%", backgroundColor: grey, textAlign: "center"}}>
			<img src={props.url} height="100%" width="auto" alt="product_image"/>
		</Paper>
		<CardHeader
			title={
				props.quantity_action.exist ?
					<Badge badgeContent={props.quantity} style={{padding: "13px 0 0 0"}} badgeStyle={{right: "-40px", fontSize: "0.6em", height: 30, width: 30}} secondary={true}>{props.title}</Badge>
				:
					<div style={{padding: "13px 0 0 0"}}>{props.title}</div>
			}
			titleStyle={{fontSize: "1.9em", margin: "3% 0"}}
			subtitle={"Price: " + props.price + " €"}
			subtitleStyle={{fontSize: "1.5em"}}
			actAsExpander={true}
			showExpandableButton={true}
			style={{paddingTop: 0}}
		/>
		<Divider/>
		<CardActions style={{overflow: "auto"}}>
			{
				props.action1.exist === true ?
					<FlatButton
						primary={true}
						style={{height: 40}}
						labelStyle={{fontWeight: "bold"}}
						label={props.action1.text}
						onClick={ e => {props.action1.action(props.id)}}
					/>
				:
					null
			}
			{
				props.action2.exist === true ?
					<FlatButton
						primary={true}
						style={{height: 40}}
						labelStyle={{fontWeight: "bold"}}
						label={props.action2.text}
						onClick={ e => {props.action2.action(props.id)}}
					/>
				:
					null
			}
			{
				props.quantity_action.exist ?
					<FloatingActionButton
						mini={true}
						style={{float: "right"}}
						children={<p style={{margin: 0, color: "white", fontSize: "1.8em"}}>+</p>}
						onClick={ e => props.quantity_action.increment_product(props.id)}
					/>
				:
					null
			}
			{
				props.quantity_action.exist ?
					<FloatingActionButton
						mini={true}
						style={{float: "right"}}
						children={<p style={{margin: 0, color: "white", fontSize: "1.8em"}}>-</p>}
						onClick={ e => props.quantity_action.decrement_product(props.id, props.quantity)}
					/>
				:
					null
			}
		</CardActions>
		<CardText expandable={true}>
			{props.description}
		</CardText>
	</Card>
)

export default Product;
