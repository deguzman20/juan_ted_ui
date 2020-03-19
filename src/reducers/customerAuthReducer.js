import { CUSTOMER_SET_AUTH_TOKEN, CUSTOMER_LOGOUT } from '../actions/types';

const initialState = {
  is_login: false,
  auth_token: ''
}

export const customerAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_SET_AUTH_TOKEN:
      return { ...state, is_login: true, auth_token: action.payload.token }
    case CUSTOMER_LOGOUT:
      return { ...state, is_login: false, auth_token: '' }
    default:
      return state
  }
}
