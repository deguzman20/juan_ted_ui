import React, { memo, FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../../core/theme';

interface Props {
  children: any;
};

const Paragraph: FC<Props> = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: 14,
  }
});

export default memo(Paragraph);
