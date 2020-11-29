import React, { memo } from 'react';
import { View } from 'react-native';
import SocialMediaIcon from '../../atoms/social_icon/SocialMediaIcon';

const SocialMediaButtons = () => {
  return(
    <View style={{ width:'100%' }}>
      <SocialMediaIcon
        title='facebook'
      />
      <SocialMediaIcon
        title='google'
      />
    </View>
  )
};

export default memo(SocialMediaButtons);