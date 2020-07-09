import React, { memo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { CUSTOMER_CONVERSATION_LIST } from './../../../../queries';
import ConversationList from './ConversationList';
import MessageScreen from '../messages/MessageScreen';

const ConversationScreen = ({ user_id, navigation }) => {
  const { loading, error, data } = useQuery(CUSTOMER_CONVERSATION_LIST, {
    variables: { user_id: parseInt(user_id) },
    pollInterval: 500,
  });

  if(loading || error) return null;
  if(data["conversationList"].length !== 0){
    return(
      <ScrollView>
        <ConversationList 
          data={data}
          loading={loading} 
          error={error}
          navigation={navigation}
        />
      </ScrollView>
    )
  }
  else{
    return(
      <View style={styles.empty_converation_container}>
        <Image source={require('../../../../assets/conversation.png')} />
        <Text h3 style={styles.empty_converation_txt}>No Conversation yet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  empty_converation_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_converation_container: {
    // backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

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
