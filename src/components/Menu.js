import React, { Component } from 'react';
import Request from './Request';
import { bindActionCreators } from 'redux';
import store from '../store';
import { connect } from 'react-redux';
import { updateUser, updateMenu, updateDisplay } from '../actions/appActions';
import Search from './Search';
class Menu extends Component {
	constructor(props) {
		super(props);
		this.onMenuClick = this.onMenuClick.bind(this);
		this.state = {
			display: [],
			menu: <LoggedOut onClick={this.onMenuClick} />,
			user: null
		};
		store.subscribe(() => {
			let menu = store.getState().menu;
			console.log(menu);
			if (menu === 'LoggedOut') {
				this.setState({
					menu: <LoggedOut onClick={this.onMenuClick} />
				});
			} else {
				this.setState({
					menu: <LoggedIn onClick={this.onMenuClick} />
				});
			}
		});
	}
	updateUser(user) {
		this.props.updateUser(user);
	}
	updateDisplay(display) {
		this.props.updateDisplay(display);
	}
	updateMenu(menu) {
		this.props.updateMenu(menu);
	}
	onMenuClick(e) {
		e.preventDefault();
		document.querySelectorAll('#navbar .nav-item').forEach(i => {
			i.classList.remove('activeNav');
		});
		e.target.parentElement.classList.add('activeNav');
		if (e.target.innerText === 'Logout') {
			let url = new URL(window.location).origin + '/users/logout';
			let request = new Request('get', url);
			request
				.send()
				.then(result => {
					console.log(result);
					if (result.status === 200) {
						document.cookie = 'x-access-token=';
						this.setState({
							menu: <LoggedOut onClick={this.onMenuClick} />
						});
						this.updateUser(null);
						this.updateDisplay(['Menu', 'Home']);
						this.updateMenu('LoggedOut');
					}
				})
				.catch(err => console.log(err));
		} else {
			this.updateDisplay(['Menu', e.target.innerText]);
		}
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
					{this.state.menu}
				</div>
			</nav>
		);
	}
}
class LoggedOut extends Component {
	render() {
		return (
			<ul className="navbar-nav w-100">
				<li className="nav-item">
					<a
						className="nav-link"
						href="Home"
						onClick={this.props.onClick}
					>
						Home
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="Login"
						onClick={this.props.onClick}
					>
						Login
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="Register"
						onClick={this.props.onClick}
					>
						Register
					</a>
				</li>
				<li className="nav-item">
					<Search />
				</li>
			</ul>
		);
	}
}
class LoggedIn extends Component {
	render() {
		return (
			<ul className="navbar-nav w-100">
				<li className="nav-item">
					<a
						className="nav-link"
						href="Home"
						onClick={this.props.onClick}
					>
						Timeline
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="Login"
						onClick={this.props.onClick}
					>
						Profile
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						href="Register"
						onClick={this.props.onClick}
					>
						Logout
					</a>
				</li>
				<li className="nav-item float-right">
					<Search />
				</li>
			</ul>
		);
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
)(Menu);
