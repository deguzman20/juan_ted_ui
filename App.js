/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/screens/unauthorized/LoginScreen';
import TaskerDashBoardScreen from './src/screens/authorized/tasker/TaskerDashBoardScreen';
import CustomerDashBoardScreen from './src/screens/authorized/customer/CustomerDashBoardScreen';
import RegisterScreen from './src/screens/unauthorized/RegisterScreen';
import ForgotPasswordScreen from './src/screens/unauthorized/ForgotPasswordScreen';


const App = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  TaskerDashBoardScreen: { screen: TaskerDashBoardScreen },
  CustomerDashBoardScreen: { screen: CustomerDashBoardScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen }
}, { headerMode:'none' });


export default createAppContainer(App);
