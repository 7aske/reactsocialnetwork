import React, { Component } from 'react';
import Request from './Request';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDisplay, searchResults } from '../actions/appActions';
class Search extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			dropdown: [],
			results: []
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit() {
		this.props.searchResults(this.state.results);
		this.props.updateDisplay(['Menu']);
		this.props.updateDisplay(['Menu', 'SearchResults']);
	}
	onChange(e) {
		let search = document.querySelector('#search input');
		let state = this.state;
		state.query = e.target.value;
		this.setState(state);
		let dList = document.querySelector('#searchDropdown');
		let url =
			new URL(window.location).origin + '/api/users?' + this.state.query;
		let request = new Request('get', url);
		request
			.send()
			.then(result => {
				console.log(result);
				let response = JSON.parse(result.response);

				let dropdown = response.map(e => {
					return <DropdownItem user={e} />;
				});
				dList.style.display = 'block';
				console.log(dropdown);

				this.setState({
					dropdown: dropdown,
					results: response
				});
			})
			.catch(err => console.log(err));
		let timeout = setTimeout(() => {
			dList.style.display = 'none';
		}, 3000);
	}
	render() {
		return (
			<form
				onSubmit={this.onSubmit}
				class="form-inline my-2 my-lg-0 float-right"
				autocomplete="off"
			>
				<div className="position-relative" id="search">
					<input
						class="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						onChange={this.onChange}
					/>
					<button class="btn my-2 my-sm-0" type="submit">
						Search
					</button>
					<div
						id="searchDropdown"
						class="search-dropdown card w-100 p-2"
					>
						{this.state.dropdown}
					</div>
				</div>
			</form>
		);
	}
}
class DropdownItem extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: ''
		};
	}
	componentWillMount() {
		let state = {
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName
		};
		this.setState(state);
	}
	render() {
		return (
			<div>
				{this.state.firstName} {this.state.lastName}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return state;
};
const mapActionsToProps = (dispatch, props) => {
	return bindActionCreators(
		{
			updateDisplay: updateDisplay,
			searchResults: searchResults
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(Search);
