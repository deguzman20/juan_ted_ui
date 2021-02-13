import React, { memo } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import ConversationItem from './ConversationItem';

const ConversationList = ({ data, loading, error, navigation, setTaskerId }) => {
  if (loading || error) return null;
  if(data.conversationList[0].customer.conversations.length >= 1 && data.conversationList[0].customer.conversations.length !== 0){
    return(
      <React.Fragment>
        <SafeAreaView />
        <View>
          {
            data.conversationList[0].customer.conversations.map((l, i) => (
              <ConversationItem 
                l={l} 
                i={i}
                navigation={navigation}
                setTaskerId={setTaskerId} 
              />
            ))
          }
        </View>
      </React.Fragment>     
    )
  }
  return(
    <Text>empty</Text>
  )
}

export default memo(ConversationList)