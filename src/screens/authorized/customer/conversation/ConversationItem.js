import React, { memo } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash';
const ConversationItem = ({ l, i, navigation }) => {
  console.log(l['messages'])
  return(
    <TouchableWithoutFeedback onPress={() =>{
      navigation.navigate('MessageScreen',{ 
                            conversation_id: parseInt(l.id),
                            tasker_id: parseInt(l['tasker'].id)
                          })}}
    >
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={`${l['tasker'].firstName} ${l['tasker'].lastName}`}
        subtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).text}` : ''} 
        bottomDivider
        rightSubtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).createdAt}` :  '' }
      />
    </TouchableWithoutFeedback>
  )
}
export default memo(ConversationItem); 