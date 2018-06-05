import { SEARCH_RESULTS } from '../actions/appActions';
//import { initialState } from '../initalState';
const initialState = {
	display: ['Menu', 'Home'],
	user: null,
	menu: 'LoggedOut',
	search: []
};
const searchReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SEARCH_RESULTS:
			return payload.search;
		default:
			return state;
	}
};
export default searchReducer;
