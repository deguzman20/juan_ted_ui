import React, { memo, useState, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { CONVERSATION_MESSAGES, SEND_MESSAGE } from './../../../../queries';
import { Input, Button } from 'react-native-elements';
import { Query } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import MessageList from './MessageList';

const MessageScreen = ({ navigation, tasker_id }) => {
  const scrollViewRef = useRef();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [message, setMessage] = useState({ value: '' });
  const _onSendMessagePressed = () => {
    sendMessage({ variables: { 
                  customer_id: navigation.state.params.customer_id, 
                  tasker_id: parseInt(tasker_id), 
                  own_by_customer: false, 
                  text: message.value } })
    sendMessage({ value: '' })
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
            <MessageList 
              {...props}
            />
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

const styles = StyleSheet.create({
  messageWrapper:{
    flexDirection: 'row'
  },
  messageInputWrapper:{
    width: '80%'
  },
  messageButtonWrapper: {
    width: '18%'
  },
  background_color: {
    backgroundColor: "#009C3C"
  }
});

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(MessageScreen));