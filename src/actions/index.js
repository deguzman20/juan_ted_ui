import {  CURRENT_CUSTOMER_INFO, CURRENT_TASKER_INFO  } from '../actions/types';

export const customerSignInAction = (data) => {
  return (dispatch) =>{
    dispatch({
      type: CURRENT_CUSTOMER_INFO,
      payload: data
    })
  }
}

export const taskerSignInAction = (data) => {
  return (dispatch) =>{
    dispatch({
      type: CURRENT_TASKER_INFO,
      payload: data
    })
  }
}