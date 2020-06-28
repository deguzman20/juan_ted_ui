import React, { Component, memo } from 'react';
import { Text, View } from 'react-native';

const Message = ({ text, id }) => (
  <View>
    <Text key={id}>
      {text}
    </Text>
  </View>
)

export default memo(Message);