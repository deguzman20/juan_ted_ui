import React, { memo, useEffect, useState } from 'react';
import {  
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform
} from 'react-native';
import { Text } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { styles } from '../../../styles/authorized/customer/HomeStyle';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { 
  ALL_SERVICE_TYPES, 
  UPDATE_CUSTOMER_GEOLOCATION } from '../../../queries';
import { DEFAULT_URL, ITEM_WIDTH } from '../../../actions/types';
import { getAllServiceAction } from '../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";
import { _androidRequestPermissions, _iosRequestPermissions } from '../../../helpers/location';

import MyTodoListScreen from './todo/MyTodoListScreen';
import ProfileScreen from './profile/ProfileScreen';
import HairSalonScreen from './services/HairSalonScreen';
import BarberScreen from './services/BarberScreen';
import GoogleMapScreen from './map/GoogleMapScreen';
import TaskersScreen from './geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from './geocoded_taskers/TaskerInfoScreen';
import ReviewsScreen from './geocoded_taskers/ReviewsScreen';
import ChooseDayScreen from './date_time/ChooseDayScreen';
import DetailsScreen from './view_details/DetailsScreen';
import PlaceOrderScreen from './place_order/PlaceOrderScreen';
import PaypalScreen from './place_order/PaypalScreen';

import InternetConnectionChecker from '../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../components/molecules/out_of_location_service/OutOfLocationService';

const HomeScreen = ({ navigation, customer_id, customer_first_name }) => {
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(ALL_SERVICE_TYPES, {
    pollInterval: 1000
  })

  useEffect(() => {
    if(Platform.OS === 'ios'){
      _iosRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
    else {
      _androidRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
  },[])

  _onNavigateToTodoListPress = () => {
    if(netInfo.isConnected){
      navigation.navigate('MyTodoListScreen')
    }
  }

  _onNavigateToServiceTypePress = () => {
    if(netInfo.isConnected){
      if(id === 1){
        navigation.navigate('BarberScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        })
      }
      else if(id === 2){
        navigation.navigate('HairSalonScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        })
      }
    } 
  }
  
  if (loading || error) return null;
  // if(compoundCode !== ''){
  //   if(compoundCode.match(pattern) !== null){
      return(
        <View style={styles.container}>
          <View style={styles.wallet_wrapper}>
            <SafeAreaView/>
            <Text h4 style={styles.hi_txt}>Hi {customer_first_name}</Text>
            <Text h2 style={styles.wallet_ammount_txt}>PHP 1000.00</Text>
          </View>
          <View style={styles.service_wrapper}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text h4 style={styles.txt_services_txt}>Services</Text>
              </View>
              <FlatList
                style={styles.flatlist_style}
                numColumns={2}
                columnWrapperStyle={styles.row}            
                data={data.allServiceType}
                keyExtractor={(item) => item.id }
                renderItem={(item) => (
                  <TouchableWithoutFeedback 
                    onPress={() => { 
                      _onNavigateToServiceTypePress(parseInt(item.item.id))
                    }}
                  >
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
  //   }
  //   else{
  //     return <OutOfLocationService />
  //   }
  // }
  // else{
  //   return <Loading />
  // }
}

const mapStateToProps = ({ serviceReducer, customerReducer }) => {
  return {
    services: serviceReducer,
    customer_id: customerReducer.id,
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
  DetailsScreen: {
    screen: DetailsScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  PlaceOrderScreen: {
    screen: PlaceOrderScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  PaypalScreen: {
    screen: PaypalScreen,
    navigationOptions: {
      title: '',
      headerVisible: false,
    }
  }
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    gestureEnabled: false
  }
})

export default memo(createAppContainer(App))