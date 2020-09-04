import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../styles/authorized/customer/my_tasker/past_tasker/PastTaskerStyle';
import InternetConnectionChecker from '../../atoms/snackbar/InternetConnectionChecker';

const EmptyPastTasker = () => (
  <View style={styles.empty_tasker_container}>
    <Image source={require('./../../../assets/tasker.png')} />
    <Text h5 style={styles.empty_tasker_txt}>No Past Tasker Available yet</Text>
    <InternetConnectionChecker />
  </View>
)

export default memo(EmptyPastTasker)
