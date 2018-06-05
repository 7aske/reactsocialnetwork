import React, { Component } from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import Menu from './components/Menu';
import Home from './components/landing/Home';
import Login from './components/landing/Login';
import Register from './components/landing/Register';
import Profile from './components/user/Profile';
import UserHandler from './components/UserHandler';

class App extends Component {
	constructor() {
		super();
		this.state = {
			display: [],
			user: null,
			menu: []
		};
		store.subscribe(() => {
			this.setState({
				display: store.getState().display.map(c => {
					switch (c) {
						case 'Menu':
							return <Menu />;
						case 'Login':
							return <Login />;
						case 'Register':
							return <Register />;
						case 'Home':
							return <Home />;
						case 'Profile':
							return <Profile />;
					}
				})
			});
		});
	}

	componentWillMount() {
		this.setState({
			display: store.getState().display.map(c => {
				switch (c) {
					case 'Menu':
						return <Menu />;
					case 'Login':
						return <Login />;
					case 'Register':
						return <Register />;
					case 'Home':
						return <Home />;
					case 'Profile':
						return <Profile />;
				}
			})
		});
	}
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<UserHandler />
					{this.state.display}
				</div>
			</Provider>
		);
	}
}

export default App;
