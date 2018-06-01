import { LOGIN, REGISTER } from '../actions/types';

const initalState = { username: '', password: '' };
export default function(state = initalState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state
			};
		default:
			return state;
	}
}
