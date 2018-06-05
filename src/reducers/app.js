import { UPDATE_USER } from '../actions/appActions';
//import { initialState } from '../initalState';
const initialState = {
	display: ['Menu', 'Home'],
	user: null,
	menu: 'LoggedOut',
	search: []
};
const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UPDATE_USER:
			return payload.user;
		default:
			return state;
	}
};
export default userReducer;
