import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
export default class GoogleMap extends Component {
  render() {
    return (
     <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
           latitude: 33.7872131,
           longitude: -84.381931,
           latitudeDelta: .005,
           longitudeDelta: .005
        }} >
        
        <Marker
           coordinate={{ latitude: 33.7872131, longitude: -84.381931 }}
           title='Flatiron School Atlanta'
           description='This is where the magic happens!'
        >
        </Marker >
     </MapView>
    );
  }
}