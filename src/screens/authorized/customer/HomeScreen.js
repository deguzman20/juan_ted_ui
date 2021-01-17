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
  CUSTOMER_INFO,
  ALL_SERVICE_TYPES,
  CLEAR_NOTIFICATION,
  UPDATE_CUSTOMER_GEOLOCATION } from '../../../queries';
import { DEFAULT_URL, ITEM_WIDTH } from '../../../actions/types';
import { getAllServiceAction } from '../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";
import { _androidRequestPermissions, _iosRequestPermissions } from '../../../helpers/location';

import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import IconBadge from 'react-native-icon-badge';

import Icon from 'react-native-vector-icons/FontAwesome';
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
import NewBillingAddressScreen from './place_order/NewBillingAddressScreen';
import DebitCardScreen from './place_order/DebitCardScreen';
import PaypalScreen from './place_order/PaypalScreen';
import NotificationScreen from './notification/NotificationScreen';

import InternetConnectionChecker from '../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../components/molecules/out_of_location_service/OutOfLocationService';

const HomeScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo();
  const pattern = /Parañaque/g;
  const [fName, setFname] = useState('');
  const [compoundCode, setCompoundCode] = useState('');
  const [BadgeCount, setBadgeCount] = useState(0);
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION);
  const [clear_notification] = useMutation(CLEAR_NOTIFICATION);
  const { loading, error, data } = useQuery(ALL_SERVICE_TYPES, {
    pollInterval: 1000
  });

  const {  } = useQuery(CUSTOMER_INFO, {
    onCompleted: (data) => {
      if(!isNull(data) && !isEmpty(data)){
        setFname(data.customer[0].firstName);
        setBadgeCount(data.customer[0].notificationCount)
      }
    },
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 400
  });

  useEffect(() => {
    if(Platform.OS === 'ios'){
      _iosRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
    else {
      _androidRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
  },[]);

  _onNavigateToTodoListPress = () => {
    if(netInfo.isConnected){
      navigation.navigate('MyTodoListScreen')
    }
  };

  _onNavigateToServiceTypePress = (id) => {
    if(netInfo.isConnected){
      if(isEqual(id, 1)){
        navigation.navigate('BarberScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        })
      }
      else if(isEqual(id, 2)){
        navigation.navigate('HairSalonScreen', 
        { 
          service_type_id: id,
          tasker_id: ""
        })
      }
    } 
  };

  _onNavigateToNotificationScreen = () => {
    clear_notification({
      variables: {
        customer_id: parseInt(customer_id)
      }
    }).then(({ data: { clearNotificationCount: { response }  } }) => {
      console.log(response)
      if(isEqual(response, 'Successfull updated')){
         navigation.navigate('NotificationScreen')
      }
    })
  }

  

  if (loading || error) return null;
 // const { firstName } = customerInfoArr[0].customer[0];
  // if(compoundCode !== ''){
  //   if(compoundCode.match(pattern) !== null){
      return(
        <View style={styles.container}>
          <View style={styles.wallet_wrapper}>
            <SafeAreaView/>
            <View style={styles.greeting_wrapper}>
              <Text h4 style={styles.hi_txt}>Hi {fName}</Text>
            </View>
            <View style={styles.profile_wrapper}>
              <View style={{flexDirection: 'row',marginTop:'35%',marginLeft:'70%'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    _onNavigateToNotificationScreen()
                  }}
                >
                  <IconBadge
                    MainElement={
                      <Icon 
                        name='bell'
                        style={styles.icon_profile}
                        size={30}
                      />
                    }
                    BadgeElement={
                      <Text style={{color:'#FFFFFF'}}>{BadgeCount}</Text>
                    }
                    IconBadgeStyle={
                      {width:14,
                      height:14,
                      left:8,
                      backgroundColor: 'red'}
                    }
                    Hidden={BadgeCount==0}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
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
};

const mapStateToProps = ({ serviceReducer, customerReducer }) => {
  return {
    services: serviceReducer,
    customer_id: customerReducer.id
  }
};

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
    navigationOptions: {
      title: 'Todo List',
      headerStyle: { backgroundColor: 'white' }
    } 
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
  NewBillingAddressScreen: {
    screen: NewBillingAddressScreen,
    navigationOptions: {
      title: '',
      headerVisible: false,
    }
  },
  PaypalScreen: {
    screen: PaypalScreen,
    navigationOptions: {
      title: '',
      headerVisible: false,
    }
  },
  DebitCardScreen: {
    screen: DebitCardScreen,
    navigationOptions: {
      title: '',
      headerVisible: false,
    }
  },
  NotificationScreen: {
    screen: NotificationScreen,
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