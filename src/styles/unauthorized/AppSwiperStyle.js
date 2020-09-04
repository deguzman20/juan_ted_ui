import { StyleSheet } from 'react-native';
import { ITEM_WIDTH, ITEM_HEIGHT  } from './../../actions/types';

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  button: {
    padding:10,
    marginTop:ITEM_HEIGHT-175
  }
})
