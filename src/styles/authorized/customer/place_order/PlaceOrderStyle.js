import { StyleSheet }  from 'react-native';

export const styles = StyleSheet.create({
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    top: 20,
    flex: 2, 
    flexDirection: 'row'
  },
  my_order_txt: {
    paddingLeft: 30,
    paddingTop: 20
  },
  select_billing_txt: {
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
  billing_address_and_amount_container: {
    flex: 3.5, 
    backgroundColor: 'white'
  },
  billing_address_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 20,
    color: 'gray'
  },
  bliing_address_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
  },
  payment_method_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 20,
    color: 'gray'
  },
  payment_method_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
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
  },
  bt_main_color: {
    backgroundColor: '#009C3C'
  }
}) 