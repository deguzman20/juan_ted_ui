import { combineReducers } from 'redux';
import { customerReducer } from './customerReducer';
import { taskerReducer } from './taskerReducer';

export default combineReducers({
  customerReducer,
  taskerReducer
})