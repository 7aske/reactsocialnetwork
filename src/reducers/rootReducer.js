import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import menuReducer from './menuReducer';

export default combineReducers({
	display: menuReducer,
	login: loginReducer
});
