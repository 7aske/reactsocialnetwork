import React, { Component } from 'react';
import CreatePost from './CreatePost';
import Request from '../Request';
import Post from './Post';
import { stat } from 'fs';
class Timeline extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		let url = new URL(window.location).origin + '/posts';
		let request = new Request('get', url);
		request
			.send()
			.then(result => {
				console.log(result);
				let response = JSON.parse(result.response);
				let user = response.user;
				let posts = response.posts.map(p => {
					return <Post post={p} user={user} />;
				});
				// console.log(posts);
				this.setState({
					posts: posts
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="container card">
				<CreatePost />
				{this.state.posts}
			</div>
		);
	}
}

export default Timeline;
