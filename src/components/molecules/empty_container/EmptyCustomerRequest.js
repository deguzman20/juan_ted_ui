import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../styles/authorized/tasker/customer_request/CustomerRequestStyle';
import InternetConnectionChecker from '../../atoms/snackbar/InternetConnectionChecker';

const EmptyCustomerRequest = () => (
  <View style={styles.empty_request_container}>
    <Image source={require('./../../../assets/tasker.png')} />
    <Text h5 style={styles.empty_tasker_txt}>No Request</Text>
    <InternetConnectionChecker />
  </View>
)

export default memo(EmptyCustomerRequest)
