import React, { Component } from 'react';

class RegError extends Component {
	constructor() {
		super();
		this.state = {
			error: ''
		};
	}
	componentWillMount() {
		this.setState({
			error: this.props.error
		});
	}
	render() {
		return (
			<div className="alert alert-danger w-100">{this.state.error}</div>
		);
	}
}

export default RegError;
