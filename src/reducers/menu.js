import { UPDATE_MENU } from '../actions/appActions';
//import { initialState } from '../initalState';
const initialState = {
	display: ['Menu', 'Home'],
	user: null,
	menu: 'LoggedOut',
	search: []
};
const menuReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UPDATE_MENU:
			return payload.menu;
		default:
			return state;
	}
};
export default menuReducer;
