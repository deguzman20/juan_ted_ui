import React, { memo, FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../../core/theme';

interface Props {
  children: any;
};

const Header: FC<Props> = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 60,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 14
  },
});

export default memo(Header);
