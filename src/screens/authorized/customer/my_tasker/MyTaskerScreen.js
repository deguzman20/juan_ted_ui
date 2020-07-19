import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Navigation from './Navigation';

const MyTaskerScreen = ({ navigation }) => {
  return(
    <React.Fragment>
      <SafeAreaView />
      <View style={styles.first_row_container}>
        <Text h4 style={styles.my_tasker_txt}>My Taskers</Text> 
      </View>
      <View style={styles.second_row_container}>
        <Navigation/>
      </View>  
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  my_tasker_txt: {
    paddingLeft: 30,
    paddingTop: 20
  }
})

export default memo(MyTaskerScreen)