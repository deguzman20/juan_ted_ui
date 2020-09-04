import React, { memo, useState, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/tasker/messages/MessageStyle';
import { CONVERSATION_MESSAGES, SEND_MESSAGE } from './../../../../queries';
import { Query } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import MessageList from './MessageList';


const MessageScreen = ({ navigation, tasker_id }) => {
  const scrollViewRef = useRef()
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [message, setMessage] = useState({ value: '' })
  const _onSendMessagePressed = () => {
    sendMessage({ variables: { 
                  customer_id: navigation.state.params.customer_id, 
                  tasker_id: parseInt(tasker_id), 
                  own_by_customer: false, 
                  text: message.value } })
    setMessage({ value: '' })
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

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(MessageScreen))