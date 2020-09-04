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
import TaskerDashBoardScreen from './src/screens/authorized/tasker/TaskerDashBoardScreen';
import CustomerDashBoardScreen from './src/screens/authorized/customer/CustomerDashBoardScreen';
import RegisterScreen from './src/screens/unauthorized/RegisterScreen';
import ForgotPasswordScreen from './src/screens/unauthorized/ForgotPasswordScreen';

const App = createStackNavigator({
  AppSwiperScreen: { screen: AppSwiperScreen },
  LoginScreen: { 
    screen: LoginScreen 
  },
  CustomerDashBoardScreen: { 
    screen: CustomerDashBoardScreen 
  },
  TaskerDashBoardScreen: { 
    screen: TaskerDashBoardScreen 
  },
  RegisterScreen: { 
    screen: RegisterScreen 
  },
  ForgotPasswordScreen: { 
    screen: ForgotPasswordScreen 
  }
}, { 
    initialRouteName: 'LoginScreen',
    headerMode:'none', 
    defaultNavigationOptions: {
      gestureEnabled: false
    }
});


export default createAppContainer(App);
