import React, { memo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { TASKER_CONVERSATION_LIST } from './../../../../queries';

import ConversationList from './ConversationList';
import MessageScreen from '../messages/MessageScreen';
import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';

const ConversationScreen = ({ user_id, navigation }) => {
  const { loading, error, data } = useQuery(TASKER_CONVERSATION_LIST, {
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
        <InternetConnectionChecker />
      </ScrollView>
    )
  }
  else{
    return(
      <View style={styles.empty_converation_container}>
        <Image source={require('../../../../assets/conversation.png')} />
        <Text h3 style={styles.empty_converation_txt}>No Conversation yet</Text>
        <InternetConnectionChecker />
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});


const mapStateToProps = ({ taskerReducer }) => {
  return {
    user_id: taskerReducer.id
  }
}

const App = createStackNavigator({
  ConversationScreen: { 
    screen: connect(mapStateToProps, null)(ConversationScreen),
    navigationOptions: {
      title: 'Conversation List',
      headerLeft: null
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