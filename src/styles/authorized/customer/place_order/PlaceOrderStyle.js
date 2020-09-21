import { StyleSheet }  from 'react-native';

export const styles = StyleSheet.create({
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  my_order_txt: {
    paddingLeft: 30,
    paddingTop: 20
  },
  serviceWrapper: {
    position: 'absolute', 
    top: -10
  },
  priceWrapper: {
    position: 'relative',
    top: 10
  },
  serviceTypeWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  shipping_address_and_amount_container: {
    flex: 1.7, 
    backgroundColor: 'white'
  },
  shipping_address_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 20,
    color: 'gray'
  },
  shipping_address_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
  },
  shipping_address_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15
  },
  change_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
    color: '#009C3C'
  },
  divider: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
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
  select_button: {
    width: '100%',
    height: 150,
    marginTop: 0,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  },
  select_button_background_style: {
    backgroundColor: '#009C3C'
  },
  close_button_style: {
    backgroundColor: "black", 
    marginLeft: '5%', 
    marginRight: '5%',
    marginTop: '5%'
  }
}) 