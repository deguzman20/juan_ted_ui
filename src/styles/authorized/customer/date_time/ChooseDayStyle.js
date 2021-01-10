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
  },
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginTop: 43,
    marginLeft: 42
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20,
    marginLeft: '65%',
    marginTop: -30,
  },
  next_button_background_color: {
    backgroundColor: '#009C3C',
    width: '92%',
    left: '20%',
    height: 40,
    marginTop: 25,
    color:'white',
    paddingLeft:10,
    paddingRight:10
  },
  amount_wrapper: {
    marginLeft: '5%',
    width: '45%',
    alignItems: 'flex-start'
  },
  amount_value_wrapper: {
    marginLeft: '5%',
    width: '40%',
    alignItems: 'flex-end'
  },
  total_amount_txt: {
    marginTop: 10,
    fontSize: 25
  },
  total_amount_value_txt: {
    marginTop: 10,
    fontSize: 25
  },
  divider: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
  },
  second_box_wrapper: {
    width: '100%', 
    height: 171,
    backgroundColor: "white",
    position: 'relative',
    alignItems: 'stretch'
  }
});
