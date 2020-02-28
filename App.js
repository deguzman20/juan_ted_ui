/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppSwiperScreen from './src/screens/AppSwiperScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashBoardScreen from './src/screens/DashBoardScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Navigator = createStackNavigator({
  AppSwiperScreen: { screen: AppSwiperScreen },
  LoginScreen: { screen: LoginScreen },
  DashBoardScreen: { screen: DashBoardScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen }
}, { headerMode:'none' });

const App = createAppContainer(Navigator);

export default App;
