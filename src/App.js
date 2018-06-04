import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Menu from './components/Menu';
import Home from './components/landing/Home';
import Login from './components/landing/Login';
import Register from './components/landing/Register';

import store from './store';

class App extends Component {
	constructor() {
		super();
		this.state = {
			display: []
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
				}
			})
		});
	}
	render() {
		return (
			<Provider store={store}>
				<div className="App">{this.state.display}</div>
			</Provider>
		);
	}
}

export default App;
