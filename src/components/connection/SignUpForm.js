import React from "react";

import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';


const SignUpForm = (props) => (
	<Card zDepth={0} style={{margin: "5% 15% 15% 15%"}}>
		<TextField
			type="text"
			onChange={(e) => props.onChangeText("firstname", e)}
			value={props.form.firstname.text}
			errorText={props.form.firstname.valid ? "" : "This field is required."}
			hintText="Firstname"
			floatingLabelText="Firstname"
			fullWidth={true}
			hintStyle={{fontSize: 20}}
			inputStyle={{fontSize: 20}}
		/>
		<TextField
			type="text"
			onChange={(e) => props.onChangeText("lastname", e)}
			value={props.form.lastname.text}
			errorText={props.form.lastname.valid ? "" : "This field is required."}
			hintText="Lastname"
			floatingLabelText="Lastname"
			fullWidth={true}
			hintStyle={{fontSize: 20}}
			inputStyle={{fontSize: 20}}
		/>
		<TextField 
			type="email"
			onChange={(e) => props.onChangeText("email", e)}
			value={props.form.email.text}
			hintText="E-mail"
			floatingLabelText="Email Address"
			errorText={props.form.email.valid ? "" : "The e-mail address is not valid."}
			fullWidth={true}
			hintStyle={{fontSize: 20}}
			inputStyle={{fontSize: 20}}
		/>
		<TextField
			type="password"
			onChange={(e) => props.onChangeText("password", e)}
			value={props.form.password.text}
			errorText={props.form.password.valid ? "" : "Use at least 8 characters, with at least 1 uppercase, 1 lowercase and 1 number"}
			hintText="Password"
			floatingLabelText="Password"
			fullWidth={true}
			hintStyle={{fontSize: 20}}
			inputStyle={{fontSize: 20}}
		/>
	</Card>
)

export default SignUpForm;
