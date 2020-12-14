import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../core/theme';

import SignUpLinkButton from '../../atoms/button/SignUpLinkButton';

const TextWithLinkSection = ({ navigation }) => (
  <View style={styles.row}>
    <Text style={styles.label}>Don’t have an account? </Text>
    <SignUpLinkButton 
      navigation={navigation}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  }
});

export default memo(TextWithLinkSection);
