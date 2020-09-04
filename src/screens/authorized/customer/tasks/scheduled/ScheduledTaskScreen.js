import React, { memo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { 
  CUSTOMER_SCHEDULED_TRANSACTION_LIST, 
  UPDATE_CUSTOMER_GEOLOCATION  } from '../../../../../queries';
import { GOOGLE_PLACE_API_KEY } from '../../../../../actions/types';
import { useNetInfo } from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
import RNSchedule from 'rnschedule';
import InternetConnectionChecker from '../../../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const ScheduledTaskScreen = ({ customer_id, navigation }) => {
  const arr = []
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_SCHEDULED_TRANSACTION_LIST, {
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 600
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        console.log(currentLatitude)
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

  getParsedDate = (date) => {
    var date = String(date).split(' ')
    var days = String(date[0]).split('-')
    var hours = String(date[1]).split(':')
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])]
  }

  _onNavigateToTransactionInfoPressed = (id) => {
    if(netInfo.isConnected){
      navigation.navigate('ScheduledTransactionInfoScreen', {
        transaction_id: parseInt(id)
      })
    }
  }

  if(error || loading) return null;
    data.customerScheduledTransactionList.map((ap) => {
      arr.push({
        title: `with ${ap.tasker.firstName} ${ap.tasker.lastName}`,
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
    // }
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

export default memo(connect(mapStateToProps, null)(ScheduledTaskScreen))
