import React, { Component } from 'react';
import Request from './Request';
import { updateUser, updateDisplay, updateMenu } from '../actions/appActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'cookie';

class UserHandler extends Component {
	render() {
		return <div />;
	}
	updateUser(response) {
		this.props.updateUser(response);
	}
	updateDisplay(display) {
		this.props.updateDisplay(display);
	}
	updateMenu(menu) {
		this.props.updateMenu(menu);
	}
	componentWillMount() {
		let url = new URL(window.location).origin + '/api/user';
		let c = cookie.parse(document.cookie);
		let request = new Request('get', url);
		request
			.send()
			.then(result => {
				if (result.status === 200) {
					const response = JSON.parse(result.response);
					this.updateUser(response);
					this.updateMenu('LoggedIn');
					this.updateDisplay(['Menu', 'Home']);
				} else {
					this.updateUser(null);
					this.updateMenu('LoggedOut');
					this.updateDisplay(['Menu', 'Home']);
				}
			})
			.catch(err => console.log(err));
	}
}
const mapStatetoProps = state => {
	return state;
};
const mapActionsToProps = (dispatch, props) => {
	return bindActionCreators(
		{
			updateUser: updateUser,
			updateDisplay: updateDisplay,
			updateMenu: updateMenu
		},
		dispatch
	);
};
export default connect(
	mapStatetoProps,
	mapActionsToProps
)(UserHandler);
