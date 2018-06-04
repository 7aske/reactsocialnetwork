import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMenu } from '../actions/menuActions';
class Menu extends Component {
	constructor(props) {
		super(props);
		this.onMenuClick = this.onMenuClick.bind(this);
	}
	onMenuClick(e) {
		e.preventDefault();
		console.log(document.querySelectorAll('#navbar .nav-item'));

		document.querySelectorAll('#navbar .nav-item').forEach(i => {
			i.classList.remove('activeNav');
		});
		e.target.parentElement.classList.add('activeNav');
		this.props.onMenuClick(['Menu', e.target.innerText]);
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light Menu">
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
				<div className="collapse navbar-collapse w-100" id="navbar">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a
								className="nav-link"
								href="Home"
								onClick={this.onMenuClick}
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="Login"
								onClick={this.onMenuClick}
							>
								Login
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="Register"
								onClick={this.onMenuClick}
							>
								Register
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
const mapStatetoProps = state => {
	return state;
};
const mapActionsToProps = (dispatch, props) => {
	return bindActionCreators(
		{
			onMenuClick: updateMenu
		},
		dispatch
	);
};
export default connect(mapStatetoProps, mapActionsToProps)(Menu);
