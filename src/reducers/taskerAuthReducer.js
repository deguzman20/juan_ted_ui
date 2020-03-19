import { TASKER_SET_AUTH_TOKEN, TASKER_LOGOUT } from '../actions/types';

const initialState = {
  is_login: false,
  auth_token: ''
}

export const taskerAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKER_SET_AUTH_TOKEN:
          return { ...state, is_login: true, auth_token: action.payload.token }
        case TASKER_LOGOUT:
          return { ...state, is_login: false, auth_token: '' }
        default:
          return state
      }
}
