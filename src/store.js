import { createStore } from 'redux';
import rootReducer from './reducers/root';
//import { initialState } from './initalState';
const initialState = {
	display: ['Menu', 'Home'],
	user: null,
	menu: 'LoggedOut'
};
const store = createStore(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
