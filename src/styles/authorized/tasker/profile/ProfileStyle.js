import { StyleSheet } from 'react-native';
import { ITEM_WIDTH, ITEM_HEIGHT } from './../../../../actions/types';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop:30,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  fullName: {
    fontSize: 30,
    paddingTop: 20
  }
});
