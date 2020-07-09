import React, { memo } from 'react';
import {  
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import { ALL_SERVICE_TYPES } from './../../../queries';
import { getAllServiceAction } from './../../../actions';
import { BACKEND_ASSET_URL } from './../../../actions/types';
import { connect } from 'react-redux';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { ITEM_WIDTH } from './../../../actions/types';

import MyTodoListScreen from './todo/MyTodoListScreen';
import ProfileScreen from './profile/ProfileScreen';
import HomeCleaningScreen from './services/HomeCleaningScreen';
import LaundryScreen from './services/LaundryScreen';
import HomeRepairScreen from './services/HomeRepairScreen';
import NailCareScreen from './services/NailCareScreen';
import GoogleMapScreen from './map/GoogleMapScreen';
import TaskersScreen from './geocoded_taskers/TaskersScreen';
import ChooseDayScreen from './date_time/ChooseDayScreen';

const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(ALL_SERVICE_TYPES)
  if (loading || error) return null;

  navigateToService = (id) => {
    if(id === 1){
      navigation.navigate('HomeCleaningScreen', { service_type_id: id });
    }
    else if(id === 2){
      navigation.navigate('HomeRepairScreen', { service_type_id: id });
    }
    else if(id === 3){
      navigation.navigate('LaundryScreen', { service_type_id: id });
    }
    else if(id === 4){
      console.log("")
      navigation.navigate("NailCareScreen", { service_type_id: id });
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.container_row}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text h4 style={styles.txt_todo_list}>My to-do list</Text>
          <Card styles={styles.cards}>
            <Text style={{marginBottom: 10}}>
              Tell us what you need help with, and we'll connect you with Taskers to get the job done.
            </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={styles.button_todo_list}
              title='Add to list'
              onPress={() => navigation.navigate('MyTodoListScreen')} 
            />
          </Card>
          <FlatList style={{margin:5}}
            numColumns={2}
            columnWrapperStyle={styles.row}
            
            data={data["allServiceType"]}
            keyExtractor={(item) => item.id }
            renderItem={(item) => (
              <TouchableWithoutFeedback onPress={() => { navigateToService(parseInt(item.item.id))}}>
                <Card
                  title={item.item.name} 
                  key={item.item.id}
                >
                  <Image style={styles.image} source={{  uri: `${BACKEND_ASSET_URL}/${item.item.image}` }}  />
                </Card>
              </TouchableWithoutFeedback>
            )}
          />       
        </ScrollView> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  container_row: {
    height: 100, 
    flex: 1
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  txt_todo_list: {
    left: 20, 
    marginTop: 20
  },
  cards: {
    width: ITEM_WIDTH, 
    top: 10 
  },
  button_todo_list: {
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0, 
    backgroundColor: '#009C3C'
  },
  image: {
    width: (ITEM_WIDTH / 2) - 60,
    height: 100
  }
});

const mapStateToProps = ({ serviceReducer }) => {
  return {
    services: serviceReducer
  }
}

const App = createStackNavigator({
  Home: { 
    screen: connect(mapStateToProps, { getAllServiceAction })(HomeScreen),
    navigationOptions: {
      title: 'Lokal'
    }
  },
  MyTodoListScreen: { 
    screen: MyTodoListScreen, 
    navigationOptions: {
      title: 'Todo List',
      headerStyle: { backgroundColor: 'white' }
    } 
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
  HomeCleaningScreen: {
    screen:  HomeCleaningScreen,
    navigationOptions: {
      title: 'Home Cleaning',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  LaundryScreen: {
    screen: LaundryScreen,
    navigationOptions: {
      title: 'Laundry',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  HomeRepairScreen: {
    screen: HomeRepairScreen,
    navigationOptions: {
      title: 'Home Repair',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  NailCareScreen: {
    screen: NailCareScreen,
    navigationOptions: {
      title: 'Nail Care',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  GoogleMapScreen: {
    screen: GoogleMapScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  TaskersScreen: {
    screen: TaskersScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  ChooseDayScreen: {
    screen: ChooseDayScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  }
});


export default memo(createAppContainer(App));