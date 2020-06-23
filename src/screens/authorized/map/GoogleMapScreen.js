import React, { memo } from 'react';
import { View } from 'react-native';

import GoogleMap from'./GoogleMap';
import GooglePlacesInput from './GooglePlacesInput';

const GoogleMapScreen = () => {
  return (
    <View>
      <GooglePlacesInput />
      <GoogleMap />
    </View>
  );
};

export default memo(GoogleMapScreen);