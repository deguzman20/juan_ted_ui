import React, { memo } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_URL } from '../../../../actions/types';
import last from 'lodash/last';
import TimeAgo from 'react-native-timeago';

const ConversationItem = ({ l, i, navigation, setTaskerId }) => {
  let timestamp = last(l['messages']).createdDate;

  return(
    <TouchableWithoutFeedback onPress={() =>{
      setTaskerId(parseInt(parseInt(l['tasker'].id)))
      navigation.navigate('MessageScreen',{ 
                            conversation_id: parseInt(l.id),
                            tasker_id: parseInt(l['tasker'].id)
                          })}}
    >
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${l['tasker'].image}` } }}
        title={`${l['tasker'].firstName} ${l['tasker'].lastName}`}
        subtitle={l['messages'].length >= 1 ? `${last(l['messages']).text.substring(0, 20)}....` : ''} 
        bottomDivider
        rightSubtitle={l['messages'].length >= 1 ? <TimeAgo time={timestamp} /> :  '' }
      />
    </TouchableWithoutFeedback>
  )
};

export default memo(ConversationItem);