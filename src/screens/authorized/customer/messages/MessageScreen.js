import React, { memo, useState, useRef } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Query } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { CONVERSATION_MESSAGES, SEND_MESSAGE } from './../../../../queries';
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from './../../../../styles/authorized/customer/messages/MessageStyle';
import MessageList from './MessageList';

const MessageScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo()
  const scrollViewRef = useRef()
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [message, setMessage] = useState({ value: '' })
  
  _onSendMessagePressed = () => {
    if(netInfo.isConnected){
      sendMessage({ 
        variables: { 
          customer_id: parseInt(customer_id), 
          tasker_id: navigation.state.params.tasker_id, 
          own_by_customer: true, text: message.value,
          date_created: new Date() 
        } 
      })
      setMessage({ value: '' })
    }
    else{
      Alert.alert("You are currently offline, some features may be disabled")
    }
  }

  return(
    <Query
      query={CONVERSATION_MESSAGES}
      variables={{ conversation_id: navigation.state.params.conversation_id }}
      pollInterval={700}
    >
      {(props) => (
        <React.Fragment>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => {
              scrollViewRef.current.scrollToEnd({ animated: true })
            }}
          >
            <React.Fragment>
              <MessageList 
                {...props}
              />
            </React.Fragment> 
          </ScrollView>
          <View style={styles.messageWrapper}>
            <View style={styles.messageInputWrapper}>
              <Input
                placeholder='Message...'
                value={message.value}
                onChangeText={text => setMessage({ value: text })}
              />
            </View>
            <View style={styles.messageButtonWrapper}>
              <Button 
                title="send"
                onPress={() => { _onSendMessagePressed() }}
                buttonStyle={styles.background_color}
              />
            </View>
          </View>
        </React.Fragment>
        )
      }
    </Query>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(MessageScreen))