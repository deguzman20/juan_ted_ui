import React, { memo } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_URL } from '../../../../actions/types';
import _ from 'lodash';

const ConversationItem = ({ l, i, navigation }) => {
  return(
    <TouchableWithoutFeedback onPress={() =>{
      navigation.navigate('MessageScreen',{ 
                            conversation_id: parseInt(l.id),
                            tasker_id: parseInt(l['tasker'].id)
                          })}}
    >
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${l['tasker'].image}` } }}
        title={`${l['tasker'].firstName} ${l['tasker'].lastName}`}
        subtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).text.substring(0, 20)}....` : ''} 
        bottomDivider
        rightSubtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).createdAt}` :  '' }
      />
    </TouchableWithoutFeedback>
  )
}
export default memo(ConversationItem); 