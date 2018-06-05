export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(user) {
	return {
		type: UPDATE_USER,
		payload: {
			user: user
		}
	};
}
export const UPDATE_DISPLAY = 'UPDATE_DISPLAY';
export function updateDisplay(display) {
	return {
		type: UPDATE_DISPLAY,
		payload: {
			display: display
		}
	};
}
export const UPDATE_MENU = 'UPDATE_MENU';
export function updateMenu(menu) {
	return {
		type: UPDATE_MENU,
		payload: {
			menu: menu
		}
	};
}
