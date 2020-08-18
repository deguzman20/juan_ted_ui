import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../../core/theme';

const TextLabel = ({ children }) => {
  <Text style={styles.label}>
    {children}
  </Text>
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary
  }
});

export default memo(TextLabel);