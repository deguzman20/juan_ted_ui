import React, { memo } from 'react';
import { Text } from 'react-native';

const Message = ({ text, id }) => (
  <Text key={id} style={{paddingTop: 5, color: 'white'}}>
    {text}
  </Text> 
)

export default memo(Message);
// if equal one or less than one it can use lodash _.last