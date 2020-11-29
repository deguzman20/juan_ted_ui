import React, { memo, FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../core/theme';

interface Props {
  navigation: any;
};

const SignUpLinkButton: FC<Props> = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
    <Text style={styles.link}>Sign up</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
});

export default memo(SignUpLinkButton);
