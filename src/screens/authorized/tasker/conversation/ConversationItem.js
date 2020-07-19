import React, { memo } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import { BACKEND_ASSET_URL } from '../../../../actions/types';
import _ from 'lodash';
const ConversationItem = ({ l, i, navigation }) => {
  return(
    <TouchableWithoutFeedback onPress={() =>{
      navigation.navigate('MessageScreen',{ 
                            conversation_id: parseInt(l.id),
                            customer_id: parseInt(l['customer'].id)
                          })}}
    >
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: `${BACKEND_ASSET_URL}/${l['customer'].image}` } }}
        title={`${l['customer'].firstName} ${l['customer'].lastName}`}
        subtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).text.substring(0, 20)}....` : ''} 
        bottomDivider
        rightSubtitle={l['messages'].length >= 1 ? `${_.last(l['messages']).createdAt}` :  '' }
      />
    </TouchableWithoutFeedback>
  )
}
export default memo(ConversationItem); 