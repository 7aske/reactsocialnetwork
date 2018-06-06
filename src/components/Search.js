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
		this.onItemClick = this.onItemClick.bind(this);
	}
	onItemClick(user) {
		this.props.searchResults(user);
		this.props.updateDisplay(['Menu']);
		this.props.updateDisplay(['Menu', 'ViewProfile']);
		document.querySelector('#searchDropdown').style.display = 'block';
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
		if (search.value !== '') {
			dList.style.display = 'block';
		} else {
			dList.style.display = 'none';
		}
		request
			.send()
			.then(result => {
				this.setState({
					dropdown: [],
					results: response
				});
				console.log(result.response);
				let response = JSON.parse(result.response);
				let dropdown = response.map(e => {
					return <DropdownItem onClick={this.onItemClick} user={e} />;
				});
				this.setState({
					dropdown: dropdown,
					results: response
				});
			})
			.catch(err => console.log(err));
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
			id: '',
			firstName: '',
			lastName: ''
		};
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.onClick(this.state);
	}
	componentWillMount() {
		let state = {
			id: this.props.user._id,
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName
		};
		this.setState(state);
	}
	render() {
		return (
			<div className="dropdownItem" onClick={this.onClick}>
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
