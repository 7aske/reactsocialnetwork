import React, { Component } from 'react';

class Post extends Component {
	constructor() {
		super();
		this.state = {
			post: {
				title: '',
				content: '',
				created: ''
			},
			user: {
				name: '',
				id: ''
			}
		};
	}
	formatDate(date) {
		let d = new Date(new Date().valueOf() - new Date(date).valueOf());
		if (d.getDate() > 1) {
			return d.getDate() === 1
				? `${d.getDate()} day ago.`
				: `${d.getDate()} days ago.`;
		} else if (d.getHours() > 1) {
			return d.getHours() === 1
				? `${d.getHours()} hour ago.`
				: `${d.getHours()} hours ago.`;
		} else if (d.getMinutes() > 1) {
			return d.getMinutes() === 1
				? `${d.getMinutes()} minute ago.`
				: `${d.getMinutes()} minutes ago.`;
		} else {
			return `${d.getSeconds()} seconds ago.`;
		}
	}
	componentDidMount() {
		let state = {
			post: {
				title: this.props.post.title,
				content: this.props.post.content,
				created: this.props.post.dateCreated
			},
			user: {
				name: `${this.props.user.firstName} ${
					this.props.user.lastName
				}`,
				id: this.props._id
			}
		};
		this.setState(state);
	}
	render() {
		return (
			<div className="card mb-1 mt-1">
				<div className="card-header">
					<h5 className="card-title">{this.state.user.name}</h5>
				</div>
				<div className="card-body">
					<div className="card-text">
						<h5>{this.state.post.title}</h5>
						<p>{this.state.post.content}</p>
					</div>
				</div>
				<div className="card-footer">
					<small>{this.formatDate(this.state.post.created)}</small>
				</div>
			</div>
		);
	}
}

export default Post;
