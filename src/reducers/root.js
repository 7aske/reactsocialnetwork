import { combineReducers } from 'redux';
import menuReducer from './menu';
const rootReducer = combineReducers({
	display: menuReducer
});
export default rootReducer;
