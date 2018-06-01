import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import Login from './components/landing/Login';
import Register from './components/landing/Register';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
	constructor() {
		super();
		this.state = {
			display: []
		};
		store.subscribe(() => {
			let display = store.getState().display.map(c => {
				switch (c) {
					case 'Menu':
						return <Menu />;
					case 'Login':
						return <Login />;
					case 'Register':
						return <Register />;
				}
			});
			console.log('display', display);
			this.setState({
				display: display
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
				}
			})
		});
	}
	render() {
		return (
			<Provider store={store}>
				<div>{this.state.display}</div>
			</Provider>
		);
	}
}

export default App;
