import React, { memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Query, Subscription } from 'react-apollo';
import { 
  SUBSCRIPTION_ADD_MESSAGE_TO_CONVERSATION,
  CONVERSATION_MESSAGES } from './../../queries';

class MyTaskerScreen extends React.Component {
  // _subscribeToNewMessageFromSpecificConversation = subscribeToMore => {
  //   subscribeToMore({
  //     document: SUBSCRIPTION_ADD_MESSAGE_TO_CONVERSATION,
  //     // variables: { conversation_id: 1 },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev

  //       const newMessage = subscriptionData.data.data.messageAddedToConversation;

  //       return Object.assign({}, prev, {
  //         conversationMessages: [...prev.conversationMessages, newMessage]
  //       });
  //     }
  //   })
  // }

  render(){
    return(
      <Subscription subscription={SUBSCRIPTION_ADD_MESSAGE_TO_CONVERSATION} variables={{ conversation_id: 1 }}>
        {(data) =>{
          console.log(data)
          return(
            <Text>a</Text>
          )
        }}
      </Subscription>
      // <Query query={CONVERSATION_MESSAGES} variables={{ conversation_id: 1 }}>
      //   {({ loading, error, data, subscribeToMore }) => {
      //     if (loading) return <Text>Loading...</Text>
      //     if (error) return <Text>Error</Text>
  
      //     this._subscribeToNewMessageFromSpecificConversation(subscribeToMore)
          
      //     const messagesToRender = data;
      //     console.log("======")
      //     console.log(messagesToRender)
  
      //     return (
      //       <View>
      //         <Text>Data</Text>
      //       </View>
      //     )
      //   }}
      // </Query>
    )
  }
}

// const MyTaskerScreen = ({ navigation }) => {
  
//   _subscribeToNewMessageFromSpecificConversation = subscribeToMore => {
//     subscribeToMore({
//       document: SUBSCRIPTION_ADD_MESSAGE_TO_CONVERSATION,
//       variables: { conversation_id: 1 },
//       updateQuery: (prev, { subscriptionData }) => {
//         if (!subscriptionData.data) return prev

//         const newMessage = subscriptionData.data.data.messageAddedToConversation;

//         return Object.assign({}, prev, {
//           conversationMessages: [...prev.conversationMessages, newMessage]
//         });
//       }
//     })
//   }

  
// }

export default memo(MyTaskerScreen)