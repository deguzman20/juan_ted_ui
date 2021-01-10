import { CustomerInfo } from './customer'; 
import { TaskerInfo } from './tasker';

import {
  CUSTOMER_LOGOUT,
  TASKER_LOGOUT,
  GET_CURRENT_CUSTOMER_INFO,
  GET_CURRENT_TASKER_INFO } from '../actions/types';

export interface ICustomerSignInAction => dispatch => {
  type: typeof GET_CURRENT_CUSTOMER_INFO;
  payload: CustomerInfo;
}

export interface ITaskerSignInAction => dispatch => {
  type: typeof GET_CURRENT_TASKER_INFO;
  payload: TaskerInfo;
}

export interface ICustomerLogoutAction => dispatch => {
  type: typeof CUSTOMER_LOGOUT;
  payload: null;
}

export interface ITaskerLogoutAction => dispatch => {
  type: typeof TASKER_LOGOUT;
  payload: null;
}


