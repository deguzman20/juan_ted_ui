import React from 'react';
import { GOOGLE_PLACE_API_KEY } from '../../../actions/types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_PLACE_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;