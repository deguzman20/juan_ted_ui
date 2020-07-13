import React, { memo } from 'react';
import { View } from 'react-native';
import OwnByCustomer from './OwnByCustomer';
import OwnByTasker from './OwnByTasker';

const MessageList = ({ data, error, loading }) => {
  
  MessageConditionalRendering = ({ message }) => {
    if(message.ownByCustomer === true){
      return(
        <OwnByCustomer message={message}/>
      )
    }
    else{
      return(
        <OwnByTasker message={message} />
      )
    }
  }

  if (loading || error) return null;
  return (data.conversationMessages || []).map((message) => (
    <View key={message.id}>
      <MessageConditionalRendering message={message}/>
    </View>
  ))
}

export default memo(MessageList);