import { GET_CURRENT_TASKER_INFO } from '../actions/types';

const initialState = {
  is_login: false,
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  mobile_number: '',
  zip_code: '',
  hourly_rate: '',
  introduction: '',
  auth_token: ''
}

export const taskerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_TASKER_INFO:
          return {
              ...state,
              is_login: true,
              auth_token: action.payload.auth_token,
              mobile_number: action.payload.first_name,
              first_name: action.payload.first_name,
              last_name: action.payload.last_name,
              image: action.payload.image,
              mobile_number: action.payload.mobile_number,
              zip_code: action.payload.zip_code,
              hourly_rate: action.payload.hourly_rate,
              introduction: action.payload.introduction
          }
        default:
          return state
      }
}
