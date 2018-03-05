import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import registerServiceWorker from './registerServiceWorker';

import {
	Provider
} from "react-redux";

import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './services';



const store = configureStore({});

const muiTheme = getMuiTheme({
	"textField": {
		"errorColor": Colors.red500,
		"focusColor": Colors.blue600,
		"hintColor": Colors.grey400,
		"textColor": Colors.blue800,
		"floatingLabelColor": Colors.blue200,
		"disabledTextColor": Colors.grey400
	},
	"appBar": {
		"textColor": Colors.grey100
	},
	"avatar": {
		"backgroundColor": Colors.red500
	},
	"bottomNavigation": {
		"backgroundColor": Colors.grey200
	},
	"card": {
		"titleColor": Colors.red600
	},
	"datePicker": {
		"selectColor": Colors.grey300
	},
	"floatingActionButton": {
		"iconColor": Colors.grey100,
		"secondaryColor": Colors.grey200,
		"secondaryIconColor": Colors.grey600
	},
	"drawer": {
		"color": Colors.grey200,
		"width": {}
	},
	"menu": {
		"backgroundColor": Colors.red500
	},
	"raisedButton": {
		"primaryTextColor": Colors.grey200,
		"color": Colors.grey200,
		"secondaryColor": Colors.blue300,
		"secondaryTextColor": Colors.grey200,
		"disabledColor": Colors.grey200
	},
	"snackbar": {
		"actionColor": Colors.red400,
		"textColor": Colors.grey100
	},
	"tableHeaderColumn": {
		"textColor": Colors.red400
	},
	"palette": {
		"primary1Color": Colors.red600,
		"accent1Color": Colors.blueGrey200,
		"accent3Color": Colors.grey400,
		"accent2Color": Colors.grey500,
		"alternateTextColor": Colors.grey600,
		"secondaryTextColor": Colors.blueGrey500,
		"pickerHeaderColor": Colors.grey200,
		"textColor": Colors.grey800,
		"disabledColor": Colors.grey600,
		"primary2Color": Colors.grey500
	},
	"dropDownMenu": {
		"accentColor": Colors.red300
	},
	"gridTile": {
		"textColor": Colors.grey600
	},
	"icon": {
		"color": Colors.grey400
	},
	"slider": {
		"trackColor": Colors.grey400,
		"trackColorSelected": Colors.grey300,
		"rippleColor": Colors.blue500,
		"selectionColor": Colors.red600
	},
	"timePicker": {
		"accentColor": fade(Colors.red400, 0.9)
	},
	"tabs": {
		"textColor": fade(Colors.grey200, 0.94),
		"selectedTextColor": Colors.grey700
	},
	"paper": {
		"backgroundColor": Colors.grey50
	},
	"ripple": {
		"color": fade(Colors.grey400, 0.87)
	},
	"table": {
		"backgroundColor": Colors.grey50
	},
	"tableRow": {
		"hoverColor": Colors.grey300,
		"stripeColor": fade(Colors.blue200, 0.42),
		"selectedColor": Colors.grey200
	},
	"menuItem": {
		"hoverColor": fade(Colors.red400, 0.09),
		"selectedTextColor": Colors.red600
	},
	"inkBar": {
		"backgroundColor": Colors.grey300
	}
});

const App = (props) => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Provider store={store}>
			<Router>
				<Application/>
			</Router>
		</Provider>
	</MuiThemeProvider>
)



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
