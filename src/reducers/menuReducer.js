import { UPDATE_MENU } from '../actions/types';

const initalState = { display: ['Menu'] };
export default function(state = initalState, action) {
	console.log(action, state);
	switch (action.type) {
		case UPDATE_MENU:
			return state;
		default:
			return state;
	}
}
