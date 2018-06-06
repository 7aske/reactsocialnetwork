import React, { Component } from 'react';
import Request from '../Request';
import Post from './Post';
import store from '../../store';
class ViewProfile extends Component {
	constructor() {
		super();
		this.state = {
			user: store.getState().search,
			posts: []
		};
	}
	componentWillMount() {
		let user = store.getState().search;
		if (user !== null) {
			this.setState({
				user: user
			});
		} else {
			this.setState({
				user: null
			});
		}
	}
	componentDidMount() {
		// let url = new URL(window.location).origin + '/posts';
		// let request = new Request('get', url);
		// request
		// 	.send()
		// 	.then(result => {
		// 		console.log(result);
		// 		let response = JSON.parse(result.response);
		// 		let user = response.user;
		// 		let posts = response.posts.map(p => {
		// 			return <Post post={p} user={user} />;
		// 		});
		// 		// console.log(posts);
		// 		this.setState({
		// 			posts: posts
		// 		});
		// 	})
		// 	.catch(err => console.log(err));
	}
	render() {
		return (
			<div className="container card">
				<div className="row">
					<div className="col-md-3 col-sm-2">
						<img
							className="card-img img-thumbnail ProfilePicture"
							src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
							alt="Profile Picture"
						/>
					</div>
					<div className="col-md-9 col-sm-10">
						<div class="card" id="#accordion">
							<div class="card-header">
								<h3>
									{this.state.user.firstName}{' '}
									{this.state.user.lastName}
								</h3>
							</div>
							<div className="card-header" id="headingOne">
								<h5 className="mb-0">
									<button
										className="btn btn-link"
										data-toggle="collapse"
										data-target="#collapseOne"
										aria-expanded="false"
										aria-controls="collapseOne"
									>
										Collapsible Group Item #1
									</button>
								</h5>
							</div>

							<div
								id="collapseOne"
								className="collapse"
								aria-labelledby="headingOne"
								data-parent="#accordion"
							>
								<div className="card-body" />
							</div>
						</div>
						<div className="card">
							<div className="card-header" id="headingTwo">
								<h5 className="mb-0">
									<button
										className="btn btn-link collapsed"
										data-toggle="collapse"
										data-target="#collapseTwo"
										aria-expanded="false"
										aria-controls="collapseTwo"
									>
										Collapsible Group Item #2
									</button>
								</h5>
							</div>
							<div
								id="collapseTwo"
								className="collapse"
								aria-labelledby="headingTwo"
								data-parent="#accordion"
							>
								<div className="card-body" />
							</div>
						</div>
						<div className="card">
							<div className="card-header" id="headingThree">
								<h5 className="mb-0">
									<button
										className="btn btn-link collapsed"
										data-toggle="collapse"
										data-target="#collapseThree"
										aria-expanded="false"
										aria-controls="collapseThree"
									>
										Collapsible Group Item #3
									</button>
								</h5>
							</div>
							<div
								id="collapseThree"
								className="collapse"
								aria-labelledby="headingThree"
								data-parent="#accordion"
							>
								<div className="card-body" />
							</div>
						</div>
					</div>
				</div>
				<div className="row container card">{this.state.posts}</div>
			</div>
		);
	}
}

export default ViewProfile;
