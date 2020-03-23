import { GET_ALL_SERVICES } from '../actions/types';

const initialState = {
  services:[]
}

export default serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SERVICES:
      return {
        ...state, services: action.payload
      }
  default:
    return state
  }
}
