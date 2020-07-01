import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ITEM_WIDTH } from './../../../../actions/types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_PLACE_API_KEY } from '../../../../actions/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-elements';

const GoogleMapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapViewStack}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={[]}
          style={styles.mapView}
          zoomEnabled = {true}
        />
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_PLACE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 10,
              marginRight: 10,
              marginTop: -50,
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
        width: ITEM_WIDTH,
        height: 171,
        marginTop:-100,
        backgroundColor: "white"
      }}>
        <Text style={styles.totalCost}>Total Cost</Text>
        <Text style={styles.cost}>P {navigation.state.params["totalPrice"]}</Text>
        <Button style={styles.rect2} title="Next" onPress={() => console.log('sample')} />
      </View>
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
    width: ITEM_WIDTH
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
    width: ITEM_WIDTH,
    height: 641,
    top:70,
  },
  rect: {
    width: ITEM_WIDTH,
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
    marginLeft: 300,
    marginTop: -30,
  },
  rect2: {
    width: ITEM_WIDTH,
    height: 41,
    marginTop: 43,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  }
});

export default memo(GoogleMapScreen);