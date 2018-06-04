import { UPDATE_MENU } from '../actions/menuActions';
const initialState = { display: ['Menu'] };
const menuReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UPDATE_MENU:
			return payload.display;
		default:
			return state;
	}
};
export default menuReducer;
