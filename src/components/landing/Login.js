import React, { Component } from 'react';
import Request from '../Request';
import RegError from './RegError';
import { bindActionCreators } from 'redux';
// import store from '../../store';
import { connect } from 'react-redux';
import {
	updateUser,
	updateMenu,
	updateDisplay
} from '../../actions/appActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			newUser: {
				username: '',
				password: ''
			},
			regErrors: []
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
	}
	updateUser(user) {
		this.props.updateUser(user);
	}
	updateMenu(menu) {
		this.props.updateMenu(menu);
	}
	updateDisplay(display) {
		this.props.updateDisplay(display);
	}
	onChange(e) {
		let newUser = this.state.newUser;
		newUser[e.target.name] = e.target.value;
		let state = {
			newUser: newUser
		};
		this.setState(state);
	}
	onSubmit(e) {
		const url = new URL(window.location).origin + '/users/login';
		const newUser = {
			username: this.state.newUser.username,
			password: this.state.newUser.password
		};
		const request = new Request('post', url, JSON.stringify(newUser), {
			'Content-type': 'application/json'
		});
		console.log(request);
		request
			.send()
			.then(result => {
				console.log(result);
				let response = JSON.parse(result.response);
				if (response.errors) {
					let regErrors = response.errors.map(e => {
						return <RegError error={e} />;
					});
					this.setState({
						regErrors: regErrors
					});
				} else {
					document.cookie = `x-access-token=${
						response.token
					}; path=/`;
					this.updateUser(response.user);
					this.updateMenu('LoggedIn');
					this.updateDisplay(['Menu', 'Profile']);
				}
			})
			.catch(err => console.log(err));
		e.preventDefault();
	}
	clearErrors() {
		this.setState({
			regErrors: []
		});
	}
	render() {
		return (
			<div className="Login card container col-md-6 p-4">
				<div>{this.state.regErrors}</div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="Username or e-mail"
							onChange={this.onChange}
							value={this.state.username}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Password"
							onChange={this.onChange}
							value={this.state.password}
						/>
					</div>
					<button
						type="submit"
						onClick={this.clearErrors}
						className="btn btn-secondary"
					>
						Login
					</button>
				</form>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return state;
};
const mapActionsToProps = (dispatch, props) => {
	return bindActionCreators(
		{
			updateUser: updateUser,
			updateMenu: updateMenu,
			updateDisplay: updateDisplay
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(Login);
