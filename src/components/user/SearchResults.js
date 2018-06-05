import React, { Component } from 'react';
import store from '../../store';
class SearchResults extends Component {
	constructor() {
		super();
		this.state = {
			results: store.getState().search,
			output: []
		};
	}
	componentDidMount() {
		let output = this.state.results.map(u => {
			return (
				<div>
					{u.firstName} {u.lastName} {u.email}{' '}
				</div>
			);
		});
		this.setState({
			output: output
		});
	}
	render() {
		return <div className="container card p-3">{this.state.output}</div>;
	}
}

export default SearchResults;
