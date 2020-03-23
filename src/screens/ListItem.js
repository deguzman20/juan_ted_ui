import React, { memo } from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

const ListItem = ({ itemWidth, data }) => {
  return(
    <TouchableWithoutFeedback>
      <Image style={{width:itemWidth, height: 100}} source={data.image} />
    </TouchableWithoutFeedback>
  )
}
export default memo(ListItem)