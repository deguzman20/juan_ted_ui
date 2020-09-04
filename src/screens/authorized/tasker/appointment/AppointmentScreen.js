import React, { memo, useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { 
  TASKER_APPOINTMENT_LIST,
  UPDATE_TASKER_GEOLOCATION } from '../../../../queries';
import { GOOGLE_PLACE_API_KEY } from '../../../../actions/types';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Geolocation from '@react-native-community/geolocation';
import RNSchedule from 'rnschedule';
import TransactionInfoScreen from '../transaction_info/TransactionInfoScreen';
import CustomerRequestScreen from '../customer_request/CustomerRequestScreen';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const AppointmentScreen = ({ tasker_id, navigation }) => {
  const arr = []
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_tasker_geolocation] = useMutation(UPDATE_TASKER_GEOLOCATION)
  const { loading, error, data } = useQuery(TASKER_APPOINTMENT_LIST, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 600
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        
        update_tasker_geolocation({ 
          variables: {
            tasker_id: parseInt(tasker_id),
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

  getParsedDate = (date) => {
    var date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }

  _onNavigateToTransactionInfoPressed = (id) => {
    if(netInfo.isConnected){
      navigation.navigate('TransactionInfoScreen', {
        transaction_id: parseInt(id)
      })
    }
  }

  if(loading || error) return null;
    data.taskerAppointmentList.map((ap) => {
      arr.push({
        title: `with ${ap.customer.firstName} ${ap.customer.lastName}`,
        subtitle: `${ap.done ? 'Completed' : 'Scheduled'}`,
        start: new Date(...getParsedDate(`${ap.from}`)), 
        end: new Date(...getParsedDate(`${ap.to}`)),
        color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
        id: `${ap.id}`
      })
    })

    // if(compoundCode !== ''){
    //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
        return(
          <React.Fragment>
            <RNSchedule
              dataArray={arr}
              onEventPress={(appt) => {
                _onNavigateToTransactionInfoPressed(appt.id)
              }}
              accentColor="black"
            />
            <InternetConnectionChecker />
          </React.Fragment>
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

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

const App = createStackNavigator({
  AppointmentScreen: { 
    screen: connect(mapStateToProps, null)(AppointmentScreen),
    navigationOptions: {
      title: 'Tasks',
      headerLeft: null
    }
  },
  TransactionInfoScreen: {
    screen: TransactionInfoScreen,
    navigationOptions: {
      title: ''
    }
  },
  CustomerRequestScreen: {
    screen:  CustomerRequestScreen,
    navigationOptions: {
      title: '',
      headerLeft: null
    }
  }
})

export default memo(createAppContainer(App))