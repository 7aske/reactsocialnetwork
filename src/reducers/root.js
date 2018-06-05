import { combineReducers } from 'redux';
import menuReducer from './menu';
import displayReducer from './display';
import userReducer from './app';
const rootReducer = combineReducers({
	display: displayReducer,
	user: userReducer,
	menu: menuReducer
});
export default rootReducer;
