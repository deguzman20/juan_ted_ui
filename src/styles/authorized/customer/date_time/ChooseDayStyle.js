import { StyleSheet } from 'react-native';
import { ITEM_WIDTH } from '../../../../actions/types';

export const styles = StyleSheet.create({
  containerRows: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
  },
  datePicker: {
    width: ITEM_WIDTH,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 20
  },
  buttonContainer: {
    width: ITEM_WIDTH,
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: '5%'
  }
});
