import { Dimensions } from 'react-native';

// get current user info
export const GET_CURRENT_CUSTOMER_INFO = 'GET_CURRENT_CUSTOMER_INFO';
export const GET_CURRENT_TASKER_INFO = 'GET_CURRENT_TASKER_INFO';

// sign in types
export const CUSTOMER_SET_AUTH_TOKEN = 'CUSTOMER_SET_AUTH_TOKEN';
export const TASKER_SET_AUTH_TOKEN = 'TASKER_SET_AUTH_TOKEN';

// sign up types
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const CREATE_PASSWORD = 'CREATE_PASSWORD';

// forgot password
export const CUSTOMER_FORGOT_PASSWORD = 'CUSTOMER_FORGOT_PASSWORD';
export const TASKER_FORGOT_PASSWORD = 'TASKER_FORGOT_PASSWORD';

// update password
export const CUSTOMER_UPDATE_PASSWORD = 'CUSTOMER_UPDATE_PASSWORD';
export const TASKER_UPDATE_PASSWORD = 'TASKER_UPDATE_PASSWORD';

export const GET_ALL_SERVICES = 'GET_ALL_SERVICES';

// logout
export const CUSTOMER_LOGOUT = 'CUSTOMER_LOGOUT';
export const TASKER_LOGOUT = 'TASKER_LOGOUT';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

    
// default size of mobile app
export const ITEM_WIDTH = Dimensions.get('window').width;
export const ITEM_HEIGHT = Dimensions.get('window').height;
