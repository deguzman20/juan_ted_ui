/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppSwiperScreen from './src/screens/unauthorized/AppSwiperScreen';
import LoginScreen from './src/screens/unauthorized/LoginScreen';
import DashBoardScreen from './src/screens/authorized/customer/DashBoardScreen';
import RegisterScreen from './src/screens/unauthorized/RegisterScreen';
import ForgotPasswordScreen from './src/screens/unauthorized/ForgotPasswordScreen';


const App = createStackNavigator({
  AppSwiperScreen: { screen: AppSwiperScreen },
  LoginScreen: { screen: LoginScreen },
  DashBoardScreen: { screen: DashBoardScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen }
}, { headerMode:'none' });


export default createAppContainer(App);
