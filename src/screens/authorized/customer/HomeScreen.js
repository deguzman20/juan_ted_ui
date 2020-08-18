import React, { memo } from 'react';
import {  
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Text } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { ALL_SERVICE_TYPES } from './../../../queries';
import { getAllServiceAction } from './../../../actions';
import { DEFAULT_URL, ITEM_WIDTH } from './../../../actions/types';
import { useNetInfo } from "@react-native-community/netinfo";

import MyTodoListScreen from './todo/MyTodoListScreen';
import ProfileScreen from './profile/ProfileScreen';
import HairSalonScreen from './services/HairSalonScreen';
import BarberScreen from './services/BarberScreen';
import GoogleMapScreen from './map/GoogleMapScreen';
import TaskersScreen from './geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from './geocoded_taskers/TaskerInfoScreen';
import ReviewsScreen from './geocoded_taskers/ReviewsScreen';
import ChooseDayScreen from './date_time/ChooseDayScreen';

import InternetConnectionChecker from '../../../components/atoms/snackbar/InternetConnectionChecker';

const HomeScreen = ({ navigation, customer_first_name }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(ALL_SERVICE_TYPES, {
    pollInterval: 1000
  });
  
  if (loading || error) return null;

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

    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5, backgroundColor: '#009C3C', width: '100%' }}>
        <SafeAreaView/>
        <Text h4 style={styles.hi_txt}>Hi {customer_first_name}</Text>
        <Text h2   style={styles.wallet_ammount_txt}>PHP 1000.00</Text>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text h4 style={styles.txt_services_txt}>Services</Text>
          </View>
          <FlatList
            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}
            numColumns={2}
            columnWrapperStyle={styles.row}            
            data={data["allServiceType"]}
            keyExtractor={(item) => item.id }
            renderItem={(item) => (
              <TouchableWithoutFeedback onPress={() => { _onNavigateToServiceTypePress(parseInt(item.item.id))}}>
                <Card style={{ width: (ITEM_WIDTH / 2) - 20, borderRadius: 20 }}>
                  <Card.Cover 
                    source={{ uri: `${DEFAULT_URL}/${item.item.image}` }} 
                  />
                  <Card.Title
                    title={`${item.item.name}`}
                  />
                </Card>
              </TouchableWithoutFeedback>
            )}
          />     
        </ScrollView>
        <InternetConnectionChecker 
          navigation={navigation}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  hi_txt: {
    left: 20, 
    marginTop: 20,
    color: 'white'
  },
  wallet_ammount_txt: {
    marginTop: 40,
    textAlign: 'center',
    color: 'white'
  },
  txt_services_txt: {
    left: 20, 
    marginTop: 20
  },
  image: {
    width: (ITEM_WIDTH / 2) - 60,
    height: 100
  }
});
  
const mapStateToProps = ({ serviceReducer, customerReducer }) => {
  return {
    services: serviceReducer,
    customer_first_name: customerReducer.first_name
  }
}

const App = createStackNavigator({
  Home: { 
    screen: connect(mapStateToProps, { getAllServiceAction })(HomeScreen),
    navigationOptions: {
      headerShown: false,
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
  },
  ReviewsScreen: {
    screen: ReviewsScreen,
    navigationOptions: {
      title: 'Reviews',
      headerStyle: {}
    }
  },
},{
  initialRouteName: 'Home'
});

export default memo(createAppContainer(App));