import { createStore, combineReducers } from 'redux';
const initialState = { display: ['Menu'] };
function menuReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'displayLogin':
			return payload.newState.display;
		default:
			return state;
	}
}
const rootReducer = combineReducers({
	display: menuReducer
});
const store = createStore(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const action = {
	type: 'displayLogin',
	payload: {
		newState: {
			display: ['Menu', 'Login']
		}
	}
};
store.dispatch(action);
console.log(store.getState());
export default store;
