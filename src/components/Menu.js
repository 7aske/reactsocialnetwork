import React, { Component } from 'react';
import { updateMenu } from '../actions/userActions';
class Menu extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		console.log(this);
	}
	onClick(e) {
		e.preventDefault();
		this.props.updateMenu({
			display: ['Menu', e.target.href]
		});
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light Menu">
				<a className="navbar-brand" href="#">
					Social Network
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbar">
					<div className="navbar-nav">
						<a className="nav-item nav-link active" href="#">
							Home <span className="sr-only">(current)</span>
						</a>
						<a
							className="nav-item nav-link"
							href="Login"
							onClick={this.onClick}
						>
							Login
						</a>
						<a
							className="nav-item nav-link"
							href="Register"
							onClick={this.onClick}
						>
							Register
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Menu;
