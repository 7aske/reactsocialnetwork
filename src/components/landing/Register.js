import React, { Component } from 'react';
import Request from '../Request';
import RegError from './RegError';
class Register extends Component {
	constructor() {
		super();
		this.state = {
			newUser: {
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password: '',
				confirm: ''
			},
			regErrors: []
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		let state = {
			[e.target.name]: e.target.value
		};
		this.setState(state);
	}
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		const url = new URL(window.location).origin + '/users/register';
		console.log(url);
		const newUser = {
			firstName: this.state.newUser.firstName,
			lastName: this.state.newUser.lastName,
			email: this.state.newUser.email,
			username: this.state.newUser.username,
			password: this.state.newUser.password,
			confirm: this.state.newUser.confirm
		};
		let request = new Request('post', url, JSON.stringify(newUser), {
			'Content-type': 'Application/json'
		});
		request
			.send()
			.then(result => {
				if (result.status === 400) {
					console.log(result);
					let regErrors = JSON.parse(result.response).map(e => {
						return <RegError error={e} />;
					});
					this.setState({
						regErrors: regErrors
					});
				}
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div className="Login card container col-6 p-4">
				<form onSubmit={this.onSubmit}>
					<div className="input-group">{this.state.regErrors}</div>
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							placeholder="First Name"
							onChange={this.onChange}
							value={this.state.firstName}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							placeholder="Last Name"
							onChange={this.onChange}
							value={this.state.lastName}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="Username"
							onChange={this.onChange}
							value={this.state.username}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">E-mail</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="E-mail"
							onChange={this.onChange}
							value={this.state.email}
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
					<div className="form-group">
						<label htmlFor="confirm">Confirm Password</label>
						<input
							type="password"
							className="form-control"
							id="confirm"
							name="confirm"
							placeholder="Confirm Password"
							onChange={this.onChange}
							value={this.state.confirm}
						/>
					</div>
					<button type="submit" className="btn btn-secondary">
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default Register;
