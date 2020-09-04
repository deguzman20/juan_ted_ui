import React, { memo, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { 
  UPDATE_TASKER_GEOLOCATION, 
  TASKER_CURRENT_GEOLOCATION } from '../../../../queries';
import { 
  GOOGLE_GEOCODE_URL, 
  GOOGLE_PLACE_API_KEY, 
  ITEM_HEIGHT, 
  ITEM_WIDTH } from './../../../../actions/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Loader from "react-native-modal-loader";
import axios from 'axios';

const CurrentLocationScreen = ({ tasker_id, navigation }) => {
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5)
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO
  
  const _map = useRef(null)
  const [geolocation, setGeolocation] = useState({ lng: 120.9979456, lat: 14.6821022})
  const [isLoading, setLoading] = useState(false)
  const [formattedAddress, setFormattedAddress] = useState('')
  const [updateTaskerGeolocation] = useMutation(UPDATE_TASKER_GEOLOCATION)

  const { loading, error } = useQuery(TASKER_CURRENT_GEOLOCATION, {
    onCompleted: (data) => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude)
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude)
          //getting the Latitude from the location json

          setGeolocation({ 
            lng: data.tasker[0].lng !== "" ? parseFloat(data.tasker[0].lng) : currentLongitude,
            lat: data.tasker[0].lat !== "" ? parseFloat(data.tasker[0].lat) : currentLatitude
          })
        },
        (error) => alert(error.message),
        { 
          enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
        }
      );
    },
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500,
  });

  useEffect(() =>{
    if(_map.current && data.tasker !== null) {
      _map.current.animateCamera(
        {
          center: {
            latitude:  geolocation.lat,   
            longitude: geolocation.lng,
          },
          zoom: 10
        },
        5000
      )
    }
  },[])
  
  const _onChangeGeolocationPressed = () => {
    if(formattedAddress !== ""){
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          updateTaskerGeolocation({ 
            variables: { 
              tasker_id: parseInt(tasker_id), 
              lng: geolocation.lng.toString(), 
              lat: geolocation.lat.toString(),
              formatted_address: formattedAddress.toString() } 
            }).then((data) => {
              if(i == 3 && data.data.updateTaskerGeolocation.response !== null){
                Alert.alert("Your geolocation info was successfuly updated");
                navigation.navigate('ProfileScreen')
              }
              setLoading(false)
          })
        }
      },3000)
    }
    else{
      Alert.alert("Please select your current location");
    }
  }

  if(error || loading) return null;
  return (
    <View style={styles.container}>
      <View style={styles.mapViewStack}>
        <MapView
          initialRegion={{
            latitude: geolocation.lat,   
            longitude: geolocation.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          customMapStyle={[]}
          style={styles.mapView}
          ref={_map}
        >
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(details = null) => {
              axios.get(`${GOOGLE_GEOCODE_URL}?place_id=${details['place_id']}&key=${GOOGLE_PLACE_API_KEY}`)
              .then((response) => {
                const data = response.data["results"];
                const lng = data[0]["geometry"]["location"]["lng"]
                const lat = data[0]["geometry"]["location"]["lat"]
                setGeolocation(({ lng, lat }))
                setFormattedAddress(data[0].formatted_address)
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
                borderBottomWidth: 0,
                marginTop: 20
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
          <MapView.Marker.Animated
            coordinate={{ 
              latitude: geolocation.lat,   
              longitude: geolocation.lng
            }}
            title={"Your Location"}
          />
        </MapView>
      </View>
      <View style={{
        width: '100%',
        height: 80,
        backgroundColor: "white",
        position: 'absolute',
        top: '91%'
      }}>
        <Button 
          style={styles.updateBtn} 
          title="Update my geolocation" 
          onPress={() =>{ _onChangeGeolocationPressed() }} 
          buttonStyle={styles.update_button_background_color} />
      </View>
      <Loader loading={isLoading} color="#ff66be" />
    </View>
  )
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    position: "absolute",
    top: -70,
    left: 0,
    height: '100%',
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
    height: '100%',
    top:70,
  },
  rect: {
    width: '100%',
    height: 171,
    backgroundColor: "white"
  },
  updateBtn: {
    width: '100%',
    height: 150,
    marginTop: 15,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  },
  update_button_background_color: {
    backgroundColor: '#009C3C'
  }
})

export default memo(connect(mapStateToProps, null)(CurrentLocationScreen))