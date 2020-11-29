import React, { memo, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../core/theme';

interface Props {
  navigation: any;
};

const ForgotPasswordlinkButton: FC<Props> = ({ navigation }) => (
  <View style={styles.forgotPassword}>
    <TouchableOpacity
      onPress={() => navigation.navigate('ForgotPasswordScreen')}
    >
      <Text style={styles.label}>Forgot your password?</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  label: {
    color: theme.colors.secondary
  } 
});

export default memo(ForgotPasswordlinkButton);
