import React, { memo, FC } from 'react';
import { SocialIcon } from 'react-native-elements';

interface Props {
  title: any;
};

const SocialMediaIcon: FC<Props> = ({ title }) => (
  <SocialIcon
    title={`Sign In With ${title}`}
    button
    type={title}
  />
);

export default memo(SocialMediaIcon);