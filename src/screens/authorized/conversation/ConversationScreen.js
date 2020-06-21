import React, { memo } from 'react';
import { View, Dimensions, StyleSheet, Text} from 'react-native';
import Background from './../../../components/BackButton';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { CONVERSATION_LIST } from './../../../queries';
import { ListItem } from 'react-native-elements';
// import ConversationList from './ConversationList';

const ConversationsScreen = ({ user_id }) => { 
  const { error, data, loading } = useQuery(CONVERSATION_LIST,{
    variables: {
      user_id: parseInt(user_id),
      is_customer: true
    }, 
    pollInterval: 500,
    requestPolicy: 'cache-and-network',
    requestPolicy: 'network-only'
  });

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }];
    
//   <ListItem
//   key={i}
//   // leftAvatar={{ source: { uri: l.avatar_url } }}
//   title={l.first_name}
//   // subtitle={l.subtitle}
//   bottomDivider
// />
 if(data.conversationList[0]["tasker"].length >= 2){
    return(
      <Text>greater than or equal to two</Text>
    )
  } 
 if(data.conversationList[0]["tasker"].length === 1){
    // return(
    //   <Background>
    //     <View>
    //     {
    //       data.conversationList[0]["tasker"].map((l, i) => (
    //       <Text>{l.firstName}</Text>
    //       )) 
    //     }
    //   </View>
    //   </Background>
    // )
    return(
      <Text>only one</Text>
    )
  }
  else {
    return <Text>empty</Text>;
  }
  
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop:30
  },
})

const mapStateToProps = ({ customerReducer }) => {
  return {
    user_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ConversationsScreen))