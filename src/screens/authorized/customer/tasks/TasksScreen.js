import React, { memo } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/tasks/TasksStyle';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { SafeAreaView } from 'react-navigation';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
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

const App = createStackNavigator({
  TasksScreen: { 
    screen: TasksScreen,
    navigationOptions: {
      header: null
    }
  }
})

export default memo(createAppContainer(App))