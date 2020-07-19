import { 
  GET_CURRENT_TASKER_INFO, 
  TASKER_LOGOUT 
} from '../actions/types';

const initialState = {
  is_login: false,
  id: '',
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  mobile_number: '',
  // zip_code: '',
  // hourly_rate: '',
  // introduction: '',
  // auth_token: '',
  // tasks: []
}

export default taskerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_TASKER_INFO:
      return {
        ...state,
        is_login: true,
        id: action.payload.id,
        auth_token: action.payload.authToken,
        first_name: action.payload.firstName,
        last_name: action.payload.lastName,
        image: action.payload.image,
        mobile_number: action.payload.mobileNumber,
        // zip_code: action.payload.zipCode,
        // hourly_rate: action.payload.hourlyRate,
        // introduction: action.payload.introduction,
        // tasks: _.mapKeys(action.payload.tasks, action.payload.tasks.id)
      }
    case TASKER_LOGOUT:
      return {
        ...state,
        is_login: false,
        id: '',
        auth_token: '',
        first_name: '',
        last_name: '',
        image: '',
        mobile_number: '',
        zip_code: '',
        hourly_rate: '',
        introduction: '',
        tasks: []
      }
    default:
      return state
  }
}
