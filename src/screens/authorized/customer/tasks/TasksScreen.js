import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaView } from 'react-navigation';

import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';
import Navigation from './Navigation';
import _ from 'lodash';

const TasksScreen = ({ navigation }) => {
  return(
    <React.Fragment>
      <SafeAreaView />
      <View style={styles.first_row_container}>
        <Text h4 style={styles.task_txt}>Tasks</Text> 
      </View>
      <View style={styles.second_row_container}>
        <Navigation />
        <InternetConnectionChecker />
      </View>  
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  task_txt: {
    paddingLeft: 30,
    paddingTop: 20
  }
});

const App = createStackNavigator({
  TasksScreen: { 
    screen: TasksScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default memo(createAppContainer(App));