import React, { memo, useState, useEffect, useRef } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/map/GoogleMapStyle';
import { GOOGLE_GEOCODE_URL, ITEM_WIDTH, ITEM_HEIGHT } from './../../../../actions/types';
import { GOOGLE_PLACE_API_KEY } from '../../../../actions/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { formatMoney } from '../../../../core/utils';
import { useNetInfo } from "@react-native-community/netinfo";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

import axios from 'axios';

const GoogleMapScreen = ({ navigation }) => {
  const _map = useRef(null)
  const netInfo = useNetInfo()
  const [formatted_address, setFormattedAddress] = useState('')
  const [geolocation, setGeolocation] = useState({ lng: 1100.5680867, lat: 120.8805576 })
  const mapRef = React.createRef();

  useEffect(() =>{
    if(_map.current && data.customer !== null) {
      _map.current.animateCamera(
        {
          center: {
            latitude:  geolocation.lat,   
            longitude: geolocation.lng,
          },
          zoom: 20
        },
        5000
      )
    }
  },[])
  changeRegion = () => {
    mapRef.current.animateToRegion({
      latitude:  geolocation.lat,   
      longitude: geolocation.lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    })
  }

  const _onNavigateToChooseSchedulePressed = () => {
    if(netInfo.isConnected){
      if(geolocation.lng !== 1100.5680867 && geolocation.lat !== 120.8805576){
        navigation.navigate('ChooseDayScreen',{
          formatted_address: formatted_address,
          longitude: geolocation.lng,
          latitude: geolocation.lat,
          service_type_id: navigation.state.params.service_type_id,
          services: navigation.state.params.services,
          service_details: navigation.state.params.service_details,
          tasker_id: navigation.state.params.tasker_id,
          total_price: navigation.state.params["totalPrice"]
        });
      }
      else{
        Alert.alert("Please select address")
      }
    }
  } 

  return (
    <View style={styles.container}>
      <View style={styles.mapViewStack}>
      {
          Platform.OS === 'ios' ?
          (
            <MapView
              ref={mapRef}
              initialRegion={{
                latitude: geolocation.lat,
                longitude: geolocation.lng,
                latitudeDelta: 60,
                longitudeDelta: ITEM_WIDTH / ITEM_HEIGHT,
              }}
              customMapStyle={[]}
              style={styles.mapView}
              zoomEnabled = {true}
            >
              <MapView.Marker.Animated
                coordinate={{ 
                  latitude: geolocation.lat,   
                  longitude: geolocation.lng
                }}
                title={"Your Location"}
              />
            </MapView>
          ):(
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              customMapStyle={[]}
              style={styles.mapView}
              zoomEnabled = {true}
            >
              <MapView.Marker.Animated
                coordinate={{ 
                  latitude: geolocation.lat,   
                  longitude: geolocation.lng
                }}
                title={"Your Location"}
              />
            </MapView>
          )
        }
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(details = null) => {
            axios.get(`${GOOGLE_GEOCODE_URL}?place_id=${details['place_id']}&key=${GOOGLE_PLACE_API_KEY}`)
            .then((response) => {
              const data = response.data["results"]
              const lng = data[0]["geometry"]["location"]["lng"]
              const lat = data[0]["geometry"]["location"]["lat"]
              setGeolocation(({ lng, lat }))
              setFormattedAddress(data[0].formatted_address)
              changeRegion()
              (<MapView.Marker.Animated
                coordinate={{ 
                  latitude: geolocation.lat,   
                  longitude: geolocation.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.033,
                }}
                title={"Your Location"}
              />)
            })
            .catch((error) => console.log(error))
          }}
          query={{
            key: GOOGLE_PLACE_API_KEY,
            language: 'en',
            components: 'country:ph'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              marginTop: -60,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 10,
              marginRight: 10,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
              backgroundColor: 'white'
            },
          }}
        />
      </View>
      <View style={{ 
        width: '100%', 
        height: 171,
        backgroundColor: "white",
        position: 'relative',
        top: -100,
        alignItems: 'stretch',
      }}>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.amount_wrapper}>
              <Text style={styles.total_amount_txt}>
                Total Amount
              </Text>
            </View>
            <View style={styles.amount_value_wrapper}>
              <Text style={styles.total_amount_value_txt}>
                ₱ {formatMoney(navigation.state.params["totalPrice"])}
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} />
        <Button 
          style={styles.next_button} 
          title="Next" 
          onPress={() =>{  _onNavigateToChooseSchedulePressed() }} 
          buttonStyle={styles.next_button_background_color} />
      </View>
      <InternetConnectionChecker />
    </View>
  )
}

export default memo(GoogleMapScreen)