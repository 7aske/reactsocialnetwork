import React, { Component } from 'react';
import Request from '../Request';
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
	}

	onChange(e) {
		let state;
		if (e.target.name === 'password') {
			state = {
				newUser: {
					username: this.state.newUser.username,
					password: e.target.value
				}
			};
		} else {
			state = {
				newUser: {
					username: e.target.value,
					password: this.state.newUser.password
				}
			};
		}

		this.setState(state);
	}
	onSubmit(e) {
		const url = new URL(window.location).origin + '/users/login';
		const newUser = {
			username: this.state.newUser.username,
			password: this.state.newUser.password
		};
		console.log(url);
		console.log(newUser);
		const request = new Request('post', url, JSON.stringify(newUser), {
			'Content-type': 'application/json'
		});
		console.log(request);
		request
			.send()
			.then(result => console.log(result))
			.catch(err => console.log(err));
		e.preventDefault();
	}
	render() {
		return (
			<div className="Login card container col-6 p-4">
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
					<button type="submit" className="btn btn-secondary">
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
