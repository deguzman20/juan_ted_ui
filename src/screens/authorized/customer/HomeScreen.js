import React, { memo } from 'react';
import {  
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { ALL_SERVICE_TYPES } from './../../../queries';
import { getAllServiceAction } from './../../../actions';
import { DEFAULT_URL, ITEM_WIDTH } from './../../../actions/types';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../components/InternetConnectionChecker';

import MyTodoListScreen from './todo/MyTodoListScreen';
import ProfileScreen from './profile/ProfileScreen';
import HairSalonScreen from './services/HairSalonScreen';
import BarberScreen from './services/BarberScreen';
import GoogleMapScreen from './map/GoogleMapScreen';
import TaskersScreen from './geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from './geocoded_taskers/TaskerInfoScreen';
import ChooseDayScreen from './date_time/ChooseDayScreen';

const HomeScreen = ({ navigation }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(ALL_SERVICE_TYPES, {
    pollInterval: 1000
  });
  
  if (loading || error) return null;

  console.log(data)

  _onNavigateToServiceTypePress = (id) => {
    if(netInfo.isConnected){
      if(id === 1){
        navigation.navigate('BarberScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        });
      }
      else if(id === 2){
        navigation.navigate('HairSalonScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        });
      }
    }
  }

  _onNavigateToTodoListPress = () => {
    if(netInfo.isConnected){
      navigation.navigate('MyTodoListScreen')
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.container_row}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text h4 style={styles.welcome_to_lokal_txt}>Welcome to lokal</Text>
          <Card styles={styles.cards}>
            <Text style={{marginBottom: 10}}>
              Tell us what you need help with, and we'll connect you with Taskers to get the job done.
            </Text>
            <Button
              icon={<Icon name='add' color='#ffffff' />}
              buttonStyle={styles.button_todo_list}
              title='Add to list'
              onPress={() => { _onNavigateToTodoListPress() }} 
            />
          </Card>
          <View>
            <Text h4 style={styles.txt_services_txt}>Services</Text>
          </View>
          <FlatList style={{ margin:5 }}
            numColumns={2}
            columnWrapperStyle={styles.row}            
            data={data["allServiceType"]}
            keyExtractor={(item) => item.id }
            renderItem={(item) => (
              <TouchableWithoutFeedback onPress={() => { _onNavigateToServiceTypePress(parseInt(item.item.id))}}>
                <Card
                  title={item.item.name} 
                  key={item.item.id}
                >
                  <Image style={styles.image} source={{  uri: `${DEFAULT_URL}/${item.item.image}` }}  />
                </Card>
              </TouchableWithoutFeedback>
            )}
          />       
        </ScrollView> 
        <InternetConnectionChecker/>
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
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  welcome_to_lokal_txt: {
    left: 20, 
    marginTop: 20
  },
  txt_services_txt: {
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
    backgroundColor: '#009C3C',
    borderRadius: 10
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
      title: '',
      headerLeft: null
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
  BarberScreen: {
    screen:  BarberScreen,
    navigationOptions: {
      title: 'Barber',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  HairSalonScreen: {
    screen:  HairSalonScreen,
    navigationOptions: {
      title: 'Hair Salon',
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
      title: 'Available Tasker',
      headerStyle: {}
    }
  },
  TaskerInfoScreen: {
    screen: TaskerInfoScreen,
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