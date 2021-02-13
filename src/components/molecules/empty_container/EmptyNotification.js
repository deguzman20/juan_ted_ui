import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from './../../../styles/authorized/customer/conversation/ConversationStyle';
import InternetConnectionChecker from '../../atoms/snackbar/InternetConnectionChecker';

const EmptyNotification = () => (
  <View style={styles.empty_conversation_container}>
    <Image source={require('./../../../assets/notification.png')} />
    <Text h3 style={styles.empty_conversation_txt}>No Notification yet</Text>
    <InternetConnectionChecker />
  </View>
);

export default memo(EmptyNotification);
