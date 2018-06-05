import { combineReducers } from 'redux';
import menuReducer from './menu';
import displayReducer from './display';
import userReducer from './app';
import searchReducer from './search';
const rootReducer = combineReducers({
	display: displayReducer,
	user: userReducer,
	menu: menuReducer,
	search: searchReducer
});
export default rootReducer;
