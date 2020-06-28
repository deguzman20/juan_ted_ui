import React, { Component, memo } from 'react';
import { View } from 'react-native';
import MessageItem from './MessageItem';

const MessageList = ({ data, error, loading }) => {

  if (loading || error) return null;
  return (data.conversationMessages || []).map((message) => (
    <View key={message.id}>
      <MessageItem id={message.id} text={message.text} />
    </View>
  ))
}

export default memo(MessageList);