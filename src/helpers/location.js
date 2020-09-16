import { PermissionsAndroid } from 'react-native';
import { GOOGLE_PLACE_API_KEY } from './../actions/types';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const _androidRequestPermissions = async (customer_id, compoundCode, setCompoundCode, update_customer_geolocation) => {
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      'title': 'ReactNativeCode Location Permission',
      'message': 'ReactNativeCode App needs access to your location',
      buttonNegative: "Cancel",
      buttonPositive: "OK"
  })
  
  if(result === PermissionsAndroid.RESULTS.GRANTED){
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
        }).then(() => {
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
  }
  else {
    console.log('Not Granted.')
  }
}

export const _iosRequestPermissions = async (customer_id, compoundCode, setCompoundCode, update_customer_geolocation) => {
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
      }).then(() => {
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
}