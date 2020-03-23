import _ from 'lodash'
import { GET_CURRENT_CUSTOMER_INFO, CUSTOMER_LOGOUT } from '../actions/types';

const initialState = {
  is_login: false,
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  image:'',
  mobile_number: '',
  zip_code: '',
  card_detail: '',
  auth_token: '',
  tasks: []
}

export default customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_CUSTOMER_INFO:
      return {
        ...state,
        is_login: true, id: '',
        email: action.payload.email,
        first_name: action.payload.firstName,
        last_name: action.payload.lastName,
        image: action.payload.image,
        mobile_number: action.payload.mobileNumber,
        zip_code: action.payload.zipCode,
        card_detail: action.payload.cardDetail,
        auth_token: action.payload.authToken,
        tasks: _.mapKeys(action.payload.tasks, action.payload.tasks.id)
      }
    case CUSTOMER_LOGOUT:
      return {
        ...state,
        is_login: false,
        id: '',
        email: "",
        first_name: "",
        last_name: "",
        image: "",
        mobile_number: "",
        zip_code: "",
        card_detail: "",
        auth_token: "",
        tasks: []
      }
  default:
    return state
  }
}
