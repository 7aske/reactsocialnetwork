import React, { Component } from 'react';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			confirm: ''
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
	}
	render() {
		return (
			<div className="Login card container col-4 p-4">
				<form onSubmit={this.onSubmit}>
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
