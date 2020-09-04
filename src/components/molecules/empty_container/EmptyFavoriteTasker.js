import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../styles/authorized/customer/my_tasker/favorate_tasker/FavorateTaskerStyle';
import InternetConnectionChecker from '../../atoms/snackbar/InternetConnectionChecker';

const EmptyFavoriteTasker = () => (
  <View style={styles.empty_tasker_container}>
    <Image source={require('./../../../assets/tasker.png')} />
    <Text h5 style={styles.empty_tasker_txt}>No Favorate Tasker Available yet</Text>
    <InternetConnectionChecker />
  </View>
)

export default memo(EmptyFavoriteTasker)
