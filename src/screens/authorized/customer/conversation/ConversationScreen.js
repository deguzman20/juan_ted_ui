import React, { memo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { CUSTOMER_CONVERSATION_LIST } from './../../../../queries';
import ConversationList from './ConversationList';
import MessageScreen from '../messages/MessageScreen';

const ConversationScreen = ({ user_id, navigation }) => {
  return(
    <Query
      query={CUSTOMER_CONVERSATION_LIST}
      variables={{ user_id: parseInt(user_id) }}
      pollInterval={700}
    >
      {({ data, loading, error }) => (
        <ScrollView>
          <ConversationList 
            data={data}
            loading={loading} 
            error={error}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </Query>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    user_id: customerReducer.id
  }
}

const App = createStackNavigator({
  ConversationScreen: { 
    screen: connect(mapStateToProps, null)(ConversationScreen),
    navigationOptions: {
      title: ''
    }
  },
  MessageScreen: { 
    screen: MessageScreen, 
    navigationOptions: {
      title: 'Message',
      headerStyle: { backgroundColor: 'white' }
    } 
  }
});

export default memo(createAppContainer(App));
