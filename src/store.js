import { createStore } from 'redux';
import rootReducer from './reducers/root';
const initialState = { display: ['Menu', 'Home'] };

const store = createStore(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());
export default store;
