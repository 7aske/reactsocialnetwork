import React, { Component } from 'react';
import store from '../../store';
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			display: {}
		};
	}
	componentWillMount() {
		let user = store.getState().user;
		if (user !== null) {
			let display = Object.keys(user).map(e => {
				return (
					<li className="list-group-item">
						{e} - {user[e]}
					</li>
				);
			});
			this.setState({
				display: display
			});
		} else {
			this.setState({
				display: []
			});
		}
	}
	render() {
		return <ul className="list-group">{this.state.display}</ul>;
	}
}

export default Profile;
