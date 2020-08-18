import React, { memo } from 'react';
import { SocialIcon } from 'react-native-elements';

const SocialMediaIcon = ({ title }) => (
  <SocialIcon
    title={`Sign In With ${title}`}
    button
    type={title}
  />
);

export default memo(SocialMediaIcon);