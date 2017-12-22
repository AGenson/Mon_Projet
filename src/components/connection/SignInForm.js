import React from "react";

import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';


const SignInForm = (props) => (
	<Card zDepth={0} style={{margin: "5% 15% 15% 15%", marginBottom: 0}}>
		<TextField
			type="email"
			onChange={(e) => props.onChangeText("email", e)}
			value={props.form.email.text}
			errorText={props.form.email.valid ? "" : "The e-mail address is not valid."}
			hintText="Email Address"
			floatingLabelText="Email Address"
			fullWidth={true}
			hintStyle={{fontSize: 20}}
			inputStyle={{fontSize: 20}}
		/>
		<TextField
			type="password"
			onChange={(e) => props.onChangeText("password", e)}
			value={props.form.password.text}
			errorText={props.form.password.valid ? "" : "The password is not valid."}
			hintText="Password"
			floatingLabelText="Password"
			hintStyle={{fontSize: 20}}
			fullWidth={true}
		/>
	</Card>
)

export default SignInForm;
