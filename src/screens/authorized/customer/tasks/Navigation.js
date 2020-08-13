import React from 'react';  
import { createAppContainer } from 'react-navigation';  
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import CompletedTaskScreen from "./completed/CompletedTaskScreen";  
import ScheduledTaskScreen from "./scheduled/ScheduledTaskScreen";  
import ScheduledTransactionInfoScreen from '../transaction_info/ScheduledTransactionInfoScreen';
import CompletedTransactionInfoScreen from '../transaction_info/CompletedTransactionInfoScreen';

const CompletedStack = createStackNavigator({
  CompletedTaskScreen: {
    screen: CompletedTaskScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  CompletedTransactionInfoScreen: {
    screen: CompletedTransactionInfoScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

const ScheduledStack = createStackNavigator({
  ScheduledTaskScreen: {
    screen: ScheduledTaskScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ScheduledTransactionInfoScreen: {
    screen: ScheduledTransactionInfoScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

const AppNavigator = createMaterialTopTabNavigator({  
    "Scheduled": ScheduledStack,  
    "Completed": CompletedStack  
  },  
  {  
    tabBarOptions: {
      upperCaseLabel: false,
      indicatorStyle: {
        borderBottomColor: '#009C3C',
        borderBottomWidth: 2,
      },
      showIcon: true,  
      showLabel:true,
      style: {
        backgroundColor: 'white'
      },
      labelStyle: {
        color: '#009C3C'
      },
      tabStyle: {
        marginTop: -25
      }
    },  
  })  
export default createAppContainer(AppNavigator);  