import React, { memo, useState, useEffect } from 'react';
import { View, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Text, ListItem, Rating, Button } from 'react-native-elements';
import { styles } from './../../../../../styles/authorized/customer/my_tasker/favorate_tasker/FavorateTaskerStyle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DEFAULT_URL, GOOGLE_PLACE_API_KEY } from '../../../../../actions/types';
import { 
  FAVORATE_TASKER_LIST, 
  UPDATE_CUSTOMER_GEOLOCATION } from '../../../../../queries';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import TaskerServiceScreen from '../TaskerServiceScreen';
import MyTaskerInfoScreen from '../MyTaskerInfoScreen';
import GoogleMapScreen from '../../map/GoogleMapScreen';
import BarberScreen from '../../services/BarberScreen';
import HairSalonScreen from '../../services/HairSalonScreen';
import ChooseDayScreen from '../../date_time/ChooseDayScreen';
import TaskersScreen from '../../geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from '../../geocoded_taskers/TaskerInfoScreen';
import ReviewsScreen from '../ReviewsScreen';

import InternetConnectionChecker from '../../../../../components/atoms/snackbar/InternetConnectionChecker';
import EmptyFavoriteTasker from '../../../../../components/molecules/empty_container/EmptyFavoriteTasker';
import Loading from '../../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';
import sumBy from 'lodash/sumBy';

const FavoriteTaskerScreen = ({ customer_id, navigation }) => {
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(FAVORATE_TASKER_LIST, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 1000
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        update_customer_geolocation({ 
          variables: {
            customer_id: parseInt(customer_id),
            lng: currentLongitude,
            lat: currentLatitude,
            formatted_address: ''
          }
        }).then(({ data }) => {
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLatitude},${currentLongitude}&key=${GOOGLE_PLACE_API_KEY}`)
          .then((response) => {
            if(response.data.plus_code.compound_code !== ''){
              setCompoundCode(response.data.plus_code.compound_code)
            }
          })
        })
      },
      (error) => alert(error.message),
      { 
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
      }
    )
  },[])

  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        netInfo.isConnected ? navigation.navigate('MyTaskerInfoScreen', { tasker_id: parseInt(item.tasker.id) }) : null 
      }}
      title={
        <View style={styles.fullNameWrapper}>
          <Text>
            {item.tasker.firstName} {item.tasker.lastName}
          </Text>
        </View>
      }
      rightElement={
        <Button 
          buttonStyle={{ backgroundColor: '#009C3C' }}
          title={'Select'}
          onPress={() => {  
            netInfo.isConnected ? navigation.navigate('TaskerServiceScreen', { tasker_id: parseInt(item.tasker.id) }) : null 
          }}
        /> 
      }
      subtitle={
        <View style={ styles.ratingWrapper }>
          <Rating
            type="star"
            imageSize={20}
            readonly
            startingValue={item.tasker.reviews.length >= 1 ? sumBy(item.tasker.reviews, 'rating') / item.tasker.reviews.length : 0 }       
          />
        </View>
      }
      leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.tasker.image}` } }}
      bottomDivider
      chevron
    />
  )

  if(loading || error) return null;

  // if(compoundCode !== ""){
  //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
      if(data.favorateTaskerList.length >= 1){
        return(
          <React.Fragment>
            <SafeAreaView />
            <View style={styles.first_row_container}>
              <Text h4 style={styles.my_tasker_txt}>My Favorite Tasker</Text> 
            </View>
            <View style={styles.second_row_container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                  <View style={styles.taskerWrapper}>
                    <FlatList
                      keyExtractor={keyExtractor}
                      data={data.favorateTaskerList}
                      renderItem={renderItem}
                    />
                  </View>
                </View>
              </ScrollView>
              <InternetConnectionChecker />
            </View>  
          </React.Fragment>
        )
      }
      else {
        return <EmptyFavoriteTasker />
      }  
  //   }
  //   else{
  //     return <OutOfLocationService />
  //   }
  // }
  // else{
  //   return <Loading />
  // }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

const App = createStackNavigator({
  FavoriteTaskerScreen: { 
    screen: connect(mapStateToProps, null)(FavoriteTaskerScreen),
    navigationOptions: {
      header: null
    }
  },
  MyTaskerInfoScreen: { 
    screen: MyTaskerInfoScreen, 
    navigationOptions: {
      header: null
    } 
  },
  TaskerServiceScreen: {
    screen: TaskerServiceScreen,
    navigationOptions: {
      title: 'Tasker Available Service'
    } 
  },
  ReviewsScreen: {
    screen: ReviewsScreen,
    navigationOptions: {
      title: 'Reviews',
      headerShown: true
    } 
  },
  BarberScreen: {
    screen: BarberScreen,
    navigationOptions: {
      title: 'Barber'
    }
  },
  HairSalonScreen: {
    screen: HairSalonScreen,
    navigationOptions: {
      title: 'Hair Salon'
    }
  },
  GoogleMapScreen: {
    screen: GoogleMapScreen,
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
  TaskersScreen: {
    screen: TaskersScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  TaskerInfoScreen: {
    screen: TaskerInfoScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  }
})

export default memo(createAppContainer(App))