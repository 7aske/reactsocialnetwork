import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import displayReducer from './displayReducer';

export default combineReducers({
	display: displayReducer,
	login: loginReducer
});
