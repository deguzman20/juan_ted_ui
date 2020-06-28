import React, { memo } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
const ConversationItem = ({ l, i, navigation }) => {
  return(
    <TouchableWithoutFeedback onPress={() =>{
      navigation.navigate('MessageScreen',
                            { conversation_id: l.id })
                          }}
    >
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={`${l['tasker'].firstName} ${l['tasker'].lastName}`}
        // // subtitle={""}
        bottomDivider
      />
    </TouchableWithoutFeedback>
  )
}
export default memo(ConversationItem);