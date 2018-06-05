import React, { Component } from 'react';
import Request from '../Request';
import Post from './Post';
import store from '../../store';
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			posts: []
		};
	}
	componentWillMount() {
		let user = store.getState().user;
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
								<div className="card-body">
									Anim pariatur cliche reprehenderit, enim
									eiusmod high life accusamus terry richardson
									ad squid. 3 wolf moon officia aute, non
									cupidatat skateboard dolor brunch. Food
									truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a
									bird on it squid single-origin coffee nulla
									assumenda shoreditch et. Nihil anim keffiyeh
									helvetica, craft beer labore wes anderson
									cred nesciunt sapiente ea proident. Ad vegan
									excepteur butcher vice lomo. Leggings
									occaecat craft beer farm-to-table, raw denim
									aesthetic synth nesciunt you probably
									haven't heard of them accusamus labore
									sustainable VHS.
								</div>
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
								<div className="card-body">
									Anim pariatur cliche reprehenderit, enim
									eiusmod high life accusamus terry richardson
									ad squid. 3 wolf moon officia aute, non
									cupidatat skateboard dolor brunch. Food
									truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a
									bird on it squid single-origin coffee nulla
									assumenda shoreditch et. Nihil anim keffiyeh
									helvetica, craft beer labore wes anderson
									cred nesciunt sapiente ea proident. Ad vegan
									excepteur butcher vice lomo. Leggings
									occaecat craft beer farm-to-table, raw denim
									aesthetic synth nesciunt you probably
									haven't heard of them accusamus labore
									sustainable VHS.
								</div>
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
								<div className="card-body">
									Anim pariatur cliche reprehenderit, enim
									eiusmod high life accusamus terry richardson
									ad squid. 3 wolf moon officia aute, non
									cupidatat skateboard dolor brunch. Food
									truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a
									bird on it squid single-origin coffee nulla
									assumenda shoreditch et. Nihil anim keffiyeh
									helvetica, craft beer labore wes anderson
									cred nesciunt sapiente ea proident. Ad vegan
									excepteur butcher vice lomo. Leggings
									occaecat craft beer farm-to-table, raw denim
									aesthetic synth nesciunt you probably
									haven't heard of them accusamus labore
									sustainable VHS.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row container card">{this.state.posts}</div>
			</div>
		);
	}
}

export default Profile;
