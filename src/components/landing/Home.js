import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMenu } from '../../actions/menuActions';
class Home extends Component {
	constructor(props) {
		super(props);
		this.onMenuClick = this.onMenuClick.bind(this);
	}
	onMenuClick(e) {
		e.preventDefault();
		this.props.onMenuClick(['Menu', 'Register']);
	}
	render() {
		return (
			<div className="jumbotron">
				<h1 className="display-3">Jumbotron heading</h1>
				<p className="lead">
					Cras justo odio, dapibus ac facilisis in, egestas eget quam.
					Fusce dapibus, tellus ac cursus commodo, tortor mauris
					condimentum nibh, ut fermentum massa justo sit amet risus.
				</p>
				<p>
					<a
						className="btn btn-lg btn-success"
						href="#"
						role="button"
						onClick={this.onMenuClick}
					>
						Sign up today
					</a>
				</p>
			</div>
		);
	}
}
const mapActionsToProps = {
	onMenuClick: updateMenu
};
export default connect(null, mapActionsToProps)(Home);
