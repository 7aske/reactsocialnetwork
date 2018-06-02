import React, { Component } from 'react';
class Login extends Component {
	constructor() {
		super();
		this.state = { username: '', password: '' };
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
		console.log(this);
	}
	render() {
		return (
			<div className="Login card container col-4 p-4">
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
