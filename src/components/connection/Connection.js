import React, { Component } from "react";

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { users_add_user, users_login_user } from "../../services/users/actions";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {red800 as red} from 'material-ui/styles/colors';


class Connection extends Component {

	state = {
		sign_in: true,
		form: {
			firstname: {
				text: "",
				valid: true
			},
			lastname: {
				text: "",
				valid: true
			},
			email: {
				text: "",
				valid: true
			},
			password: {
				text: "",
				valid: true
			}
	},
		slideIndex: 0
	}

	_onClick_change_form(bool){
		if (this.state.sign_in !== bool){
			this.setState({
				sign_in: bool,
				form: {
					firstname: {
						text: "",
						valid: true
					},
					lastname: {
						text: "",
						valid: true
					},
					email: {
						text: "",
						valid: true
					},
					password: {
						text: "",
						valid: true
					}
				}
			});
		}
	}

	_onChange_text(elt, e){
		var obj = this.state.form;
		var value = e.target.value;

		switch (elt){
			case "firstname":
				obj.firstname.text = value;
				break;

			case "lastname":
				obj.lastname.text = value;
				break;

			case "email":
				obj.email.text = value;
				break;

			case "password":
				obj.password.text = value;
				break;

			default:
				obj = undefined;
				break;
		}

		if (obj){
			this.setState({
				form: obj
			});
		}
	}

	_onSubmit(){
		var obj = this.state.form;
		var bool = false;

		obj.email.valid = obj.email.text.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ? true : false;
		obj.password.valid = obj.password.text.length > 0 ? true : false;

		if (this.state.sign_in === false){
			obj.firstname.valid = obj.firstname.text.length > 0 ? true : false;
			obj.lastname.valid = obj.lastname.text.length > 0 ? true : false;
		}

		bool = obj.email.valid && obj.password.valid && obj.firstname.valid && obj.lastname.valid;

		if (bool === true) {
			if (this.state.sign_in === false){
				this.props.users_add_user({
					email: obj.email.text,
					password: obj.password.text,
					firstname: obj.firstname.text,
					lastname: obj.lastname.text
				});
			}
			this.props.users_login_user({
				email: obj.email.text,
				password: obj.password.text
			});
		}
		else {
			this.setState({
				form: obj
			});
		}
	}

	_handleChange_slide = (value) => {
		this.setState({
			slideIndex: value
		});
	};

	render() {
		if (this.props.log_status){
			return (
				<Redirect to={{
					pathname: '/',
					state: { from: this.props.location }
				}}/>
			);
		}
		else {
			return (
				<div id="connection" style={{height: "100%", backgroundColor: "rgba(0, 70, 70, 0.85)"}}>
					<header style={{textAlign: 'center'}}>
						<AppBar zDepth={5} color="primary" showMenuIconButton={false} title="Welcome" style={{height: 80}} titleStyle={{padding: 10,fontSize: 50}}/>
					</header>
					<div style={{margin: '0px 25% 0px 25%', textAlign: 'center'}}>
						<Paper zDepth={3} style={{backgroundColor: red, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}} rounded={false}>
							<CardText style={{fontSize: 20}}>
								You have to sign in to enter the website.
							</CardText>
						</Paper>
						<Paper zDepth={5} rounded={true} style={{borderBottomLeftRadius: 150, borderBottomRightRadius: 150}}>
							<AppBar position="static" zDepth={3} color="default" showMenuIconButton={false} title={
								<Tabs
									onChange={this._handleChange_slide}
									value={this.state.slideIndex}
									style={{padding: 10}}
								>
									<Tab
										label="Sign In"
										value={0}
										onActive={this._onClick_change_form.bind(this, true)}
										style={{fontSize: '0.8em'}}
									/>
									<Tab
										label="Sign Up"
										value={1}
										onActive={this._onClick_change_form.bind(this, false)}
										style={{fontSize: '0.8em'}}
									/>
								</Tabs>
							}>
							</AppBar>
							<SwipeableViews
								index={this.state.slideIndex}
								onChangeIndex={this._handleChange_slide}
							>
								<div>
									<SignInForm
										onChangeText={this._onChange_text.bind(this)}
										form={this.state.form}
									/>
								</div>
								<div className="slide">
									<SignUpForm
										onChangeText={this._onChange_text.bind(this)}
										form={this.state.form}
									/>
								</div>
							</SwipeableViews>
							<RaisedButton
								type="button"
								onClick={this._onSubmit.bind(this)}
								label={this.state.sign_in ? "Sign In" : "Sign Up"}
								primary={true}
								style={{margin: 20, height: '50px'}}
								labelStyle={{fontSize: '1.2em', top: 15}}
							/>
						</Paper>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	log_status: state.users.logged
});


const mapActionsToProps = (dispatch) => ({
	users_add_user: bindActionCreators(users_add_user, dispatch),
	users_login_user: bindActionCreators(users_login_user, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)( Connection );
