import React, {memo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native';
import { CONVERSATION_MESSAGES } from './../../../queries';
import { Query } from 'react-apollo';
import MessageList from './MessageList';

const MessageScreen = ({ navigation }) => {
  return(
    <Query
      query={CONVERSATION_MESSAGES}
      variables={{ conversation_id: parseInt(navigation.state.params["conversation_id"]) }}
      pollInterval={700}
    >
      {props => (
        <ScrollView>
          <MessageList 
            conversation_id={1}
            {...props} 
          />
        </ScrollView>
      )}
    </Query>
  )
}

const App = createStackNavigator({
  MessageScreen: { 
    screen: MessageScreen, 
    navigationOptions: {
      title: 'Message',
      headerStyle: { backgroundColor: 'white' }
    } 
  }
});

export default memo(createAppContainer(App));
