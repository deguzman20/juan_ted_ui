import { 
  GET_CURRENT_CUSTOMER_INFO, 
  CUSTOMER_LOGOUT, 
  ADD_TODO, 
  DELETE_TODO } from '../actions/types';

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
  tasks: {},
  todos: {}
}

export default customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_CUSTOMER_INFO:
      return {
        ...state,
        id: action.payload.id,
        is_login: true, 
        email: action.payload.email,
        first_name: action.payload.firstName,
        last_name: action.payload.lastName,
        image: action.payload.image,
        mobile_number: action.payload.mobileNumber,
        zip_code: action.payload.zipCode,
        card_detail: action.payload.cardDetail,
        auth_token: action.payload.authToken,
        tasks: Object.values(action.payload.tasks),
        todos: Object.values(action.payload.todos)
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
        tasks: {},
        todos: {}
      }
    case ADD_TODO:
    return {
        ...state,
        todos: state.todos.concat(action.payload)
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo["id"] !== action.payload)
      };
  default:
    return state
  }
}
