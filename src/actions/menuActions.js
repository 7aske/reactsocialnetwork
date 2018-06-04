export const UPDATE_MENU = 'UPDATE_MENU';
export function updateMenu(display) {
	return {
		type: UPDATE_MENU,
		payload: {
			display: display
		}
	};
}
