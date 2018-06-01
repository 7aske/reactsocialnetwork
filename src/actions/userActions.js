import { LOGIN, REGISTER, UPDATE_MENU } from './types';

export const login = userInfo => dispatch => {
	dispatch({
		type: LOGIN,
		userInfo: userInfo
	});
};
export const updateMenu = display => dispatch => {
	dispatch({
		type: UPDATE_MENU,
		display: display
	});
};
