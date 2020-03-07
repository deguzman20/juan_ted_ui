import React, { memo } from 'react';
import Background from '../components/Background';
import { List } from 'react-native-paper';
import { theme } from '../core/theme';
import { StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <Background>
       <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}/>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ProfileScreen);