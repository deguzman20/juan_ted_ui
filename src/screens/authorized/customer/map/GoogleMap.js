import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const GoogleMap = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 33.7872131,
        longitude: -84.381931,
        latitudeDelta: .005,
        longitudeDelta: .005
      }} 
    >
      <Marker
        coordinate={{ 
          latitude: 33.7872131, 
          longitude: -84.381931 
        }}
        title='Flatiron School Atlanta'
        description='This is where the magic happens!'
      /> 
    </MapView>
  )
}

export default GoogleMap;
