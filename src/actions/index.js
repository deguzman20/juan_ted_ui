import {  CUSTOMER_SET_AUTH_TOKEN,
          TASKER_SET_AUTH_TOKEN,
          CUSTOMER_LOGOUT,
          TASKER_LOGOUT,
          CUSTOMER_UPDATE_PASSWORD,
          TASKER_UPDATE_PASSWORD,
          GET_CURRENT_CUSTOMER_INFO,
          GET_CURRENT_TASKER_INFO } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

export const customerSignInAction = (data) => {
  AsyncStorage.setItem('customer_auth_token', data.token)
  return (dispatch) =>{
    dispatch({
      type: CUSTOMER_SET_AUTH_TOKEN,
      payload: data.token
    })
  }
}

export const taskerSignInAction = async (data) => {
  AsyncStorage.setItem('tasker_auth_token', data.token)
  return (dispatch) =>{
    dispatch({
      type: TASKER_SET_AUTH_TOKEN,
      payload: data.token
    })
  }
}

export const customerLogoutAction = () => {
  AsyncStorage.removeItem('customer_auth_token');
  return (dispatch) =>{
    dispatch({
      type: CUSTOMER_LOGOUT,
      payload: null
    })
  }
}


export const taskerLogoutAction = async () => {
  AsyncStorage.removeItem('tasker_auth_token');
  return (dispatch) =>{
    dispatch({
      type: TASKER_LOGOUT,
      payload: null
    })
  }
}

export const customerUpdatePasswordAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: CUSTOMER_UPDATE_PASSWORD,
      payload: data
    })
  }
}

export const taskerUpdatePasswordAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: TASKER_UPDATE_PASSWORD,
      payload: data
    })
  }
}

export const getCurrentCustomerInfoAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_CURRENT_CUSTOMER_INFO,
      payload: data
    })
  }
}

export const getCurrentTaskerInfoAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_CURRENT_TASKER_INFO,
      payload: data
    })
  }
}