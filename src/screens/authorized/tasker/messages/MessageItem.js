import React, { memo } from 'react';
import { Text } from 'react-native';

const Message = ({ text, id }) => (
  <Text key={id} style={{paddingTop: 5, color: 'white'}}>
    {text}
  </Text> 
)

export default memo(Message);