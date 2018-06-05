import { UPDATE_DISPLAY } from '../actions/appActions';
//import { initialState } from '../initalState';
const initialState = {
	display: ['Menu', 'Home'],
	user: null,
	menu: 'LoggedOut',
	search: []
};
const displayReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UPDATE_DISPLAY:
			return payload.display;
		default:
			return state;
	}
};
export default displayReducer;
