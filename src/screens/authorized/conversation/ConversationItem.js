import { memo, Component } from 'react';
import { ListItem } from 'react-native-elements';
const ConversationItem = ({ l, i }) => {
  return(
    <ListItem
      key={i}
      leftAvatar={{ source: { uri: l.avatar_url } }}
      title={l.name}
      subtitle={l.subtitle}
      bottomDivider
    />
  )
}
export default memo(ConversationItem);