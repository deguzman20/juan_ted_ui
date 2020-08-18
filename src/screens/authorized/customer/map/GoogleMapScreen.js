import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { GOOGLE_GEOCODE_URL, ITEM_WIDTH, ITEM_HEIGHT } from './../../../../actions/types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_PLACE_API_KEY } from '../../../../actions/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-elements';
import { formatMoney } from '../../../../core/utils';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

import axios from 'axios';

const GoogleMapScreen = ({ navigation }) => {
  const netInfo = useNetInfo();
  const [geolocation, setGeolocation] = useState({ lng: 1100.5680867, lat: 120.8805576 })

  const _onNavigateToChooseSchedulePressed = () => {
    if(netInfo.isConnected){
      if(geolocation.lng !== 1100.5680867 && geolocation.lat !== 120.8805576){
        navigation.navigate('ChooseDayScreen', { 
          longitude: geolocation.lng,
          latitude: geolocation.lat,
          service_type_id: navigation.state.params.service_type_id,
          services: navigation.state.params.services,
          tasker_id: navigation.state.params.tasker_id
        })
      }
      else{
        Alert.alert("Please select address");
      }
    }
  } 
  return (
    <View style={styles.container}>
      <View style={styles.mapViewStack}>
        <MapView
          initialRegion={{
            latitude: geolocation.lat,
            longitude: geolocation.lng,
            latitudeDelta: 60,
            longitudeDelta: ITEM_WIDTH / ITEM_HEIGHT,
          }}
          customMapStyle={[]}
          style={styles.mapView}
          zoomEnabled = {true}
        />
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(details = null) => {
            axios.get(`${GOOGLE_GEOCODE_URL}?place_id=${details['place_id']}&key=${GOOGLE_PLACE_API_KEY}`)
            .then((response) => {
              const data = response.data["results"];
              const lng = data[0]["geometry"]["location"]["lng"]
              const lat = data[0]["geometry"]["location"]["lat"]
              setGeolocation(({ lng, lat }))
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
        top: -95
      }}>
        <Text style={styles.totalCost}>Total Cost</Text>
        <Text style={styles.cost}>₱ {formatMoney(navigation.state.params["totalPrice"])}</Text>
        <Button 
          style={styles.next_button} 
          title="Next" 
          onPress={() =>{  _onNavigateToChooseSchedulePressed() }} 
          buttonStyle={styles.next_button_background_color} />
      </View>
      <InternetConnectionChecker />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    position: "absolute",
    top: -70,
    left: 0,
    height: 641,
    width: '100%'
  },
  placeholder: {
    top: 98,
    left: 42,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 54,
    width: 291
  },
  mapViewStack: {
    width: '100%',
    height: 641,
    top:70,
  },
  rect: {
    width: '100%',
    height: 171,
    backgroundColor: "white"
  },
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginTop: 43,
    marginLeft: 42
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: '65%',
    marginTop: -30,
  },
  next_button: {
    width: '100%',
    height: 150,
    marginTop: 43,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  },
  next_button_background_color: {
    backgroundColor: '#009C3C'
  }
});

export default memo(GoogleMapScreen);