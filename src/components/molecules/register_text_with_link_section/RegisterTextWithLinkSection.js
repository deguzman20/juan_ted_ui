import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginLinkButton from '../../atoms/button/LoginLinkButton';

const RegisterTextWithLinkSection = ({ navigation }) => (
  <View style={styles.row}>
    <Text style={styles.label}>
      Already have an account? 
    </Text>
    <LoginLinkButton 
      navigation={navigation} 
    />
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
})

export default memo(RegisterTextWithLinkSection)