import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = { display: ['Menu'] };
const middleware = [thunk];
const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

export default store;
