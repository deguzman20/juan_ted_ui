import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../core/theme';

const LoginLinkButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={styles.link}> login</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
})

export default memo(LoginLinkButton)
