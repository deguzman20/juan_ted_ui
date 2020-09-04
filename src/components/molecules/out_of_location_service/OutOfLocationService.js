import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../styles/authorized/customer/HomeStyle';
import InternetConnectionChecker from '../../atoms/snackbar/InternetConnectionChecker';

const OutOfLocationService = () => (
  <View style={styles.out_of_location_service_container}>
    <Image 
      source={require('./../../../assets/gps.png')} />
    <Text h3 style={styles.out_of_location_service_txt}>Service not available</Text>
    <InternetConnectionChecker />
  </View>
)
export default memo(OutOfLocationService)
