import React, { Component } from 'react';
import Request from '../Request';
import store from '../../store';
import { updateDisplay } from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class CreatePost extends Component {
	constructor() {
		super();
		this.initialState = {
			newPost: {
				title: '',
				content: '',
				owner: store.getState().user._id,
				created: ''
			},
			user: {
				firstName: store.getState().user.firstName,
				lastName: store.getState().user.lastName,
				_id: store.getState().user._id
			}
		};
		this.state = {
			newPost: {
				title: '',
				content: '',
				owner: store.getState().user._id,
				created: ''
			},
			user: {
				firstName: store.getState().user.firstName,
				lastName: store.getState().user.lastName,
				_id: store.getState().user._id
			}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
	}
	updateDisplay(display) {
		this.props.updateDisplay(display);
	}
	onChange(e) {
		let state = this.state;
		state.newPost.created = new Date();
		state.newPost.owner = store.getState().user._id;
		state.newPost[e.target.name] = e.target.value;
		this.setState(state);
		console.log(this.state);
	}
	onSubmit(e) {
		e.preventDefault();
		const url = new URL(window.location).origin + '/posts/new';
		let newPost = JSON.stringify(this.state.newPost);
		let request = new Request('post', url, newPost, {
			'Content-type': 'application/json'
		});
		request
			.send()
			.then(result => {
				this.updateDisplay(['Menu']);
				this.updateDisplay(['Menu', 'Timeline']);
				this.setState(this.initialState);
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div>
				<button
					className="btn btn-primary mt-2 mb-2"
					type="button"
					data-toggle="collapse"
					data-target="#addPost"
					aria-expanded="false"
					aria-controls="addPost"
				>
					Add post
				</button>
				<div className="collapse" id="addPost">
					<div className="card card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="postTitle">Title</label>
								<input
									name="title"
									type="text"
									className="form-control"
									id="postTitle"
									placeholder="Post title(optional)"
									onChange={this.onChange}
									value={this.state.newPost.title}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="postText">Content</label>
								<textarea
									name="content"
									type="text"
									className="form-control"
									id="postText"
									placeholder="Content"
									onChange={this.onChange}
									value={this.state.newPost.content}
									required
								/>
							</div>

							<button type="submit" className="btn btn-primary">
								Submit
							</button>
							<button
								type="button"
								className="btn btn-secondary"
								data-toggle="collapse"
								data-target="#addPost"
								aria-expanded="false"
								aria-controls="addPost"
							>
								Close
							</button>
						</form>
					</div>
				</div>
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
			updateDisplay: updateDisplay
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(CreatePost);
