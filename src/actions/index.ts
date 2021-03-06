import { CustomerInfo } from '../types/customer';
import { TaskerInfo } from '../types/tasker';
import { 
  ICustomerSignInAction, 
  ITaskerSignInAction,
  ICustomerLogoutAction,
  ITaskerLogoutAction } from '../types/action';

import {
  CUSTOMER_LOGOUT,
  TASKER_LOGOUT,
  CUSTOMER_UPDATE_PASSWORD,
  TASKER_UPDATE_PASSWORD,
  GET_CURRENT_CUSTOMER_INFO,
  GET_CURRENT_TASKER_INFO,
  GET_ALL_SERVICES,
  ADD_TODO,
  DELETE_TODO } from './types';



export const customerSignInAction = (data: CustomerInfo): ICustomerSignInAction => dispatch => {
  var data_obj = data.data.customerSignin;
  dispatch({
    type: GET_CURRENT_CUSTOMER_INFO,
    payload: data_obj
  })
}

export const taskerSignInAction = (data: TaskerInfo): ITaskerSignInAction => dispatch => {
  var data_obj = data.data.taskerSignin;
  dispatch({
    type: GET_CURRENT_TASKER_INFO,
    payload: data_obj
  })
}

export const customerLogoutAction = (): ICustomerLogoutAction => dispatch => {
  dispatch({
    type: CUSTOMER_LOGOUT,
    payload: null
  })
}

export const taskerLogoutAction = (): ITaskerLogoutAction => dispatch => {
  dispatch({
    type: TASKER_LOGOUT,
    payload: null
  })
}

export const addTodo = (data) => dispatch => {
  var data_obj = data.data.createTodo.response
  dispatch({
    type: ADD_TODO,
    payload: data.data.createTodo
  })
}

export const deleteTodo = (id) => dispatch => {
  dispatch({
    type: DELETE_TODO,
    payload: id
  })
}

export const customerUpdatePasswordAction = (data) => dispatch => {
  dispatch({
    type: CUSTOMER_UPDATE_PASSWORD,
    payload: data
  })
}

export const taskerUpdatePasswordAction = (data) => dispatch => {
  dispatch({
    type: TASKER_UPDATE_PASSWORD,
    payload: data
  })
}

export const getCurrentCustomerInfoAction = (data) => dispatch => {
  dispatch({
    type: GET_CURRENT_CUSTOMER_INFO,
    payload: data
  })
}

export const getCurrentTaskerInfoAction = (data) => dispatch => {
  dispatch({
    type: GET_CURRENT_TASKER_INFO,
    payload: data
  })
}

export const getAllServiceAction = (data) => dispatch => {
  dispatch({
    type: GET_ALL_SERVICES,
    payload: data
  })
}