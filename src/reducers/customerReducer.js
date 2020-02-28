import { CURRENT_CUSTOMER_INFO } from '../actions/types';

const initialState = {
  is_login: false,
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  mobile_number: '',
  zip_code: '',
  card_detail: '',
  auth_token: ''
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_CUSTOMER_INFO:
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
              card_detail: action.payload.card_detail
          }
        break;
        default:
          return state
      }
}
